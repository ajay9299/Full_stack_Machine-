import { NextFunction, Request, Response } from "express";

export class LoggerMiddleware {
  constructor() {}
  /**
   * @param req express request object
   * @param res express response object
   * @param next call next middleware
   */
  public static apiCallLogger(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    console.log(
      `Method: ${`\x1b[36m${req.method}\x1b[0m`} Path: ${`\x1b[35m${req.path}\x1b[0m`} Timestamp: ${`\x1b[33m${new Date().toISOString()}\x1b[0m`}\n|\nV\n|\nV\n|\nV`
    );
    next();
  }
}
