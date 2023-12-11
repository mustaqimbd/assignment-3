import express from 'express';
const courseRoutes = express.Router()

courseRoutes.get('/', (req, res) => {
    res.send('Hello world')
})

export default courseRoutes