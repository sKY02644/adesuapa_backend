const port = process.env.PORT || 4545

const BASEURL = `${process.env.NODE_ENV === 'production' ? process.env.BASEURL : `http://localhost:${port}/api`}`

export const defaults =  {
    "Allow": "GET, POST",
    "Content-Type": "application/json",
    "Routes":{ }
}