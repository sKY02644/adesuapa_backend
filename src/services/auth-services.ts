import AES256 from '@vsky/aes256'
import { addJobs } from '../services/jobs'
import { QUENAMES } from '../services/jobs/types'
import { subDbs } from "../models/institutions_db"

import redisClient from '../services/redis-connection'

import { Utils, ResetFunctions } from '../utils/utils'
import { MInstitution, User, SubscriptionHistory, MSetting } from '../models/index.models'

class AuthService {

    login () {
        
    }

    resetPassword (): ResetFunctions  {
            return {
                'initial': async (data) => {

                    const institutionType = await Utils.getInstitutionType(data.userid)

                    if(!institutionType){
                        return { response: false, data: 'initailStage', message: 'User id not found' }
                    }

                    // TODO: CHANGE TO ELSE VALUE TO USE THE UNIVERSITY MODEL WHEN ITS DONE
                    const Model = institutionType.category.toLowerCase() === 'jhs_shs' ? User : User

                    const user = await Model.findOne({ where: { user_id: data.userid } })

                    if(!user){
                        return { response: false, data: 'initailStage', message: 'User id not found' }
                    }

                    const settings = await Utils.getSettings(MSetting)

                    const ramdomCodeConfigs = settings.company_settings.random_code_configs

                    const codeConfigs = ramdomCodeConfigs.reset_password_code_configs

                    const numberOfCodes = codeConfigs.number_of_codes;
                    const includeHyphens = codeConfigs.include_hyphens;
                    const codeSize = codeConfigs.code_size;
                    const chunkSize = codeConfigs.code_size
                    const characters = ramdomCodeConfigs.characters

                    const originalCode = await Utils.generateRandomCodesPromise(characters, numberOfCodes, codeSize, includeHyphens, chunkSize)                

                    const aes256 = new AES256(settings.company_settings.aes256.secret)

                    const encryptedCode =  aes256.encrypt(originalCode)

                    await redisClient.setex(`${data.userid}_password_reset`, codeConfigs.redis_expiration, encryptedCode)

                    const event = { settings, user, originalCode, institutionType, type: 'initial' }

                    await addJobs(event, QUENAMES.PASSWORDRESETCODE)

                    return  { response: true, message: 'Success', data: 'confirmationStage' }
                },
                'confirmation': async (data) => {

                    const institutionType = await Utils.getInstitutionType(data.userid)

                    if(!institutionType){
                        return { response: false, data: 'initailStage', message: 'User id not found' }
                    }

                    // TODO: CHANGE TO ELSE VALUE TO USE THE UNIVERSITY MODEL WHEN ITS DONE
                    const Model = institutionType.category.toLowerCase() === 'jhs_shs' ? User : User

                    const user = await Model.findOne({ where: { user_id: data.userid } })

                    if(!user){
                        return { response: false, data: 'initailStage', message: 'User id not found' }
                    }

                    // get the code from the redis and check if its expired or not
                    const confirmationCode = await redisClient.get(`${data.userid}_password_reset`)

                    if(!confirmationCode){
                        return  { response: false, data: 'resendStage', message: 'Code expired or does not exist.' }
                    }

                    const settings = await Utils.getSettings(MSetting)

                    const aes256 = new AES256(settings.company_settings.aes256.secret)

                    const match = aes256.verify(confirmationCode, data.reset_code)

                    console.log(data.reset_code, confirmationCode)

                    if(!match){
                        await redisClient.del(`${data.userid}_password_reset`)
                        return  { response: false, data: 'resendStage', message: 'Code does not match' }
                    }

                    await redisClient.del(`${data.userid}_password_reset`)
                    return  { response: true, data: 'finalStage', message: 'Success' }
                },
                'update': async (data) => {

                    const institutionType = await Utils.getInstitutionType(data.userid)

                    const subTransaction = await subDbs.get(institutionType?.category).transaction()

                    try {

                        if(!institutionType){
                            return { response: false, data: 'initailStage', message: 'System error' }
                        }

                        // TODO: CHANGE TO ELSE VALUE TO USE THE UNIVERSITY MODEL WHEN ITS DONE
                        const UserModel = institutionType.category.toLowerCase() === 'jhs_shs' ? User : User

                        const user = await UserModel.findOne({ where: { user_id: data.userid } })

                        if(!user){
                            return { response: false, data: 'initailStage', message: 'User id not found' }
                        }

                        await UserModel.update(
                            { password: data.password }, 
                            {
                                where: { user_id: data.userid }, 
                                individualHooks: true,
                                transaction: subTransaction
                            },
                        )

                        const settings = await Utils.getSettings(MSetting)

                        const event = { type: 'update', user, settings, institutionType }

                        // we need to send them an email confirming their password update
                        await addJobs(event, QUENAMES.PASSWORDRESETCODE)

                        await subTransaction.commit()

                        return  { response: true, message: 'Success', data: 'loginStage' }

                    } catch (error) {

                        await subTransaction.rollback()

                        return { response: false, data: 'initailStage', message: 'System error' }

                    }
                },
            }
    }

}

export default new AuthService