import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

const connect = () => {
    try {
        mongoose.connect(MONGO_URL);
    } catch (error) {
        console.log(error);
    }
}

const db = mongoose.connection;

db.once("open", () => {
    console.log("Connected to MongoDB");
});

db.on("error", (error) => {
    console.error(error);
});

export default connect;