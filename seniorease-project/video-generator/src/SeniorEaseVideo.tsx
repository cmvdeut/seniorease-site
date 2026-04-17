import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { Intro } from "./components/Intro";
import { Outro } from "./components/Outro";
import { TextSlide } from "./components/TextSlide";
import { VideoScript } from "./types";
import { getOutroOffset, getSlideOffsets } from "./utils";

const INTRO_SEC = 3;
const OUTRO_SEC = 5;

export const SeniorEaseVideo = ({ script }: { script: VideoScript }) => {
  const { fps } = useVideoConfig();

  const introDuration = INTRO_SEC * fps;
  const outroDuration = OUTRO_SEC * fps;
  const slideOffsets = getSlideOffsets(script, fps);
  const outroOffset = getOutroOffset(script, fps);

  return (
    <AbsoluteFill style={{ backgroundColor: "#F5EEE6" }}>
      {/* Optionele TTS audio */}
      {script.audioFile && (
        <Audio src={staticFile(script.audioFile)} />
      )}

      {/* Intro */}
      <Sequence from={0} durationInFrames={introDuration}>
        <Intro title={script.videoTitle} />
      </Sequence>

      {/* Content slides */}
      {script.slides.map((slide, i) => {
        const slideDuration = Math.round(slide.durationInSeconds * fps);
        return (
          <Sequence key={i} from={slideOffsets[i]} durationInFrames={slideDuration}>
            <TextSlide
              slide={slide}
              slideNumber={i + 1}
              totalSlides={script.slides.length}
            />
          </Sequence>
        );
      })}

      {/* Outro */}
      <Sequence from={outroOffset} durationInFrames={outroDuration}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
