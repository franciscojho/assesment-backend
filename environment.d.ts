import { Secret, SignOptions } from 'jsonwebtoken'

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number
            MONGO_URI: string
            JWT_SECRET: Secret
            JWT_EXPIRES_IN: SignOptions['expiresIn']
        }
    }
}

export {}
