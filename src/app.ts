import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import groceryRoutes from "./routes/groceryRoutes";
import orderRoutes from "./routes/orderRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/grocery-items", groceryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

app.use(errorMiddleware);
export default app;
