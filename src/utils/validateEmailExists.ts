import { CustomValidator } from 'express-validator'
import { NotFoundException } from '../errors'
import { User } from '../models/user.model'

export const validateEmailExists: CustomValidator = async (email) => {
    const user = await User.findOne({ email })
    if (!user) throw new NotFoundException('The user was not found')
}
