import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, name: user.name, role: user.role },
        process.env.JWT_SECRET,
        {
            expiresIn: "1D",
        }
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

export { generateToken, verifyToken };
