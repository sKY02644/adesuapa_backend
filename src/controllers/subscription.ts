import { Request, Response } from 'express'
import { BadRequestError } from '../errors/bad-request-error'
import { Op } from 'sequelize'

import { ErrorCodes } from '../utils/enums'

import { MSubscription, MInstitution } from '../models/index.models'

import { Utils } from '../utils/utils'



export class SubscriptionController {


    static async get(req: Request, res: Response) {

        const { subscriptionId } = req.params
        
        try {
            
            let data = await SubscriptionController.getSubscriptionService(subscriptionId)

            res.status(ErrorCodes.OK).send({ response: true, data })

        } catch (error: any) {
            throw new BadRequestError(error.message)
        }
    }

    static async getSubscriptionService(subscriptionId?: string, includeInstitution: boolean = false){
        let data = []

        let queryType: keyof typeof MSubscription = 'findAll' 

        
        const ins = includeInstitution ? { include: {
            model: MInstitution,
            as: 'institution',
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }} : { attributes: { exclude: ['createdAt', 'updatedAt'] } }

        let condition: any = { ...ins }

        if(subscriptionId){
            queryType = 'findOne' 
            condition = { where: { id: subscriptionId }, ...ins}
        }

        let subscriptions: any = await MSubscription[queryType]({ ...condition })

        const allowedSubscritionKeys = ['duration', 'id', 'price'];
        const allowedInstitutionKeys = ['name', 'id'];

        if(subscriptions && subscriptionId && !includeInstitution){
            data = Utils.modifyObj(subscriptions.dataValues, allowedSubscritionKeys)
        }

        if(subscriptions && !subscriptionId && !includeInstitution){
            data = subscriptions.map((subscription: { duration: string; id: string, price: number }) => ({ duration: subscription.duration, id: subscription.id, price: subscription.price }))
        }

        if(subscriptions && subscriptionId && includeInstitution){
            const institution =  Utils.modifyObj(subscriptions.institution.dataValues, allowedInstitutionKeys)
            delete subscriptions.dataValues.institution
            const subscription = Utils.modifyObj(subscriptions.dataValues, allowedSubscritionKeys)
            data = { ...subscription, institution }
        }

        if(subscriptions && !subscriptionId && includeInstitution){
            data = Utils.modifyData(subscriptions, allowedSubscritionKeys, allowedInstitutionKeys)
        }

      

        return data
    }
    

}
