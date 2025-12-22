import { prisma } from "../../config/db.js";

export const createGenre = async (req, res) => {
  try {
    const genre = await prisma.genre.create({
      data: {
        name: req.body.name,
      },
    });

    res.status(201).json(genre);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}
export const listGenres = async (_req, res) => {
  const genres = await prisma.genre.findMany();
  res.json(genres);
};
