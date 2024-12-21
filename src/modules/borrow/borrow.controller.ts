import { Request, Response } from "express";
import * as BorrowService from "./borrow.service";
import logger from "@config/logger";

export const borrowBook = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId, bookId } = req.params;

    logger.info(
      `Received borrow request for userId: ${userId}, bookId: ${bookId}`,
    );

    const parsedUserId = parseInt(userId, 10);
    const parsedBookId = parseInt(bookId, 10);

    if (isNaN(parsedUserId) || isNaN(parsedBookId)) {
      logger.warn(`Invalid parameters. userId: ${userId}, bookId: ${bookId}`);
      res.status(400).json({ error: "Invalid userId or bookId" });
      return;
    }

    logger.info(`Parsed userId: ${parsedUserId}, bookId: ${parsedBookId}`);

    const result = await BorrowService.borrowBook(parsedUserId, parsedBookId);

    if (!result.success) {
      logger.error(
        `Borrow operation failed for userId: ${parsedUserId}, bookId: ${parsedBookId}. Reason: ${result.message}`,
      );
      res.status(result.status).json({ error: result.message });
      return;
    }

    logger.info(
      `Borrow operation successful for userId: ${parsedUserId}, bookId: ${parsedBookId}`,
    );

    res.status(200).json({
      message: "Book borrowed successfully",
    });
  } catch (error) {
    logger.error("Error during borrow operation", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const returnBook = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId, bookId } = req.params;
    const { score } = req.body;

    logger.info(
      `Received return request for userId: ${userId}, bookId: ${bookId}, score: ${score}`,
    );

    const parsedUserId = parseInt(userId, 10);
    const parsedBookId = parseInt(bookId, 10);

    if (score === undefined || score === null || isNaN(parseInt(score, 10))) {
      logger.warn(`Invalid or missing score: ${score}`);
      res.status(400).json({ error: "Score is required and must be a number" });
      return;
    }

    const parsedScore = parseInt(score, 10);

    if (isNaN(parsedUserId) || isNaN(parsedBookId)) {
      logger.warn(
        `Invalid parameters. userId: ${userId}, bookId: ${bookId}, score: ${score}`,
      );
      res.status(400).json({ error: "Invalid userId or bookId" });
      return;
    }

    logger.info(
      `Parsed userId: ${parsedUserId}, bookId: ${parsedBookId}, score: ${parsedScore}`,
    );

    const result = await BorrowService.returnBook(
      parsedUserId,
      parsedBookId,
      parsedScore,
    );

    if (!result.success) {
      logger.error(
        `Return operation failed for userId: ${parsedUserId}, bookId: ${parsedBookId}. Reason: ${result.message}`,
      );
      res.status(result.status ?? 500).json({ error: result.message });
      return;
    }

    logger.info(
      `Return operation successful for userId: ${parsedUserId}, bookId: ${parsedBookId}, score: ${parsedScore}`,
    );

    res.status(200).json({
      message: "Book returned successfully",
    });
  } catch (error) {
    logger.error("Error during return operation", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
