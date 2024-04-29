import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                status: false,
                data: [],
                message: "Not authorized."
            });
        }

        const decoded = jwt.decode(token, process.env.JWT_TOKEN);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                status: false,
                data: [],
                message: "Invalid token."
            });
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            status: false,
            data: [],
            message: "Not authorized or invalid token."
        })
    }
}
export default authMiddleware;