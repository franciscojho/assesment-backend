/* eslint-disable @typescript-eslint/no-unused-vars */

import { HttpException } from '../errors'
import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof HttpException) {
        res.status(err.status).json({ error: true, message: err.message })
    }
    res.status(500).json({ error: true, message: err.message })
}
