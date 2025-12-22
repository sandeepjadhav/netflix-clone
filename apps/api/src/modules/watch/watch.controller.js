import * as watchService from "./watch.service.js";

export const saveProgress = async (req, res) => {
  const { movieId, progressSec, durationSec } = req.body;

  const data = await watchService.saveProgress({
    userId: req.user.id,
    movieId,
    progressSec,
    durationSec,
  });

  res.json(data);
};

export const resume = async (req, res) => {
  const { movieId } = req.params;

  const history = await watchService.getResumePoint(
    req.user.id,
    movieId
  );

  res.json(history);
};

export const continueWatching = async (req, res) => {
  const list = await watchService.getContinueWatching(req.user.id);
  res.json(list);
};
