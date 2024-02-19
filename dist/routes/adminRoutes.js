"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController = __importStar(require("../controllers/adminController"));
const catchAsyncError_1 = __importDefault(require("../middlewares/catchAsyncError"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// Routes for managing grocery items
// User route to create a new account
router.post("/users", (0, catchAsyncError_1.default)(userController_1.createUser));
router.post("/items", (0, catchAsyncError_1.default)(adminController.addGroceryItem));
router.get("/items", (0, catchAsyncError_1.default)(adminController.viewGroceryItems));
router.put("/items/:id", (0, catchAsyncError_1.default)(adminController.updateGroceryItem));
router.delete("/items/:id", (0, catchAsyncError_1.default)(adminController.removeGroceryItem));
router.patch("/items/inventory", (0, catchAsyncError_1.default)(adminController.manageInventory));
// Route for admin to view all orders
// router.get('/orders', catchAsyncError(adminController.listAllOrders));
exports.default = router;
