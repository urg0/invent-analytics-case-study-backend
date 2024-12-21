import { Router, Request, Response } from "express";
import env from "@config/env";
import prisma from "@config/prisma";

const router = Router();

router.get("/health", async (req: Request, res: Response) => {
  const isDbConnected = await checkDatabaseConnection();

  res.status(200).json({
    status: "UP",
    environment: env.NODE_ENV,
    database: isDbConnected ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString(),
  });
});

async function checkDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
}

export default router;
