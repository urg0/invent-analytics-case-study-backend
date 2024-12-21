import { PrismaClient } from "@prisma/client";
import logger from "@config/logger";

const prisma = new PrismaClient();

export const borrowBook = async (
  userId: number,
  bookId: number,
): Promise<{ success: boolean; message: string; status: number }> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      logger.warn(`User not found with ID: ${userId}`);
      return { success: false, message: "User not found", status: 404 };
    }

    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) {
      logger.warn(`Book not found with ID: ${bookId}`);
      return { success: false, message: "Book not found", status: 404 };
    }

    const isBookBorrowed = await prisma.borrowHistory.findFirst({
      where: {
        bookId,
        returnedAt: null,
      },
    });

    if (isBookBorrowed) {
      logger.warn(`Book (ID: ${bookId}) is already borrowed.`);
      return {
        success: false,
        message: "Book is already borrowed",
        status: 400,
      };
    }

    await prisma.borrowHistory.create({
      data: {
        userId,
        bookId,
        borrowedAt: new Date(),
      },
    });

    logger.info(
      `Borrow record created for User (ID: ${userId}) and Book (ID: ${bookId}).`,
    );
    return {
      success: true,
      message: "Book borrowed successfully",
      status: 204,
    };
  } catch (error) {
    logger.error("Error during borrow operation:", error);
    return { success: false, message: "Internal Server Error", status: 500 };
  }
};

export async function returnBook(
  userId: number,
  bookId: number,
  score?: number,
) {
  logger.info(
    `Processing return for userId: ${userId}, bookId: ${bookId}, score: ${score}`,
  );

  const borrowRecord = await prisma.borrowHistory.findFirst({
    where: {
      userId,
      bookId,
      returnedAt: null,
    },
  });

  if (!borrowRecord) {
    logger.warn(
      `No active borrow record found for userId: ${userId}, bookId: ${bookId}`,
    );
    return {
      success: false,
      status: 404,
      message: "Borrow record not found",
    };
  }

  try {
    await prisma.borrowHistory.update({
      where: { id: borrowRecord.id },
      data: {
        returnedAt: new Date(),
        ...(score !== undefined && { rating: score }),
      },
    });

    logger.info(
      `Successfully returned bookId: ${bookId} for userId: ${userId}`,
    );

    return { success: true };
  } catch (error) {
    logger.error("Error updating borrow record", error);
    return {
      success: false,
      status: 500,
      message: "Error updating borrow record",
    };
  }
}
