import { ValidationError } from 'express-validator'
import { ErrorCodes } from '../utils/enums';
import { CustomRequestError } from './base-errors/request-error';

export class RequestValidationError extends CustomRequestError {

    statusCode = ErrorCodes.NOT_FOUND

    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters')
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param }
        })
    }
}