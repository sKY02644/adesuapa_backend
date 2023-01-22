import { Request, Response, NextFunction } from 'express'
import { body } from 'express-validator'

export const addEmplyeeValidatorRule = [
    body('fullname')
        .notEmpty().withMessage('Fullname can not be empty').bail()
        .trim().escape().withMessage('Incorrect fullname format provided').bail(),
    body('company_id')
        .if(body('company_id').exists())
        .notEmpty().withMessage('Company ID can not be empty').bail()
        .isUUID(4).trim().escape().withMessage('Incorrect company id format').bail(),
    body('branch_id')
        .if(body('branch_id').exists())
        .notEmpty().withMessage('Provided branch ID can not be empty').bail()
        .isUUID(4).trim().escape().withMessage('Incoreect branch id format').bail(),
    body('address')
        .if(body('address').exists())
        .notEmpty().bail()
        .withMessage('adrress must be an array').bail(),
    body('email')
        .if(body('email').exists())
        .notEmpty().isEmail()
        .withMessage('Email must be valid').bail(),
    body('phonenumber')
        .if(body('phonenumber').exists())
        .notEmpty().withMessage('Phonenumber can not be empty').bail()
        .trim().escape().withMessage('Incorrect phonenumber format provided').bail(),
    body('userid')
        .if(body('userid').exists())
        .notEmpty().withMessage('User ID can not be empty').bail()
        .trim().escape().withMessage('Incorrect user ID format provided').bail(),
    body('is_same_bank')
        .if(body('is_same_bank').exists())
        .notEmpty().withMessage('Bank Check not be empty').bail()
        .trim().escape().isBoolean().withMessage('Incorrect bank check format provided').bail(),
    body('bank_branch')
        .if(body('bank_branch').exists())
        .notEmpty().withMessage('Bank Branch can not be empty').bail()
        .trim().escape().withMessage('Incorrect Bank Branch format provided').bail(),
    body('account_number')
        .if(body('account_number').exists())
        .notEmpty().withMessage('Account Number can not be empty').bail()
        .trim().escape().withMessage('Incorrect Account Number format provided').bail(),
    body('account_currency')
        .if(body('account_currency').exists())
        .notEmpty().withMessage('Account Currency can not be empty').bail()
        .trim().escape().withMessage('Incorrect Account Currency format provided').bail(),
    body('account_type')
        .if(body('account_type').exists())
        .notEmpty().withMessage('Account Type can not be empty').bail()
        .trim().escape().withMessage('Incorrect Account Type format provided').bail(),
    body('bank_name')
        .if(body('bank_name').exists())
        .notEmpty().withMessage('Bank Name can not be empty').bail()
        .trim().escape().withMessage('Incorrect Bank Name format provided').bail(),
    body('bank_address_line')
        .if(body('bank_address_line').exists())
        .notEmpty().withMessage('Bank Address can not be empty').bail()
        .trim().escape().withMessage('Incorrect Bank Address format provided').bail(),
    body('bank_city')
        .if(body('bank_city').exists())
        .notEmpty().withMessage('Bank City can not be empty').bail()
        .trim().escape().withMessage('Incorrect Bank City format provided').bail(),
    body('bank_state')
        .if(body('bank_state').exists())
        .notEmpty().withMessage('Bank State can not be empty').bail()
        .trim().escape().withMessage('Incorrect Bank State format provided').bail(),
    body('bank_country')
        .if(body('bank_country').exists())
        .notEmpty().withMessage('Bank Country can not be empty').bail()
        .trim().escape().withMessage('Incorrect Bank Country format provided').bail(),
    body('password')
        .if(body('password').exists())
        .not().isEmpty()
        .trim().escape()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20')
]