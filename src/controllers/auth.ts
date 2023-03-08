import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import AccessControl from '@vsky/accesscontrol'
import { BadRequestError } from '../errors/bad-request-error'
import { Op } from 'sequelize'

import { ErrorCodes, Status } from '../utils/enums'
import { Utils, StatusFunctions, ResetFunctions } from '../utils/utils'

import { User, School, MInstitution, MResource, SubscriptionHistory, MSetting } from '../models/index.models'
import AuthService from '../services/auth-services'

export class AuthController {

    static async resetPassword(req: Request, res: Response){
        const { stage } = req.params
        const { password, userid, reset_code } = req.body

        try {

            const data = { password, userid, reset_code }
            
            console.log(data)
            
            const step = stage as keyof ResetFunctions
            
            const response = await AuthService.resetPassword()[step](data)
    
            res.status(ErrorCodes.OK).json({ response })

        } catch(error: any) {
            throw new BadRequestError(error.message)
        }

    }

    static async lookup(req: Request, res: Response) {

        const { id, type, institutionid } = req.params

        if (id) {

            try {

                const ipAddr = req.ip

                const institutionID = type && type === 'register' ? institutionid : id
                
                const result = await Utils.getInstitutionType(institutionID, type)

                if(!result){
                    return res.status(ErrorCodes.BAD_REQUEST).json({ status: false, message: 'Invalid ID', data: null })
                }
                
                // TODO: CHANGE TO ELSE VALUE TO USE THE UNIVERSITY MODEL WHEN ITS DONE
                const Model = result?.category.toLowerCase() === 'jhs_shs' ? User : User

                const user = await Model.findOne({
                    where: {
                        [Op.or]: {
                            email: id,
                            id: id,
                            user_id: id
                        }
                    },
                    include: [
                        {
                            model: School,
                            as: 'school',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            }
                        }
                    ],
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                })

                if(type && type.toLowerCase() === 'register'){
                    return res.status(ErrorCodes.OK).send({ status: !!user, message: '', data: null })
                }

                if(!user){
                    return res.status(ErrorCodes.BAD_REQUEST).json({ status: false, message: 'Invalid User ID', data: null })
                }

                const settings = await MSetting.findAll({ where: { key: { [Op.or]: ['user_type', 'company_details'] } } })

                const userTypeData = settings?.filter(v => v.key === 'user_type')[0]['value'] as {[key: string]: any}

                const schooStatus = user.school.status as keyof StatusFunctions

                if(schooStatus !== Status.ACTIVE){
                    const resultStatus = await Utils.runStatus()[schooStatus](user, userTypeData)
                    return res.status(ErrorCodes.BAD_REQUEST).json({ status: false, message: resultStatus.message, data: null  })
                }

                // school acount is active so we can go ahead and check if it has expired or not
                const expiredStatus: keyof StatusFunctions = Status.EXPIRED

                // check if the school account has expired
                const isExpired = await Utils.runStatus()[expiredStatus](user, userTypeData)

                if(isExpired.response){
                    return res.status(ErrorCodes.BAD_REQUEST).json({ status: false, mmessage: isExpired.message, data: null })
                }

                if(schooStatus === Status.ACTIVE && !isExpired.response ){
                    return res.status(ErrorCodes.OK).json({ status: true, message: '', data: user })
                }

            } catch (error: any) {
                  console.log(error)
                throw new BadRequestError(error.message)
            }

        } else {
            throw new BadRequestError('User details can not be empty')
        }

    }

    // /**
    //  * Login static function
    //  * @param req 
    //  * @param res 
    //  * @returns status code of 200 and the existing users data
    //  */
    static async login(req: Request, res: Response) {

        const { password, userid } = req.body
        const ipAddr = req.ip

        try {

            if(!userid || !password){
                throw new BadRequestError('Invalid username or password')
            }

            const result = await Utils.getInstitutionType(userid)
            
            // TODO: CHANGE TO ELSE VALUE TO USE THE UNIVERSITY MODEL WHEN ITS DONE
            const Model = result?.category.toLocaleLowerCase() === 'jhs_shs' ? User : User
            
            const user = await Model.findOne({ where: { user_id: userid.toUpperCase() }, attributes: {
                exclude: ['createdAt', 'updatedAt']
            }})

            if(!user){
                throw new BadRequestError('Invalid username or password')
            }

            const settings = await MSetting.findAll({ where: { key: { [Op.or]: ['user_type', 'company_details'] } } })

            const userTypeData = settings?.filter(v => v.key === 'user_type')[0]['value'] as {[key: string]: any}

            const expiredStatus: keyof StatusFunctions = Status.EXPIRED

            const isExpired = await Utils.runStatus()[expiredStatus](user, userTypeData)

            if(isExpired.response){
                return res.status(ErrorCodes.BAD_REQUEST).json({ status: false, mmessage: isExpired.message, data: null })
            }
            
            const verified = await user.validPassword(password) || false
                
            if (!verified) {
                return res.status(ErrorCodes.UNAUTHORIZED).send({ response: false, data: null })
            }

            const resources = await MResource.findOne({ where: { institution_id: user.institutions_id }, attributes: {
                exclude: ['createdAt', 'updatedAt']
            }})

            const userJwt = jwt.sign({ ...user }, process.env.JWT_KEY!.split('-').join(''), { expiresIn: '20h' })

            req.session = { jwt: userJwt }

            res.status(ErrorCodes.OK).send({ response: true, data: user, resources })

        }catch(error: any){
            throw new BadRequestError(error.message)
        }

    }

    // /**
    //  * Logout static function
    //  * @param req 
    //  * @param res 
    //  * @returns an empty object and status code of 200
    //  */
    static async logout(req: Request, res: Response) {
        const { company_id, branch_id, username, id } = req.currentUser! || {}

        try {
            
            // await ActivityLogs.create({
            //     action_type: 'Authentication',
            //     ip: req.ip,
            //     description: `${username.toUpperCase()} - logged out on ${new Date().toUTCString()}`,
            //     company_id: company_id,
            //     branch_id: branch_id,
            //     user_id: id
            // })
    
            req.currentUser = null
            req.session = null
            res.send({})

        } catch(error: any){
            throw new BadRequestError(error.message)
        }
    }

}
