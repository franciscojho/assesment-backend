import { Schema, model } from 'mongoose'
import { IUser } from './../interfaces'

const userSchema = new Schema<IUser>({
    // name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

export const User = model<IUser>('User', userSchema)
