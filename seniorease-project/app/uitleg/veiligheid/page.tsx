import Link from 'next/link';
import { YOUTUBE_VIDEOS, YOUTUBE_PLAYLISTS, youtubePlaylistUrl } from '@/lib/youtube-videos';

export const metadata = {
  title: "Oplichting herkennen via telefoon en internet – uitleg voor senioren",
  description: "Hoe herkent u nep-SMS, WhatsApp-fraude en phishing? 5 duidelijke alarmsignalen en wat u moet doen. Gratis uitleg voor senioren.",
};

const alarmsignalen = [
  {
    num: 1,
    icon: "⏰",
    titel: "U wordt onder druk gezet",
    uitleg: "\"Betaal nu, anders wordt uw rekening geblokkeerd!\" of \"U heeft nog maar 2 uur om te reageren.\" Echte instanties doen dit niet. Druk = gevaar.",
    kleur: "bg-red-50 border-red-200",
    titelkleur: "text-red-800",
  },
  {
    num: 2,
    icon: "👤",
    titel: "Onbekend of vreemd afzendernummer",
    uitleg: "Uw bank stuurt nooit een SMS met een onbekend of buitenlands nummer. Kijk goed: +31 6... of een willekeurig nummer = verdacht.",
    kleur: "bg-orange-50 border-orange-200",
    titelkleur: "text-orange-800",
  },
  {
    num: 3,
    icon: "✍️",
    titel: "Spelfouten of vreemde zinnen",
    uitleg: "\"Uw account heeft problemen ondervonden. Klik hier om te verifiëren.\" Echte berichten van banken en overheid zijn foutloos geschreven.",
    kleur: "bg-amber-50 border-amber-200",
    titelkleur: "text-amber-800",
  },
  {
    num: 4,
    icon: "🔗",
    titel: "Vreemde link of webadres",
    uitleg: (
      <>
        <strong>rabobank-veilig-inloggen.com</strong> is NIET de Rabobank. Het echte adres is <strong>rabobank.nl</strong>. Kijk altijd of het adres klopt vóór u klikt.
      </>
    ),
    kleur: "bg-yellow-50 border-yellow-200",
    titelkleur: "text-yellow-800",
  },
  {
    num: 5,
    icon: "💳",
    titel: "Vraag om gegevens of geld",
    uitleg: "Uw bank vraagt NOOIT via SMS of WhatsApp om uw pincode, wachtwoord of om geld over te maken. Nooit. Geen enkele uitzondering.",
    kleur: "bg-red-50 border-red-200",
    titelkleur: "text-red-800",
  },
];

export default function VeiligheidPage() {
  return (
    <main className="min-h-screen bg-neutral-cream">
      {/* Header */}
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base">
              ← Terug naar home
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              Oplichting herkennen — bescherm uzelf
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              1 op de 5 senioren krijgt ermee te maken. Maar wie de signalen kent, trapt er niet in.
            </p>
            <p className="text-senior-sm text-gray-700 mt-3 max-w-2xl">
              Hier leest u wat phishing en oplichting zijn, hoe u nepberichten herkent en wat u moet doen als u twijfelt.
            </p>
            <nav className="mt-6 flex flex-wrap gap-3" aria-label="Veiligheid navigatie">
              <span className="text-senior-sm text-gray-500 font-semibold mr-1">🔒 Veiligheid:</span>
              <span className="text-senior-sm font-bold text-primary underline">Oplichting herkennen</span>
              <Link href="/uitleg/wachtwoorden" className="text-senior-sm font-bold text-primary hover:text-primary-dark hover:underline">Wachtwoorden</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Video */}
          <section className="my-8 mx-4 sm:mx-0">
            <div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEOS.oplichtingHerkennen}`}
                title="Oplichting herkennen via telefoon en internet – 5 waarschuwingstekens"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <p className="text-center text-gray-600 mt-4 text-senior-base">
              Bekijk de video (±1 minuut) of lees verder voor uitgebreide uitleg en voorbeelden
            </p>
            <div className="max-w-3xl mx-auto mt-6 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-neutral-stone/40 bg-white">
              <div className="text-4xl" aria-hidden="true">▶️</div>
              <div>
                <h3 className="text-senior-lg font-bold text-gray-800 mb-1">Meer tips op YouTube</h3>
                <p className="text-senior-base text-gray-600 mb-4">
                  Alle tips &amp; tricks voor senioren in één playlist — rustig tempo, begrijpelijke taal.
                </p>
                <a
                  href={youtubePlaylistUrl(YOUTUBE_PLAYLISTS.tips)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold rounded-xl px-5 py-3 transition-all border-2 hover:shadow-sm text-primary border-primary bg-neutral-cream"
                >
                  Bekijk de Tips &amp; Tricks-playlist
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </section>

          {/* Intro */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Wat is phishing?
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
              Phishing (spreek uit: &quot;fishing&quot;) is een poging om u te misleiden. Criminelen doen alsof ze uw bank, de overheid of een bekende zijn — om uw gegevens of geld te stelen.
            </p>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
              Ze worden steeds beter in nabootsen. Berichten zien er soms precies uit als echt. Maar er zijn altijd signalen die u kunt leren herkennen. Een korte samenvatting vindt u ook in <Link href="/digitale-hulp/phishing-herkennen" className="font-bold text-primary hover:underline">Phishing herkennen</Link>.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "📱", tekst: "Via SMS of WhatsApp" },
                { icon: "📧", tekst: "Via e-mail" },
                { icon: "📞", tekst: "Via een telefoontje" },
              ].map((item, i) => (
                <div key={i} className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-senior-sm font-bold text-gray-800">{item.tekst}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Voorbeeld 1: nep SMS */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Voorbeeld 1 — Nep SMS van uw &quot;bank&quot;
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
              U ontvangt dit SMS-bericht:
            </p>
            {/* Nep SMS */}
            <div className="bg-gray-100 rounded-2xl p-6 mb-6 max-w-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">ING</div>
                <span className="text-senior-sm font-bold text-gray-700">ING Bank</span>
                <span className="text-senior-xs text-gray-400 ml-auto">+31 6 84921...</span>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-senior-base text-gray-800 leading-relaxed">
                  ⚠️ Uw ING rekening wordt geblokkeerd. Verifieer nu uw gegevens via: <span className="text-blue-500 underline">ing-veilig-login.com/verify</span>
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-senior-base font-bold text-gray-800 mb-3">Wat klopt er niet?</p>
              {[
                { punt: "Onbekend nummer (+31 6...)", uitleg: "De ING stuurt nooit SMS via een 06-nummer." },
                { punt: "Druk: \"wordt geblokkeerd\"", uitleg: "Angst en haast zijn de favoriete trucjes van oplichters." },
                { punt: "Vreemd webadres", uitleg: (
                  <>
                    <strong>ing-veilig-login.com</strong> is NIET van de ING. De echte site is <strong>ing.nl</strong>.
                  </>
                ) },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <span className="text-red-600 font-bold text-xl flex-shrink-0">✗</span>
                  <div>
                    <p className="text-senior-base font-bold text-red-800">{item.punt}</p>
                    <p className="text-senior-base text-gray-700">{item.uitleg}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Voorbeeld 2: hulpvraagfraude */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Voorbeeld 2 — Hulpvraagfraude via WhatsApp
            </h2>
            <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
              Dit is de meest gebruikte truc bij senioren. U krijgt een WhatsApp-bericht van een onbekend nummer:
            </p>
            {/* Nep WhatsApp */}
            <div className="bg-gray-100 rounded-2xl p-6 mb-6 max-w-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">?</div>
                <div>
                  <p className="text-senior-sm font-bold text-gray-700">Onbekend nummer</p>
                  <p className="text-senior-xs text-gray-400">+31 6 nieuwe nummer</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-green-100 rounded-2xl rounded-tl-sm p-3 max-w-xs">
                  <p className="text-senior-base text-gray-800">Hoi mam! Dit is mijn nieuwe nummer. Mijn oude telefoon is kapot gegaan 😢</p>
                </div>
                <div className="bg-green-100 rounded-2xl rounded-tl-sm p-3 max-w-xs">
                  <p className="text-senior-base text-gray-800">Kun je me helpen? Ik moet dringend €250 betalen maar kan zelf niet bij mijn bankrekening.</p>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5 mb-6">
              <p className="text-senior-base font-bold text-amber-800 mb-2">⚠️ Dit is bijna altijd oplichting</p>
              <p className="text-senior-base text-gray-700 leading-relaxed">
                Oplichters kopen telefoonnummers en sturen dit bericht naar duizenden mensen tegelijk. Ze gokken erop dat iemand een kind of kleinkind heeft.
              </p>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
              <p className="text-senior-base font-bold text-green-800 mb-2">✅ Wat u moet doen:</p>
              <p className="text-senior-base text-gray-700 leading-relaxed">
                Niet reageren, niet betalen. Bel uw kind of kleinkind op het <strong>oude, bekende nummer</strong> om te controleren of het echt van hen is. Meer over veilig WhatsApp gebruiken: <Link href="/uitleg/whatsapp-basis" className="font-bold text-primary hover:underline">WhatsApp uitleg</Link>.
              </p>
            </div>
          </section>

          {/* 5 alarmsignalen */}
          <section>
            <h2 className="text-senior-xl font-bold text-gray-800 mb-2">
              De 5 alarmsignalen
            </h2>
            <p className="text-senior-base text-gray-600 mb-6">
              Plak dit desgewenst op uw koelkast — dan heeft u het altijd bij de hand.
            </p>
            <div className="space-y-4">
              {alarmsignalen.map((signaal) => (
                <div key={signaal.num} className={`rounded-2xl border-2 ${signaal.kleur} p-6 flex gap-5 items-start`}>
                  <div className="flex-shrink-0 w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm border-2 border-white">
                    {signaal.icon}
                  </div>
                  <div>
                    <p className="text-senior-base font-bold text-gray-800 mb-1">
                      <span className={`${signaal.titelkleur}`}>{signaal.num}. {signaal.titel}</span>
                    </p>
                    <p className="text-senior-base text-gray-700 leading-relaxed">{signaal.uitleg}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Wat te doen */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Wat doet u als u twijfelt?
            </h2>
            <ol className="space-y-5 mb-8">
              {[
                { stap: "Niet klikken, niet betalen, niet terugbellen via het opgegeven nummer.", icon: "🛑" },
                { stap: "Zoek zelf het telefoonnummer van uw bank op (op de achterkant van uw bankpas of via google.nl) en bel zelf.", icon: "📞" },
                { stap: "Twijfelt u aan een SMS of e-mail? Stuur hem door naar het Fraudehelpdesk: 088 - 786 7372.", icon: "🆘" },
                { stap: "Gevallen voor oplichting? Schaam u niet — het overkomt de slimste mensen. Meld het bij de politie (0900-8844) en uw bank.", icon: "🚨" },
              ].map((item, i) => (
                <li key={i} className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-senior-lg font-bold shadow-md">
                    {i + 1}
                  </div>
                  <div className="flex gap-3 items-start pt-2">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed">{item.stap}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="bg-primary/10 border-2 border-primary/30 rounded-xl p-5">
              <p className="text-senior-lg font-bold text-primary mb-1">Bij twijfel: nooit klikken!</p>
              <p className="text-senior-base text-gray-700">Een echte bank of instantie belt u terug als er echt iets aan de hand is. U hoeft nooit zelf ergens op te klikken om iets te bevestigen.</p>
            </div>
          </section>

          {/* Handige nummers */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Handige nummers — bewaar deze!
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { naam: "Fraudehelpdesk", num: "088 - 786 7372", omschr: "Meld verdachte berichten" },
                { naam: "Politie (niet-spoed)", num: "0900 - 8844", omschr: "Aangifte van oplichting" },
                { naam: "Uw bank (ING)", num: "020 - 22 88 888", omschr: "Blokkeer uw rekening bij misbruik" },
                { naam: "Uw bank (Rabobank)", num: "0900 - 0900", omschr: "Blokkeer uw rekening bij misbruik" },
              ].map((item, i) => (
                <div key={i} className="bg-neutral-cream border-2 border-neutral-stone rounded-xl p-5">
                  <p className="text-senior-base font-bold text-gray-800">{item.naam}</p>
                  <p className="text-senior-lg font-bold text-primary my-1">{item.num}</p>
                  <p className="text-senior-xs text-gray-600">{item.omschr}</p>
                </div>
              ))}
            </div>
            <p className="text-senior-xs text-gray-500 mt-4">Tip: schrijf uw eigen banknummer op (staat op de achterkant van uw bankpas) en bewaar het ergens veilig.</p>
          </section>

          {/* Samenvatting */}
          <section className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-10">
            <h2 className="text-senior-xl font-bold text-primary mb-6">
              Onthoud dit
            </h2>
            <div className="space-y-3 mb-8">
              {[
                "Uw bank vraagt NOOIT uw pincode of wachtwoord via SMS of app",
                "Onder druk gezet? Stop dan. Echte instanties doen dat niet.",
                "Nieuw nummer van uw kind? Bel altijd het oude nummer om te checken",
                "Bij twijfel: nooit klikken, gewoon weggooien",
                "Gevallen voor oplichting? Schaam u niet, meld het gewoon",
              ].map((punt, i) => (
                <div key={i} className="flex items-start gap-3 bg-neutral-cream border-2 border-primary/30 rounded-xl px-5 py-4">
                  <span className="text-green-600 font-bold text-xl flex-shrink-0">✅</span>
                  <p className="text-senior-base text-gray-700 leading-relaxed">{punt}</p>
                </div>
              ))}
            </div>
            {/* Gerelateerde uitleg */}
            <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Gerelateerde uitleg</h2>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/uitleg/digid" className="text-senior-base font-semibold text-primary hover:underline">
                  DigiD veilig gebruiken
                </Link>
              </li>
              <li>
                <Link href="/uitleg/online-bankieren" className="text-senior-base font-semibold text-primary hover:underline">
                  Veilig online bankieren
                </Link>
              </li>
              <li>
                <Link href="/digitale-hulp/veilig-internet" className="text-senior-base font-semibold text-primary hover:underline">
                  Veilig internet (alle artikelen)
                </Link>
              </li>
              <li>
                <Link href="/digitale-hulp/phishing-mail-herkennen" className="text-senior-base font-semibold text-primary hover:underline">
                  Phishing mail herkennen
                </Link>
              </li>
              <li>
                <Link href="/digitale-hulp/veilig-wachtwoord-maken" className="text-senior-base font-semibold text-primary hover:underline">
                  Veilig wachtwoord maken
                </Link>
              </li>
              <li>
                <Link href="/uitleg/whatsapp-basis" className="text-senior-base font-semibold text-primary hover:underline">
                  WhatsApp uitleg
                </Link>
              </li>
              <li>
                <Link href="/uitleg/qr-code" className="text-senior-base font-semibold text-primary hover:underline">
                  QR-code scannen (veilig scannen)
                </Link>
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <Link href="/uitleg/wachtwoorden" className="inline-flex items-center gap-2 bg-primary text-white px-7 py-4 rounded-xl text-senior-lg font-bold hover:bg-primary-dark transition-colors shadow-lg">
                Volgende: Wachtwoorden →
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 bg-white border-2 border-primary text-primary px-7 py-4 rounded-xl text-senior-lg font-bold hover:bg-primary/10 transition-colors">
                ← Terug naar home
              </Link>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
