import express from 'express';
import { categoryControllers } from './category.controller';

const categoryRoutes = express.Router()

categoryRoutes.post(
    '/',
    categoryControllers.createCategory
)

categoryRoutes.get('/', categoryControllers.getAllCategories)

export default categoryRoutes