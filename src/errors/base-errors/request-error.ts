import { ErrorCodes } from '../../utils/enums'

export abstract class CustomRequestError extends Error {

    abstract statusCode: ErrorCodes

    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, CustomRequestError.prototype)
    }

    abstract serializeErrors(): { message: string, field?: string }[]
}