"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUser = exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
function initUser(sequelize) {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new sequelize_1.DataTypes.STRING(255),
            unique: true,
            allowNull: false,
        },
        password: {
            type: new sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        tableName: "users",
        sequelize,
    });
}
exports.initUser = initUser;
