import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const users = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 4
        },
        isVerified: {
            type: Date,
            required: false,
            default: null,
        },
        isAdmin: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// password hashing
users.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
    } catch (error) {
        return next(error);
    }
})

// password checking
users.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// user verify
users.methods.userVerify = async function () {
    this.isVerified = Date.now();
    await this.save();
}

// export
const User = mongoose.model("User", users);
export default User;