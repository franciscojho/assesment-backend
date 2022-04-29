/* eslint-disable no-console */

import express from 'express'
import cors from 'cors'
import { authRouter } from './routes/auth.route'
import { errorHandler } from './middlewares/errorHandler'

export const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth/local', authRouter)

app.use(errorHandler)
