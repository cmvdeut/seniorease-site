export type PhoneScreenType = "chat-list" | "chat" | "attachment-menu" | "calling";
export type TapElement =
  | "chat-item"
  | "new-chat-fab"
  | "attachment"
  | "send-button"
  | "type-field"
  | "phone-icon"
  | "video-icon"
  | "call-button";

export interface PhoneScreen {
  type: PhoneScreenType;
  tapElement?: TapElement;
  tapDelay?: number; // frames voor tap verschijnt, standaard 25
}

export interface Slide {
  title: string;
  points: string[];
  durationInSeconds: number;
  screenshot?: string; // optioneel: bestandsnaam in public/screenshots/ bijv. "stap1.png"
  phoneScreen?: PhoneScreen; // optioneel: geanimeerde smartphone mockup
}

export interface VideoScript {
  videoTitle: string;
  slides: Slide[];
  audioFile?: string; // optioneel: TTS audio bestand in public/
}
