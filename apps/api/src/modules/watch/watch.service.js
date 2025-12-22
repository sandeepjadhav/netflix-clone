import { prisma } from "../../config/db.js";

export const saveProgress = async ({
  userId,
  movieId,
  progressSec,
  durationSec,
}) => {
  const completed = progressSec >= durationSec - 10;

  return prisma.watchHistory.upsert({
    where: {
      userId_movieId: {
        userId,
        movieId,
      },
    },
    update: {
      progressSec,
      durationSec,
      completed,
    },
    create: {
      userId,
      movieId,
      progressSec,
      durationSec,
      completed,
    },
  });
};

export const getResumePoint = async (userId, movieId) => {
  return prisma.watchHistory.findUnique({
    where: {
      userId_movieId: {
        userId,
        movieId,
      },
    },
  });
};

export const getContinueWatching = async (userId) => {
  return prisma.watchHistory.findMany({
    where: {
      userId,
      completed: false,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      movie: true,
    },
    take: 10,
  });
};
