
import { MInstitution, MMail, School, MSubscription, User, MCountry, MTempUserDetails, PaymentHistory, MSetting, SubscriptionHistory } from '../../../../models/index.models'
import { Utils } from '../../../../utils/utils'
import { Events, Status } from '../../../../utils/enums'
import { subDbs } from "../../../../models/institutions_db"
import db from "../../../../models"
import NodeMailer from '../../../../services/nodeMailer'

// import AccessControl from '@vsky/accesscontrol'

import { Op } from 'sequelize';


export default async function(event: { event: any; data: { customer: any; reference: any; }; }) {

    const eventType = event.event
    const eventData = event.data

    const email: string = eventData.customer.email

    const tempUserDetails = await MTempUserDetails.findOne({ where: { email }})

    if(!tempUserDetails){
        return { status: false, message: 'Something went wrong. Fetching Temp User Data Failed'}
    }
    
    // GET INSTITUtiON DETAILS 
    const institutionDetails = await MInstitution.findByPk(tempUserDetails?.selected_institution)
    
    if(!institutionDetails){
        return { status: false, message: 'Something went wrong. Fetching Institution Data Failed'}
    }

    const mainTransaction = await db.transaction()
    const subTransaction = await subDbs.get(institutionDetails?.category).transaction()

    if(!subTransaction){
        return { status: false, message: 'Something went wrong. Sub Transaction not found'}
    }

    switch (eventType) {
        case Events.CHARGE_SUCCESS:
                                        
            const institutionName = tempUserDetails.institution_name.trim()
            const adminName = tempUserDetails.name.trim()
            const phoneNumber = tempUserDetails.phone_number
            const name = tempUserDetails.name.trim()
            const selectedInstitution = tempUserDetails.selected_institution
            const selectedSubscription = tempUserDetails.selected_subscription
            const selectedCountry = tempUserDetails.selected_country

            try {

                const password = Utils.generatePassword(institutionName, adminName, email, phoneNumber)

                // GET COUNTRY DETAILS
                const countryDetails = await MCountry.findByPk(selectedCountry)

                // GET THE SELECTED SUBSCRIPTION DETAILS
                const subscription = await MSubscription.findByPk(selectedSubscription)
                
                const initials = await Utils.generateSchoolsInitials(School, institutionName)

                const idFormat = institutionDetails?.users_id_format
                const userType = institutionDetails?.user_type['admin'] ? institutionDetails?.user_type['admin'] : ''
                const institutionType = institutionDetails?.sub_category
                const registrationYear = new Date().getFullYear()
                const rolePermissions = institutionDetails?.role_permission['admin']['role_permission'] ? institutionDetails?.role_permission['admin']['role_permission'] : ''
                
                // TODO: CHANGE THE TO ELSE VALUE TO USE THE UNIVERSITY MODEL WHEN ITS DONE
                const SchoolModel = institutionDetails?.category.toLowerCase() === 'jhs_shs' ? School : School
                const UserModel = institutionDetails?.category.toLowerCase() === 'jhs_shs' ? User : User
                const PaymentHistoryModel = institutionDetails?.category.toLowerCase() === 'jhs_shs' ? PaymentHistory : PaymentHistory
                const SubscriptionHistoryModel = institutionDetails?.category.toLowerCase() === 'jhs_shs' ? SubscriptionHistory : SubscriptionHistory

                const counted = await SchoolModel.count({ where: { initials }})

                const newValues = { 'initials': initials, 'usertype': userType, 'year': registrationYear, 'type': institutionType, 'format': idFormat }
                
                const userId = await Utils.generateUsersId(UserModel, newValues, undefined, counted)

                                            
                const school = await SchoolModel.create({
                    name: institutionName, initials, status: Status.PENDING, 
                    institutions_id: selectedInstitution, countries_id: selectedCountry
                }, { transaction: subTransaction })
                
                const schoolId = school.id

                const user = await UserModel.create({
                    password, email, contact: phoneNumber, status: 1, country: countryDetails?.name, name,
                    user_id: userId, role_permission: rolePermissions, country_code: countryDetails?.code, 
                    schools_id: schoolId, institutions_id: selectedInstitution, user_type: userType,
                }, { transaction: subTransaction })
                
                // REMEMMBER TO UPDATE THE SUBSCRIPTION HISTORY 
                await PaymentHistoryModel.update({
                    user_id: user?.id, schools_id: schoolId, webhook_response: JSON.stringify(event), status: Status.SUCCESS,
                }, { where: { reference: event.data.reference, email, status: Status.PENDING }, transaction: subTransaction })
                
                const endDate =  Utils.getDateFromDuration(subscription?.duration)
        
                await SubscriptionHistoryModel.create({
                    schools_id: schoolId, active: true, start_date: new Date(), end_date: endDate 
                }, { transaction: subTransaction })

                await MTempUserDetails.destroy({ where: { email },  transaction: mainTransaction  })

                await mainTransaction.commit()
                await subTransaction.commit()

                const env = process.env.NODE_ENV || "development"

                const settings = await MSetting.findAll({ where: { key: { [Op.or]: ['email_configs', 'company_details', 'default_permission_actions'] } } })

                const emailConfigs = settings?.filter(v => v.key === 'email_configs')[0]['value'] as {[key: string]: any}

                const companyDetails = settings?.filter(v => v.key === 'company_details')[0]['value'] as {[key: string]: any}
        
                const mailConfigs = emailConfigs?.filter((config: { env: string; is_active: boolean;  }) => config.env === env && config.is_active === true)[0]
                        
                const mailer = new NodeMailer(mailConfigs.configs);

                const confirmationData = Utils.buildConfirmationMessageBody({ 
                    institution_name: institutionName, email, message: "", user_uid: userId, password, confirmation_url: "", user_name: adminName
                })

                const welcomeData =  Utils.buildWelcomeMessageBody({ ...companyDetails, email, user_name: adminName })

                const mailResponse = await mailer.processInitMail(welcomeData, mailConfigs.from, confirmationData)

                if(mailResponse.status === "rejected"){
                    const mainTransaction = await db.transaction()
                    try {
                        const mailData = mailResponse.type === 'welcome' ?  { content: welcomeData, type: 'welcome_mail', status: 'failed' } :  { content: confirmationData, type: 'confirmation_mail', status: 'failed' }
                        await MMail.create(mailData, { transaction: mainTransaction })
                        await mainTransaction.commit()
                    } catch(error) {
                        await mainTransaction.rollback()
                    }
                }

                // lets check if the two mails failed then we use bulk insert 
                const totalFailed: number = mailResponse.response?.reduce((total, response) => response.status ? response.status === 'rejected' ? total + 1 : total : 0 , 0)

                switch (totalFailed) {
                    case 2: {
                        const mailData = [
                            { content: welcomeData, type: 'welcome_mail', status: 'failed' }, 
                            { content: confirmationData, type: 'confirmation_mail', status: 'failed' }
                        ]
                        const mainTransaction = await db.transaction()
                        try {
                            await MMail.bulkCreate(mailData, { transaction: mainTransaction})
                            await mainTransaction.commit()
                        } catch(error) {
                            console.log(error)
                            await mainTransaction.rollback()
                        }
                        break;
                    }
                    case 1: {      
                        const mainTransaction = await db.transaction()
                        const index = mailResponse.response?.findIndex((response) => response.type === 'confirmation')
                        const content = index && index > -1 ? confirmationData : welcomeData
                        const type = index && index > -1 ? 'confirmation_mail' : 'welcome_mail'
                        const mailData = { content, type, status: 'failed' }
                        try {
                            await MMail.create(mailData, { transaction: mainTransaction })
                            await mainTransaction.commit()
                        } catch(error){
                            console.log(error)
                            await mainTransaction.rollback()
                        }
                        break;
                    }
                    case 0: {      
                        console.log("ALL EMAILS SENT")
                        break;
                    }
                    default: 
                        console.log("ERROR")
                        break;
                }

            } catch (err) {

                console.log(err)

                await mainTransaction.rollback()
                await subTransaction.rollback()
            }

            break;
        case Events.TRANSFER_SUCCESS:

            break;
        case Events.TRANSFER_FAILED:

            break;
        case Events.TRANSFER_REVERSED:

            break;
        case Events.PAYMENT_REQUEST_PENDING:

            break;
        case Events.PAYMENT_REQUEST_SUCCESS:

            break;
        default:
            await mainTransaction.rollback()
            await subTransaction.rollback()
            break;
    }

}