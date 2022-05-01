import { Schema, model } from 'mongoose'
import { IUserModel } from './../interfaces'

const userSchema = new Schema<IUserModel>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    favoriteLists: [{ type: Schema.Types.ObjectId, ref: 'FavoriteList' }],
})

export const User = model<IUserModel>('User', userSchema)
