import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { JwtPayload } from '../interfaces'

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const secret = process.env.JWT_SECRET as string
    const bearerToken = req.headers.authorization
    if (bearerToken) {
        const token = bearerToken.split(' ')[1]
        const decoded = verify(token, secret) as JwtPayload
        if (decoded.id) {
            req.body = { ...req.body, uid: decoded.id }
            return next()
        }
    }
    res.status(401).json({ message: 'Unauthorized' })
}
