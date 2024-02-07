import jwt from "jsonwebtoken";
import User from "../models/userModel.js"

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                status: false,
                data: [],
                message: `Not authorized`,
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findOne({ _id: decoded.userId });

        if (!user) {
            return res.status(401).json({
                status: false,
                data: [],
                message: `Not authorized. Invalid token.`,
            });
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            data: [],
            message: `Not authorized. Invalid token.`,
        });
    }
};

export default authMiddleware;