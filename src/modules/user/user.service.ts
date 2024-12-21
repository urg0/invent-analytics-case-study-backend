import { PrismaClient } from "@prisma/client";
import logger from "@config/logger";

const prisma = new PrismaClient();

export async function getAllUsers() {
  try {
    logger.info("Querying all users from the database...");
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    logger.info(`Query returned ${users.length} users.`);
    return users;
  } catch (error) {
    logger.error("Error querying users:", error);
    throw error;
  }
}

export async function getUserById(userId: number) {
  try {
    logger.info(`Querying user with ID: ${userId}`);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true },
    });

    if (!user) {
      logger.warn(`User not found with ID: ${userId}`);
      return null;
    }

    logger.info(`Fetching borrow history for user with ID: ${userId}`);

    const present = await prisma.borrowHistory.findMany({
      where: {
        userId,
        returnedAt: null,
      },
      include: {
        book: {
          include: {
            author: true,
          },
        },
      },
    });

    const past = await prisma.borrowHistory.findMany({
      where: {
        userId,
        NOT: { returnedAt: null },
      },
      include: {
        book: {
          include: {
            author: true,
          },
        },
      },
    });

    logger.info(
      `Successfully fetched borrow history for user with ID: ${userId}`,
    );
    return {
      id: user.id,
      name: user.name,
      books: {
        past: past.map((borrow) => ({
          name: borrow.book.name,
          userScore: borrow.rating ?? 0,
          author: borrow.book.author,
        })),
        present: present.map((borrow) => ({
          name: borrow.book.name,
          author: borrow.book.author,
        })),
      },
    };
  } catch (error) {
    logger.error(`Error fetching user with ID: ${userId}`, error);
    throw error;
  }
}
