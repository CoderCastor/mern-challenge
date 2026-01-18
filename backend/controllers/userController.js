import db from "../config/db.js";
import { modifyRatingSchema, shopRatingSchema } from "../utils/zod.js";

const getMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await db.user.findFirst({
            where: {
                id: userId,
            },
            omit: {
                password: true,
            },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            user,
        });
    } catch {
        return res.status(501).status({
            success: false,
            message: "Failed to fetch user",
        });
    }
};

const rateToStore = async (req, res) => {
    try {
        const data = req.body;
        const validInput = shopRatingSchema.safeParse(data);
        if (validInput.error) {
            const errors = validInput.error.issues.map(
                (error) => error.message,
            );
            return res.status(400).json({
                success: false,
                message: "Invalid Input",
                errors,
            });
        }

        const rating = await db.rating.create({
            data: {
                rating: validInput.data.rating,
                storeId: validInput.data.storeId,
                userId: req.user.id,
            },
        });

        if (!rating) {
            res.status(501).json({
                success: false,
                message: "Failed to rate",
            });
        }

        return res.json({
            success: true,
            message: "Rating marked successfully",
        });
    } catch (e) {
        if (e.code === "P2002") {
            return res.status(400).json({
                success: false,
                message: "User Rating already exist for the store",
            });
        }
        if (e.code === "P2003") {
            return res.status(404).json({
                success: false,
                message: "Store not found",
            });
        }
        return res
            .status(501)
            .json({ success: false, error: "Something went wrong" });
    }
};

const modifyRating = async (req, res) => {
    try {
        const data = req.body;
        const validInput = modifyRatingSchema.safeParse(data);
        if (validInput.error) {
            const errors = validInput.error.issues.map(
                (error) => error.message,
            );
            return res.status(400).json({
                success: false,
                message: "Invalid Input",
                errors,
            });
        }

        const rating = await db.rating.updateMany({
            data: {
                rating: validInput.data.rating,
            },
            where: {
                id: validInput.data.ratingId,
                userId: req.user.id,
            },
        });

        if (!rating.count) {
            res.status(500).json({
                success: false,
                message: "Failed to update rating",
            });
        }

        return res.json({
            success: true,
            message: "Rating updated successfully",
        });
    } catch (e) {
        return res
            .status(501)
            .json({ success: false, error: "Something went wrong" });
    }
};

export { getMe, rateToStore, modifyRating };
