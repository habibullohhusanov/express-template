import { serverError, unauthorized } from "../../uitls/response.js";

const adminMiddleware = async (req, res, next) => {
    try {
        const role = req.user.role;

        if (role == "admin") {
            return next();
        }

        return unauthorized(res);
    } catch (error) {
        return serverError(res, error.message);
    }
}
export default adminMiddleware;