import { PrismaClient } from "@prisma/client";
import logger from "@config/logger";

const prisma = new PrismaClient();

export async function getAllBooks() {
  try {
    logger.info("Querying all books from the database...");

    const books = await prisma.book.findMany({
      select: {
        id: true,
        name: true,
        author: true,
        publicationYear: true,
        averageRating: true,
      },
    });

    logger.info(`Query returned ${books.length} books.`);
    return books;
  } catch (error) {
    logger.error("Error querying books:", error);
    throw error;
  }
}

export async function getBookDetailsById(bookId: number) {
  try {
    logger.info(`Querying details for book with ID: ${bookId}`);

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        author: true,
        borrows: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!book) {
      logger.warn(`Book not found with ID: ${bookId}`);
      return null;
    }

    logger.info(`Calculating average rating for book with ID: ${bookId}`);
    const averageRating =
      book.borrows.length > 0
        ? book.borrows.reduce((sum, b) => sum + (b.rating || 0), 0) /
          book.borrows.length
        : null;

    logger.info(`Successfully fetched book details for ID: ${bookId}`);

    return {
      id: book.id,
      name: book.name,
      author: book.author,
      description: book.description,
      isBestSeller: book.isBestSeller,
      language: book.language,
      pageCount: book.pageCount,
      publicationYear: book.publicationYear,
      averageRating,
      borrows: book.borrows.map((borrow) => ({
        id: borrow.id,
        user: {
          id: borrow.user.id,
          name: borrow.user.name,
        },
        borrowedAt: borrow.borrowedAt,
        returnedAt: borrow.returnedAt,
        rating: borrow.rating,
      })),
    };
  } catch (error) {
    logger.error(`Error fetching details for book with ID: ${bookId}`, error);
    throw error;
  }
}
