import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const users = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    emailVerifiedAt: {
        type: String,
        required: false,
        default: null
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    },
    // roleId: {
    //     type: Number,
    //     required: false,
    //     default: 2
    // }
},
{
    timestamps: true,
});

// HASH
users.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});

// Check password
users.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

// Export
const User = mongoose.model("User", users);
export default User;