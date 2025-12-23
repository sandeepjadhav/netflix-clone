"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import MovieRow from "./movie-row";

interface Movie {
  id: string;
  title: string;
  thumbnailUrl: string;
}

interface RowsResponse {
  trending: Movie[];
  popular: Movie[];
}

export default function MovieRows() {
  const [rows, setRows] = useState<RowsResponse | null>(null);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/movies/rows/home");
      setRows(res.data);
    };

    load();
  }, []);

  if (!rows) return null;

  return (
    <div className="space-y-10">
      <MovieRow title="Trending Now" movies={rows.trending} />
      <MovieRow title="Popular on Netflix" movies={rows.popular} />
    </div>
  );
}
