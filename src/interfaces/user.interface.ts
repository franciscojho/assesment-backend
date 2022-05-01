import mongoose from 'mongoose'

export interface IUser {
    email: string
    password: string
    favoriteLists: mongoose.Schema.Types.ObjectId[]
}

export interface IUserModel extends IUser, mongoose.Document {}

export type IUserModelReturn = Omit<IUserModel, 'password'>
