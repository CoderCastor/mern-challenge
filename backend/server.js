import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import {
    authMiddleware,
    authorizeUserByRole,
} from "./middlewares/authMiddleware.js";
import adminRouter from "./routers/adminRouter.js";

config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", authMiddleware, userRouter);
app.use(
    "/api/admin",
    authMiddleware,
    authorizeUserByRole("ADMIN"),
    adminRouter
);

app.get("/health", (req, res) => {
    res.json({
        message: "I am healthy",
    });
});

app.listen(PORT, () => {
    console.log("Server is listening on port: ", PORT);
});
