import { ErrorCodes } from '../utils/enums';
import { CustomRequestError } from './base-errors/request-error';

export class NotFoundError extends CustomRequestError {

    statusCode = ErrorCodes.NOT_FOUND

    constructor() {
        super('Route not found')
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors() {
        return [{ message: 'Not Found' }]
    }
}