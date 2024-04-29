import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { userDestroyRequest, userUpdateDataRequest, userUpdatePasswordRequest } from "../requests/authRequest.js";
import UserResource from "../resources/userResource.js";

export const update = async (req, res) => {
    try {
        const updateData = req.body;
        const { error } = userUpdateDataRequest.validate(updateData);
        if (error) {
            return res.status(400).json({
                status: false,
                data: [],
                message: error.message
            });
        }
        const user = await User.findByIdAndUpdate(req.user._id, {
            name: updateData.name,
            email: updateData.email,
        }, { new: true });
        const data = new UserResource(user);
        return res.status(200).json({
            status: true,
            data: data,
            message: "User updated"
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            data: [],
            message: error.message
        });
    }
}
export const updatePassword = async (req, res) => {
    try {
        const updatePassword = req.body;
        const { error } = userUpdatePasswordRequest.validate(updatePassword);
        if (error) {
            return res.status(400).json({
                status: false,
                data: [],
                message: error.message
            });
        }
        const isCheck = req.user.checkPassword(updatePassword.old_password);
        if (!isCheck) {
            return res.status(401).json({
                status: false,
                data: [],
                message: "Password incorrect"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(updatePassword.password, salt);
        const user = await User.findByIdAndUpdate(req.user._id, {
            password: hashedPassword,
        }, { new: true });
        const data = new UserResource(user);
        return res.status(200).json({
            status: true,
            data: data,
            message: "User password updated"
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            data: [],
            message: error.message
        });
    }
}
export const destroy = async (req, res) => {
    try {
        const passwords = req.body;
        const { error } = userDestroyRequest.validate(passwords);
        if (error) {
            return res.status(400).json({
                status: false,
                data: [],
                message: error.message
            });
        }
        const isCheck = req.user.checkPassword(passwords.password);
        if (!isCheck) {
            return res.status(401).json({
                status: false,
                data: [],
                message: "Password incorrect"
            });
        }
        await User.findByIdAndDelete(req.user._id);
        return res.status(200).json({
            status: true,
            data: [],
            message: "User deleted"
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            data: [],
            message: error.message
        });
    }
}