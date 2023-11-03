/**
 * This file contain all global https status code and response messages.
 */
export const requestMethods = {
  POST   : "POST",
  GET    : "GET",
  PUT    : "PUT",
  PATCH  : "PATCH",
  DELETE : "DELETE",
};

export const responseStatus = {
  SUCCESS               : 200,
  BAD_REQUEST           : 400,
  UNAUTHORIZED          : 401,
  PLAN_EXPIRED          : 402,
  FORBIDDEN             : 403,
  SESSION_EXPIRED       : 440,
  NOT_FOUND             : 404,
  CONFLICT              : 409,
  INTERNAL_SERVER_ERROR : 500,
};

export const responseMessages = {
  SUCCESS                                      : "success",
  FAILURE                                      : "failure",
  USER_LOGGED_IN                               : "User logged in successfully",
  USER_NOT_REGISTERED                          : "User not registered with us.",
  USER_ALREADY_REGISTERED                      : "User already registered with us. Try signing in",
  USER_CREATED                                 : "User created successfully",
  INVALID_AUTH_KEY                             : "Invalid Token!",
  TOKEN_NOT_FOUND                              : "Access denied. Token missing.",
  ACCOUNT_VERIFIED                             : "Account verified successfully",
  INVALID_PASSWORD                             : "Invalid userName and password, Please check and try again",
  SESSION_EXPIRED                              : "User session expired",
  INTERNAL_SERVER_ERROR                        : "Some error occurred.",
  PAGE_NOT_FOUND                               : "Sorry this route not present on server, Please check and try again",
  VALIDATION_FAILED                            : "Validation failed",
  USER_DATA                                    : "User data fetched successfully"
};
