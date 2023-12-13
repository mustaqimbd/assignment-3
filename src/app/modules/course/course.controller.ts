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

export const courseControllers = {
    createCourse
}