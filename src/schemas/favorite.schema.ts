import { BadRequestException } from '../errors'
import { checkSchema, CustomValidator } from 'express-validator'
import { FavoriteList } from '../models'

const validateUniqueName: CustomValidator = async (name, { req }) => {
    const { userId } = req.body
    const fav = await FavoriteList.findOne({ userId, name }).lean()
    if (fav) throw new BadRequestException(`The name '${name}' is already taken`)
}

export const FavoriteSchema = checkSchema({
    userId: {
        in: 'body',
        notEmpty: {
            errorMessage: 'userId is required',
            bail: true,
        },
        isMongoId: {
            errorMessage: 'Invalid user id',
            bail: true,
        },
    },
    name: {
        in: 'body',
        notEmpty: {
            errorMessage: 'Name is required',
            bail: true,
        },
        isString: {
            errorMessage: 'Invalid favorite list name',
            bail: true,
        },
        custom: {
            options: validateUniqueName,
        },
    },
    favorites: {
        in: 'body',
        notEmpty: {
            errorMessage: 'Favorites are required',
            bail: true,
        },
        isArray: {
            errorMessage:
                'Invalid favorites format, should be an array and contain at least one favorite',
            bail: true,
            options: {
                min: 1,
            },
        },
    },
    'favs.*.title': {
        isString: {
            errorMessage: 'Invalid fav title',
            bail: true,
        },
        isLength: {
            errorMessage: 'Title must be between 1 and 100 characters',
            options: { min: 1, max: 100 },
        },
    },
    'favs.*.description': {
        isString: {
            errorMessage: 'Invalid description',
            bail: true,
        },
        isLength: {
            errorMessage: 'Description must be between 1 and 250 characters',
            options: { min: 1, max: 250 },
        },
    },
    'favs.*.link': {
        isURL: {
            errorMessage: 'Invalid url',
            bail: true,
            options: {
                protocols: ['http', 'https'],
            },
        },
    },
})
