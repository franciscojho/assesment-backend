import { RequestHandler } from 'express'
import { IFavorite } from '../interfaces'
import { Favorite, FavoriteList, User } from '../models'

export const createFavorites: RequestHandler = async (req, res, next) => {
    try {
        const { userId, name, favorites } = req.body

        const favoriteList = await FavoriteList.create({ userId, name })

        const favs = await Favorite.insertMany(
            favorites.map((fav: IFavorite) => ({
                ...fav,
                favoriteListId: favoriteList._id,
            })),
        )

        const user = await User.findOne({ _id: userId })

        if (favoriteList) {
            favs.map((fav) => favoriteList.favorites.push(fav._id))
            await favoriteList.save()
        }

        if (user) {
            user.favoriteLists.push(favoriteList._id)
            await user.save()
        }

        return res.status(200).json({
            message: 'Success creating favorites list',
            favoriteList,
        })
    } catch (error) {
        next(error)
    }
}
