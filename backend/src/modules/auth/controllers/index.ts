import { Request, Response } from "express";
import { ResponseMessages } from "../../../responses/responses";
import { IUser } from "../../../dto/user.dto";
import { AuthService } from "../services";
import { UserModel } from "../../../model/User.model";
import { Types } from "mongoose";

const responseMessageInstance = ResponseMessages.getInstance();

// create new instance of authService class
const authServiceInstance = AuthService.getInstance(
    UserModel
);


export class AuthController {
    private static instance: AuthController;

    private constructor() {

    }

    public static getInstance(): AuthController {
        if (!AuthController.instance) {
            AuthController.instance = new AuthController();
        }
        return AuthController.instance
    }

    // Signup new user controller
    public async signup(req: Request, res: Response): Promise<Response> {
        const userSingUpInfo: IUser = req.body;
        const { success, message, data } = await authServiceInstance.signup(
            userSingUpInfo
        );

        return success
            ? responseMessageInstance.success(res, message, data)
            : responseMessageInstance.badRequest(res, message, {});
    }

    // Login user controller
    public async login(req: Request, res: Response): Promise<Response> {
        const userLoginInfo: IUser = req.body;
        const { success, message, data } = await authServiceInstance.login(
            userLoginInfo
        );

        return success
            ? responseMessageInstance.success(res, message, data)
            : responseMessageInstance.badRequest(res, message, data);
    }
    
    // Get user profile
    public async profile(req: Request, res: Response): Promise<Response> {
        const userId: Types.ObjectId = req.user.userId;
        const { success, message, data } = await authServiceInstance.profile(
            userId
        );

        return success
            ? responseMessageInstance.success(res, message, data)
            : responseMessageInstance.badRequest(res, message, data);
    }
}