import express from 'express';
import { courseControllers } from './course.controller';
import requestValidator from '../../middlewares/requestValidator';
import { courseDataValidationSchema } from './course.validation';
const courseRoutes = express.Router()

courseRoutes.post(
    '/',
    requestValidator(courseDataValidationSchema),
    courseControllers.createCourse
)
courseRoutes.get(
    '/',
    courseControllers.getCourses
)

export default courseRoutes