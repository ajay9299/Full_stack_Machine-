import { Router } from "express";
import { AuthController } from "../controllers";
import { Joi, Segments, celebrate } from "celebrate";
import { AuthMiddlewareClass } from "../../../middlewares/authMiddleware";
// Instance of Router class
const router = Router();

// Create new instance of userControllerClass
const authControllerClassInstance = AuthController.getInstance();

// <-----------------------------------All available routes in auth module-------------------------------------->

// Signup new user route
router.post("/signup",
    celebrate({
        [Segments.BODY]: Joi.object({
            userName: Joi.string().min(3).max(30).required(),
            password: Joi.string().required(),
        })
    }), authControllerClassInstance.signup
);

// Login user route
router.post("/login",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            userName: Joi.string().min(3).max(30).required(),
            password: Joi.string().required(),
        })
    }), authControllerClassInstance.login
);

// Get user data
router.get("/profile",AuthMiddlewareClass.jwtMiddleware, authControllerClassInstance.profile)

// Export all available routes of auth module.
export default router;
