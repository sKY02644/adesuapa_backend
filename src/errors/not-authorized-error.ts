import { ErrorCodes } from '../utils/enums'
import { CustomRequestError } from './base-errors/request-error'

export class NotAuthorizedError extends CustomRequestError {

    statusCode = ErrorCodes.UNAUTHORIZED

    constructor() {
        super('Not authorized')

        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }

    serializeErrors() {
        return [{ message: "Not authorized" }]
    }
}