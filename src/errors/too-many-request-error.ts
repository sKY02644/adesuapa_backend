import { ErrorCodes } from '../utils/enums'
import { CustomRequestError } from './base-errors/request-error'

export class TooManyRequestError extends CustomRequestError {

    statusCode: number = ErrorCodes.TOO_MANY_REQUEST

    constructor(public retrySec: string) {
        super('Too Many Requests')

        Object.setPrototypeOf(this, TooManyRequestError.prototype)
    }

    serializeErrors() {
        return [
            { message: `Too Many Requests. Try again later` }
        ]
    }
}