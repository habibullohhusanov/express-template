import express from "express";
import { login, logout, register, user, verify } from "../app/controllers/authController.js";
import authMiddleware from "../app/middlwares/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", authMiddleware, logout);
router.get("/user", authMiddleware, user);
router.get("/verify", authMiddleware, verify);

export default router;