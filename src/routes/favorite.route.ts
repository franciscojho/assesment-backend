import { validateResult, isAuthenticated } from '../middlewares'
import { Router } from 'express'
import { FavoriteSchema } from '../schemas'
import { createFavorites, getFavoriteById, deleteFavoriteById } from '../controllers'

export const favRouter = Router()

favRouter.post('/', FavoriteSchema, [validateResult, isAuthenticated], createFavorites)
favRouter.get('/:id', FavoriteSchema, isAuthenticated, getFavoriteById)
favRouter.delete('/:id', FavoriteSchema, isAuthenticated, deleteFavoriteById)
