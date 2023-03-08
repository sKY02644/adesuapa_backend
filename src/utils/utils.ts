import * as fs from 'fs'
import * as path from 'path'
import AES256 from '@vsky/aes256'
import axios from 'axios'
import redisClient from '../services/redis-connection'
import { addJobs } from '../services/jobs'
import { QUENAMES } from '../services/jobs/types'
import db from "../models"
import { subDbs } from "../models/institutions_db"
import { Op } from 'sequelize'
import { MInstitution, User, SubscriptionHistory, MSetting } from '../models/index.models'
import AccessControl from '@vsky/accesscontrol'

export type WelcomeBody = { 
    thank_you_message?: string; welcome_message?: string; 
    product?: string; address?: string; contact?: string; 
    user_name?: string; lower_message?: string; 
    email?: string; company_name?: string 
}

export type ConfirmationBody =  { 
    institution_name?: string; email?: string; 
    message?: string; user_uid?: string; 
    password?: string; confirmation_url?: string; 
    user_name?: string; default_password?: string;
    tr?: string;
}

type StatusResponseType =  { response: boolean, message: string } | Promise<{
    response: boolean | null;
    message: string;
    data?: any;
}>;

interface FileData {
    data: string;
    error?: Error;
}

type ResetDataType = { password?: string; userid: string; reset_code: string }

export interface StatusFunctions {
    active(id: User, userTypeData: {[key: string]: any} ): StatusResponseType;
    pending(id: User, userTypeData: {[key: string]: any} ): StatusResponseType;
    blocked(id: User, userTypeData: {[key: string]: any} ): StatusResponseType;
    expired(id: User, userTypeData: {[key: string]: any} ): StatusResponseType;
}

export interface ResetFunctions {
    initial(data: ResetDataType): StatusResponseType;
    confirmation(data: ResetDataType): StatusResponseType;
    update(data: ResetDataType): StatusResponseType;
}

export interface Permission {
    role: string;
    action: string;
    resource: string;
}

export class Utils {

    static readonly regex = /\[\[([^\[\]]*)]\]/g

    static isValidEmail(val: string) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
        return emailPattern.test(val) || false
    }

    static modifyObj(obj: { [s: string]: unknown; } | ArrayLike<unknown>, allowedKeys: string | string[]){
        return Object.entries(obj).filter(([key]) => allowedKeys.includes(key)).reduce((acc: any, [key, value]) => {
            acc[key] = value
            return acc
        }, {})
    }

    static modifyData(data: any[], allowedSubscriptionKeys: Iterable<unknown> | null | undefined, allowedInstitutionKeys: Iterable<unknown> | null | undefined) {

        const allowedSubscriptionSet = new Set(allowedSubscriptionKeys)
        const allowedInstitutionSet = new Set(allowedInstitutionKeys)
        
        return data.map((item: { [x: string]: any; institution?: any; }) => {

            const rawData = item.dataValues 
            const subscription: { [x: string]: any; } = {}

            for (const key of Object.keys(rawData)) {
                if (allowedSubscriptionSet.has(key)) {
                    subscription[key] = rawData[key]
                }
            }
        
            let institution: { [x: string]: any; } = {}
            if (rawData.institution) {
                institution = {}
                for (const key of Object.keys(rawData.institution.dataValues)) {
                    if (allowedInstitutionSet.has(key)) {
                        institution[key] = rawData.institution.dataValues[key]
                    }
                }
            }
        
            return { ...subscription, institution }
        })
    }

    static buildWelcomeMessageBody(companyDetails: WelcomeBody) {
        return { 
            thank_you_message: companyDetails.thank_you_message,
            welcome_message: companyDetails.welcome_message,
            contact: `${companyDetails.product} <br /> ${companyDetails.company_name} <br /> ${companyDetails.address} <br /> Tel: ${companyDetails.contact} `, 
            user_name: companyDetails.user_name, lower_message: companyDetails.lower_message, email: companyDetails.email
        }
    }

    static buildConfirmationMessageBody(details: ConfirmationBody){
        return { 
            institution_name: details.institution_name || "", 
            email: details.email || "", message: details.message || "", 
            user_uid: details.user_uid, default_password: details.password || "", 
            confirmation_url: details.confirmation_url || "", user_name: details.user_name || ""
        }
    }

    static async generateSchoolsInitials(Model:any, str: string) {
        // Split the string into an array of words
        const words = str.split(' ');
    
        // Initialize an empty result string
        let result = '';
    
        // Iterate over the array of words
        for (const word of words) {
            // Get the first letter of the word and add it to the result string
            result += word[0];
        }
    
        // Return the result string
        // return result.toUpperCase();
        return await Utils.generateInits(Model, result.toUpperCase())
    }

    static async getSettings(Model: { findAndCountAll: (arg0: any) => any; }, conditions?: any){

        const payload: { company_settings: { [x: string]: any } } = {
            company_settings: {}
        }

        const options = conditions ? { ...conditions } : undefined
 
         /* Fetching the company settings from the database. */
         const settings = await Model.findAndCountAll(options)
 
         const totalSettings = settings.count
 
         /* Initializing the company_settings object with the company settings. */
         payload.company_settings = {}
 
         // if branch settings exist, use them else use company's settings
         if(settings && totalSettings > 0){
             // put each setting in the company settings object {key: value}
             for(let i = 0; i < totalSettings; i++){
                 payload.company_settings[settings.rows[i].key] = settings.rows[i].value
             }
         }
 
         return {...payload};
    }

    static generatePassword(schoolName: string, adminName: string, adminEmail: string, adminPhone: string) {
        // Check that all input arguments are defined and not empty
        if (!schoolName || !adminName || !adminEmail || !adminPhone) {
            throw new Error('Missing required input argument(s)');
        }
    
        // Concatenate the input strings to create a base for the password
        const base = (schoolName + adminName + adminEmail + adminPhone).replace(/\s/g, '');
    
        // Create a list of special characters to use in the password
        const specialCharacters = '!@#$%^&*()+-./:;<=>?@[]{}~|`,';
    
        // Generate a random number between 9 and 12 to determine the length of the password
        const passwordLength = Math.floor(Math.random() * (12 - 9 + 1)) + 9;
    
        // Initialize the password to a random character from the base string
        let password = base[Math.floor(Math.random() * base.length)];
    
        // Generate a random number between 0 and the length of the base string
        // Use this number to select a character from the base string and add it to the password
        for (let i = 0; i < passwordLength - 3; i++) {
            const index = Math.floor(Math.random() * base.length);
            password += base[index];
        }
    
        // Add a random special character to the end of the password
        const specialCharIndex = Math.floor(Math.random() * specialCharacters.length);
        password += specialCharacters[specialCharIndex];
    
        // Add a random capital letter to the end of the password
        const capitalCharIndex = Math.floor(Math.random() * base.length);
        password += base[capitalCharIndex].toUpperCase();
    
        // Add another random special character to the end of the password
        const specialCharIndex2 = Math.floor(Math.random() * specialCharacters.length);
        password += specialCharacters[specialCharIndex2];
    
        // Shuffle the password to add an additional layer of randomness
        const passwordArray = password.split('');
    
        for (let i = passwordArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
        }
        password = passwordArray.join('');
    
        return password;
    }

    static async generateInits(Model: any, initials: string) {
        let found = false
        let totalCompletedInvoice = await Model.count({ where: { initials: { [Op.startsWith]: initials } }})
        let actual_no = totalCompletedInvoice > 0 ? `${initials}${totalCompletedInvoice+1}` : initials
        do {
            found = await Model.findOne({ where: { initials: actual_no }, attributes: ['initials']})
            totalCompletedInvoice++
            actual_no = found ? `${initials}${totalCompletedInvoice ? totalCompletedInvoice : ''}` : actual_no
        } while (found){
            return actual_no
        };
    }

    static replacePlaceholders(regex: any, format: string, values: { [x: string]: any; }) {
    // Replace the placeholders with the dynamic values
        return format.replace(regex, (match: any, placeholder: string | number) => values[placeholder] || '');
    }
    
    static changeFormatPosition(regex: any, format: string, newPositions: { [x: string]: any; }, options: { includeHyphen: boolean } = {
        includeHyphen: false
    }) {  
        // Replace the placeholders with their new positions
        return format.replace(regex, (match: any, placeholder: string | number) => {
            const newPosition = newPositions[placeholder];
            if (newPosition) {
            return `[[${newPosition}]]`;
            }
            return match;
        }).replace(/-/g, options.includeHyphen ? '-' : '');
    }

    static modifyObjectValues(obj: { [x: string]: any; }, newValues: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) {
        for (const key in newValues) {
            if (newValues.hasOwnProperty(key)) {
                obj[key] = newValues[key];
            }
        }
    }

    static addKeyValuePair(obj: { [x: string]: any; }, key: string | number, value: any) {
        obj[key] = value;
    }
    
    static removeKeyValuePair(obj: { [x: string]: any; }, key: string | number) {
        delete obj[key];
    }
        
    static async generateUsersId ( Model: any, newValues: any, condition?: any, countSchoolInitials?: number, attributes?: [] ): Promise<string> {
        let userId, actual_no: string
        let found
        let total = countSchoolInitials === 0 ? countSchoolInitials : await Model.count()
        const idFormat = newValues.format
        Utils.removeKeyValuePair(newValues, 'format')
        const values = { }
        do {
            total++
            actual_no = ((total).toString()).padStart(4, '0');
            Utils.modifyObjectValues(values, { ...newValues, total: actual_no })
            userId = Utils.replacePlaceholders(Utils.regex, idFormat, values)
            found = await Model.findOne( condition ? { ...condition } : { where: { user_id: userId }, attributes: attributes ? [...attributes] : [ 'user_id' ]})
        } while (found){
            return userId
        };
    }

    static async getInstitutionType (id: string, type?: string) {
        const idLength = id.length
        const subCategory = id.trim().toUpperCase().split('')[idLength-1]
        const where = type && type === 'register' ? { id: id } : { sub_category: subCategory } 
        return await MInstitution.findOne({ where, attributes: ['category']})
    }

    static async isFolderEmpty(folderPath: string) {
        try {
            const files = await fs.promises.readdir(folderPath);
            return files.length === 0;
        } catch (error: any) {
            if (error.code === "ENOENT") {
                // folder doesn't exist
                return true;
            } else {
                // other error
                return false;
            }
        }
    }

    static calculateAmount (subscriptionAmount: number, activeCurrencyValue: number, rate: { value: number, is_active: boolean }){
        return rate.is_active ? (( subscriptionAmount * rate.value ) * activeCurrencyValue).toFixed(2) : ( subscriptionAmount * activeCurrencyValue).toFixed(2)
    }

    static getDateFromDuration(duration?: string, date = new Date()) {
        const parts = duration?.match(/(\d+)\s*(\w+)/);
        if (!parts || parts.length < 3) {
          throw new Error("Invalid duration");
        }
      
        const value = parseInt(parts[1]);
        const unit = parts[2];
        let result = new Date(date);
      
        switch (unit.toLowerCase()) {
          case "month":
          case "months":
            result.setMonth(result.getMonth() + value);
            break;
          case "year":
          case "years":
            result.setFullYear(result.getFullYear() + value);
            break;
          default:
            throw new Error("Invalid duration");
        }
      
        return result;
    }

    static async readFileData(dirName: string, fileName: string): Promise<FileData> {
        if (!dirName || !fileName) {
          return {
            data: '',
            error: new Error('Both directory name and file name must be provided')
          };
        }
        const filePath = path.resolve('src', dirName, fileName);      
        try {
          const data = await fs.promises.readFile(filePath, 'utf-8');
          return { data };
        } catch (error: any) {
          return {
            data: '',
            error
          };
        }
    }

    private static checkExpiry(value: Date){
        if (!value) return false
        const currentDateTime = new Date()
        const endDateTime = new Date(value)
        if (isNaN(endDateTime.getTime())) return false
        return endDateTime < currentDateTime
    }

    static generateRandomCodesPromise(characters: string, numberOfCodes: number, codeSize: number, includeHyphens: boolean, chunkSize: number): Promise<string> {
        return new Promise((resolve, reject) => {
          let codes = '';
          let hyphen = includeHyphens ? '-' : '';
          let chunkStart = 0;
          let generatedCodes = new Set();
        
          function generateChunk() {
            for (let i = chunkStart; i < chunkStart + chunkSize && i < numberOfCodes; i++) {
              let code = '';
              for (let j = 0; j < codeSize; j++) {
                code += characters.charAt(Math.floor(Math.random() * characters.length));
              }
              if (!generatedCodes.has(code)) {
                generatedCodes.add(code);
                codes += code + (i === numberOfCodes - 1 ? '' : hyphen);
              } else {
                i--;
              }
            }
            chunkStart += chunkSize;
            if (chunkStart < numberOfCodes && generatedCodes.size < numberOfCodes) {
              setTimeout(generateChunk, 0);
            } else {
              resolve(codes);
            }
          }
          generateChunk();
        });
      }

    static messagesRequired(n: number) {
        return (n + 159) / 160 | 0;
    }

    static limitString(str: string, limit: number): string {
        if (str.length <= limit) {
            return str;
        }
        return str.slice(0, limit);
    }

    static capitalizeEachFirstLetter (str: string) {
        if (typeof str !== 'string') return ''
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }

    static runStatus (): StatusFunctions {
        return {
            'active': (user, userTypeData) => {
                // TODO: COMPLETE THE LOGIN PROCESS
                return  { response: true, message: '' }
            },
            'pending': (user, userTypeData) => {
                const userType = user.user_type.toUpperCase()
                const res = userTypeData[userType]['is_cleared']
                const resMessage = userTypeData[userType]['school_pending_message']
                return  { response: res, message: resMessage }
            },
            'blocked': (user, userTypeData) => {
                const userType = user.user_type.toUpperCase()
                const res = userTypeData[userType]['is_cleared']
                const resMessage = userTypeData[userType]['school_blocked_message']
                return  { response: res, message: resMessage }
            },
            'expired': async (user, userTypeData) => {

                const result = await Utils.getInstitutionType(user.user_id)

                const userType = user.user_type.toUpperCase()
                const role_permission =  user.role_permission
                const ac = new AccessControl(role_permission)

                // TODO: CHANGE TO ELSE VALUE TO USE THE UNIVERSITY MODEL WHEN ITS DONE
                const Model = result?.category.toLowerCase() === 'jhs_shs' ? SubscriptionHistory : SubscriptionHistory

                const endDateTime = await Model.findOne( { where: { schools_id: user.schools_id, active: 1 } })

                if(!endDateTime){
                    return  { response: true, message: 'no active account found' }
                }

                const isExpired = Utils.checkExpiry(endDateTime.end_date)

                if(!isExpired){
                    return  { response: false, message: 'not expired' }
                }

                // check the user type
                const response = userTypeData[userType]['is_cleared']
                const resMessage = userTypeData[userType]['school_subscription_expired_message']

                if(!response){
                    return { response: true, message: resMessage, data: null }
                }

                const userRole =  userTypeData[userType]['type']
                
                const isAllowed = ac.canPerformAction(userRole, 'schoolaccountsubscriptions', 'update')

                // check if useer has permission to update the resourse "school_account_subscriptions"
                if(!isAllowed){
                    return { response: true, message: resMessage, data: '' }
                }

                return { response: true,  message: resMessage, data: user }

            },
        }
    }

}
