"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function MoviePlayerClient({
  movieId,
}: {
  movieId: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const init = async () => {
      const token = getToken();
      if (!token) return;

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Fetch movie
      const movieRes = await api.get(`/movies/${movieId}`);
      const movie = movieRes.data;

      // Fetch resume point
      const resumeRes = await api.get(`/watch/resume/${movieId}`);
      const resume = resumeRes.data;

      if (!videoRef.current) return;

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(movie.videoUrl);
        hls.attachMedia(videoRef.current);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (resume?.progressSec) {
            videoRef.current!.currentTime = resume.progressSec;
          }
        });
      } else {
        videoRef.current.src = movie.videoUrl;
      }
    };

    init();
  }, [movieId]);

  // Auto-save progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const saveProgress = async () => {
      await api.post("/watch/progress", {
        movieId,
        progressSec: Math.floor(video.currentTime),
        durationSec: Math.floor(video.duration),
      });
    };

    const interval = setInterval(saveProgress, 15000);
    return () => clearInterval(interval);
  }, [movieId]);

  return (
    <div className="p-6">
      <video
        ref={videoRef}
        controls
        className="w-full max-w-4xl mx-auto"
      />
    </div>
  );
}
