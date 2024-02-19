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
exports.manageInventory = exports.removeGroceryItem = exports.viewGroceryItems = exports.updateGroceryItem = exports.addGroceryItem = void 0;
const groceryItem_1 = require("../models/groceryItem");
const addGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield groceryItem_1.GroceryItem.create(req.body);
        return res.status(201).json(item);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
exports.addGroceryItem = addGroceryItem;
const updateGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [updated] = yield groceryItem_1.GroceryItem.update(req.body, { where: { id } });
        if (updated) {
            const updatedItem = yield groceryItem_1.GroceryItem.findOne({ where: { id } });
            return res.status(200).json(updatedItem);
        }
        throw new Error("Grocery item not found");
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
exports.updateGroceryItem = updateGroceryItem;
const viewGroceryItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield groceryItem_1.GroceryItem.findAll();
        return res.status(200).json(items);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
exports.viewGroceryItems = viewGroceryItems;
const removeGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield groceryItem_1.GroceryItem.destroy({ where: { id } });
        if (deleted) {
            return res.status(204).send();
        }
        throw new Error("Grocery item not found");
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
exports.removeGroceryItem = removeGroceryItem;
const manageInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, inventoryCount } = req.body;
        const [updated] = yield groceryItem_1.GroceryItem.update({ inventoryCount }, { where: { id } });
        if (updated) {
            const updatedItem = yield groceryItem_1.GroceryItem.findOne({ where: { id } });
            return res.status(200).json(updatedItem);
        }
        throw new Error("Grocery item not found");
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
exports.manageInventory = manageInventory;
