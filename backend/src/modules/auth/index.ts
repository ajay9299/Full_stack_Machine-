import { Router } from "express";
import authRoute from "./routes";

// Instance of Router class
const router = Router();

// Register all available routes of all modules
router.use("/auth", authRoute);

// Export all available routes
export default router;
