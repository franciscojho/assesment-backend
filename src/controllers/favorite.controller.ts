import { NotFoundException } from './../errors/index'
import { RequestHandler } from 'express'
import { IFavorite } from '../interfaces'
import { Favorite, FavoriteList, User } from '../models'

export const createFavorites: RequestHandler = async (req, res, next) => {
    try {
        const { uid, name, favorites } = req.body

        const favoriteList = await FavoriteList.create({ uid, name })

        const favs = await Favorite.insertMany(
            favorites.map((fav: IFavorite) => ({
                ...fav,
                favoriteListId: favoriteList._id,
            })),
        )

        const user = await User.findOne({ _id: uid })

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

export const getFavoriteById: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params

        const favoriteList = await FavoriteList.findOne({ _id: id })

        if (!favoriteList) throw new NotFoundException('Favorite list not found')

        return res.status(200).json({
            message: 'Success getting a favorite list',
            favoriteList,
        })
    } catch (error) {
        next(error)
    }
}

export const deleteFavoriteById: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params

        const favoriteList = await FavoriteList.findOneAndDelete({ _id: id })

        if (!favoriteList) throw new NotFoundException('Favorite list not found')

        return res.status(200).json({
            message: 'Success deleting a favorite list',
            favoriteList,
        })
    } catch (error) {
        next(error)
    }
}
