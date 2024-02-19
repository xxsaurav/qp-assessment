import { Sequelize } from "sequelize";
import { initUser, User } from "./user";
import { initOrder, Order } from "./order";
import { initGroceryItem, GroceryItem } from "./groceryItem";
import { initOrderItem, OrderItem } from "./orderItem";

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPass = process.env.DB_PASSWORD as string;
const dbHost = process.env.DB_HOST as string;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: "mysql",
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
const checkDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const initModels = () => {
  initUser(sequelize);
  initOrder(sequelize);
  initGroceryItem(sequelize);
  initOrderItem(sequelize);
};

const initialize = async () => {
  await checkDatabaseConnection();
  initModels();
  Order.belongsToMany(GroceryItem, { through: "OrderGroceryItems" });
  GroceryItem.belongsToMany(Order, { through: "OrderGroceryItems" });
  Order.belongsToMany(GroceryItem, {
    through: OrderItem,
    foreignKey: "orderId",
  });
  GroceryItem.belongsToMany(Order, {
    through: OrderItem,
    foreignKey: "groceryItemId",
  });
  Order.hasMany(OrderItem, { foreignKey: "orderId" });
  OrderItem.belongsTo(Order, { foreignKey: "orderId" });

  GroceryItem.hasMany(OrderItem, { foreignKey: "groceryItemId" });
  OrderItem.belongsTo(GroceryItem, { foreignKey: "groceryItemId" });

  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User, { foreignKey: "userId" });

  await sequelize.sync({ force: false });
};

export { sequelize, initialize, User, Order, GroceryItem, OrderItem };
