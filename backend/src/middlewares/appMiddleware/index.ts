import { Application, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { Database } from "../../database";
import { ErrorHandler } from "../ErrorMiddleware";
import { LoggerMiddleware } from "../LoggerMIddleware";
import { AppConfig } from "../../config";
import { globalMessages } from "../../constants/messages";
import { ResponseMessages } from "../../responses/responses";
import applicationRoute from "../../modules";
import { Types } from "mongoose";
import { responseMessages, responseStatus } from "../../responses/responseConstants";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: Types.ObjectId;
        role: string
      };
    }
  }
}

/**
 * AppMiddleware class handle all the root middleware related to express application
 * for example morgan, cors bodyParse etc
 */
export class AppMiddleware {
  private static instance: AppMiddleware;
  private responseMessageInstance: ResponseMessages;
  private constructor() {
    // Private constructor to prevent instantiation from outside
    // Create response messages instance
    this.responseMessageInstance = ResponseMessages.getInstance();
  }

  /**
   * @returns Newly or exiting instance of AppMiddleware class
   */
  public static getInstance(): AppMiddleware {
    if (!AppMiddleware.instance) {
      AppMiddleware.instance = new AppMiddleware();
    }
    return AppMiddleware.instance;
  }

  /**
   * @param app Instance of express server coming from startup file.
   */
  public registerAppMiddleware(app: Application): void {
    // Load server port from config file
    const { SERVER_PORT } = AppConfig.getConfigOfApplication();

    // Morgan is use to log the hit api response on console
    app.use(morgan("dev"));

    // Cors is use to allow different ips request to express server
    app.use(cors({ origin: "*" }));

    // Connect with database
    Database.getInstance();
    // BodyParser is use to parse upcoming request body and it's json data along with data limit
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    app.use(bodyParser.json({ limit: "50mb" }));

    // Api call logger
    app.use(LoggerMiddleware.apiCallLogger);

    // Ping api ( Server health)
    app.get("/ping", (req: Request, res: Response) => {
      return this.responseMessageInstance.success(
        res,
        `${globalMessages.serverUp} ${SERVER_PORT}`,
        {}
      );
    });

    // Register all available routes in server
    app.use("/api", applicationRoute);
    
    // Handle not found routes on server
    app.use("/*", (req: Request, res: Response) => {
      return res.status(responseStatus.NOT_FOUND).json({ success: false, message: responseMessages.PAGE_NOT_FOUND })
    })

    // Global error handler
    app.use(ErrorHandler.handle);

    // Listen express server on provided port number
    app.listen(SERVER_PORT, () => {
      console.log(globalMessages.serverUp, SERVER_PORT);
    });
  }
}
