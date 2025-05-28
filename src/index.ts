import express from "express";
import prisma from "./config/prisma";
import dotenv from "dotenv";
import subscriptionRouter from "./routes/subscriptionRoutes";
import planRouter from "./routes/planRoutes";
import authRouter from "./routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/subscriptions", subscriptionRouter);
app.use("/plans", planRouter);
app.use("/auth", authRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(errorHandler);