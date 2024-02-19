import { initialize, sequelize } from "./models";
import { User, initUser } from "./models/user";
import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT || 3000;

async function initDB() {
  try {
    await sequelize.sync({ force: false });

    console.log("Connection to the database has been established successfully");
    await initialize();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

initDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
