import User from "../app/models/userModel.js";

const userSeeder = async () => {
    try {
        await User.deleteMany({});
        var user = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: "2407",
            isAdmin: true
        });
        user.userVerify();
        await user.save();
    } catch (error) {
        console.error("User seeder don\'t work:", error);
    }
}

export default userSeeder;