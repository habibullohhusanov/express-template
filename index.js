import express from "express";
import connect from "./config/dbConfig.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";

// .env

const PORT = process.env.PORT;
const URL = process.env.URL;

// start
const app = express();

// middlwares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: [],
        message: "Working"
    });
});

// end
app.listen(PORT, () => {
    connect();
    console.log(`Started ${URL}:${PORT}`);
});