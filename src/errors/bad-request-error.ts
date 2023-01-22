import { ErrorCodes } from '../utils/enums';
import { CustomRequestError } from './base-errors/request-error';

export class BadRequestError extends CustomRequestError {

    statusCode = ErrorCodes.BAD_REQUEST

    constructor(public message: string) {
        super(message)
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    serializeErrors() {
        return [{ message: this.message }]
    }

}