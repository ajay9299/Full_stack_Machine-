import express, { Application } from "express";
import { ExpressApplication } from "./start";

// Create new instance of Express Server class
const app: Application = express();

// Create new instance of expressApplication class
const expressApplicationInstance = ExpressApplication.getInstance();

// Invoke startApplication method
expressApplicationInstance.startApplication(app);
