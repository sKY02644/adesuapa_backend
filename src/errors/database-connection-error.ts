import { ErrorCodes } from '../utils/enums'
import { CustomRequestError } from './base-errors/request-error'

export class DatabaseConnectionError extends CustomRequestError {

    statusCode: number = ErrorCodes.INTERNALE_SERVER_ERROR

    reason: string = 'Error connecting to database'

    constructor() {
        super('Error connecting to database')

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ]
    }
}