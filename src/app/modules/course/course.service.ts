import { TCourse } from "./course.interface"
import { CourseModel } from "./course.model"

const createCourseIntoDB = async (payload: TCourse) => {

    const startDate = new Date(payload.startDate);
    const endDate = new Date(payload.endDate);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const durationInWeeks = Math.ceil(timeDifference / (7 * 24 * 60 * 60 * 1000));
    payload.durationInWeeks = durationInWeeks;

    const result = await CourseModel.create(payload)
    return result
}

export const courseServices = {
    createCourseIntoDB
}