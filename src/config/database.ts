import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` })

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            keepAlive: true,
            authSource: 'admin',
        })

        return { status: 'success', message: 'Database connected' }
    } catch (error) {
        return { status: 'error', message: error }
    }
}

export const disconnect = async () => {
    try {
        await mongoose.disconnect()
        return 'disconnected'
    } catch (error) {
        return error
    }
}

export const cleanup = async () => {
    const collections = await mongoose.connection.db.collections()

    await Promise.all(
        collections.map(async (collection) => {
            await collection.deleteMany({})
        }),
    )
}
