import express from "express";
import catchAsyncError from "../middlewares/catchAsyncError";
import {
  addGroceryItem,
  manageInventory,
  removeGroceryItem,
  updateGroceryItem,
  viewGroceryItems,
} from "../controllers/groceryItemController";

const router = express.Router();

router.post("/", catchAsyncError(addGroceryItem));
router.get("/", catchAsyncError(viewGroceryItems));
router.put("/:id", catchAsyncError(updateGroceryItem));
router.delete("/:id", catchAsyncError(removeGroceryItem));
router.patch("/inventory", catchAsyncError(manageInventory));

export default router;
