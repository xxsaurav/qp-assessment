"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (error, req, res, next) => {
    console.log(error);
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Error";
    // Handle Mongoose duplicate key error
    if (error.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again `;
        error.message = message;
        error.statusCode = 400;
    }
    // Handle other errors
    res.status(error.statusCode).json({
        success: false,
        message: error.message,
    });
};
exports.default = errorMiddleware;
