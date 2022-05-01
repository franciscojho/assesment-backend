/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'
import { User } from '../models'
import { generateJwt } from './../utils'

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body

        const foundUser = await User.findOne({ email }).lean()

        const { password, ...user } = foundUser!

        const token = generateJwt(user!._id)

        res.status(200).json({ message: 'Login success', user, token })
    } catch (error) {
        next(error)
    }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        const hash = await bcrypt.hash(password, 10)

        await User.create({ email, password: hash })

        const foundUser = await User.findOne({ email }).lean()

        const { password: pass, ...user } = foundUser!

        const token = generateJwt(user._id)

        res.status(200).json({ message: 'Register success', user, token })
    } catch (error) {
        next(error)
    }
}
