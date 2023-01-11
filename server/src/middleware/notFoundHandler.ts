import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";

// catch 404 and forward to error handler
const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404));
};

export default notFoundHandler;