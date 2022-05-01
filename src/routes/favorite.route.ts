import { createFavorites } from '../controllers'
import { FavoriteSchema } from '../schemas'
import { Router } from 'express'
import { validateResult, isAuthenticated } from '../middlewares'

export const favRouter = Router()

favRouter.post('/', FavoriteSchema, [validateResult, isAuthenticated], createFavorites)
