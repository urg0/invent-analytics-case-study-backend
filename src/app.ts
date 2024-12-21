import express, { Application } from "express";

import morgan from "morgan";
import cors from "cors";
import logger from "@config/logger";

import SystemRoutes from "routes/system";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const morganStream = {
  write: (message: string) => logger.info(message.trim()),
};
app.use(morgan("combined", { stream: morganStream }));

app.use("/system", SystemRoutes);

export default app;
