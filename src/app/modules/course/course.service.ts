import queryHelper from "../queryHelper/queryHelper";
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
const getCoursesFromDB = async (queryParameter: Record<string, unknown>) => {

    const { query, sortOptions, currentPage, currentLimit } = queryHelper(queryParameter)

    console.log('query=', query, 'sortoption=', sortOptions)
    
    const data = await CourseModel.find(query)
        .skip((currentPage - 1) * currentLimit)
        .limit(currentLimit)
        .sort(sortOptions)
        .exec();

    const total = await CourseModel.countDocuments()
    const meta = { page: currentPage, limit: currentLimit, total }

    return { meta, data }
}

export const courseServices = {
    createCourseIntoDB, getCoursesFromDB
}