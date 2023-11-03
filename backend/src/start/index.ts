import { Application } from "express";
import { AppMiddleware } from "../middlewares/appMiddleware";
const appMiddlewareInstance = AppMiddleware.getInstance();

/**
 * ExpressApplication class handle all the functionalities related to application startup process
 * for example appMiddleware, dbConnections, modules etc.
 */
export class ExpressApplication {
    private static instance: ExpressApplication;

    private constructor() {
        // Private constructor to prevent instantiation from outside
    }

    /**
     * @returns Newly or exiting instance of ExpressApplication class
     */
    public static getInstance(): ExpressApplication {
        if (!ExpressApplication.instance) {
            ExpressApplication.instance = new ExpressApplication();
        }
        return ExpressApplication.instance;
    }

    /**
     * @param app Instance of express server coming from root file.
     */
    public startApplication(app: Application): void {
        // RegisterAppMiddleware is used to implement all common middleware that are related to express application.
        appMiddlewareInstance.registerAppMiddleware(app);
    }
}
