import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { BadRequestError } from '../errors/bad-request-error'
import { Op } from 'sequelize'

import { ErrorCodes } from '../utils/enums'

import { User, MInstitution, School } from '../models/index.models'

export class AuthController {


    static async lookup(req: Request, res: Response) {

        const { userdetails } = req.params

        if (userdetails) {

            try {

                const ipAddr = req.ip

                    const user = await User.findOne({
                        where: {
                            [Op.or]: {
                                email: userdetails,
                                id: userdetails,
                                user_id: userdetails
                            }
                        },
                        include: [
                            {
                                model: School,
                                as: 'school'
                            }
                        ],
                    })

                    res.status(ErrorCodes.OK).send({ response: true, data: user })

            } catch (error: any) {
                //   console.log(error)
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
    // static async login(req: Request, res: Response) {

    //     const { password, userid, username, role } = req.body
    //     const ipAddr = req.ip

    //     try {

    
    //         const existingUser = await User.findOne({
    //             where: {
    //                 id: userid
    //             },
    //             include: [
    //                 {
    //                     model: Company,
    //                     attributes: {
    //                         exclude: ['created_at', 'updated_at']
    //                     },
    //                     include: [
    //                         {
    //                             model: Supplier,
    //                             required: false,
    //                             attributes: {
    //                                 exclude: ['created_at', 'updated_at']
    //                             }
    //                         },
    //                         {
    //                             model: Tax,
    //                             required: false,
    //                             attributes: {
    //                                 exclude: ['created_at', 'updated_at']
    //                             }
    //                         },
    //                         {
    //                             model: CompanySetting,
    //                             required: false,
    //                             attributes: {
    //                                 exclude: ['created_at', 'updated_at']
    //                             }
    //                         },
    //                         {
    //                             model: Permission,
    //                             required: false,
    //                             attributes: {
    //                                 exclude: ['created_at', 'updated_at']
    //                             }
    //                         },
    //                         {
    //                             model: Branch,
    //                             required: false,
    //                             attributes: {
    //                                 exclude: ['created_at', 'updated_at']
    //                             },
    //                             // if user role is not ADMIN or SUPERADMIN get only products belonging to his company->branch
    //                             // where: Utils.isAllowed(role) ? {} : {id: { [Op.eq]: Sequelize.col('User.branch_id') }},
    //                             where: {},
    //                             include: [
    //                                 {
    //                                     model: Product,
    //                                     limit: 10,
    //                                     attributes: {
    //                                         exclude: ['created_at', 'updated_at']
    //                                     }
    //                                 } 
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             attributes: {
    //                 exclude: ['created_at', 'updated_at', 'branch', 'department']
    //             }
    //         })
    
    //         const verified = await existingUser?.validPassword(password) || false

    //         if (verified) {
    
    //             const existingUserJwt = jwt.sign({
    //                 is_retail_shop: (existingUser?.company.company_settings.filter((setting:any) => setting.key == 'is_retail_shop')[0])!['value'],
    //                 id: existingUser!.id,
    //                 employee_id: existingUser!.employee_id,
    //                 role: existingUser!.role,
    //                 company_id: existingUser!.company_id,
    //                 branch_id: existingUser!.branch_id,
    //                 username
    //             }, process.env.JWT_KEY!.split('-').join(''), {
    //                 expiresIn: '20h'
    //             })

    //             req.session = { jwt: existingUserJwt }

    //             const cacheKey = 'company_settings_' + existingUser?.company_id
    //             const companySettings = existingUser?.company.company_settings

    //             await ActivityLogs.create({
    //                 action_type: 'Authentication',
    //                 ip: req.ip,
    //                 description: `${username?.toUpperCase()} - logged in on ${new Date().toUTCString()}`,
    //                 company_id: existingUser!.company_id,
    //                 branch_id: existingUser!.branch_id,
    //                 user_id: existingUser!.id
    //             })

    //             res.status(ErrorCodes.OK).send({ response: true, data: {existingUserJwt,  role:  existingUser!.role}, existingUser })
    //         }

    //     }catch(error: any){
    //         throw new BadRequestError(error.message)
    //     }

    // }

    // /**
    //  * Logout static function
    //  * @param req 
    //  * @param res 
    //  * @returns an empty object and status code of 200
    //  */
    // static async logout(req: Request, res: Response) {
    //     const { company_id, branch_id, username, id } = req.currentUser! || {}

    //     try {
            
    //         await ActivityLogs.create({
    //             action_type: 'Authentication',
    //             ip: req.ip,
    //             description: `${username.toUpperCase()} - logged out on ${new Date().toUTCString()}`,
    //             company_id: company_id,
    //             branch_id: branch_id,
    //             user_id: id
    //         })
    
    //         req.currentUser = null
    //         req.session = null
    //         res.send({})

    //     } catch(error: any){
    //         throw new BadRequestError(error.message)
    //     }
    // }

}
