import mongoose from 'mongoose'

export const dbConnection = async () => {
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
