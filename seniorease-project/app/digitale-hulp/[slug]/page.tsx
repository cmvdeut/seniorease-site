import Link from 'next/link';
import { notFound } from 'next/navigation';
import { artikelen, getArtikelBySlug } from '../artikelen';

export async function generateStaticParams() {
  return artikelen.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artikel = getArtikelBySlug(slug);
  if (!artikel) return {};
  return {
    title: `${artikel.title} – stap voor stap voor senioren`,
    description: artikel.description,
    alternates: {
      canonical: `https://seniorease.nl/digitale-hulp/${artikel.slug}`,
    },
  };
}

function ArtikelContent({ slug }: { slug: string }) {
  switch (slug) {
    case 'whatsapp-uitleg-beginners':
      return (
        <>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
            Veel mensen willen met familie en vrienden berichten sturen of bellen zonder sms-kosten. WhatsApp is daar een van de meest gebruikte apps voor. Hier leest u wat het is en hoe u begint.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Wat is WhatsApp?</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            WhatsApp is een gratis app om berichten, foto&apos;s en spraakberichten te sturen. U heeft alleen internet nodig (wifi of mobiele data). Geen sms-kosten. Veel mensen gebruiken het om te appen of te bellen.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Stap voor stap: bericht sturen</h2>
          <ol className="space-y-3 list-decimal list-inside text-senior-base text-gray-700 mb-6">
            <li>Open de WhatsApp-app op uw telefoon.</li>
            <li>Tik onderaan op het groene icoontje om een nieuw gesprek te starten.</li>
            <li>Zoek de persoon op (naam of nummer) of typ het telefoonnummer.</li>
            <li>Tik op het tekstveld onderaan, typ uw bericht en tik op de blauwe pijl om te versturen.</li>
          </ol>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Foto sturen</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-2">In hetzelfde gesprek:</p>
          <ol className="space-y-3 list-decimal list-inside text-senior-base text-gray-700 mb-6">
            <li>Tik naast het tekstveld op het paperclip-icoontje of het camera-icoontje.</li>
            <li>Kies &quot;Foto&quot; of &quot;Camera&quot; om een foto te maken of te kiezen.</li>
            <li>Tik op &quot;Versturen&quot; of de pijl. De foto staat dan in het gesprek.</li>
          </ol>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Bellen via WhatsApp</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Open een gesprek met de persoon. Bovenin het scherm ziet u een telefoon-icoon (bellen) of een videocamera-icoon (videobellen). Tik erop om te bellen. De ander moet ook WhatsApp hebben en internet aanstaan.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Tips</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Zorg dat u verbonden bent met wifi of dat mobiele data aanstaat. Anders worden berichten niet verstuurd. Let op oplichting via WhatsApp: stuur nooit geld of gegevens naar onbekenden. Meer hierover: <Link href="/uitleg/veiligheid" className="font-bold text-primary hover:underline">Oplichting herkennen</Link>.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Samenvatting</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            WhatsApp = gratis berichten en bellen via internet. Open de app, kies een contact, typ of stuur een foto. Bellen kan via het telefoon-icoon in het gesprek.
          </p>
          <div className="rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-neutral-stone/40"
               style={{ background: '#FFFBF0' }}>
            <div className="text-4xl" aria-hidden="true">▶️</div>
            <div>
              <h3 className="text-senior-lg font-bold text-gray-800 mb-1">Liever kijken dan lezen?</h3>
              <p className="text-senior-base text-gray-600 mb-4">
                We hebben 5 korte animatievideo&apos;s gemaakt — van installeren tot veilig gebruik. Stap voor stap, rustig tempo.
              </p>
              <a
                href="https://www.youtube.com/playlist?list=PLw97JnScZym_83xf1Ypz_npeXj308wRN6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold rounded-xl px-5 py-3 transition-all border-2 hover:shadow-sm"
                style={{ color: '#8B5E3C', borderColor: '#8B5E3C', background: '#FFFFFF', fontSize: '1.1rem' }}
              >
                Bekijk onze WhatsApp-video&apos;s op YouTube
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Gerelateerde uitleg</h2>
          <ul className="space-y-2">
            <li><Link href="/digitale-hulp/whatsapp-fotos-opslaan" className="font-semibold text-primary hover:underline">WhatsApp foto&apos;s opslaan</Link></li>
            <li><Link href="/uitleg/qr-code" className="font-semibold text-primary hover:underline">QR-code scannen</Link></li>
            <li><Link href="/digitale-hulp/smartphone" className="font-semibold text-primary hover:underline">Smartphone hulp (alle artikelen)</Link></li>
            <li><Link href="/uitleg/whatsapp-basis" className="font-semibold text-primary hover:underline">WhatsApp basis (uitgebreide uitleg)</Link></li>
            <li><Link href="/uitleg/veiligheid" className="font-semibold text-primary hover:underline">Oplichting herkennen</Link></li>
          </ul>
        </>
      );
    case 'whatsapp-fotos-opslaan':
      return (
        <>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
            Foto&apos;s die u via WhatsApp krijgt, staan eerst alleen in het gesprek. Om ze op uw telefoon te bewaren, moet u ze opslaan. Hier leest u hoe dat gaat en waar ze terechtkomen.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Waarom zoeken mensen dit?</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Veel mensen willen foto&apos;s van familie of vrienden bewaren in hun galerij, zodat ze ze later terug kunnen kijken of delen. In WhatsApp verdwijnen ze niet zomaar, maar om ze echt op uw telefoon te hebben, moet u ze een keer opslaan.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Stap voor stap: foto opslaan</h2>
          <ol className="space-y-3 list-decimal list-inside text-senior-base text-gray-700 mb-6">
            <li><strong>Foto openen:</strong> Tik op de foto in het chatbericht. De foto opent groot op het scherm.</li>
            <li><strong>Opslaan:</strong> Zoek het icoontje voor download of opslaan (vaak een pijl naar beneden of een schijf). Tik erop.</li>
            <li><strong>Klaar:</strong> De foto wordt opgeslagen op uw telefoon. U krijgt soms een melding &quot;Opgeslagen&quot;.</li>
          </ol>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Waar komt de foto terecht?</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Meestal in een map zoals &quot;WhatsApp Images&quot; of &quot;Download&quot;. U vindt de foto&apos;s daarna in uw Foto&apos;s-app of Galerij, tussen uw andere foto&apos;s.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Tips</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            U kunt meerdere foto&apos;s tegelijk opslaan: houd een foto even ingedrukt, tik op andere foto&apos;s om ze te selecteren en kies dan &quot;Opslaan&quot; of het download-icoon. Let op: open alleen foto&apos;s van mensen die u kent, om veilig te blijven.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Samenvatting</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Tik op de foto in WhatsApp → zoek het download-/opslaan-icoon → tik erop. De foto staat daarna in uw Foto&apos;s-app of Galerij.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Gerelateerde uitleg</h2>
          <ul className="space-y-2">
            <li><Link href="/uitleg/whatsapp-basis" className="font-semibold text-primary hover:underline">WhatsApp basis</Link></li>
            <li><Link href="/digitale-hulp/whatsapp-uitleg-beginners" className="font-semibold text-primary hover:underline">WhatsApp uitleg voor beginners</Link></li>
            <li><Link href="/uitleg/veiligheid" className="font-semibold text-primary hover:underline">Oplichting herkennen</Link></li>
            <li><Link href="/uitleg/qr-code" className="font-semibold text-primary hover:underline">QR-code scannen</Link></li>
            <li><Link href="/uitleg/wifi" className="font-semibold text-primary hover:underline">WiFi instellen</Link></li>
          </ul>
        </>
      );
    case 'whatsapp-videobellen-uitleg':
      return (
        <>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
            Wilt u elkaar zien tijdens het bellen? Met WhatsApp kunt u gratis videobellen. U heeft alleen internet nodig. Hier leest u hoe het werkt.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Wat is videobellen via WhatsApp?</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Bij videobellen ziet u de ander op uw scherm. En de ander ziet u. Handig om kleinkinderen te zien of even te kletsen met familie ver weg. Beide hebben WhatsApp en internet nodig.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Stap voor stap</h2>
          <ol className="space-y-3 list-decimal list-inside text-senior-base text-gray-700 mb-6">
            <li>Open WhatsApp op uw telefoon.</li>
            <li>Tik op het gesprek met de persoon die u wilt bellen.</li>
            <li>Bovenin het scherm ziet u een camera-icoon of videocamera-icoon. Tik daarop.</li>
            <li>De ander krijgt een melding. Als hij of zij opneemt, ziet u elkaar.</li>
            <li>Om te stoppen: tik op de rode telefoonknop onderaan.</li>
          </ol>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Tips</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Zorg dat u verbonden bent met wifi of dat mobiele data aanstaat. Anders valt het gesprek weg. U kunt tijdens het bellen ook wisselen naar alleen geluid: tik op het telefoon-icoon. Meer over gewoon bellen en berichten: <Link href="/digitale-hulp/whatsapp-uitleg-beginners" className="font-bold text-primary hover:underline">WhatsApp uitleg voor beginners</Link>. Voor uitgebreide uitleg: <Link href="/uitleg/videobellen" className="font-bold text-primary hover:underline">Videobellen</Link>.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Samenvatting</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            WhatsApp openen → gesprek kiezen → op het videocamera-icoon tikken → de ander neemt op → u ziet elkaar. Rode knop om te stoppen.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Gerelateerde uitleg</h2>
          <ul className="space-y-2">
            <li><Link href="/digitale-hulp/whatsapp-uitleg-beginners" className="font-semibold text-primary hover:underline">WhatsApp uitleg voor beginners</Link></li>
            <li><Link href="/digitale-hulp/whatsapp-fotos-opslaan" className="font-semibold text-primary hover:underline">WhatsApp foto&apos;s opslaan</Link></li>
            <li><Link href="/uitleg/videobellen" className="font-semibold text-primary hover:underline">Videobellen (uitgebreide uitleg)</Link></li>
            <li><Link href="/digitale-hulp/smartphone" className="font-semibold text-primary hover:underline">Smartphone hulp</Link></li>
            <li><Link href="/uitleg/wifi" className="font-semibold text-primary hover:underline">WiFi instellen</Link></li>
          </ul>
        </>
      );
    case 'telefoon-sneller-maken':
      return (
        <>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
            Een trage telefoon is vaak het gevolg van te weinig ruimte, te veel apps die op de achtergrond draaien, of een vol geheugen. Met een paar eenvoudige stappen kunt u uw telefoon vaak weer sneller maken.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Ruimte vrijmaken</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Ga naar Instellingen → Opslag (of Opslagruimte). U ziet welke apps en bestanden veel ruimte gebruiken. U kunt oude foto&apos;s, filmpjes of apps die u niet meer gebruikt verwijderen of een back-up maken en daarna van de telefoon halen.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Apps sluiten</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Sluit apps die u niet gebruikt. Op veel telefoons doet u dat door recente apps te openen (vaak een vierkantje of streepje) en ze naar boven te vegen. Zo verbruiken ze geen geheugen meer op de achtergrond.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Telefoon herstarten</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed">
            Zet uw telefoon een keer uit en weer aan. Dat ruimt tijdelijk geheugen op en kan de snelheid verbeteren.
          </p>
        </>
      );
    case 'telefoon-langzaam-oplossen':
      return (
        <>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
            Uw telefoon reageert traag, loopt vast of heeft weinig ruimte over? Dat komt vaak door volle opslag, te veel openstaande apps of een telefoon die even opnieuw moet opstarten. Hier leest u wat u kunt doen.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Waarom wordt mijn telefoon langzaam?</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Veel mensen merken dat hun telefoon na een tijd trager wordt. Vaak is de opslag bijna vol (foto&apos;s, filmpjes, apps) of staan er veel apps op de achtergrond open. Een eenvoudige herstart kan al helpen.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Stap voor stap</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-2 font-semibold">1. Opslag vol? Ruimte vrijmaken</p>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Ga naar <strong>Instellingen</strong> (tandwiel) → <strong>Opslag</strong> of <strong>Opslagruimte</strong>. U ziet wat veel ruimte gebruikt. Verwijder oude foto&apos;s of filmpjes die u niet meer nodig heeft, of apps die u niet gebruikt. U kunt ook een back-up maken en daarna bestanden van de telefoon halen.
          </p>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-2 font-semibold">2. Apps sluiten</p>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Open het overzicht van recente apps (vaak een vierkantje of streepje onderaan of aan de zijkant). Veeg elke app naar boven of naar de zijkant om ze te sluiten. Zo draaien ze niet meer op de achtergrond en verbruiken ze geen geheugen.
          </p>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-2 font-semibold">3. Telefoon opnieuw starten</p>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Zet uw telefoon uit (aan/uit-knop vasthouden en &quot;Uitzetten&quot; kiezen). Wacht een paar seconden en zet hem weer aan. Vaak voelt de telefoon daarna weer sneller aan.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Tips</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Update uw telefoon regelmatig (Instellingen → Software-update). Oude apps die u niet meer gebruikt kunt u verwijderen. Als het probleem blijft, kan het helpen om even te controleren of u goed verbonden bent met wifi; soms lijkt de telefoon traag terwijl het internet gewoon langzaam is.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Samenvatting</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Ruimte vrijmaken in Opslag, apps sluiten in het recente-apps-overzicht en de telefoon een keer uitzetten en weer aanzetten. Dat lost veel traagheid op.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Gerelateerde uitleg</h2>
          <ul className="space-y-2">
            <li><Link href="/digitale-hulp/telefoon-sneller-maken" className="font-semibold text-primary hover:underline">Telefoon sneller maken</Link></li>
            <li><Link href="/uitleg/wifi" className="font-semibold text-primary hover:underline">WiFi instellen</Link></li>
            <li><Link href="/uitleg/veiligheid" className="font-semibold text-primary hover:underline">Oplichting herkennen</Link></li>
            <li><Link href="/uitleg/qr-code" className="font-semibold text-primary hover:underline">QR-code scannen</Link></li>
          </ul>
        </>
      );
    case 'phishing-herkennen':
      return (
        <>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
            Phishing is wanneer iemand u via e-mail, sms of WhatsApp probeert te laten doorklikken naar een nepwebsite of uw gegevens te laten invullen. Het doel is vaak om uw wachtwoord, pincode of bankgegevens te stelen.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Signalen van phishing</h2>
          <ul className="list-disc list-inside text-senior-base text-gray-700 space-y-2 mb-6">
            <li>Dringende taal: &quot;Uw account wordt geblokkeerd&quot;, &quot;Reageer binnen 24 uur&quot;</li>
            <li>Verzoek om in te loggen via een link in de e-mail of het bericht</li>
            <li>Vreemde afzender of een adres dat net iets anders is (bijv. info@seniorease.nl vs. info@seniorease-nl.com)</li>
            <li>Taalfouten of ongebruikelijke formuleringen</li>
          </ul>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Wat u kunt doen</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Klik nooit op links in verdachte e-mails of berichten. Ga zelf naar de website van uw bank of de overheid door het adres in te typen of via uw bladwijzers. Meer over veiligheid en oplichting vindt u bij onze{' '}
            <Link href="/uitleg/veiligheid" className="font-bold text-primary hover:underline">uitleg over veiligheid</Link>.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Gerelateerde uitleg</h2>
          <ul className="space-y-2">
            <li><Link href="/digitale-hulp/veilig-internet" className="font-semibold text-primary hover:underline">Veilig internet (alle artikelen)</Link></li>
            <li><Link href="/digitale-hulp/phishing-mail-herkennen" className="font-semibold text-primary hover:underline">Phishing mail herkennen</Link></li>
            <li><Link href="/uitleg/veiligheid" className="font-semibold text-primary hover:underline">Oplichting herkennen</Link></li>
            <li><Link href="/digitale-hulp/veilig-wachtwoord-maken" className="font-semibold text-primary hover:underline">Veilig wachtwoord maken</Link></li>
            <li><Link href="/uitleg/wifi" className="font-semibold text-primary hover:underline">WiFi instellen</Link></li>
          </ul>
        </>
      );
    case 'phishing-mail-herkennen':
      return (
        <>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
            Soms krijgt u een e-mail die lijkt van uw bank, de overheid of een bekend bedrijf, maar die eigenlijk van oplichters is. Die proberen uw wachtwoord of gegevens te stelen. Hier leest u wat phishing is en hoe u een nep mail herkent.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Wat is phishing?</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Phishing (spreek uit: &quot;fishing&quot;) is een vorm van oplichting. Iemand stuurt een e-mail of bericht dat er officieel uitziet, met een link of verzoek om in te loggen. Als u daarop klikt of uw gegevens invult, komen die bij de oplichters terecht. Het doel is vaak uw wachtwoord, pincode of bankgegevens.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Kenmerken van een nep mail</h2>
          <ul className="list-disc list-inside text-senior-base text-gray-700 space-y-2 mb-6">
            <li><strong>Dringende taal:</strong> &quot;Uw account wordt geblokkeerd&quot;, &quot;Reageer binnen 24 uur&quot;, &quot;Er is iets mis&quot; – om u haast te laten maken.</li>
            <li><strong>Link om in te loggen:</strong> U wordt gevraagd op een link te klikken en uw gegevens in te vullen. Echte banken en overheid doen dat bijna nooit zo per e-mail.</li>
            <li><strong>Vreemde afzender:</strong> Het e-mailadres lijkt op het echte adres maar is net anders (bijv. info@seniorease-nl.com in plaats van info@seniorease.nl).</li>
            <li><strong>Taalfouten of rare zinnen:</strong> Officiële mails zijn meestal netjes geschreven.</li>
          </ul>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Wat moet u doen?</h2>
          <ol className="space-y-3 list-decimal list-inside text-senior-base text-gray-700 mb-6">
            <li><strong>Niet op links klikken</strong> in een mail die u niet vertrouwt.</li>
            <li><strong>Niet inloggen</strong> via een link uit de e-mail. Ga zelf naar de website van uw bank of de overheid (typ het adres in of gebruik uw bladwijzer).</li>
            <li>Twijfelt u? <strong>Neem contact op</strong> met de organisatie via het telefoonnummer op hun echte website, niet via de mail.</li>
            <li>Heeft u per ongeluk gegevens ingevuld? <strong>Wijzig direct uw wachtwoord</strong> en neem contact op met uw bank als het om bankzaken gaat.</li>
          </ol>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Tips</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Banken en de Belastingdienst vragen bijna nooit per e-mail om uw inloggegevens of pincode. Wees extra voorzichtig bij mails met bijlagen van onbekende afzenders. Meer over veiligheid: onze <Link href="/uitleg/veiligheid" className="font-bold text-primary hover:underline">uitleg over veiligheid en oplichting</Link>.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Samenvatting</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Phishing = nep mails om uw gegevens te stelen. Let op: dringende taal, vreemde links, afzender die net anders is. Klik niet op de link; ga zelf naar de echte website. Bij twijfel: bel het bedrijf of de overheid.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Gerelateerde uitleg</h2>
          <ul className="space-y-2">
            <li><Link href="/digitale-hulp/veilig-internet" className="font-semibold text-primary hover:underline">Veilig internet (alle artikelen)</Link></li>
            <li><Link href="/uitleg/veiligheid" className="font-semibold text-primary hover:underline">Oplichting herkennen (veiligheid)</Link></li>
            <li><Link href="/digitale-hulp/veilig-wachtwoord-maken" className="font-semibold text-primary hover:underline">Veilig wachtwoord maken</Link></li>
            <li><Link href="/uitleg/wifi" className="font-semibold text-primary hover:underline">WiFi instellen</Link></li>
            <li><Link href="/uitleg/qr-code" className="font-semibold text-primary hover:underline">QR-code scannen</Link></li>
          </ul>
        </>
      );
    case 'e-mail-openen':
      return (
        <>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
            E-mail is post via internet. U ontvangt berichten van familie, de overheid of winkels. Hier leest u hoe u e-mail opent op uw telefoon of computer. Stap voor stap voor beginners.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Wat heeft u nodig?</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Een e-mailaccount (bijvoorbeeld Gmail of Outlook). En een app op uw telefoon of een website op uw computer. Heeft u nog geen account? Maak er een aan op gmail.com of outlook.com – dat is gratis.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Stap voor stap – op de telefoon</h2>
          <ol className="space-y-2 list-decimal list-inside text-senior-base text-gray-700 mb-6">
            <li>Open de app <strong>Gmail</strong>, <strong>Outlook</strong> of <strong>E-mail</strong> (naam kan per telefoon verschillen).</li>
            <li>Log in met uw e-mailadres en wachtwoord als dat wordt gevraagd.</li>
            <li>U ziet een lijst met ontvangen berichten. De nieuwste staan vaak bovenaan.</li>
            <li>Tik op een bericht om het te openen en te lezen.</li>
          </ol>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Stap voor stap – op de computer</h2>
          <ol className="space-y-2 list-decimal list-inside text-senior-base text-gray-700 mb-6">
            <li>Open uw internetprogramma (Chrome, Edge of een andere browser).</li>
            <li>Typ in de balk bovenaan het adres: gmail.com of outlook.com.</li>
            <li>Log in met uw e-mailadres en wachtwoord.</li>
            <li>U ziet uw postvak (inbox). Klik op een e-mail om hem te lezen.</li>
          </ol>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Tips</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Klik nooit op links in vreemde e-mails die om uw wachtwoord vragen. Dat is vaak oplichting. Meer: <Link href="/uitleg/veiligheid" className="font-bold text-primary hover:underline">Oplichting herkennen</Link> en <Link href="/digitale-hulp/phishing-mail-herkennen" className="font-bold text-primary hover:underline">Phishing mail herkennen</Link>. Gebruik een sterk wachtwoord: <Link href="/digitale-hulp/veilig-wachtwoord-maken" className="font-bold text-primary hover:underline">Veilig wachtwoord maken</Link>.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Samenvatting</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Telefoon: open de e-mailapp → log in → tik op een bericht. Computer: ga naar gmail.com of outlook.com → log in → klik op een e-mail.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Gerelateerde uitleg</h2>
          <ul className="space-y-2">
            <li><Link href="/digitale-hulp/internet-email" className="font-semibold text-primary hover:underline">Internet &amp; e-mail (alle artikelen)</Link></li>
            <li><Link href="/uitleg/wifi" className="font-semibold text-primary hover:underline">WiFi instellen</Link></li>
            <li><Link href="/digitale-hulp/veilig-wachtwoord-maken" className="font-semibold text-primary hover:underline">Veilig wachtwoord maken</Link></li>
            <li><Link href="/uitleg/veiligheid" className="font-semibold text-primary hover:underline">Oplichting herkennen</Link></li>
            <li><Link href="/digitale-hulp/wifi-werkt-niet-oplossen" className="font-semibold text-primary hover:underline">Wifi werkt niet – oplossen</Link></li>
          </ul>
        </>
      );
    case 'apps-installeren':
      return (
        <>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
            Apps zijn programma&apos;s op uw telefoon. WhatsApp, de bank, een game: u haalt ze uit een winkel op uw telefoon. Op Android heet die winkel &quot;Play Store&quot;, op de iPhone &quot;App Store&quot;. Alleen via deze winkels installeren is veilig.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Waarom via de winkel?</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            De Play Store en App Store controleren apps. Zo loopt u minder risico op virussen of oplichting. Installeer geen apps via vreemde links in e-mails of berichten. Meer over veiligheid: <Link href="/uitleg/veiligheid" className="font-bold text-primary hover:underline">Oplichting herkennen</Link>.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Stap voor stap – Android</h2>
          <ol className="space-y-2 list-decimal list-inside text-senior-base text-gray-700 mb-6">
            <li>Open de app <strong>Play Store</strong> (winkel-icoon).</li>
            <li>Tik bovenaan in het zoekveld. Typ de naam van de app.</li>
            <li>Tik op de juiste app in de lijst.</li>
            <li>Tik op <strong>Installeren</strong>. Wacht tot het klaar is.</li>
            <li>Het icoon staat nu op uw startscherm. Tik erop om de app te openen.</li>
          </ol>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Stap voor stap – iPhone of iPad</h2>
          <ol className="space-y-2 list-decimal list-inside text-senior-base text-gray-700 mb-6">
            <li>Open de app <strong>App Store</strong> (blauw icoon).</li>
            <li>Tik onderaan op het zoek-icoon. Typ de naam van de app.</li>
            <li>Tik op de juiste app. Tik op <strong>Haal op</strong> of <strong>Open</strong>.</li>
            <li>Voer eventueel uw wachtwoord of Face ID in.</li>
            <li>De app wordt geïnstalleerd. U vindt het icoon op het startscherm.</li>
          </ol>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Tips</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            U heeft een Google- of Apple-account nodig. Die heeft u vaak al. Geen internet? Dan kunt u niet installeren. Kijk bij <Link href="/uitleg/wifi" className="font-bold text-primary hover:underline">WiFi instellen</Link> of <Link href="/digitale-hulp/wifi-werkt-niet-oplossen" className="font-bold text-primary hover:underline">Wifi werkt niet – oplossen</Link>.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Samenvatting</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Play Store (Android) of App Store (iPhone) openen → zoeken op naam → Installeren of Haal op tikken → klaar. Alleen via deze winkels installeren.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Gerelateerde uitleg</h2>
          <ul className="space-y-2">
            <li><Link href="/digitale-hulp/whatsapp-uitleg-beginners" className="font-semibold text-primary hover:underline">WhatsApp uitleg voor beginners</Link></li>
            <li><Link href="/digitale-hulp/smartphone" className="font-semibold text-primary hover:underline">Smartphone hulp</Link></li>
            <li><Link href="/uitleg/wifi" className="font-semibold text-primary hover:underline">WiFi instellen</Link></li>
            <li><Link href="/uitleg/veiligheid" className="font-semibold text-primary hover:underline">Oplichting herkennen</Link></li>
            <li><Link href="/uitleg/qr-code" className="font-semibold text-primary hover:underline">QR-code scannen</Link></li>
          </ul>
        </>
      );
    case 'letters-groter-maken-telefoon':
      return (
        <>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
            De letters op uw telefoon zijn te klein om comfortabel te lezen? U kunt de lettergrootte groter zetten in de instellingen. Hier leest u hoe dat gaat op Android en iPhone.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Waarom zoeken mensen dit?</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Veel mensen vinden de standaard letters op hun telefoon te klein. Door de lettergrootte te vergroten wordt lezen in apps, berichten en op websites een stuk makkelijker.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Stap voor stap</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-2 font-semibold">Android</p>
          <ol className="space-y-2 list-decimal list-inside text-senior-base text-gray-700 mb-4">
            <li>Open <strong>Instellingen</strong> (tandwiel-icoon).</li>
            <li>Zoek <strong>Weergave</strong> of <strong>Toegankelijkheid</strong>.</li>
            <li>Tik op <strong>Lettergrootte</strong> of <strong>Tekengrootte</strong>.</li>
            <li>Schuif de balk naar rechts voor grotere letters. De wijziging geldt direct in veel apps.</li>
          </ol>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-2 font-semibold">iPhone / iPad</p>
          <ol className="space-y-2 list-decimal list-inside text-senior-base text-gray-700 mb-6">
            <li>Open <strong>Instellingen</strong>.</li>
            <li>Ga naar <strong>Weergave en helderheid</strong> of <strong>Toegankelijkheid</strong>.</li>
            <li>Tik op <strong>Tekengrootte</strong> en sleep de schuif naar rechts.</li>
            <li>Optioneel: zet <strong>Vetgedrukte tekst</strong> aan voor nog betere leesbaarheid.</li>
          </ol>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Tips</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Niet alle apps volgen de instelling meteen; sommige apps hebben een eigen lettergrootte. Op veel telefoons kunt u ook met twee vingers op het scherm &quot;knijpen&quot; om in te zoomen op een webpagina.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Samenvatting</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Instellingen → Weergave/Toegankelijkheid → Lettergrootte of Tekengrootte. Schuif naar rechts voor grotere letters. Werkt op zowel Android als iPhone.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Gerelateerde uitleg</h2>
          <ul className="space-y-2">
            <li><Link href="/uitleg/wifi" className="font-semibold text-primary hover:underline">WiFi instellen</Link></li>
            <li><Link href="/uitleg/veiligheid" className="font-semibold text-primary hover:underline">Oplichting herkennen</Link></li>
            <li><Link href="/uitleg/qr-code" className="font-semibold text-primary hover:underline">QR-code scannen</Link></li>
          </ul>
        </>
      );
    case 'wifi-werkt-niet-oplossen':
      return (
        <>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
            Geen internet op uw telefoon of computer? Of de wifi valt steeds weg? Meestal lost een van deze stappen het op. Simpel en stap voor stap.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Waarom werkt mijn wifi niet?</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Soms staat wifi uit op uw apparaat. Of de router (het kastje thuis) moet even opnieuw opstarten. Soms helpt het om opnieuw in te loggen op het netwerk.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Stap voor stap</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-2 font-semibold">Stap 1: WiFi aan op uw apparaat</p>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Ga naar <strong>Instellingen</strong> → <strong>Netwerk</strong> of <strong>WiFi</strong>. Zet WiFi <strong>aan</strong>. Controleer of u verbonden bent met uw eigen netwerk (de naam staat vaak op de router).
          </p>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-2 font-semibold">Stap 2: Router herstarten</p>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Trek de stekker van uw modem of router uit het stopcontact. Wacht 10 seconden. Doe de stekker er weer in. Wacht een minuut. Probeer daarna opnieuw te verbinden.
          </p>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-2 font-semibold">Stap 3: Netwerk vergeten en opnieuw</p>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            In de WiFi-instellingen kunt u het netwerk &quot;vergeten&quot;. Daarna kiest u het netwerk opnieuw en voert u het wachtwoord in. Heeft u nog geen wifi thuis? Zie <Link href="/uitleg/wifi" className="font-bold text-primary hover:underline">WiFi instellen</Link>.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Tips</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Het wachtwoord van uw wifi staat vaak op een sticker op de router. Werkt het na deze stappen nog niet? Bel uw internetprovider. Zij kunnen controleren of er storing is.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Samenvatting</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Eerst: WiFi aan op uw telefoon of computer. Dan: router stekker eruit, even wachten, weer aan. Lukt het niet? Netwerk vergeten en opnieuw verbinden met wachtwoord.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Gerelateerde uitleg</h2>
          <ul className="space-y-2">
            <li><Link href="/uitleg/wifi" className="font-semibold text-primary hover:underline">WiFi instellen</Link></li>
            <li><Link href="/digitale-hulp/internet-email" className="font-semibold text-primary hover:underline">Internet &amp; e-mail (alle artikelen)</Link></li>
            <li><Link href="/digitale-hulp/e-mail-openen" className="font-semibold text-primary hover:underline">E-mail openen</Link></li>
            <li><Link href="/digitale-hulp/smartphone" className="font-semibold text-primary hover:underline">Smartphone hulp</Link></li>
            <li><Link href="/uitleg/qr-code" className="font-semibold text-primary hover:underline">QR-code scannen</Link></li>
          </ul>
        </>
      );
    case 'fotos-kwijt-telefoon':
      return (
        <>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
            Foto&apos;s die u kwijt lijkt te zijn, staan soms nog op uw telefoon in een andere map, in de prullenbak of in een cloud-back-up. Zo zoekt u ze terug.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Foto&apos;s-app of Galerij doorzoeken</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Open de app Foto&apos;s of Galerij. Kijk in mappen zoals &quot;Download&quot;, &quot;WhatsApp&quot; of &quot;Camera&quot;. Soms staan foto&apos;s in een submap die u niet meteen ziet.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Prullenbak / recent verwijderd</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            In de Foto&apos;s-app (Android en iPhone) is er vaak een map &quot;Recent verwijderd&quot; of &quot;Prullenbak&quot;. Verwijderde foto&apos;s blijven daar een tijdje bewaard en kunnen worden hersteld.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Cloud-back-up</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed">
            Als u een back-up gebruikt (bijv. Google Foto&apos;s of iCloud), log dan in op die dienst op de computer of in de app. Uw foto&apos;s kunnen daar staan. Meer over foto&apos;s bewaren en ordenen: onze{' '}
            <Link href="/uitleg/fotos-ordenen" className="font-bold text-primary hover:underline">Foto&apos;s ordenen</Link> en <Link href="/uitleg/fotos-maken" className="font-bold text-primary hover:underline">Foto&apos;s maken</Link> uitleg.
          </p>
        </>
      );
    case 'wat-is-ai-simpel-uitgelegd':
      return (
        <>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
            AI (kunstmatige intelligentie) is software die teksten kan begrijpen en maken, vragen kan beantwoorden en u kan helpen met zoeken, samenvatten of uitleg. U gebruikt het bijvoorbeeld als u met ChatGPT praat of zoekt via Google.
          </p>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
            Het is geen mens maar een programma dat patronen uit veel teksten heeft geleerd. Daardoor kan het nuttige antwoorden geven, maar het kan ook fouten maken. Gebruik het als handige helper, niet als enige bron voor belangrijke beslissingen.
          </p>
          <p className="text-senior-base text-gray-700 leading-relaxed">
            Wij leggen uitgebreid uit wat AI is, hoe u het veilig gebruikt en waar u het kunt proberen. Ga naar{' '}
            <Link href="/wat-is-ai" className="font-bold text-primary hover:underline">Wat is AI? Simpele uitleg voor senioren</Link>.
          </p>
        </>
      );
    case 'veilig-wachtwoord-maken':
      return (
        <>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
            Een sterk wachtwoord beschermt uw e-mail, bank en andere accounts. Hier leest u in eenvoudige taal hoe u een veilig wachtwoord maakt dat u toch kunt onthouden.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Wat is een veilig wachtwoord?</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Lang genoeg. Met letters, cijfers en een teken (zoals ! of @). Geen naam of geboortedatum. Het beste: voor elk account een ander wachtwoord. Dan kan iemand die één wachtwoord kent niet overal bij.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Stap voor stap: de wachtzin</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-2">Een handige methode is de wachtzin:</p>
          <ol className="space-y-2 list-decimal list-inside text-senior-base text-gray-700 mb-6">
            <li>Kies een korte zin die u makkelijk onthoudt. Bijvoorbeeld: &quot;Mijn tuin is mooi.&quot;</li>
            <li>Schrijf die zin als één woord: MijnTuinIsMooi.</li>
            <li>Voeg een cijfer toe, bijvoorbeeld het jaar: MijnTuinIsMooi2024.</li>
            <li>Voeg een leesteken toe aan het eind: MijnTuinIsMooi2024!</li>
          </ol>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Tips</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Deel uw wachtwoord nooit per e-mail of WhatsApp. Klik niet op links in mails die vragen om &quot;uw wachtwoord te bevestigen&quot; – dat is vaak oplichting. Meer: <Link href="/uitleg/veiligheid" className="font-bold text-primary hover:underline">Oplichting herkennen</Link> en <Link href="/digitale-hulp/phishing-mail-herkennen" className="font-bold text-primary hover:underline">Phishing mail herkennen</Link>. U kunt wachtwoorden in een notitieboekje thuis bewaren, of een wachtwoordmanager gebruiken. Uitgebreide uitleg: <Link href="/uitleg/wachtwoorden" className="font-bold text-primary hover:underline">Wachtwoorden</Link>.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Samenvatting</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Veilig wachtwoord = lang, letters + cijfers + teken, geen persoonlijke gegevens. Wachtzin: zin als één woord + cijfer + ! of @. Voor elk account een ander wachtwoord.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Gerelateerde uitleg</h2>
          <ul className="space-y-2">
            <li><Link href="/uitleg/wachtwoorden" className="font-semibold text-primary hover:underline">Wachtwoorden (uitgebreide uitleg)</Link></li>
            <li><Link href="/digitale-hulp/veilig-internet" className="font-semibold text-primary hover:underline">Veilig internet (alle artikelen)</Link></li>
            <li><Link href="/uitleg/veiligheid" className="font-semibold text-primary hover:underline">Oplichting herkennen</Link></li>
            <li><Link href="/digitale-hulp/phishing-mail-herkennen" className="font-semibold text-primary hover:underline">Phishing mail herkennen</Link></li>
            <li><Link href="/uitleg/wifi" className="font-semibold text-primary hover:underline">WiFi instellen</Link></li>
          </ul>
        </>
      );
    case 'bluetooth-verbinden':
      return (
        <>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-4">
            Bluetooth is een draadloze verbinding over korte afstand. U kunt er bijvoorbeeld een hoofdtelefoon, speaker of handsfree-set mee verbinden met uw telefoon of tablet, zonder kabels.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Stap 1: Bluetooth aanzetten op uw telefoon</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Ga naar <strong>Instellingen</strong> (tandwiel) en zoek <strong>Bluetooth</strong>. Zet Bluetooth <strong>aan</strong>. Uw telefoon zoekt nu naar apparaten in de buurt.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Stap 2: Het andere apparaat klaarzetten</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Zet uw hoofdtelefoon, speaker of ander apparaat <strong>aan</strong>. Vaak moet u een knop even ingedrukt houden tot er een lampje knippert of een geluidje klinkt. Dan staat het apparaat in de &quot;koppelmodus&quot; en is het vindbaar voor uw telefoon.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Stap 3: Verbinden</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Op uw telefoon verschijnt onder Bluetooth een lijst met beschikbare apparaten. Tik op de naam van uw hoofdtelefoon of speaker. Als er om een code wordt gevraagd, probeer dan <strong>0000</strong> of <strong>1234</strong>. Daarna zijn ze verbonden.
          </p>
          <p className="text-senior-base text-gray-700 leading-relaxed">
            Meer over het koppelen van een draadloze hoofdtelefoon, inclusief handige tips, vindt u in onze{' '}
            <Link href="/uitleg/hoofdtelefoon" className="font-bold text-primary hover:underline">uitleg over hoofdtelefoon</Link>.
          </p>
        </>
      );
    case 'wat-is-de-cloud':
      return (
        <>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
            U hoort vaak &quot;in de cloud&quot; of &quot;opslaan in de cloud&quot;. Wat betekent dat eigenlijk? En is het veilig? Hier leest u het in eenvoudige taal.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Wat is de cloud?</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            De cloud is geen echte wolk. Het is een ander woord voor <strong>opslag op internet</strong>. Uw foto&apos;s, bestanden of back-ups staan dan niet alleen op uw telefoon of computer, maar ook op de servers van een bedrijf (zoals Google, Apple of Microsoft). U kunt ze daar ophalen als u inlogt met uw account – bijvoorbeeld op een andere telefoon of na het kopen van een nieuw apparaat.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Waar komt u de cloud tegen?</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Veel diensten die u misschien al gebruikt, werken met de cloud: <strong>Google Foto&apos;s</strong> of <strong>iCloud</strong> (Apple) voor foto&apos;s, <strong>OneDrive</strong> of <strong>Dropbox</strong> voor bestanden, en de back-up van uw telefoon. Als u &quot;back-up naar de cloud&quot; aanzet, worden uw gegevens veilig op internet bewaard.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Voordelen in het kort</h2>
          <ul className="list-disc list-inside text-senior-base text-gray-700 space-y-2 mb-6">
            <li>Uw foto&apos;s en bestanden blijven bewaard als uw telefoon kapot gaat of kwijt is.</li>
            <li>U kunt ze op meerdere apparaten bekijken (telefoon, tablet, computer) als u bent ingelogd.</li>
            <li>U hoeft niet alles op uw telefoon te bewaren; dat scheelt ruimte.</li>
          </ul>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Tips en veiligheid</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Gebruik een <strong>sterk wachtwoord</strong> voor uw cloud-account en zet waar mogelijk <strong>tweestapsverificatie</strong> aan. Dan kunnen anderen niet zomaar bij uw gegevens. Klik nooit op vreemde links in e-mails die zeggen dat u &quot;uw cloud-account moet bevestigen&quot; – dat is vaak oplichting. Meer hierover: <Link href="/uitleg/veiligheid" className="font-bold text-primary hover:underline">Oplichting herkennen</Link> en <Link href="/digitale-hulp/veilig-wachtwoord-maken" className="font-bold text-primary hover:underline">Veilig wachtwoord maken</Link>.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Samenvatting</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            De cloud = opslag op internet. Uw bestanden en foto&apos;s staan dan ook bij een dienst (zoals Google of Apple), zodat u ze niet kwijt raakt en ze op meerdere apparaten kunt gebruiken. Zorg voor een goed wachtwoord en wees voorzichtig met nepberichten over uw account.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Gerelateerde uitleg</h2>
          <ul className="space-y-2">
            <li><Link href="/uitleg/veiligheid" className="font-semibold text-primary hover:underline">Oplichting herkennen</Link></li>
            <li><Link href="/digitale-hulp/veilig-wachtwoord-maken" className="font-semibold text-primary hover:underline">Veilig wachtwoord maken</Link></li>
            <li><Link href="/digitale-hulp/fotos-kwijt-telefoon" className="font-semibold text-primary hover:underline">Foto&apos;s kwijt op telefoon</Link></li>
            <li><Link href="/uitleg/wifi" className="font-semibold text-primary hover:underline">WiFi instellen</Link></li>
            <li><Link href="/uitleg/qr-code" className="font-semibold text-primary hover:underline">QR-code scannen</Link></li>
          </ul>
        </>
      );
    case 'screenshot-en-schermopname-telefoon':
      return (
        <>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
            Wilt u een plaatje van wat er op uw scherm staat bewaren? Of een kort filmpje van wat u op het scherm doet? Dat kan: met een <strong>screenshot</strong> (een foto van het scherm) of een <strong>schermopname</strong> (een filmpje). Hier leest u hoe het werkt op Android en iPhone.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Wat is het verschil?</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Een <strong>screenshot</strong> is één stilstaande foto van uw scherm. Handig om iets te bewaren of door te sturen: een bericht, een recept, een foutmelding. Een <strong>schermopname</strong> is een filmpje van wat er op uw scherm gebeurt – bijvoorbeeld om aan iemand te laten zien hoe u iets doet.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Screenshot maken – stap voor stap</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-2 font-semibold">Android</p>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Houd tegelijk de <strong>aan/uit-knop</strong> en de <strong>volume-omlaag-knop</strong> ongeveer een seconde ingedrukt. Het scherm knippert even; de screenshot is gemaakt. U vindt hem in uw Foto&apos;s-app of Galerij, vaak in een map &quot;Screenshots&quot; of &quot;Schermopnamen&quot;. Op sommige Android-telefoons kunt u ook met uw hand langs het scherm vegen om een screenshot te maken (als dat is ingeschakeld in Instellingen).
          </p>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-2 font-semibold">iPhone / iPad</p>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
            Houd tegelijk de <strong>zijknop</strong> (aan/uit) en de <strong>home-knop</strong> kort ingedrukt; het scherm flitst en de foto staat in uw Foto&apos;s. Heeft uw iPhone geen home-knop? Dan: <strong>zijknop</strong> + <strong>volume omhoog</strong> tegelijk kort indrukken. De screenshot verschijnt linksonder in beeld; u kunt erop tikken om te bewerken of weggooien, of hem laten staan – hij wordt automatisch opgeslagen in Foto&apos;s.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Schermopname maken – stap voor stap</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-2 font-semibold">Android</p>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Veel Android-telefoons hebben een schermopname-knop in het <strong>snelmenu</strong>: veeg met één vinger van boven naar beneden over het scherm (of van beneden naar boven, afhankelijk van uw telefoon). In het menu dat verschijnt zoekt u het icoontje <strong>Schermopname</strong> of een cirkel in een vierkant. Tik erop om te starten; tik nog eens om te stoppen. Het filmpje wordt opgeslagen in Foto&apos;s of Galerij. Staat het icoon er niet? Ga dan naar Instellingen en zoek op &quot;schermopname&quot; of &quot;screen record&quot; om het toe te voegen aan het menu.
          </p>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-2 font-semibold">iPhone / iPad</p>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-6">
            Ga naar <strong>Instellingen</strong> → <strong>Beheer van het beeldscherm</strong> (of <strong>Bedieningsbalk</strong>) → <strong>Bedieningsbalk aanpassen</strong>. Voeg het icoon <strong>Schermopname</strong> (rondje in een cirkel) toe. Daarna: open de Bedieningsbalk (veeg naar beneden vanaf de rechterbovenhoek op iPhone zonder home-knop, of vanaf de onderkant). Tik op het schermopname-icoon; na 3 tellen begint de opname. Om te stoppen: tik op de rode balk bovenaan of open de Bedieningsbalk weer en tik op het icoon. Het filmpje staat in uw Foto&apos;s-app.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Tips</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Screenshots en schermopnamen nemen veel ruimte in. Verwijder ze regelmatig als u ze niet meer nodig heeft, of zet ze over naar de computer. Bij een schermopname: zorg dat u geen wachtwoorden of gevoelige gegevens in beeld laat als u het filmpje deelt. Meer over foto&apos;s bewaren en ordenen: <Link href="/uitleg/fotos-ordenen" className="font-bold text-primary hover:underline">Foto&apos;s ordenen</Link> en <Link href="/digitale-hulp/fotos-kwijt-telefoon" className="font-bold text-primary hover:underline">Foto&apos;s kwijt op telefoon</Link>.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Samenvatting</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            <strong>Screenshot:</strong> Android = aan/uit + volume omlaag. iPhone = zijknop + home, of zijknop + volume omhoog. <strong>Schermopname:</strong> Android = snelmenu (veeg van boven) → Schermopname. iPhone = eerst icoon toevoegen in Instellingen → Bedieningsbalk, daarna via Bedieningsbalk opnemen en stoppen.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Gerelateerde uitleg</h2>
          <ul className="space-y-2">
            <li><Link href="/uitleg/fotos-ordenen" className="font-semibold text-primary hover:underline">Foto&apos;s ordenen</Link></li>
            <li><Link href="/digitale-hulp/fotos-kwijt-telefoon" className="font-semibold text-primary hover:underline">Foto&apos;s kwijt op telefoon</Link></li>
            <li><Link href="/uitleg/wifi" className="font-semibold text-primary hover:underline">WiFi instellen</Link></li>
            <li><Link href="/uitleg/veiligheid" className="font-semibold text-primary hover:underline">Oplichting herkennen</Link></li>
            <li><Link href="/uitleg/qr-code" className="font-semibold text-primary hover:underline">QR-code scannen</Link></li>
          </ul>
        </>
      );
    case 'googelen-google-zoeken':
      return (
        <>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
            Wilt u iets opzoeken op internet? Dan gebruikt u bijna altijd <strong>Google</strong>. Dat heet ook wel <strong>googelen</strong>: u typt een vraag, en Google toont websites met antwoorden. Hier leest u hoe het werkt — rustig en stap voor stap.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Google openen</h2>
          <ol className="space-y-3 list-decimal list-inside text-senior-base text-gray-700 mb-6">
            <li>Open <strong>Chrome</strong> of <strong>Safari</strong> op uw telefoon of computer.</li>
            <li>Typ in de adresbalk bovenaan: <strong>google.nl</strong></li>
            <li>Druk op Enter. U ziet nu de Google-startpagina met een groot zoekvak.</li>
          </ol>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Zoeken — zo werkt het</h2>
          <ol className="space-y-3 list-decimal list-inside text-senior-base text-gray-700 mb-6">
            <li>Tik of klik in het <strong>zoekvak</strong> in het midden van het scherm.</li>
            <li>Typ wat u wilt weten, bijvoorbeeld: &quot;weer morgen&quot; of &quot;openingstijden bibliotheek&quot;.</li>
            <li>Tik op het <strong>vergrootglas</strong> of druk op <strong>Enter</strong>.</li>
            <li>Google toont een lijst met websites. Tik op een regel om die pagina te openen.</li>
          </ol>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">4 tips voor betere resultaten</h2>
          <ul className="space-y-3 text-senior-base text-gray-700 mb-6 list-disc list-inside">
            <li><strong>Gebruik meerdere woorden</strong> — &quot;buslijn Enschede&quot; is preciezer dan alleen &quot;bus&quot;.</li>
            <li><strong>Let op advertenties</strong> — bovenaan staan soms regels met het label &quot;Advertentie&quot;.</li>
            <li><strong>Check het adres</strong> — betrouwbare sites eindigen vaak op .nl of .gov.</li>
            <li><strong>Inspreken kan ook</strong> — ziet u een microfoon-knop? Dan kunt u uw vraag hardop stellen.</li>
          </ul>
          <div className="rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-neutral-stone/40 bg-neutral-cream">
            <div className="text-4xl" aria-hidden="true">▶️</div>
            <div>
              <h3 className="text-senior-lg font-bold text-gray-800 mb-1">Liever kijken dan lezen?</h3>
              <p className="text-senior-base text-gray-600 mb-4">
                Bekijk onze uitlegvideo over googelen op YouTube — rustig tempo, grote letters.
              </p>
              <a
                href="https://www.youtube.com/playlist?list=PLw97JnScZym8Ae4tlW7j38EfvMKMRIBem"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold rounded-xl px-5 py-3 transition-all border-2 hover:shadow-sm text-primary border-primary bg-white"
              >
                Bekijk tips-video&apos;s op YouTube
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Gerelateerde uitleg</h2>
          <ul className="space-y-2">
            <li><Link href="/uitleg/inspreken" className="font-semibold text-primary hover:underline">Inspreken op uw telefoon (ook in Google)</Link></li>
            <li><Link href="/uitleg/google-maps" className="font-semibold text-primary hover:underline">Google Maps gebruiken</Link></li>
            <li><Link href="/uitleg/wifi" className="font-semibold text-primary hover:underline">WiFi instellen</Link></li>
            <li><Link href="/uitleg/veiligheid" className="font-semibold text-primary hover:underline">Oplichting herkennen</Link></li>
            <li><Link href="/wat-is-ai/chatgpt" className="font-semibold text-primary hover:underline">Wat is ChatGPT? (en het verschil met Google)</Link></li>
          </ul>
        </>
      );
    case 'e-bike-fietsapps':
      return (
        <>
          <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed mb-6">
            Wilt u routes plannen, uw rit bijhouden of handige fiets- of e-bike apps gebruiken? Er zijn apps om te navigeren, afstanden te meten of uw e-bike te koppelen. Hier vindt u een overzicht en link naar de uitgebreide uitleg.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">E-bike en fietsapps</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Met een fiets- of e-bike app kunt u bijvoorbeeld een route uitstippelen, zien hoe ver u heeft gefietst of instellingen van uw e-bike bekijken. Veel apps werken op uw telefoon; u plaatst die in een houder op het stuur of luistert naar gesproken aanwijzingen.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Uitgebreide uitleg</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Voor stap-voor-stap uitleg over e-bike apps, routes plannen en handige tips vindt u hier ons volledige artikel:
          </p>
          <p className="mb-6">
            <Link href="/uitleg/e-bike" className="inline-block bg-primary text-white px-6 py-3 rounded-xl text-senior-base font-bold hover:bg-primary-dark transition-colors">
              E-bike en fietsapps – volledige uitleg
            </Link>
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Gerelateerde uitleg</h2>
          <ul className="space-y-2">
            <li><Link href="/uitleg/e-bike" className="font-semibold text-primary hover:underline">E-bike en fietsapps (uitgebreid)</Link></li>
            <li><Link href="/hobbys" className="font-semibold text-primary hover:underline">Hobby&apos;s overzicht</Link></li>
            <li><Link href="/digitale-hulp/smartphone" className="font-semibold text-primary hover:underline">Smartphone hulp</Link></li>
          </ul>
        </>
      );
    default:
      return (
        <p className="text-senior-base text-gray-700 leading-relaxed">
          Dit artikel wordt nog verder uitgewerkt. Kom later terug voor de volledige uitleg.
        </p>
      );
  }
}

export default async function DigitaleHulpArtikelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artikel = getArtikelBySlug(slug);
  if (!artikel) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://seniorease.nl" },
      { "@type": "ListItem", "position": 2, "name": "Digitale hulp", "item": "https://seniorease.nl/digitale-hulp" },
      { "@type": "ListItem", "position": 3, "name": artikel.title, "item": `https://seniorease.nl/digitale-hulp/${artikel.slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-neutral-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <header className="bg-white border-b border-neutral-stone/40 py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/digitale-hulp"
              className="inline-flex items-center gap-1.5 text-primary hover:text-primary-dark mb-4 text-senior-base font-medium"
              style={{ minHeight: 'auto' }}
            >
              ← Digitale hulp
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              {artikel.title}
            </h1>
            <p className="text-senior-base text-gray-500 mt-2">
              {artikel.description}
            </p>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-stone/40 p-8 md:p-12">
            <ArtikelContent slug={artikel.slug} />
            <p className="mt-10 pt-6 border-t border-neutral-stone/40">
              <Link
                href="/digitale-hulp"
                className="text-senior-base font-semibold text-primary hover:underline"
                style={{ minHeight: 'auto' }}
              >
                ← Alle artikelen Digitale hulp
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
