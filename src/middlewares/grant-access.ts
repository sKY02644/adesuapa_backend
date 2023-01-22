'use strict'

import { NextFunction, Response, Request } from 'express'

const { NotAuthorizedError } = require('../errors/not-authorized-error')
const { ac, grantList } = require('../permissions')

let permission
let getGrants

export const grantAccess = (action: string, resource: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { role, id, is_retail_shop } = req.currentUser!

            console.log(role)

            // check if user has create any employee permission
            permission = ac.can(role)[action](resource)
            ac.setGrants(grantList);
            getGrants = ac.getRoles()

            if (!permission.granted && !is_retail_shop) {
                console.log("HITTING HERE")
                throw new NotAuthorizedError()
            }

            req.permission = permission
            req.grants = getGrants

            next()
            
        } catch (error) {
            next(error)
        }
    }
}