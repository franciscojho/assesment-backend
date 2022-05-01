import { Router } from 'express'
import { login, register } from '../controllers'
import { validateResult } from './../middlewares'
import { LoginSchema, RegisterSchema } from '../schemas'

export const authRouter = Router()

authRouter.post('/login', LoginSchema, validateResult, login)
authRouter.post('/register', RegisterSchema, validateResult, register)
