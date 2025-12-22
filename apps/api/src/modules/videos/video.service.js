import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

export const processVideo = async (file) => {
  const videoId = uuid();
  const outputDir = path.join("infra/videos", videoId);

  fs.mkdirSync(outputDir, { recursive: true });

  const args = [
    "-y",
    "-i", file.path,

    // Normalize for max compatibility
    "-pix_fmt", "yuv420p",
    "-profile:v", "baseline",
    "-level", "3.0",

    "-c:v", "libx264",
    "-c:a", "aac",
    "-ar", "48000",

    "-f", "hls",
    "-hls_time", "6",
    "-hls_playlist_type", "vod",

    path.join(outputDir, "index.m3u8"),
  ];

  await new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", args);

    ffmpeg.stderr.on("data", (data) => {
      console.log(data.toString()); // keep logs
    });

    ffmpeg.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}`));
    });
  });

  return {
    videoId,
    hlsUrl: `http://localhost:8088/videos/${videoId}/index.m3u8`,
  };
};
