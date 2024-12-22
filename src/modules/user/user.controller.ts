import { Request, Response } from "express";
import * as UserService from "./user.service";
import logger from "@config/logger";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info("Fetching all users...");
    const users = await UserService.getAllUsers();
    logger.info(`Fetched ${users.length} users.`);
    res.json(users);
  } catch (error) {
    logger.error("Error getting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      logger.warn("Invalid userId provided.");
      res.status(400).json({ error: "Invalid userId" });
      return;
    }

    logger.info(`Fetching user with ID: ${userId}`);
    const user = await UserService.getUserById(userId);
    if (!user) {
      logger.warn(`User not found with ID: ${userId}`);
      res.status(404).json({ error: "User not found" });
      return;
    }

    logger.info(`Successfully fetched user with ID: ${userId}`);
    res.json(user);
  } catch (error) {
    logger.error("Error getting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
