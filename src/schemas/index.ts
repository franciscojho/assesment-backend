import { checkSchema } from 'express-validator'
import { validateEmailIsUnique, validateEmailExists, verifyPassword } from './../utils'

export const RegisterSchema = checkSchema({
    email: {
        in: 'body',
        isEmail: {
            errorMessage: 'Invalid email',
        },
        custom: {
            options: validateEmailIsUnique,
        },
    },
    password: {
        in: 'body',
        matches: {
            options: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            errorMessage:
                'The password must contain at least 8 characters, at least one letter and one number',
            bail: true,
        },
    },
})

export const LoginSchema = checkSchema({
    email: {
        in: 'body',
        isEmail: {
            errorMessage: 'Invalid email',
        },
        custom: {
            options: validateEmailExists,
        },
    },
    password: {
        in: 'body',
        matches: {
            options: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            errorMessage: 'Invalid password',
            bail: true,
        },
        custom: {
            options: verifyPassword,
        },
    },
})
