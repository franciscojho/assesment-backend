import supertest from 'supertest'
import faker from '@faker-js/faker'
import { app } from '../app'
import { cleanup, connect, disconnect } from '../config/database'

const api = supertest(app)

describe('Favorite route /POST', () => {
    beforeAll(async () => await connect())

    beforeEach(async () => await cleanup())

    afterAll(async () => await disconnect())

    const mockUser = {
        email: faker.internet.email(),
        password: faker.internet.password(20),
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
        const resUser = await api.post('/auth/local/register').send(mockUser)
        const { _id } = resUser.body.user
        const token = resUser.body.token
        const resList = await api
            .post('/api/favs')
            .send(mockFavoriteList(_id))
            .set('Authorization', `Bearer ${token}`)
        expect(resList.statusCode).toBe(200)
        expect(resList.body).toHaveProperty('favoriteList')
    })
})
