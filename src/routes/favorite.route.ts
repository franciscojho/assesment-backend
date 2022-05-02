import { validateResult, isAuthenticated } from '../middlewares'
import { Router } from 'express'
import { FavoriteSchema } from '../schemas'
import { createFavorites, getFavoriteById } from '../controllers'

export const favRouter = Router()

favRouter.post('/', FavoriteSchema, [validateResult, isAuthenticated], createFavorites)
favRouter.get('/:id', FavoriteSchema, isAuthenticated, getFavoriteById)
