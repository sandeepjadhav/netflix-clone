"use client";

import { useRouter } from "next/navigation";

interface Movie {
  id: string;
  title: string;
  thumbnailUrl: string;
}

export default function MovieRow({
  title,
  movies,
}: {
  title: string;
  movies: Movie[];
}) {
  const router = useRouter();

  if (!movies?.length) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-white">{title}</h2>

      <div className="flex gap-4 overflow-x-auto pb-3">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[180px] cursor-pointer hover:scale-105 transition"
            onClick={() => router.push(`/movies/${movie.id}`)}
          >
            <img
              src={movie.thumbnailUrl}
              alt={movie.title}
              className="rounded-md h-[120px] w-full object-cover"
            />
            <p className="mt-2 text-sm text-white truncate">{movie.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
