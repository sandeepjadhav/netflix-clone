import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

// export const processVideo = async (file) => {
//   const videoId = uuid();
//   const outputDir = path.join("infra/videos", videoId);

//   fs.mkdirSync(outputDir, { recursive: true });

//   const args = [
//     "-y",
//     "-i", file.path,

//     // Normalize for max compatibility
//     "-pix_fmt", "yuv420p",
//     "-profile:v", "baseline",
//     "-level", "3.0",

//     "-c:v", "libx264",
//     "-c:a", "aac",
//     "-ar", "48000",

//     "-f", "hls",
//     "-hls_time", "6",
//     "-hls_playlist_type", "vod",

//     path.join(outputDir, "index.m3u8"),
//   ];

//   await new Promise((resolve, reject) => {
//     const ffmpeg = spawn("ffmpeg", args);

//     ffmpeg.stderr.on("data", (data) => {
//       console.log(data.toString()); // keep logs
//     });

//     ffmpeg.on("close", (code) => {
//       if (code === 0) resolve();
//       else reject(new Error(`FFmpeg exited with code ${code}`));
//     });
//   });

//   return {
//     videoId,
//     hlsUrl: `http://localhost:8088/videos/${videoId}/index.m3u8`,
//   };
// };



// import { spawn } from "child_process";
// import fs from "fs";
// import path from "path";
// import { v4 as uuid } from "uuid";
import { uploadDirectory } from "../../utils/uploadToMinio.js";
import { BUCKET_NAME } from "../../config/minio.js";

export const processVideo = async (file) => {
  const videoId = uuid();

  const absoluteBasePath = path.resolve('/media/sandeep/Entertainment/netflix-clone', 'infra', 'videos');
  // Local temp directory (FFmpeg output)
  const localOutputDir = path.join(absoluteBasePath, videoId);
  fs.mkdirSync(localOutputDir, { recursive: true });

  // FFmpeg args (single HLS, max compatibility)
  const ffmpegArgs = [
    "-y",
    "-i",
    file.path,

    // Normalize output (very important)
    "-pix_fmt",
    "yuv420p",
    "-profile:v",
    "baseline",
    "-level",
    "3.0",

    // Video + audio codecs
    "-c:v",
    "libx264",
    "-c:a",
    "aac",
    "-ar",
    "48000",

    // HLS config
    "-f",
    "hls",
    "-hls_time",
    "6",
    "-hls_playlist_type",
    "vod",

    path.join(localOutputDir, "index.m3u8"),
  ];

  // Run FFmpeg
  await new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", ffmpegArgs);

    ffmpeg.stderr.on("data", (data) => {
      // Keep logs – extremely useful for debugging
      console.log(data.toString());
    });

    ffmpeg.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}`));
    });
  });

  // Upload HLS folder to MinIO (videos/<videoId>/...)
  await uploadDirectory(localOutputDir, videoId);

  // Cleanup local temp files (Netflix-style)
  fs.rmSync(localOutputDir, { recursive: true, force: true });

  return {
    videoId,
    hlsUrl: `http://localhost:9000/${BUCKET_NAME}/${videoId}/index.m3u8`,
  };
};
