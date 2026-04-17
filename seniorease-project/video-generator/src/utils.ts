import { VideoScript } from "./types";

const INTRO_SEC = 3;
const OUTRO_SEC = 5;

export const calculateDuration = (script: VideoScript, fps: number = 30): number => {
  const introDuration = INTRO_SEC * fps;
  const outroDuration = OUTRO_SEC * fps;
  const slidesDuration = script.slides.reduce(
    (acc, slide) => acc + Math.round(slide.durationInSeconds * fps),
    0
  );
  return introDuration + slidesDuration + outroDuration;
};

export const getSlideOffsets = (script: VideoScript, fps: number = 30): number[] => {
  const introDuration = INTRO_SEC * fps;
  const offsets: number[] = [];
  let current = introDuration;
  for (const slide of script.slides) {
    offsets.push(current);
    current += Math.round(slide.durationInSeconds * fps);
  }
  return offsets;
};

export const getOutroOffset = (script: VideoScript, fps: number = 30): number => {
  const offsets = getSlideOffsets(script, fps);
  if (offsets.length === 0) return INTRO_SEC * fps;
  const lastOffset = offsets[offsets.length - 1];
  const lastSlide = script.slides[script.slides.length - 1];
  return lastOffset + Math.round(lastSlide.durationInSeconds * fps);
};
