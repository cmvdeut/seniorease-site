/** Shared GSAP helpers — matches video-generator TextSlide / Intro / Outro timing. */
function hfAddTitle(tl, id, start) {
  tl.fromTo(id, { opacity: 0, x: -60 }, { opacity: 1, duration: 0.4, ease: "none" }, start);
  tl.fromTo(id, { x: -60 }, { x: 0, duration: 0.5, ease: "none" }, start);
}

function hfAddPoint(tl, id, slideStart, i) {
  const pStart = slideStart + 0.4 + i * 0.6;
  tl.fromTo(id, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.4, ease: "none" }, pStart);
}

function hfAddBadge(tl, id, start) {
  tl.fromTo(id, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.45, ease: "none" }, start + 0.1);
}

function hfAddIntro(tl, logoId, titleWrapId) {
  tl.fromTo(logoId, { scale: 0 }, { scale: 1, duration: 0.7, ease: "back.out(1.2)" }, 0);
  tl.fromTo(titleWrapId, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.667, ease: "none" }, 0.833);
}

function hfAddOutro(tl, innerId, buttonsId, start) {
  tl.fromTo(innerId, { opacity: 0, scale: 0.85 }, { opacity: 1, duration: 0.667, ease: "none" }, start);
  tl.fromTo(innerId, { scale: 0.85 }, { scale: 1, duration: 0.7, ease: "back.out(1.2)" }, start);
  tl.fromTo(buttonsId, { opacity: 0 }, { opacity: 1, duration: 0.667, ease: "none" }, start + 1);
}
