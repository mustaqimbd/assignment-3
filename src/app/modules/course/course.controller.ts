import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { courseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
    const result = await courseServices.createCourseIntoDB(req.body)
    sendResponse(res, {
        statusCode: 201,
        message: "Course created successfully",
        data: result
    })
})
const getCourses = catchAsync(async (req, res) => {
    const { meta, data } = await courseServices.getCoursesFromDB(req.query)
    sendResponse(res, {
        message: "Courses retrieved successfully",
        meta,
        data: data
    })
})

export const courseControllers = {
    createCourse, getCourses
}