declare namespace Express {
    export interface Response {
        token: string
        user: any
        message: string
    }
}
