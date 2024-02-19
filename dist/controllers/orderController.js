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
exports.listAllOrders = exports.placeOrder = void 0;
const order_1 = require("../models/order");
const orderItem_1 = require("../models/orderItem");
const groceryItem_1 = require("../models/groceryItem");
const placeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, items } = req.body; // Expecting items to be an array of { groceryItemId, quantity }
    // Create order
    const order = yield order_1.Order.create({ userId });
    // Create order items
    const orderItems = items.map((item) => (Object.assign(Object.assign({}, item), { orderId: order.id })));
    yield orderItem_1.OrderItem.bulkCreate(orderItems);
    return res.status(201).json({ order, orderItems });
});
exports.placeOrder = placeOrder;
const listAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_1.Order.findAll({
        include: [{ model: orderItem_1.OrderItem, include: [groceryItem_1.GroceryItem] }],
    });
    return res.status(200).json(orders);
});
exports.listAllOrders = listAllOrders;
