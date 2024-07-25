import express from "express";
import authMiddleware from "../app/middlwares/authMiddleware.js";
import { login, register, user, verify } from "../app/controllers/authController.js"; // logiut

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
// router.post("/logout", authMiddleware, logout);
router.get("/user", authMiddleware, user);
router.get("/verify", authMiddleware, verify);

export default router;