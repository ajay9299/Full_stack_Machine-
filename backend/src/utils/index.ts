import { JwtPayload, sign, verify } from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * * Util class handle all helper methods that are using in application
 */
export class Util {
  /**
   * @param payload Refer to basic info that will store in jwt token
   * @param jwtKey Refer to jwt secret key that stored in environment file.
   * @return Newly generated Jwt token
   */
  public static jwtTokenGenerator(payload: any) {
    return sign(payload, process.env.JWT_SECRET_KEY!);
  }

  /**
   * 
   * @param token Token coming in request headers 
   * @returns Decoded information from token
   */
  public static jwtTokenVerify(token: string):
    | {
        success: boolean;
        data: any;
      }
    | Error {
    try {
      const tokenDecodedInfo: string | JwtPayload = verify(
        token,
        process.env.JWT_SECRET_KEY!
      );
      return { success: true, data: tokenDecodedInfo };
    } catch (error: Error | any) {
      return error;
    }
  }

  /**
   * * Used to encrypt plain password
   * @param plainPassword Enter by user
   * @returns Encrypted password
   */
  public static async encryptPassword(plainPassword: string) {
    return await bcrypt.hash(plainPassword!, process.env.PASSWORD_SALT!);
  }

  /**
   * * Password validator function
   * @param plainPassword Password entered by user
   * @param storedHashedPassword Password stored in db
   * @returns true is password correct otherwise false
   */
  public static async passwordValidate(
    plainPassword: string,
    storedHashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, storedHashedPassword);
  }
}
