import { serviceResponse } from "../../../responses/responses";
import { IUserDoc } from "../../../model/User.model";
import { Model, Types } from "mongoose";
import { responseMessages } from "../../../responses/responseConstants";
import { Util } from "../../../utils";
import { IUser } from "../../../dto/user.dto";

export class AuthService {
    private static instance: AuthService;

    private constructor(private UserModel: Model<IUserDoc>) {

    }

    public static getInstance(UserModel: Model<IUserDoc>): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService(UserModel);
        }
        return AuthService.instance
    }

    /**
     * User signup service
     * @param userSignUpInfo Contain basic information that is used to create new user in db
     * @returns NewlyCreated user information
     */
    public async signup(
        userSignUpInfo: any
    ): Promise<serviceResponse> {
        let { userName, password } = userSignUpInfo;

        // Check is user already present with upcoming userName
        const isUserAlreadyPresent = await this.UserModel
            .findOne({
                userName,
            })
            .lean();

        // If user already present in db
        if (isUserAlreadyPresent && isUserAlreadyPresent.userName)
            return {
                success: false,
                message: responseMessages.USER_ALREADY_REGISTERED,
            };

        // Hashed password using bcrypt 
        password = await Util.encryptPassword(password!);

        // Create new user if not present in db
        let newlyCreatedUser: IUserDoc | null;
        if (!isUserAlreadyPresent) {
            newlyCreatedUser = await this.UserModel.create({
                userName,
                password,

            });
        }
        return {
            success: true,
            message: responseMessages.USER_CREATED,
            data: isUserAlreadyPresent || newlyCreatedUser!,
        };
    }

    /**
    * * User login service
    * @param userLoginInfo Contain password and userName that are stored in db
    * @return NewlyCreated JwtToken
    */
    public async login(userLoginInfo: IUser): Promise<serviceResponse> {
        const { userName, password } = userLoginInfo;

        // Check is userName registered or not with us
        const isAccountPresent: IUserDoc | null = await this.UserModel.findOne({
            userName,
        });

        // ! If user not registered with us throw error
        if (!isAccountPresent)
            return {
                success: false,
                message: responseMessages.USER_NOT_REGISTERED,
            };


        // If entered password and stored password not same then throw error
        if (!(await Util.passwordValidate(password, isAccountPresent.password)))
            return {
                success: false,
                message: responseMessages.INVALID_PASSWORD,
            };

        // Generate new jwt token and send to client
        const token: string = Util.jwtTokenGenerator({
            userId: isAccountPresent._id,
        });

        return {
            success: true,
            message: responseMessages.USER_LOGGED_IN,
            data: { token },
        };
    }

    /**
     * @param userId userId coming from decoded jwt token
     * @returns user stored data
     */
    public async profile(userId: Types.ObjectId): Promise<serviceResponse> {

        const userData: IUserDoc | null = await this.UserModel.findById({ _id: userId });
        return {
            success: true,
            message: responseMessages.USER_DATA,
            data: userData,
        };
    }
}