import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT
const dbUrl = process.env.DATABASE_URL

export { port, dbUrl }