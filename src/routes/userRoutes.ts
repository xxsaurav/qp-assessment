import express from "express";
import catchAsyncError from "../middlewares/catchAsyncError";
import { createUser, getAllUsers } from "../controllers/userController";

const router = express.Router();

router.post("/", catchAsyncError(createUser));
router.get("/", catchAsyncError(getAllUsers));
export default router;
