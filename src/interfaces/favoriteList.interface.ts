import mongoose from 'mongoose'
import { IFavorite } from './favorite.interface'

export interface IFavoriteList {
    userId: mongoose.Schema.Types.ObjectId
    name: string
    favorites: mongoose.Schema.Types.ObjectId[] | IFavorite[]
}

export interface IFavoriteListModel extends IFavoriteList, mongoose.Document {}
