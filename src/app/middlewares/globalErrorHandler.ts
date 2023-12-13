import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../errorHandlers/handleZodError";
import handleMongooseDuplicateError from "../errorHandlers/handleMongooseDuplicateError";
import handleMongooseCastError from "../errorHandlers/handleMongooseCastError";
import handleMongooseValidationError from "../errorHandlers/handleMongooseValidationError";
import mongoose from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500
    let message = "Error"
    let errorMessage = "something went wrong!"
    let errorDetails = err

    if (err instanceof ZodError) {
        const formattedError = handleZodError(err)
        statusCode = formattedError.statusCode
        message = formattedError.message
        errorMessage = formattedError.errorMessage
    }
    else if (err?.name === "ValidationError") {
        errorDetails = (Object.values((err as mongoose.Error.ValidationError).errors)[0]);

        if (errorDetails?.name === "ValidatorError") {
            const formattedError = handleMongooseValidationError(errorDetails)
            statusCode = formattedError.statusCode
            message = formattedError.message
            errorMessage = formattedError.errorMessage
        }
        else if (errorDetails?.name === "CastError") {
            const formattedError = handleMongooseCastError(errorDetails)
            statusCode = formattedError.statusCode
            message = formattedError.message
            errorMessage = formattedError.errorMessage
        }

    }
    else if (err?.code === 11000) {
        const formattedError = handleMongooseDuplicateError(err)
        statusCode = formattedError.statusCode
        message = formattedError.message
        errorMessage = formattedError.errorMessage
    }


    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        errorDetails,
        stack: err.stack
    })
}

export default globalErrorHandler