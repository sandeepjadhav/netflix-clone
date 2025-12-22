"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface ContinueItem {
  movie: {
    id: string;
    title: string;
    thumbnailUrl: string;
  };
  progressSec: number;
  durationSec: number;
}

export default function ContinueWatchingRow() {
  const [items, setItems] = useState<ContinueItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const token = getToken();
      if (!token) return;

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const res = await api.get("/watch/continue");
      setItems(res.data);
    };

    load();
  }, []);

  if (!items.length) return null;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3 text-white">
        Continue Watching
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((item) => {
          const progress = (item.progressSec / item.durationSec) * 100;

          return (
            <div
              key={item.movie.id}
              className="min-w-[220px] cursor-pointer"
              onClick={() => router.push(`/movies/${item.movie.id}`)}
            >
              <div className="relative">
                <img
                  src={item.movie.thumbnailUrl}
                  alt={item.movie.title}
                  className="rounded-md w-full h-[130px] object-cover"
                />

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                  <div
                    className="h-1 bg-red-600"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <p className="mt-2 text-sm text-white truncate">
                {item.movie.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
