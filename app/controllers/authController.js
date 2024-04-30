import { loginRequest, registerRequest } from "../requests/authRequest.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import UserResource from "../resources/userResource.js";

export const login = async (req, res) => {
    try {
        const loginData = req.body;
        const { email, password } = req.body;
        const { error } = loginRequest.validate(loginData);
        if (error) {
            return res.status(400).json({
                tatus: false,
                data: [],
                token: null,
                message: error.message
            });
        } else {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    status: false,
                    data: [],
                    token: null,
                    message: "Data incorrect"
                });
            }
            const isCheck = user.checkPassword(password);
            if (isCheck) {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
                    expiresIn: "2d"
                });
                const data = new UserResource(user);
                return res.status(200).json({
                    status: true,
                    data: data,
                    token: token,
                    message: "Account logged in"
                });
            }
            return res.status(401).json({
                status: false,
                data: [],
                token: null,
                message: "Data incorrect"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            data: [],
            token: null,
            message: error.message
        });
    }
}
export const register = async (req, res) => {
    try {
        const registerData = req.body;
        const { name, email, password } = req.body;
        const { error } = registerRequest.validate(registerData);
        if (error) {
            return res.status(400).json({
                status: false,
                data: [],
                token: null,
                message: error.message
            });
        } else {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(500).json({
                    status: false,
                    data: [],
                    token: null,
                    message: `${email} alredy exsist`
                });
            }
            const newUser = new User({
                name, email, password
            });
            user = await newUser.save();
            const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
                expiresIn: "2d"
            });
            const data = new UserResource(user);
            return res.status(201).json({
                status: true,
                date: data,
                token: token,
                message: "Created"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            data: [],
            token: null,
            message: error.message
        });
    }
}
export const logout = async (req, res) => {

}
export const user = async (req, res) => {
    try {
        const data = new UserResource(req.user);
        return res.status(200).json({
            status: true,
            data: data,
            message: "User"
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            data: [],
            message: error.message
        });
    }
}
export const verify = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.userVerify();
        const data = new UserResource(user);
        return res.status(200).json({
            status: true,
            data: data,
            message: "User"
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            data: [],
            message: error.message
        });
    }
}