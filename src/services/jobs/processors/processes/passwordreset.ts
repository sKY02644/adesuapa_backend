import axios from 'axios'
import { Utils } from '../../../../utils/utils'
import { subDbs } from "../../../../models/institutions_db"
import { Parent, SmsCredit, Teacher, User, Student } from '../../../../models/index.models'
import NodeMailer from '../../../../services/nodeMailer'

export default async function (event: any) {

    const subTransaction = await subDbs.get(event.institutionType?.category).transaction()

    switch (event.type) {
        case 'initial':                
        
            try {
                    // TODO: CHANGE TO ELSE VALUE TO USE THE UNIVERSITY MODEL WHEN ITS DONE
                    const SmsCreditModel = event.institutionType.category.toLowerCase() === 'jhs_shs' ? SmsCredit : SmsCredit
            
                    const smsCredit = await SmsCreditModel.findOne({ where: { schools_id: event.user.schools_id }, attributes: ['sms_left', 'sms_used'] })
            
                    const textcus = event.settings.company_settings?.sms.textcus
            
                    //message to send to recipient
                    const sms = Utils.limitString(`Your Password Reset Code is: ${event.originalCode}`, textcus.limit)
            
                    const smsLenght = sms.length
            
                    const smsCreditToUse = Utils.messagesRequired(smsLenght)
            
                    if(smsCredit){
            
                        const smsLeft = smsCredit.sms_left
                        const smsUsed = smsCredit.sms_used
            
                        if( smsLeft > 0 && smsCreditToUse < smsLeft) {
                            
                            const countryCode = event.user.country_code
                        
                            let contact = event.user.contact
                        
                            const index = contact.indexOf("0")
                        
                            if(index === -1) {
                                contact = contact
                            }
                        
                            const userPhone = contact.slice(0, index) + contact.slice(index + 1);
                        
                            let recipient = `${countryCode}${userPhone}`
                        
                            const data = {
                                smsApiKey: textcus.sms_api_key,
                                senderEncode: encodeURI(textcus.sms_sender_id),
                                recipientEncode: encodeURI(recipient),
                                smsEncode: encodeURI(sms),
                                fullPath: `${textcus.domain}${textcus.send.path}`
                            }
                        
                            let url = `${data.fullPath}?apikey=${data.smsApiKey}&destination=${data.recipientEncode}&source=${data.senderEncode}&dlr=1&type=0&message=${data.smsEncode}`;
                        
                            const response = (await axios.get(url)).data
                
                            if(response.status === '0000'){
                                
                                const smsCreditLeft = smsLeft - smsCreditToUse
                                const smsCreditUsed = smsUsed + smsCreditToUse
                                
                                // update the schools smsCredit table
                                await SmsCreditModel.update({ sms_left: smsCreditLeft, sms_used: smsCreditUsed }, 
                                    { where: { shools_id: event.user.schools_id }, transaction: subTransaction })

                                    subTransaction.commit()
                            }
                        }
                    }
            
                    // EMAIL
                    if(event.user.email){
            
                        const env = process.env.NODE_ENV || "development"
                
                        const emailConfigs = event.settings?.company_settings.email_configs
                
                        const mailConfigs = emailConfigs?.filter((config: { env: string; is_active: boolean;  }) => config.env === env && config.is_active === true)[0]
                                                    
                        const mailer = new NodeMailer(mailConfigs.configs);
                
                        const values = { 
                            'email': event.user.email, 
                            'username': event.user.name || '{{userName.name}}', 
                            'resetcode': event.originalCode, 
                            'supportaddress': event.settings.company_settings?.company_details.supportaddress, 
                            'altproduct':  event.settings.company_settings?.company_details.alt_product, 
                            'logo': event.settings.company_settings?.company_details.logo, 
                            'homepage': event.settings.company_settings?.company_details.homepage, 
                            'year': new Date().getFullYear(),  
                            'address': event.settings.company_settings?.company_details.address
                        }
                
                        await mailer.passwordResetCodeTemplate(values, mailConfigs.from)
                        
                    }
                                    
                // TODO: nothing is returned fix to allow the return data be caugth by the function
                // return { response: true, message: '', data: '' }

                } catch(error: any) {
                    console.log(error)
                    subTransaction.rollback()
                    return { response: false, message: error.message };
                }

            break;
            case 'update':

                try {
                    // EMAIL
                    if(event.user.email) {

                        const env = process.env.NODE_ENV || "development"
                
                        const emailConfigs = event.settings?.company_settings.email_configs
                
                        const mailConfigs = emailConfigs?.filter((config: { env: string; is_active: boolean;  }) => config.env === env && config.is_active === true)[0]
                                                    
                        const mailer = new NodeMailer(mailConfigs.configs);
                
                        const values = { 
                            'email': event.user.email, 
                            'username': event.user.name || '{{userName.name}}', 
                            'type': 'update', 
                            'supportaddress': event.settings.company_settings?.company_details.supportaddress, 
                            'altproduct':  Utils.capitalizeEachFirstLetter(event.settings.company_settings?.company_details.alt_product), 
                            'logo': event.settings.company_settings?.company_details.logo, 
                            'homepage': event.settings.company_settings?.company_details.homepage, 
                            'year': new Date().getFullYear(),
                            'datetime': new Date().toUTCString(),
                            'address': event.settings.company_settings?.company_details.address
                        }
                    
                        await mailer.passwordResetCodeTemplate(values, mailConfigs.from)

                        return { response: false, message: '', data: '' }
                    }
                } catch(error: any) {
                    console.log(error)
                    return { response: false, message: error.message };
                }

                break;
            default:
                break;
        }


}