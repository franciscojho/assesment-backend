import supertest from 'supertest'
import faker from '@faker-js/faker'
import { app } from '../app'
import { cleanup, connect, disconnect } from '../config/database'

const api = supertest(app)

describe('Auth route /POST', () => {
    beforeAll(async () => await connect())

    beforeEach(async () => await cleanup())

    afterAll(async () => await disconnect())

    const users = Array.from({ length: 4 }, () => ({
        email: faker.internet.email(),
        password: faker.internet.password(),
    }))

    it.each([users])('Should register user with status 200 and token', async (user) => {
        const res = await api.post('/auth/local/register').send(user)
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('token')
    })

    it.each([users])('Should login user with status 200 and token', async (user) => {
        await api.post('/auth/local/register').send(user)
        const res = await api.post('/auth/local/login').send(user)
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('token')
    })
})
