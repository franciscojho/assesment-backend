import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export const validateResult = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
        const message = result.array().reduce((acc, curr) => {
            acc.length ? (acc += `, ${curr.msg}`) : (acc = curr.msg)
            return acc
        }, '')
        return res.status(400).json({ error: true, message })
    }

    next()
}
