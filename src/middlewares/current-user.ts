import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Op } from 'sequelize'

import { User, School } from '../models/index.models'

interface UserPayload {
    id: string
    role: string
    company_id: string
    branch_id: string
    email?: string
    username: string
}


export const currentUser = async (req: Request, res: Response, next: NextFunction) => {

    let result = null;

    try {

        if (req.params.currentuserid) {

            let data = JSON.parse(req.params.currentuserid)

            req.session = null

            result = await User.findOne({
                where: {
                    [Op.or]: [
                        { email: data.currentuserid },
                        // { userid: data.currentuserid }
                    ]
                },
                attributes: {
                    exclude: ['CompanyId', 'deletedAt']
                },
                include: [
                    {
                        model: School,
                        attributes: {
                            exclude: ['CompanyId', 'deletedAt']
                        }
                    }
                ]
            })

        }

        // TODO: use if we now want to use session cookies web
        if ((!req.session!.jwt) && !req.params.currentuserid) {
         return next()
        }
        if (req.session?.jwt) {
         result = jwt.verify(req.session!.jwt, process.env.JWT_KEY!.split('-').join('')) as UserPayload
        }

        // const bearerToken = req.headers['authorization']

        // if(typeof bearerToken !== 'undefined' && bearerToken){
        //     const token = bearerToken.split(' ')[1]
        //     if(token){
        //         result = jwt.verify(token, process.env.JWT_KEY!.split('-').join('')) as UserPayload
        //     }
        // }
        
        req.currentUser = result
        
    } catch (err) {
        console.log(err)
        req.currentUser = null
    }

    next()
}