#!/usr/bin/env node
/**
 * Kopieer lesmateriaal-PDF's naar private/lesmateriaal-downloads/
 * voor beveiligde fulfillment.
 *
 * Usage: node scripts/sync-lesmateriaal-downloads.js
 *
 * Versiebeleid: catalogus is v2. Bestaat v2 niet, val terug op v1 (tijdelijk).
 * Bestaat beide: altijd v2.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const LM = path.join(ROOT, 'lesmateriaal');
const DEST = path.join(ROOT, 'private', 'lesmateriaal-downloads');

/** Mirrors lib/lesmateriaal-fulfillment PACKAGE_SOURCE (keep in sync). Alle bestandsnamen = v2. */
const PACKAGE_SOURCE = {
  'pakket-a': {
    folder: 'A-telefoon-tablet',
    lessons: [
      ['A1', 'A1-toestel-leren-kennen', 'SeniorEase-A1-Toestel-v2.pdf', 'SeniorEase-A1-Beamer-v2.pdf'],
      ['A2', 'A2-apps', 'SeniorEase-A2-Apps-v2.pdf', 'SeniorEase-A2-Beamer-v2.pdf'],
      ['A3', 'A3-wifi', 'SeniorEase-A3-Wifi-v2.pdf', 'SeniorEase-A3-Beamer-v2.pdf'],
      ['A4', 'A4-fotos', 'SeniorEase-A4-Fotos-v2.pdf', 'SeniorEase-A4-Beamer-v2.pdf'],
    ],
  },
  'pakket-b': {
    folder: 'B-computer',
    lessons: [
      ['B1', 'B1-muis-toetsenbord', 'SeniorEase-B1-Computer-bedienen-v2.pdf', 'SeniorEase-B1-Beamer-v2.pdf'],
      ['B2', 'B2-vensters', 'SeniorEase-B2-Werken-met-vensters-tabbladen-v2.pdf', 'SeniorEase-B2-Beamer-v2.pdf'],
      ['B3', 'B3-bestanden-mappen', 'SeniorEase-B3-Bestanden-opslaan-terugvinden-v2.pdf', 'SeniorEase-B3-Beamer-v2.pdf'],
      ['B4', 'B4-downloaden-printen', 'SeniorEase-B4-Downloaden-openen-printen-v2.pdf', 'SeniorEase-B4-Beamer-v2.pdf'],
    ],
  },
  'pakket-c': {
    folder: 'C-whatsapp',
    lessons: [
      ['C1', 'C1-berichten', 'SeniorEase-C1-Berichten-v2.pdf', 'SeniorEase-C1-Beamer-v2.pdf'],
      ['C2', 'C2-fotos-documenten', 'SeniorEase-C2-Fotos-Documenten-v2.pdf', 'SeniorEase-C2-Beamer-v2.pdf'],
      ['C3', 'C3-bellen-groepen', 'SeniorEase-C3-Bellen-Videobellen-v2.pdf', 'SeniorEase-C3-Beamer-v2.pdf'],
      ['C4', 'C4-privacy-fraude', 'SeniorEase-C4-Veilig-Prive-v2.pdf', 'SeniorEase-C4-Beamer-v2.pdf'],
    ],
  },
  'pakket-d': {
    folder: 'D-veilig-online',
    lessons: [
      ['D1', 'D1-nepberichten', 'SeniorEase-D1-Verdacht-Bericht-v2.pdf', 'SeniorEase-D1-Beamer-v2.pdf'],
      ['D2', 'D2-phishing-links-qr', 'SeniorEase-D2-Links-QR-v2.pdf', 'SeniorEase-D2-Beamer-v2.pdf'],
      ['D3', 'D3-whatsapp-sms-fraude', 'SeniorEase-D3-Telefoon-Helpdesk-v2.pdf', 'SeniorEase-D3-Beamer-v2.pdf'],
      ['D4', 'D4-veilig-betalen', 'SeniorEase-D4-Veilig-Betalen-v2.pdf', 'SeniorEase-D4-Beamer-v2.pdf'],
    ],
  },
  'pakket-e': {
    folder: 'E-digid',
    lessons: [
      ['E1', 'E1-digid', 'SeniorEase-E1-DigiD-v2.pdf', 'SeniorEase-E1-Beamer-v2.pdf'],
      ['E2', 'E2-mijnoverheid', 'SeniorEase-E2-MijnOverheid-v2.pdf', 'SeniorEase-E2-Beamer-v2.pdf'],
      ['E3', 'E3-gemeente-belastingdienst', 'SeniorEase-E3-Iets-Regelen-v2.pdf', 'SeniorEase-E3-Beamer-v2.pdf'],
      ['E4', 'E4-veilig-digid-berichten', 'SeniorEase-E4-Berichtenbox-Overheid-v2.pdf', 'SeniorEase-E4-Beamer-v2.pdf'],
    ],
  },
  'pakket-f-telefoon': {
    folder: 'F-internet-telefoon',
    lessons: [
      ['Ft1', 'Ft1-zoeken', 'SeniorEase-Ft1-Zoeken-v2.pdf', 'SeniorEase-Ft1-Beamer-v2.pdf'],
      ['Ft2', 'Ft2-browser', 'SeniorEase-Ft2-Browser-v2.pdf', 'SeniorEase-Ft2-Beamer-v2.pdf'],
      ['Ft3', 'Ft3-qr-codes', 'SeniorEase-Ft3-QR-v2.pdf', 'SeniorEase-Ft3-Beamer-v2.pdf'],
      ['Ft4', 'Ft4-formulieren-downloads', 'SeniorEase-Ft4-Formulieren-Downloads-v2.pdf', 'SeniorEase-Ft4-Beamer-v2.pdf'],
    ],
  },
  'pakket-f-computer': {
    folder: 'F-internet-computer',
    lessons: [
      ['Fc1', 'Fc1-zoeken-google', 'SeniorEase-Fc1-Zoeken-Google-v2.pdf', 'SeniorEase-Fc1-Beamer-v2.pdf'],
      ['Fc2', 'Fc2-websites-tabbladen', 'SeniorEase-Fc2-Websites-Tabbladen-v2.pdf', 'SeniorEase-Fc2-Beamer-v2.pdf'],
      ['Fc3', 'Fc3-downloaden', 'SeniorEase-Fc3-Veilig-Downloaden-v2.pdf', 'SeniorEase-Fc3-Beamer-v2.pdf'],
      ['Fc4', 'Fc4-formulieren', 'SeniorEase-Fc4-Formulieren-v2.pdf', 'SeniorEase-Fc4-Beamer-v2.pdf'],
    ],
  },
  'pakket-g': {
    folder: 'G-ai',
    lessons: [
      ['G1', 'G1-wat-is-ai', 'SeniorEase-G1-Wat-Is-AI-v2.pdf', 'SeniorEase-G1-Beamer-v2.pdf'],
      ['G2', 'G2-ai-gebruiken', 'SeniorEase-G2-AI-Gebruiken-v2.pdf', 'SeniorEase-G2-Beamer-v2.pdf'],
      ['G3', 'G3-goede-vragen', 'SeniorEase-G3-Goede-Vragen-v2.pdf', 'SeniorEase-G3-Beamer-v2.pdf'],
      ['G4', 'G4-ai-veilig', 'SeniorEase-G4-AI-Veilig-v2.pdf', 'SeniorEase-G4-Beamer-v2.pdf'],
    ],
  },
};

/**
 * Prefer v2. Als v2 ontbreekt: tijdelijk v1 (tot die les is herbouwd).
 * Nooit v1 kiezen als v2 bestaat.
 */
function resolveSource(src) {
  if (fs.existsSync(src)) return { path: src, note: null };
  if (/-v2\.pdf$/i.test(src)) {
    const v1 = src.replace(/-v2\.pdf$/i, '-v1.pdf');
    if (fs.existsSync(v1)) {
      return { path: v1, note: `fallback-v1 ${path.relative(ROOT, v1)}` };
    }
  }
  if (/-v1\.pdf$/i.test(src)) {
    const v2 = src.replace(/-v1\.pdf$/i, '-v2.pdf');
    if (fs.existsSync(v2)) {
      return { path: v2, note: `prefer-v2 ${path.relative(ROOT, v2)}` };
    }
  }
  return { path: null, note: null };
}

function copyOne(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const { path: resolved, note } = resolveSource(src);
  if (!resolved) {
    console.warn('  MISS', path.relative(ROOT, src));
    return false;
  }
  if (note) console.log(' ', note);
  fs.copyFileSync(resolved, dest);
  console.log('  OK  ', path.relative(ROOT, dest));
  return true;
}

function main() {
  fs.mkdirSync(DEST, { recursive: true });
  let ok = 0;
  let miss = 0;
  for (const [slug, cfg] of Object.entries(PACKAGE_SOURCE)) {
    for (const [code, dir, printName, beamerName] of cfg.lessons) {
      const id = code.toLowerCase();
      const printSrc = path.join(LM, cfg.folder, dir, 'pdf', printName);
      const beamerSrc = path.join(LM, cfg.folder, dir, 'beamer', beamerName);
      const printDest = path.join(DEST, slug, `${id}-print.pdf`);
      const beamerDest = path.join(DEST, slug, `${id}-beamer.pdf`);
      if (copyOne(printSrc, printDest)) ok += 1;
      else miss += 1;
      if (copyOne(beamerSrc, beamerDest)) ok += 1;
      else miss += 1;
    }
  }
  console.log(`\nKlaar: ${ok} gekopieerd, ${miss} ontbrekend.`);
  // A+B moeten altijd compleet zijn (live betaalde pakketten). Overige missers: waarschuwing.
  const requiredOk = ['pakket-a', 'pakket-b'].every((slug) => {
    const cfg = PACKAGE_SOURCE[slug];
    return cfg.lessons.every(([, dir, printName, beamerName]) => {
      const printSrc = path.join(LM, cfg.folder, dir, 'pdf', printName);
      const beamerSrc = path.join(LM, cfg.folder, dir, 'beamer', beamerName);
      return resolveSource(printSrc).path && resolveSource(beamerSrc).path;
    });
  });
  if (!requiredOk) {
    console.error('VEREIST: pakket-a en pakket-b moeten volledig aanwezig zijn.');
    process.exitCode = 1;
  } else if (miss > 0) {
    console.warn('Niet-vereiste pakketten incompleet — build gaat door.');
    process.exitCode = 0;
  }
}

main();
