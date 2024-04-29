import express from "express";
import authMiddleware from "../app/middlwares/authMiddleware.js";
import { destroy, update, updatePassword } from "../app/controllers/userController.js";

const router = express.Router();

router.post("/update", authMiddleware, update);
router.post("/password", authMiddleware, updatePassword);
router.post("/destroy", authMiddleware, destroy);

export default router;
