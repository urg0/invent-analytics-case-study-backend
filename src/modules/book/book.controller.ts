import { Request, Response } from "express";
import * as BookService from "./book.service";
import logger from "@config/logger";

export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info("Fetching all books...");
    const books = await BookService.getAllBooks();
    logger.info(`Successfully fetched ${books.length} books.`);
    res.status(200).json(books);
  } catch (error) {
    logger.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const bookId = parseInt(req.params.id, 10);
    if (isNaN(bookId)) {
      logger.warn("Invalid bookId provided.");
      res.status(400).json({ error: "Invalid bookId" });
      return;
    }

    logger.info(`Fetching details for book with ID: ${bookId}`);
    const book = await BookService.getBookDetailsById(bookId);
    if (!book) {
      logger.warn(`Book not found with ID: ${bookId}`);
      res.status(404).json({ error: "Book not found" });
      return;
    }

    logger.info(`Successfully fetched book details for ID: ${bookId}`);
    res.status(200).json(book);
  } catch (error) {
    logger.error(`Error fetching book with ID: ${req.params.id}`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
