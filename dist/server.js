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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./models/index"); // Update the import path based on your file structure
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
// Initialize all models and create tables if they don't exist
const PORT = process.env.PORT || 3000;
function initDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield index_1.sequelize.sync({ force: false }); // Use { force: true } with caution as it will drop tables before recreating them
            console.log("Connection to the database has been established successfully.");
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    });
}
initDB();
app_1.default.listen(PORT, () => console.log(`Server running on port ${PORT}`));
