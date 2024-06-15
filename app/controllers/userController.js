import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import UserResource from "../resources/userResource.js";
import { requestError, serverError, succes, unauthorized } from "../../uitls/response.js";
import { userDestroyRequest, userUpdateDataRequest, userUpdatePasswordRequest } from "../requests/authRequest.js";

export const update = async (req, res) => {
    try {
        const updateData = req.body;
        const { error } = userUpdateDataRequest.validate(updateData);
        if (error) {
            return requestError(error, error.message);
        }
        const user = await User.findByIdAndUpdate(req.user._id, {
            name: updateData.name,
            email: updateData.email,
        }, { new: true });
        const data = new UserResource(user);
        return succes(res, data, "User updated");

    } catch (error) {
        return serverError(res, error.message);
    }
}
export const updatePassword = async (req, res) => {
    try {
        const updatePassword = req.body;
        const { error } = userUpdatePasswordRequest.validate(updatePassword);
        if (error) {
            return requestError(res, error.message);
        }
        const isCheck = req.user.checkPassword(updatePassword.old_password);
        if (!isCheck) {
            return unauthorized(res, "Password incorrect");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(updatePassword.password, salt);
        const user = await User.findByIdAndUpdate(req.user._id, {
            password: hashedPassword,
        }, { new: true });
        const data = new UserResource(user);
        return succes(res, data, "User password updated");

    } catch (error) {
        return serverError(res, error.message);
    }
}
export const destroy = async (req, res) => {
    try {
        const passwords = req.body;
        const { error } = userDestroyRequest.validate(passwords);
        if (error) {
            return requestError(res, error.message);
        }
        const isCheck = req.user.checkPassword(passwords.password);
        if (!isCheck) {
            return unauthorized(res, "Password incorrect");
        }
        await User.findByIdAndDelete(req.user._id);
        return succes(res, data, "User deleted");
    } catch (error) {
        return serverError(res, error.message);
    }
}