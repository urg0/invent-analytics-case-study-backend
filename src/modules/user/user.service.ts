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
        email: true,
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
      email: user.email,
      birthDate: user.birthDate,
      address: user.address,
      books: {
        past: past.map((borrow) => ({
          book: borrow.book,
          userScore: borrow.rating ?? 0,
        })),
        present: present.map((borrow) => ({
          book: borrow.book,
        })),
      },
    };
  } catch (error) {
    logger.error(`Error fetching user with ID: ${userId}`, error);
    throw error;
  }
}
