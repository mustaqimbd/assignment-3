import mongoose from "mongoose";
import queryHelper from "../queryHelper/queryHelper";
import { TCourse } from "./course.interface"
import { CourseModel } from "./course.model"
import { NextFunction } from "express";
import sendError from "../../errorHandlers/sendError";

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

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>, next: NextFunction) => {
    const { tags, details, ...remainingData } = payload
    const session = await mongoose.startSession()
    try {
        session.startTransaction()

        if (remainingData.startDate && remainingData.endDate) {
            const startDate = new Date(remainingData.startDate);
            const endDate = new Date(remainingData.endDate);
            const timeDifference = endDate.getTime() - startDate.getTime();
            const durationInWeeks = Math.ceil(timeDifference / (7 * 24 * 60 * 60 * 1000));
            remainingData.durationInWeeks = durationInWeeks;
        }

        const updatedPrimitiveData = await CourseModel.findByIdAndUpdate(
            id,
            remainingData,
            { new: true, runValidators: true, session }
        )
        if (!updatedPrimitiveData) {
            throw new sendError(400, 'Failed to update course');
        }

        if (details) {
            const updatedDetails = await CourseModel.findByIdAndUpdate(
                id,
                { 'details.level': details.level, 'details.description': details.description },
                { new: true, runValidators: true, session }
            )

            if (!updatedDetails) {
                throw new sendError(400, 'Failed to update course');
            }
        }

        if (tags && tags.length > 0) {
            const addedNewTags = tags?.filter(
                (tag) => tag.name && !tag.isDeleted,
            );
            
            const addCourseTags = await CourseModel.findByIdAndUpdate(
                id,
                {
                    $addToSet: { tags: { $each: addedNewTags } },
                },
                {
                    new: true,
                    runValidators: true,
                    session,
                },
            );
            if (!addCourseTags) {
                throw new sendError(400, 'Failed to update course');
            }

            const deletedTags = tags
                .filter((tag) => tag.name && tag.isDeleted)
                .map((tag) => tag.name);
            
            const deletedCourseTags = await CourseModel.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        tags: { name: { $in: deletedTags } },
                    },
                },
                {
                    new: true,
                    runValidators: true,
                    session,
                },
            );
            if (!deletedCourseTags) {
                throw new sendError(400, 'Failed to update course');
            }
        }

        await session.commitTransaction()
        await session.endSession()
        const result = await CourseModel.findById(id)
        return result
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        next(error)
    }
}

export const courseServices = {
    createCourseIntoDB, getCoursesFromDB, updateCourseIntoDB
}