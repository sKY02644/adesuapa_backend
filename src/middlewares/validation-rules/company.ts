import { body, CustomValidator, param } from 'express-validator'

export const addCompanyValidator = [
    body('name')
        .notEmpty().bail()
        .withMessage('Company name can not be empty')
        .trim().escape().bail()
        .withMessage('Incorrect Company name format'),
    body('address')
        .notEmpty().bail()
        .trim().escape().bail()
        .withMessage('Company address can not be empty'),
    body('phonenumber')
        .if(body('phonenumber').exists())
        .notEmpty().bail()
        .withMessage('Company phonenumber can not be empty'),
    body('logo_url')
        .if(body('logo_url').exists())
        .notEmpty().bail()
        .withMessage('Company logo URL can not be empty')

]