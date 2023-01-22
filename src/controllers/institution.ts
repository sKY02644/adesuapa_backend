import { Request, Response } from 'express'
import { BadRequestError } from '../errors/bad-request-error'
import { Op } from 'sequelize'

import { ErrorCodes } from '../utils/enums'

import { MInstitution, MSubscription } from '../models/index.models'

export class InstitutionController {


    static async get(req: Request, res: Response) {

        const { institutionId, status } = req.params

        let queryType: keyof typeof MInstitution = 'findAll' 
        let condition: {} = { where: { status } }
        let data = []


        try {

            if(institutionId){
                queryType = 'findOne' 
                condition = {
                    where: {
                        id: institutionId,
                        status
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

}
