"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}

export default function HeroBanner() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/movies/rows/home");
      const trending = res.data.trending;

      if (trending?.length) {
        setMovie(trending[0]); // ⭐ featured movie
      }
    };

    load();
  }, []);

  if (!movie) return null;

  return (
    <section className="relative h-[70vh] w-full text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.thumbnailUrl})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-10 max-w-3xl">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            {movie.title}
          </h1>

          <p className="text-sm md:text-base text-gray-300 line-clamp-3">
            {movie.description}
          </p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => router.push(`/movies/${movie.id}`)}
              className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200"
            >
              ▶ Play
            </button>

            <button
              onClick={() => router.push(`/movies/${movie.id}`)}
              className="bg-gray-700/70 px-6 py-2 rounded font-semibold hover:bg-gray-600"
            >
              ℹ More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
