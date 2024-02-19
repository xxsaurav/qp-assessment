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
exports.listGroceryItems = exports.addGroceryItem = void 0;
const groceryItem_1 = require("../models/groceryItem");
const addGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield groceryItem_1.GroceryItem.create(req.body);
    return res.status(201).json(item);
});
exports.addGroceryItem = addGroceryItem;
const listGroceryItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield groceryItem_1.GroceryItem.findAll();
    return res.status(200).json(items);
});
exports.listGroceryItems = listGroceryItems;
