import crypto, { BinaryLike, KeyObject } from 'crypto'
import axios from 'axios'
import { Request, Response } from 'express'
import AccessControl from '@vsky/accesscontrol'
import { BadRequestError } from '../errors/bad-request-error'
import { Op, Transaction } from 'sequelize'
import { SubscriptionController } from "../controllers/subscription";
import { getClient, clients } from "../services/serverSentEvents";
import { QUENAMES } from '../services/jobs/types'

require('dotenv').config()

// Using Express
import { ErrorCodes, Events, Status } from '../utils/enums'

import { MInstitution, School, MSubscription, User, MCountry, MTempUserDetails, PaymentHistory, MSetting } from '../models/index.models'

import db from "../models"
import { subDbs } from "../models/institutions_db"

import { addJobs } from '../services/jobs'
import { Utils } from '../utils/utils'


export class PaymentController {

    static secret: BinaryLike | KeyObject = process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? `${process.env.SECRET_KEY}` : `${process.env.TEST_SECRET_KEY}`

    static async get(req: Request, res: Response) {

        const { institutionId } = req.params

        let queryType: keyof typeof MInstitution = 'findAll' 
        let condition = {}
        let data = []


        try {

            if(institutionId){
                queryType = 'findOne' 
                condition = {
                    where: {
                        id: institutionId
                    },
                    include: {
                        model: MSubscription,
                        as: 'subscriptions',
                        attributes: {
                            exclude: ['created_at', 'updated_at']
                        }
                    }
                }
            }

            let institutions: any = await MInstitution[queryType]({ ...condition })

            if(institutions && !institutionId){
                data = institutions.map((institution: { name: any; id: any }) => ({ name: institution.name, id: institution.id}))
            }

            if(institutions && institutionId){
                const response = await institutions.getSubscriptions()
                data = response.map((subscription: { duration: string; id: string, price: number }) => ({ duration: subscription.duration, id: subscription.id, price: subscription.price }))
            }

            res.status(ErrorCodes.OK).send({ response: true, data })

        } catch (error: any) {
            throw new BadRequestError(error.message)
        }
    }

    static async initialize(req: Request, res: Response){

        const { email, admin_name, institution_name, phone_number, selected_institution, selected_subscription, selected_country } = req.body

        const institutionDetails = await MInstitution.findByPk(selected_institution)

        const mainTransaction = await db.transaction()
        const subTransaction = await subDbs.get(institutionDetails?.category).transaction()

        try {

            if( (!email || !Utils.isValidEmail(email)) || !admin_name || !institution_name || !phone_number || !selected_institution || !selected_subscription || !selected_country){
               return  res.status(ErrorCodes.BAD_REQUEST).json({ message: 'Some fields are empty', data: null })
            }

            const subscription = await SubscriptionController.getSubscriptionService(selected_subscription)

            if(subscription.length === 0) {
                return  res.status(ErrorCodes.BAD_REQUEST).json({ message: 'Bad Request', data: null })
            }

            const settings = await Utils.getSettings(MSetting)

            const activeCurrency = settings.company_settings?.currency.types.filter((type: { status: string }) => type.status.toLowerCase() === 'active')[0]

            const amount = Utils.calculateAmount(parseFloat(subscription.price), parseFloat(activeCurrency.value), settings.company_settings?.currency.rate)

            const currency = activeCurrency.label

            const channels = settings.company_settings?.channels
            const data = JSON.stringify({email, amount, currency, channels });
            const name = admin_name
            
            const config = {
                method: settings.company_settings?.paystack.initialize.method,
                url: settings.company_settings?.paystack.initialize.url,
                headers: { 
                    'Content-Type': settings.company_settings?.paystack.initialize.content_type, 
                    'Authorization': `Bearer ${PaymentController.secret}`, 
                },
                data : data
            };

            const response = (await axios(config)).data

            if(!response.status){
               return res.status(ErrorCodes.BAD_REQUEST).json({ message: 'Payment Initialization failed', data: null })
            }

            const existingTempUserDetails =  await MTempUserDetails.findOne({ where: { email } })

            if(existingTempUserDetails){
                await MTempUserDetails.destroy({ where: { email },  transaction: mainTransaction  })
            }

            await MTempUserDetails.create({ 
                name, email, institution_name, phone_number, 
                selected_institution, selected_subscription, selected_country
            }, { transaction: mainTransaction })

            await PaymentHistory.destroy({ where: { payment_type: 'registeration', email, status: Status.PENDING },  transaction: subTransaction  })

            await PaymentHistory.create({
                email, payment_type: 'registeration', amount, status: Status.PENDING, reference: response.data.reference,
                authorization_url: response.data.authorization_url, access_code: response.data.access_code,
            }, { transaction: subTransaction })

            // If the execution reaches this line, no errors were thrown.
            // We commit the transaction.
            await mainTransaction.commit()
            await subTransaction.commit()

            res.status(ErrorCodes.OK).json({ message: 'Payment Initialized', data: response })

        } catch(error: any){

            console.log(error)

            await mainTransaction.rollback()
            await subTransaction.rollback()

            throw new BadRequestError(error.message)
        }

    }

    static async webhook(req: Request, res: Response){
        //validate event
        const hash = crypto.createHmac('sha512', PaymentController.secret).update(JSON.stringify(req.body)).digest('hex');

        if (hash == req.headers['x-paystack-signature']) {

            try {

                // Retrieve the request's body
                const event = req.body;
    
                // call the add the event to the jobs for the worker to process at the background
                // this is to enable us send a 200 back to the webhook call to prevent been flaged as failed
               await addJobs(event, QUENAMES.WEBHOOK)
    
                const user = event.data.customer.email
                
                const client = getClient(user)
    
                const eventType = client?.type
                
                if(eventType && event.event === Events.CHARGE_SUCCESS){
                    client.response.write(`event: ${eventType}\n`)
                    client.response.write(`data: ${JSON.stringify({ message: 'Payment successfull', status: true, data: { email: user }})}\n\n`)
                }

            } catch(error: any){
                console.log("WEBHOOK ERROR: ", error.message)
            }
        }
        // res.send(200);
        res.sendStatus(200) 
    }

}
