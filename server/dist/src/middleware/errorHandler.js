"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// error handler
const errorHandler = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // return the error
    // Check for existing error status codes. If none exist, set to 500.
    // For some reason certain mongo errors reach this point but with a 200 status OK response? If the error handler is being called the status code should be an error code no matter what
    let statusCode;
    if (!res.statusCode || res.statusCode === 200) {
        statusCode = 500;
    }
    else {
        statusCode = res.statusCode;
    }
    res.status(statusCode);
    res.json(err);
};
exports.default = errorHandler;
