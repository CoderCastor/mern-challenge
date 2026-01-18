import db from "../config/db.js";
import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized to access this route",
            });
        }

        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        }

        const user = await db.user.findFirst({
            where: {
                id: decoded.id,
            },
            omit: { password: true },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists",
            });
        }

        req.user = user;

        next();
    } catch (e) {
        return res.status(501).json({
            success: "false",
            message: "Something went wrong",
        });
    }
};

export const authorizeUserByRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated",
            });
        }

        const role = req.user.role;
        if (!roles.includes(role)) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        next();
    };
};
