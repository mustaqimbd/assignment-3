import { Response } from "express";

type TResponse<T> = {
    statusCode?: number;
    success?: boolean;
    message?: string;
    data: T;
};

const sendResponse = <T>(
    res: Response,
    { statusCode = 200, success = true, message = "responded successfully", data }: TResponse<T>
) => {
    res.status(statusCode).json({ success, statusCode, message, data });
};

export default sendResponse;
