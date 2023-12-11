import express, { Request, Response } from "express";
import cors from "cors"
import router from "./app/routes";

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
    res.send('<h1 style="text-align: center; margin-top: 50px;">Server is running</h1>')
})

export default app