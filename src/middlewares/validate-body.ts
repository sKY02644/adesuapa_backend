import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '../errors/bad-request-error'

export type Schema = {
    fields: { [key: string]: string }
    required?: string[],
    optional?: string[]
}
/**
 *  check if any key provided in the request is undefined
 * @param obj 
 * @param required string[]
 * @returns boolean true|false
 */
const required = (obj: any, required: string[]) => {

    // check if we are doing a bulk insert or a single insert 
    // if bulk insert object must contain a key employees
    if (!obj.multiadd) {
        for (const requiredKey of required) {
            if (obj[requiredKey] === undefined) return {status: false, element: requiredKey}
        }
    } else {
        for (const requiredKey of required) {
            obj.multiadd.forEach((element: any) => {
                if (element[requiredKey] === undefined) return {status: false, element: requiredKey}
            });
        }
    }
    return  {status: true, element: ''}
}

/**
 * 
 * @param obj 
 * @param model 
 * @throws if any other check fails
 */
const check = (obj: any, model: Schema) => {
    for (const key of Object.keys(obj)) {
        if (model.fields[key] === undefined && !model.optional?.includes(key)) throw new BadRequestError(`Invalid params passed ${key}`)
        else if ((typeof obj[key] !== model.fields[key]) && !model.optional?.includes(key)) throw new BadRequestError(`Params type do not match ${key}`)
    }
}

/**
 * 
 * @param model 
 * @throws BadRequestError('message')
 * @returns next() if every check passes
 */
export const validateReqBody = (model: Schema) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        // get the length of req.body and req.params
        const paramsLength = Object.keys(req.params).length
        const bodyLength = Object.keys(req.body).length
        // get the request METHOD
        const method = req.method

        /**
         * if params and body contains values we merge them else return either req.param | req.body
         */
        const obj = paramsLength > 0 && bodyLength > 0
            ? { ...req.params, ...req.body }
            : bodyLength > 0 ? req.body : req.params

        // if its a post request we validate the required fields
        if (method === 'POST') {
            if (model.required) {
                const {status, element} = required(obj, model.required)
                if (!status) throw new BadRequestError(`Required fields can not be undefined ${element}`)
            }
        }

        // check all other fields if key is not part of the optional fields throw BadRequestError
        if (!obj.multiadd) {
            check(obj, model)
        } else {
            obj.multiadd.forEach((element: any) => {
                check(element, model)
            });
        }

        // proceed to next middleware
        next()
    }
}