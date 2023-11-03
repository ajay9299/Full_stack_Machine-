import { Router } from "express";
import authModuleRoutes from "./auth";

// Instance of Router class
const router = Router();

// Register all available routes of all modules
router.use("/v1", authModuleRoutes);

// Export all available routes
export default router;
