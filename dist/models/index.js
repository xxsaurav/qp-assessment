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
exports.OrderItem = exports.GroceryItem = exports.Order = exports.User = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const order_1 = require("./order");
Object.defineProperty(exports, "Order", { enumerable: true, get: function () { return order_1.Order; } });
const groceryItem_1 = require("./groceryItem"); // Importing the GroceryItem model
Object.defineProperty(exports, "GroceryItem", { enumerable: true, get: function () { return groceryItem_1.GroceryItem; } });
const orderItem_1 = require("./orderItem");
Object.defineProperty(exports, "OrderItem", { enumerable: true, get: function () { return orderItem_1.OrderItem; } });
// Database connection settings
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
// Creating a new Sequelize instance with our MySQL database information
const sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: "mysql",
    logging: false, // You can set it to console.log for debugging purposes
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
exports.sequelize = sequelize;
// Helper function to check the database connection
const checkDatabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log("Connection to the database has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
// Initialize all models here
const initModels = () => {
    (0, user_1.initUser)(sequelize);
    (0, order_1.initOrder)(sequelize);
    (0, groceryItem_1.initGroceryItem)(sequelize);
    (0, orderItem_1.initOrderItem)(sequelize);
};
// Checking database connection and initializing models
const initialize = () => __awaiter(void 0, void 0, void 0, function* () {
    yield checkDatabaseConnection();
    initModels();
    order_1.Order.belongsToMany(groceryItem_1.GroceryItem, { through: "OrderGroceryItems" });
    groceryItem_1.GroceryItem.belongsToMany(order_1.Order, { through: "OrderGroceryItems" });
    order_1.Order.belongsToMany(groceryItem_1.GroceryItem, {
        through: orderItem_1.OrderItem,
        foreignKey: "orderId",
    });
    groceryItem_1.GroceryItem.belongsToMany(order_1.Order, {
        through: orderItem_1.OrderItem,
        foreignKey: "groceryItemId",
    });
    order_1.Order.hasMany(orderItem_1.OrderItem, { foreignKey: "orderId" });
    orderItem_1.OrderItem.belongsTo(order_1.Order, { foreignKey: "orderId" });
    groceryItem_1.GroceryItem.hasMany(orderItem_1.OrderItem, { foreignKey: "groceryItemId" });
    orderItem_1.OrderItem.belongsTo(groceryItem_1.GroceryItem, { foreignKey: "groceryItemId" });
    // You might also want to sync models with the database here
});
initialize();
