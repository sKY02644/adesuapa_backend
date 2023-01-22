import { body } from 'express-validator'

export const addUserValidator = [
    body('employee_id')
        .notEmpty().bail()
        .withMessage('Employee ID can not be empty')
        .isUUID(4).trim().escape().bail()
        .withMessage('Incorrect Employee ID format'),
    body('company_id')
        .notEmpty().bail()
        .withMessage('Company ID can not be empty')
        .isUUID(4).trim().escape().bail()
        .withMessage('Incorrect Company ID format'),
    body('branch_id')
        .if(body('branch_id').exists())
        .notEmpty().bail().withMessage('Provided branch ID can not be empty')
        .isUUID(4).trim().escape().withMessage('Incoreect branch id format'),
    body('password')
        .notEmpty().bail()
        .withMessage('Password field can not be empty')
        .isLength({ min: 4, max: 50 })
        .withMessage('Password must be between 4 and 50'),
    body('role')
        .notEmpty().bail()
        .withMessage('Role ID can not be empty')
        .trim().escape().bail()
        .withMessage('Incorrect Role ID provided '),
    body('password_tries')
        .if(body('password_tries').exists())
        .notEmpty().bail()
        .withMessage('Password tries can not be empty')
        .isInt().bail()
        .withMessage('Incorrect format provided. expected numeric type'),
    body('status')
        .if(body('status').exists())
        .notEmpty().bail()
        .withMessage('Can not be empty')
        .trim().isInt()
        .withMessage('Status provided must be a numeric type'),
    body('ip_address')
        .if(body('ip_address').exists())
        .notEmpty().bail()
        .withMessage('Can not be empty')
        .trim().escape().isIP()
        .withMessage('IP address provided must be of type IP address')
]