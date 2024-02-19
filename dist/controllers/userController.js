"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUserOrders = exports.createUser = void 0;
const user_1 = require("../models/user");
const groceryItem_1 = require("../models/groceryItem");
const order_1 = require("../models/order");
const orderItem_1 = require("../models/orderItem");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.create(req.body);
    return res.status(201).json(user);
});
exports.createUser = createUser;
const listUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params; // Assuming the user's ID is passed as a param
    const orders = yield order_1.Order.findAll({
        where: { userId },
        include: [{ model: orderItem_1.OrderItem, include: [groceryItem_1.GroceryItem] }],
    });
    return res.status(200).json(orders);
});
exports.listUserOrders = listUserOrders;
