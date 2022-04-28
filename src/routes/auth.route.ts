import { Router } from 'express'
import { login, register } from '../controllers/auth.controller'
import { validateResult } from './../middlewares/validateResult'
import { LoginSchema, RegisterSchema } from './../schemas'

export const authRouter = Router()

authRouter.post('/login', LoginSchema, validateResult, login)
authRouter.post('/register', RegisterSchema, validateResult, register)
