import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { serverError, unauthorized } from "../../uitls/response.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return unauthorized(res, "Not authorized.");
        }
        const replacedToken = token.replace("Bearer ", "");

        const decoded = jwt.decode(replacedToken, process.env.JWT_SECRET);
        if (!decoded.userId) {
            return unauthorized(res, "Invalid token")
        }
        const user = await User.findById(decoded.userId);

        if (!user) {
            return unauthorized(res, "Invalid token")
        }
        req.token = replacedToken;
        req.user = user;
        next();
    } catch (error) {
        return serverError(res, error.message);
    }
}
export default authMiddleware;