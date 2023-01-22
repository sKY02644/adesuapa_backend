import { Request, Response } from 'express'
import { BadRequestError } from '../errors/bad-request-error'
import { Op } from 'sequelize'

import { ErrorCodes, Status } from '../utils/enums'

import { MCountry, MSubscription } from '../models/index.models'



export class CountryController {


    static async get(req: Request, res: Response) {

        const { countryId, status } = req.params

        let queryType: keyof typeof MCountry = 'findAll' 
        let condition: any = { where: { status }}


        try {

            if(countryId !== 'all'){
                queryType = 'findOne' 
                condition = { 
                    where: {
                        [Op.or]: {
                            code: countryId,
                            id: countryId,
                            name: countryId
                        },
                        status
                    }
                }
                
            }

            if(!countryId && status){
                queryType = 'findAll' 
                condition = { where: { status: Status.ACTIVE } }                
            }

            let countries: any = await MCountry[queryType]({ ...condition })

            res.status(ErrorCodes.OK).send({ response: true, countries })

        } catch (error: any) {
            throw new BadRequestError(error.message)
        }
    }

}
