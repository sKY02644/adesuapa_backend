import { Request, Response, NextFunction } from 'express'
// const logger = require('../../error-logs/logger.ts')
import winston_logger from '../utils/logger'

import { CustomRequestError } from '../errors/base-errors/request-error'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    winston_logger.log({ message: err.message, level: 'error', meta: { stack: err.stack } })

    console.log("WAS CALLED: ", err)

    if (err instanceof CustomRequestError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() })
    }

    res.status(400).send({
        errors: [{ message: 'Something went wrong!!' }]
    });
}