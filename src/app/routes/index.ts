import { Router } from "express";
import courseRoutes from "../modules/course/course.route";
import categoryRoutes from "../modules/category/category.route";

const router = Router()

const routes = [
    {
        path: '/course',
        route: courseRoutes
    },
    {
        path: '/categories',
        route: categoryRoutes
    }
]

routes.forEach(route => router.use(route.path, route.route))

export default router