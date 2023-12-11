import { Router } from "express";
import courseRoutes from "../modules/course/course.route";

const router = Router()
const routes = [
    {
        path: '/course',
        route: courseRoutes
    }
]
routes.forEach(route => router.use(route.path, route.route))

export default router