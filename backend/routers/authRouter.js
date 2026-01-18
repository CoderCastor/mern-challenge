import { Router } from "express";
import {
    signup,
    login,
    changePassword,
    logout,
} from "../controllers/authControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/change-password", authMiddleware, changePassword);
router.post("/logout", authMiddleware, logout);

export default router;
