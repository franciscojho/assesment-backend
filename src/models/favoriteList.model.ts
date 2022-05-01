import { Schema, model } from 'mongoose'
import { IFavoriteListModel } from '../interfaces'

const favoriteListSchema = new Schema<IFavoriteListModel>({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Favorite' }],
})

export const FavoriteList = model<IFavoriteListModel>('FavoriteList', favoriteListSchema)
