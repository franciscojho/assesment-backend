import { sign } from 'jsonwebtoken'
import { Types } from 'mongoose'

export const generateJwt = (id: Types.ObjectId): string => {
    const secret = process.env.JWT_SECRET as string
    const expiresIn = process.env.JWT_EXPIRES_IN as string
    const token = sign({ id }, secret, { expiresIn })

    return token
}
