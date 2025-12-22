import * as movieService from "./movies.service.js";
import { prisma } from "../../config/db.js";

export const createMovie = async (req, res) => {
  const movie = await movieService.createMovie(req.body);
  res.status(201).json(movie);
};

export const listMovies = async (_req, res) => {
  const movies = await movieService.listMovies();
  res.json(movies);
};

export const getMovie = async (req, res) => {
  const movie = await movieService.getMovieById(req.params.id);
  res.json(movie);
};

export const netflixRows = async (_req, res) => {
  const trending = await prisma.movie.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    where: { isPublished: true },
  });

  const popular = await prisma.movie.findMany({
    orderBy: { rating: "desc" },
    take: 10,
    where: { isPublished: true },
  });

  const newReleases = await prisma.movie.findMany({
    orderBy: { releaseYear: "desc" },
    take: 10,
    where: { isPublished: true },
  });

  res.json({
    trending,
    popular,
    newReleases,
  });
};


export const updateMovie = async (req, res) => {
  try {
    const movie = await movieService.updateMovie(
      req.params.id,
      req.body
    );
    res.json(movie);
  } catch (err) {
    res.status(404).json({ message: "Movie not found" });
  }
};
