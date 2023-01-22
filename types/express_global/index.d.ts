declare namespace Express {
    interface Request {
        // currentUser?: UserPayload | Employee | null
        currentUser?: any
        permission?: any
        grants?: any
        sse?: any
    }
}