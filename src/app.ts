/* eslint-disable no-console */

import express from 'express'
import cors from 'cors'
import { authRouter, favRouter } from './routes'
import { errorHandler } from './middlewares/errorHandler'

export const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth/local', authRouter)
app.use('/api/favs', favRouter)

app.use(errorHandler)
