import { processVideo } from "./video.service.js";

export const uploadVideo = async (req, res) => {
  const result = await processVideo(req.file);
  res.json(result);
};
