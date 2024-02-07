import jwt from "jsonwebtoken";
import User from "../models/userModel.js"

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: false,
                data: [],
                token: null,
                message: `Data incorrect`,
            });
        }
        let isCheck = user.checkPassword(password);
        if (isCheck) {
            const token = jwt.sign({userId: user._id}, process.env.JWT_TOKEN, {
                expiresIn: "1d"
            });
            return res.status(200).json({
                status: true,
                data: user,
                token: token,
                message: "User"
            });
        }
        return res.status(401).json({
            status: false,
            data: [],
            token: null,
            message: `Data incorrect`,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            data: [],
            token: null,
            message: error.message + " catch",
        });
    }
}
// export const logout = async (req, res) => {
//    //
// }
export const user = async (req, res) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findOne({ _id: decoded.userId });
        if (!user) {
            return res.status(401).json({
                status: false,
                data: [],
                message: `Not authorized. Invalid token.`,
            });
        } else {
            return res.status(200).json({
                status: true,
                data: user,
                message: `User finded`,
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            data: [],
            message: error.message + " catch",
        });
    }
}
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(500).json({
                status: false,
                data: [],
                token: null,
                message: `${email} email allready exsist`,
            });
        }
        const newUser = new User({
            name, email, password
        });
        user = await newUser.save();
        const token = jwt.sign({userId: user._id}, process.env.JWT_TOKEN, {
            expiresIn: "1d"
        });
        return res.status(201).json({
            status: true,
            data: user,
            token: token,
            message: "Yaratildi"
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            data: [],
            token: null,
            message: error.message,
        });
    }
}