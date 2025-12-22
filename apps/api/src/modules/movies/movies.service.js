import { prisma } from "../../config/db.js";

export const createMovie = async (data) => {
  const { genres, ...movieData } = data;

  return prisma.movie.create({
    data: {
      ...movieData,
      genres: {
        create: genres.map((genreId) => ({
          genre: { connect: { id: genreId } },
        })),
      },
    },
  });
};

export const listMovies = async () => {
  return prisma.movie.findMany({
    where: { isPublished: true },
    include: {
      genres: { include: { genre: true } },
    },
  });
};

export const getMovieById = async (id) => {
  return prisma.movie.findUnique({
    where: { id },
    include: {
      genres: { include: { genre: true } },
    },
  });
};

export const updateMovie = async (id, data) => {
  return prisma.movie.update({
    where: { id },
    data,
  });
};

