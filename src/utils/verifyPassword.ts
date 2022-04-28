import { compare } from 'bcrypt'
import { CustomValidator } from 'express-validator'
import { UnauthorizedException } from '../errors'
import { User } from '../models/user.model'

export const verifyPassword: CustomValidator = async (password, meta) => {
    const { email } = meta.req.body
    const user = await User.findOne({ email }).lean()
    if (user) {
        const isValid = await compare(password, user.password)
        if (!isValid) throw new UnauthorizedException('The password is incorrect')
    }
}
