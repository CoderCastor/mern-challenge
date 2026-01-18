import { compare, hash } from "bcrypt";
import {
    userSchemaSignup,
    userSchemaLogin,
    userSchemaNewPassword,
} from "../utils/zod.js";
import db from "../config/db.js";
import { generateToken } from "../utils/jwt.js";

const signup = async (req, res) => {
    const data = req.body;
    try {
        if (!data) {
            return res.status(400).json({
                message: "Invalid Input",
                success: false,
            });
        }
        const validInput = userSchemaSignup.safeParse(data);
        if (validInput.error) {
            const errors = validInput.error.issues.map(
                (error) => error.message,
            );
            return res.status(400).json({
                message: "Invalid Input",
                errors,
                success: false,
            });
        }

        const hashPassword = await hash(validInput.data.password, 10);
        await db.user.create({
            data: { ...validInput.data, password: hashPassword },
        });

        return res.status(201).json({
            success: true,
            message: "User signup successfully",
        });
    } catch (e) {
        if (e.code === "P2002") {
            return res.status(400).json({
                success: false,
                message: "User already exist with this email",
            });
        }
        return res
            .status(501)
            .json({ success: false, error: "Something went wrong" });
    }
};

const login = async (req, res) => {
    const data = req.body;
    try {
        if (!data) {
            return res.status(400).json({
                message: "Invalid Input",
                success: "false",
            });
        }
        const validInput = userSchemaLogin.safeParse(data);
        if (validInput.error) {
            const errors = validInput.error.issues.map(
                (error) => error.message,
            );
            return res.status(400).json({
                message: "Invalid Input",
                errors,
                success: false,
            });
        }

        const user = await db.user.findUnique({
            where: {
                email: validInput.data.email,
            },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isPasswordValid = await compare(
            validInput.data.password,
            user.password,
        );

        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: "Incorrect Password",
            });
        }
        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000 * 24 * 2,
        });

        return res.json({
            success: true,
            message: "User login successfully",
        });
    } catch (e) {
        if (e.code === "P2021") {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res
            .status(501)
            .json({ success: false, error: "Something went wrong" });
    }
};

const changePassword = async (req, res) => {
    try {
        const data = req.body;
        const validUser = req.user;

        const validInput = userSchemaNewPassword.safeParse(data);

        if (validInput.error) {
            const errors = validInput.error.issues.map(
                (error) => error.message,
            );
            return res.status(400).json({
                success: false,
                message: "Invalid Password",
                errors,
            });
        }

        const hashPassword = await hash(validInput.data.password, 10);
        const dbRes = await db.user.update({
            data: {
                password: hashPassword,
            },
            where: {
                id: validUser.id,
            },
        });

        if (dbRes) {
            return res.status(200).json({
                success: true,
                message: "Password changed successfully",
            });
        }
        return res.status(501).json({
            success: false,
            message: "Failed to change password",
        });
    } catch (e) {
        console.log(e);
        return res.status(501).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

const logout = (req, res) => {
    res.cookie("token", "none", {
        maxAge: 3600000 * 24 * 2,
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};

export { signup, login, changePassword, logout };
