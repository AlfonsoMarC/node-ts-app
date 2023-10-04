import { Request, Response, NextFunction } from "express";

type AsyncHandler<T = void> = (req: Request, res: Response, next: NextFunction) => Promise<T>;

export const asyncMiddleware = (handler: AsyncHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
