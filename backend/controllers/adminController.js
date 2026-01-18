import db from "../config/db.js";
import { storeSchema, userSchemaforAdmin } from "../utils/zod.js";

const allStats = async (req, res) => {
    try {
        const [userCount, storeCount, ratingCount] = await Promise.all([
            db.user.count(),
            db.store.count,
            db.rating.count(),
        ]);

        return res.json({
            success: true,
            data: {
                totalUsers: userCount,
                totalStores: storeCount,
                totalRatings: ratingCount,
            },
        });
    } catch (e) {
        return res.status(501).json({
            success: "true",
            message: "Something went wrong",
        });
    }
};

const addStore = async (req, res) => {
    try {
        const data = req.body;
        const validInput = storeSchema.safeParse(data);
        if (validInput.error) {
            const errors = validInput.error.issues.map(
                (error) => error.message
            );
            return res.status(400).json({
                success: false,
                message: "Invalid Inputs",
                errors,
            });
        }

        const store = await db.store.create({
            data: validInput.data,
        });

        if (!store) {
            return res.status(501).json({
                success: false,
                message: "Failed to add store",
            });
        }

        return res.json({
            success: true,
            message: "Store added successfully",
            store_id: store.id,
        });
    } catch (e) {
        if (e.code === "P2002") {
            return res.status(400).json({
                success: false,
                message: "Store already exist with this email",
            });
        }
        return res
            .status(501)
            .json({ success: false, error: "Something went wrong" });
    }
};

const addUser = async (req, res) => {
    try {
        const data = req.body;
        const validInput = userSchemaforAdmin.safeParse(data);
        if (validInput.error) {
            const errors = validInput.error.issues.map(
                (error) => error.message
            );
            return res.status(400).json({
                success: false,
                message: "Invalid Inputs",
                errors,
            });
        }

        const user = await db.user.create({
            data: validInput.data,
        });

        if (!user) {
            return res.status(501).json({
                success: false,
                message: "Failed to add user",
            });
        }

        return res.json({
            success: true,
            message: "User added successfully",
            user_id: user.id,
        });
    } catch (e) {
        console.log(e);
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

const getStores = async (req, res) => {
    try {
        const stores = await db.store.findMany();

        if (!stores) {
            return res.status(501).json({
                success: false,
                message: "Failed to fetch stores",
            });
        }

        return res.json({
            success: true,
            message: "Store fetched successfully",
            data: stores,
        });
    } catch (e) {
        return res
            .status(501)
            .json({ success: false, error: "Something went wrong" });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await db.user.findMany({
            where: {
                id: {
                    not: req.user.id,
                },
            },
            omit: {
                password: true,
            },
        });

        if (!users) {
            return res.status(501).json({
                success: false,
                message: "Failed to fetch users",
            });
        }

        return res.json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    } catch (e) {
        return res
            .status(501)
            .json({ success: false, error: "Something went wrong" });
    }
};

export { allStats, addStore, addUser, getStores, getUsers };
