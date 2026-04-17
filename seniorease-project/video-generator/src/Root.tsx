import { Composition } from "remotion";
import { SeniorEaseVideo } from "./SeniorEaseVideo";
import { whatsappIntroScript } from "./scripts/whatsapp-intro";
import { whatsappBerichtenScript } from "./scripts/whatsapp-berichten";
import { whatsappFotoScript } from "./scripts/whatsapp-foto";
import { whatsappBellenScript } from "./scripts/whatsapp-bellen";
import { whatsappVeiligheidScript } from "./scripts/whatsapp-veiligheid";
import { calculateDuration } from "./utils";

const FPS = 30;

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="WhatsApp-Intro"
        component={SeniorEaseVideo}
        durationInFrames={calculateDuration(whatsappIntroScript, FPS)}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ script: whatsappIntroScript }}
      />
      <Composition
        id="WhatsApp-Berichten"
        component={SeniorEaseVideo}
        durationInFrames={calculateDuration(whatsappBerichtenScript, FPS)}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ script: whatsappBerichtenScript }}
      />
      <Composition
        id="WhatsApp-Fotos"
        component={SeniorEaseVideo}
        durationInFrames={calculateDuration(whatsappFotoScript, FPS)}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ script: whatsappFotoScript }}
      />
      <Composition
        id="WhatsApp-Bellen"
        component={SeniorEaseVideo}
        durationInFrames={calculateDuration(whatsappBellenScript, FPS)}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ script: whatsappBellenScript }}
      />
      <Composition
        id="WhatsApp-Veiligheid"
        component={SeniorEaseVideo}
        durationInFrames={calculateDuration(whatsappVeiligheidScript, FPS)}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ script: whatsappVeiligheidScript }}
      />
    </>
  );
};
