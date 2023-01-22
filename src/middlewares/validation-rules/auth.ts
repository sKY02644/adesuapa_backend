import { body } from 'express-validator';

export const authValidator = [
    body('userid')
        .notEmpty().trim().withMessage("User id can not be empty"),
    body('password')
        .notEmpty().trim().withMessage('Password can not be empty')
]