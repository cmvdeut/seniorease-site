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
          <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
            WhatsApp is een gratis app om berichten te sturen en foto&apos;s te delen met familie en vrienden. U heeft alleen internet nodig, geen sms-kosten. Veel mensen gebruiken het om snel even te appen of een foto te sturen.
          </p>
          <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
            Om te beginnen heeft u WhatsApp op uw telefoon nodig en het telefoonnummer van de persoon met wie u wilt chatten. Daarna opent u een chat en typt u een bericht of stuurt u een foto.
          </p>
          <p className="text-senior-base text-gray-700 leading-relaxed">
            Wij leggen het stap voor stap uit: hoe u WhatsApp opent, een bericht stuurt en een foto verstuurt. Ga naar onze{' '}
            <Link href="/uitleg/whatsapp-basis" className="font-bold text-primary hover:underline">WhatsApp basis-uitleg</Link> voor de volledige handleiding.
          </p>
        </>
      );
    case 'whatsapp-fotos-opslaan':
      return (
        <>
          <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
            Foto&apos;s die u via WhatsApp krijgt, staan eerst alleen in de app. Om ze te bewaren op uw telefoon, moet u ze opslaan. Dat kan per foto of voor meerdere tegelijk.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Stap 1: Foto openen</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Tik op de foto in het chatbericht zodat hij groot op het scherm staat.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Stap 2: Opslaan</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Zoek het icoontje voor download of opslaan (vaak een pijl naar beneden of een schijf). Tik erop. De foto wordt dan opgeslagen in uw telefoon, bijvoorbeeld in de map &quot;WhatsApp Images&quot; of &quot;Download&quot;.
          </p>
          <p className="text-senior-base text-gray-700 leading-relaxed">
            U vindt de opgeslagen foto&apos;s daarna in uw Foto&apos;s-app of Galerij. Meer uitgebreide uitleg over WhatsApp vindt u bij onze{' '}
            <Link href="/uitleg/whatsapp-basis" className="font-bold text-primary hover:underline">WhatsApp basis-uitleg</Link>.
          </p>
        </>
      );
    case 'telefoon-sneller-maken':
      return (
        <>
          <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
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
    case 'phishing-herkennen':
      return (
        <>
          <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
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
        </>
      );
    case 'e-mail-openen':
      return (
        <>
          <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
            E-mail openen kan op uw telefoon, tablet of computer. U heeft een e-mailaccount nodig (bijvoorbeeld van Gmail, Outlook of uw provider) en een app of website om uw postvak te openen.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Op de telefoon</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Open de app &quot;Gmail&quot;, &quot;Outlook&quot; of &quot;E-mail&quot; (naam verschilt per telefoon). Log in met uw e-mailadres en wachtwoord als dat wordt gevraagd. U ziet een lijst met ontvangen berichten; tik op een bericht om het te openen.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Op de computer</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed">
            Ga in uw browser naar de website van uw e-mailprovider (bijv. gmail.com of outlook.com). Log in. U ziet uw inbox; klik op een e-mail om hem te lezen.
          </p>
        </>
      );
    case 'apps-installeren':
      return (
        <>
          <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
            Apps zijn programma&apos;s op uw telefoon of tablet. U installeert ze via een winkel: op Android heet die &quot;Google Play&quot;, op de iPhone &quot;App Store&quot;. Alleen via deze winkels installeren is het veiligst.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Stappen (Android)</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Open de app &quot;Play Store&quot;. Zoek bovenaan in het zoekveld de naam van de app. Tik op de juiste app in de zoekresultaten. Tik op &quot;Installeren&quot; (of &quot;Open&quot; als u hem al eens had). Wacht tot de installatie klaar is; daarna verschijnt het icoon op uw startscherm.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Stappen (iPhone/iPad)</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed">
            Open de app &quot;App Store&quot;. Tik op het zoek-icoon en typ de naam van de app. Tik op &quot;Haal op&quot; of &quot;Open&quot;. Voer eventueel uw wachtwoord of Face ID in. De app wordt geïnstalleerd en is daarna te vinden op het startscherm.
          </p>
        </>
      );
    case 'letters-groter-maken-telefoon':
      return (
        <>
          <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
            Als de letters op uw telefoon te klein zijn, kunt u ze groter maken via de instellingen. Dat maakt teksten in apps en op websites beter leesbaar.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">Android</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Ga naar <strong>Instellingen</strong> (tandwiel). Zoek <strong>Weergave</strong> of <strong>Toegankelijkheid</strong>. Tik op <strong>Lettergrootte</strong> of <strong>Tekengrootte</strong> en schuif de balk naar rechts voor grotere letters. De wijziging geldt direct voor veel apps.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">iPhone / iPad</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed">
            Ga naar <strong>Instellingen</strong> → <strong>Weergave en helderheid</strong> (of <strong>Toegankelijkheid</strong>). Tik op <strong>Tekengrootte</strong> en sleep de schuif naar rechts. U kunt ook <strong>Vetgedrukte tekst</strong> aanzetten voor extra leesbaarheid.
          </p>
        </>
      );
    case 'wifi-werkt-niet-oplossen':
      return (
        <>
          <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
            Als uw wifi niet werkt of uw telefoon of computer geen internet heeft, controleer dan het volgende. Vaak lost een van deze stappen het probleem op.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">1. WiFi aan op uw apparaat</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Ga naar Instellingen → Netwerk of WiFi. Zorg dat WiFi aanstaat en dat u verbonden bent met het juiste netwerk (uw eigen thuisnetwerk).
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">2. Router herstarten</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed mb-4">
            Zet de stekker van uw modem of router een paar seconden uit het stopcontact en doe hem weer aan. Wacht een minuut tot het kastje opnieuw is opgestart en probeer opnieuw te verbinden.
          </p>
          <h2 className="text-senior-xl font-bold text-primary mt-8 mb-4">3. Verbinding vergeten en opnieuw</h2>
          <p className="text-senior-base text-gray-700 leading-relaxed">
            Als het nog steeds niet lukt: in de WiFi-instellingen kunt u het netwerk &quot;vergeten&quot; en daarna opnieuw verbinden met het wachtwoord van uw router. Stap-voor-stap uitleg voor het verbinden vindt u bij onze{' '}
            <Link href="/uitleg/wifi" className="font-bold text-primary hover:underline">WiFi instellen uitleg</Link>.
          </p>
        </>
      );
    case 'fotos-kwijt-telefoon':
      return (
        <>
          <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
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
          <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
            AI (kunstmatige intelligentie) is software die teksten kan begrijpen en maken, vragen kan beantwoorden en u kan helpen met zoeken, samenvatten of uitleg. U gebruikt het bijvoorbeeld als u met ChatGPT praat of zoekt via Google.
          </p>
          <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
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
          <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
            Een veilig wachtwoord is lang genoeg, bevat letters, cijfers en een teken (bijv. ! of @) en gebruikt geen voor de hand liggende gegevens zoals uw naam of geboortedatum. Het is het veiligst om voor elk account een ander wachtwoord te gebruiken.
          </p>
          <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
            Een handige methode is de wachtzin: een korte zin die u makkelijk onthoudt, in één woord geschreven, met een cijfer en een leesteken. Bijvoorbeeld: MijnTuinIsMooi2024!
          </p>
          <p className="text-senior-base text-gray-700 leading-relaxed">
            Meer tips, voorbeelden en hoe u wachtwoorden veilig bewaart (notitieboekje of wachtwoordmanager) vindt u in onze uitgebreide{' '}
            <Link href="/uitleg/wachtwoorden" className="font-bold text-primary hover:underline">uitleg over wachtwoorden</Link>.
          </p>
        </>
      );
    case 'bluetooth-verbinden':
      return (
        <>
          <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
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

  return (
    <main className="min-h-screen bg-neutral-cream">
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/digitale-hulp"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base"
            >
              ← Terug naar Digitale hulp
            </Link>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              {artikel.title}
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              {artikel.description}
            </p>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
            <ArtikelContent slug={artikel.slug} />
            <p className="mt-10 pt-6 border-t border-neutral-stone">
              <Link
                href="/digitale-hulp"
                className="text-senior-base font-bold text-primary hover:text-primary-dark underline"
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
