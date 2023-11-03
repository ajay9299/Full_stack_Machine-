import { NextFunction, Request, Response } from "express";
import { Util } from "../../utils";
import {
  responseMessages,
  responseStatus,
} from "../../responses/responseConstants";

// AuthMiddlewareClass contain jwt token verify and role base access methods
export class AuthMiddlewareClass {
  /**
   * * JwtMiddleware verify upcoming jwt token
   * @param req Express request object
   * @param res Express response object
   * @param next Express next function
   * @returns decode info or error response to client
   */
  public static jwtMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res
        .status(responseStatus.UNAUTHORIZED)
        .json({ success: false, error: responseMessages.TOKEN_NOT_FOUND });
    }

    try {
      const decodedToken:
        | {
            success: boolean;
            data: any;
          }
        | any = Util.jwtTokenVerify(token);

      // Assign decode data inside req user
      req.user = { userId: decodedToken.data.userId ,role:decodedToken.data.role};
      next();
    } catch (error) {
      return res
        .status(responseStatus.FORBIDDEN)
        .json({ success: false, error: responseMessages.INVALID_AUTH_KEY });
    }
  }
}
