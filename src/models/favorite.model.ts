import { Schema, model } from 'mongoose'
import { IFavoriteModel } from '../interfaces'

const favoriteSchema = new Schema<IFavoriteModel>({
    favoriteListId: { type: Schema.Types.ObjectId, ref: 'FavoriteList', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
})

export const Favorite = model<IFavoriteModel>('Favorite', favoriteSchema)
