import { Router } from "express";
import { getMe,rateToStore,modifyRating } from "../controllers/userController.js";
import {
    authMiddleware,
    authorizeUserByRole,
} from "../middlewares/authMiddleware.js";
const router = Router();

router.get("/getme", authMiddleware, getMe);
router.post("/rate", authMiddleware, rateToStore);
router.patch("/rate-modify", authMiddleware, modifyRating);

export default router;
