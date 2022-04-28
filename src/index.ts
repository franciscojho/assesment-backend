/* eslint-disable no-console */

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { authRouter } from './routes/auth.route'
import { errorHandler } from './middlewares/errorHandler'
import { dbConnection } from './config/database'

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

app.use('/auth/local', authRouter)

app.use(errorHandler)

dbConnection()
    .then((resp) => console.log(resp))
    .catch((err) => console.log(err))

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
