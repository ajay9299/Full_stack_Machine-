import { Response } from "express";
import { responseMessages, responseStatus } from "./responseConstants";

// service response interface
export interface serviceResponse {
  success: boolean;
  message: string;
  data?: any;
}


export class ResponseMessages {
  private static instance: ResponseMessages;
  private constructor() { }

  /**
   * @returns Newly or exiting instance of AppMiddleware class
   */
  public static getInstance() {
    if (!ResponseMessages.instance) {
      ResponseMessages.instance = new ResponseMessages();
    }
    return ResponseMessages.instance;
  }

  /**
   * * Used for throwing custom bad request response
   * @param res Express response object
   * @param message Error message 
   * @param data Data passed from service layer
   * @returns Invoke the final response function
   */
  public badRequest(res: Response, message: string, data: any = {}): Response {
    const response = {
      message,
      status: responseStatus.BAD_REQUEST,
      data,
    };
    return this.sendResponse(res, response);
  }

  /**
   * When auth key not present inside request headers
   * @param res Express response object
   * @param data Data passed from service layer
   * @returns Invoke the final response function
   */
  public invalidAuthKey(res: Response, data: any) {
    let response = {
      message: responseMessages.INVALID_AUTH_KEY,
      status: responseStatus.SESSION_EXPIRED,
      data: data || {},
    };
    this.sendResponse(res, response);
  }

  /**
   * When some unknown error occur inside express application
   * @param res Express response object
   * @param data Data passed from service layer
   * @returns Invoke the final response function
   */
  public internalServerError = (res: Response, data: any) => {
    let response = {
      message: responseMessages.INTERNAL_SERVER_ERROR,
      status: responseStatus.INTERNAL_SERVER_ERROR,
      data: data || {},
    };
    this.sendResponse(res, response);
  };

  /**
   * When api program execute successfully
   * @param res Express response object
   * @param message Request message
   * @param data Data passed from service layer
   * @returns Invoke the final response function
   */
  public success = (res: Response, message: string, data: any): Response => {
    let response = {
      message: message || responseMessages.SUCCESS,
      status: responseStatus.SUCCESS,
      data: data || {},
    };
    return this.sendResponse(res, response);
  };

  /**
   * When api program failed to execute
   * @param res Express response object
   * @param message Request message
   * @param data Data passed from service layer
   * @returns Invoke the final response function
   */
  public failure = (res: Response, message: string, data: any): Response => {
    let response = {
      message: message || responseMessages.FAILURE,
      status: responseStatus.UNAUTHORIZED,
      data: data || {},
    };
    return this.sendResponse(res, response);
  };

  private sendResponse = (
    res: Response,
    data: any,
  ): Response => {
    return res.status(data.status).send(data);
  };
}
