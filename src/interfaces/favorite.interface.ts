import mongoose from 'mongoose'

export interface IFavorite {
    favoriteListId: mongoose.Schema.Types.ObjectId
    title: string
    description: string
    link: string
}

export interface IFavoriteModel extends IFavorite, mongoose.Document {}
