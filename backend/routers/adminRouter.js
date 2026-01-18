import { Router } from "express";

import {
    authMiddleware,
    authorizeUserByRole,
} from "../middlewares/authMiddleware.js";
import {
    allStats,
    addStore,
    addUser,
    getStores,
    getUsers
} from "../controllers/adminController.js";
const router = Router();

router.get("/stats", allStats);
router.post("/add/store", addStore);
router.post("/add/user", addUser);
router.get("/get/stores", getStores);
router.get("/get/users", getUsers);

export default router;
