import supertest from 'supertest'
import faker from '@faker-js/faker'
import { app } from '../app'
import { cleanup, connect, disconnect } from '../config/database'

const api = supertest(app)

describe('Favorite route /POST & /GET & /DELETE', () => {
    let token: string
    let uid: string

    beforeAll(async () => {
        await connect()

        const resUser = await api.post('/auth/local/register').send(mockUser)
        uid = resUser.body.user._id
        token = resUser.body.token
    })

    beforeEach(async () => await cleanup())

    afterAll(async () => await disconnect())

    const mockUser = {
        email: faker.internet.email(),
        password: `P${faker.internet.password(8)}1`,
    }

    const mockFavoriteList = (userId: string) => ({
        userId,
        name: faker.lorem.sentence(),
        favorites: Array.from({ length: 2 }, () => ({
            title: faker.lorem.word(),
            description: faker.lorem.paragraph(),
            link: faker.internet.url(),
        })),
    })

    it('Should create a favorite list with favorites', async () => {
        const resList = await api
            .post('/api/favs')
            .send(mockFavoriteList(uid))
            .set('Authorization', `Bearer ${token}`)
        expect(resList.statusCode).toBe(200)
        expect(resList.body).toHaveProperty('favoriteList')
    })

    it('Should get a favorite list', async () => {
        const resList = await api
            .post('/api/favs')
            .send(mockFavoriteList(uid))
            .set('Authorization', `Bearer ${token}`)
        const { _id } = resList.body.favoriteList
        const FavoriteList = await api
            .get(`/api/favs/${_id}`)
            .set('Authorization', `Bearer ${token}`)
        expect(FavoriteList.statusCode).toBe(200)
        expect(FavoriteList.body).toHaveProperty('favoriteList')
    })

    it('Should delete a favorite list', async () => {
        const resList = await api
            .post('/api/favs')
            .send(mockFavoriteList(uid))
            .set('Authorization', `Bearer ${token}`)
        const { _id } = resList.body.favoriteList
        const FavoriteList = await api
            .delete(`/api/favs/${_id}`)
            .set('Authorization', `Bearer ${token}`)
        expect(FavoriteList.statusCode).toBe(200)
        expect(FavoriteList.body).toHaveProperty('favoriteList')
    })
})
