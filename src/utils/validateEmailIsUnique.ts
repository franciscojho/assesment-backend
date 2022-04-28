import { CustomValidator } from 'express-validator'
import { BadRequestException } from '../errors'
import { User } from '../models/user.model'

export const validateEmailIsUnique: CustomValidator = async (email) => {
    const user = await User.findOne({ email })
    if (user) throw new BadRequestException('The user already exists')
}
