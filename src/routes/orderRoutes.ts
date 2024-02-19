import express from "express";
import catchAsyncError from "../middlewares/catchAsyncError";
import { listAllOrders, placeOrder } from "../controllers/orderController";
import { listUserOrders } from "../controllers/userController";

const router = express.Router();

router.post("/", catchAsyncError(placeOrder));

router.get("/", catchAsyncError(listAllOrders));
router.get("/:userId", catchAsyncError(listUserOrders));
export default router;
