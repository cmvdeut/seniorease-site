import type { UitlegSchemaEntry } from '@/lib/seo';

export const UITLEG_SCHEMA_DATA: Record<string, UitlegSchemaEntry> = {
  'google-maps': {
    pageName: 'Google Maps',
    howTo: {
      name: 'Google Maps gebruiken — adres zoeken',
      description: 'Zo vindt u elk adres in Nederland met Google Maps op uw telefoon.',
      steps: [
        { name: 'Open Google Maps', text: 'Tik op het Maps-icoontje op uw telefoon. U ziet een kaart van uw omgeving.' },
        { name: 'Tik op de zoekbalk bovenaan', text: "Bovenaan het scherm staat een balk met 'Zoeken in Maps'. Tik daarop. Uw toetsenbord verschijnt." },
        { name: 'Typ het adres', text: "Typ de straatnaam, het huisnummer en de plaatsnaam. Bijvoorbeeld: 'Kerkstraat 12 Utrecht'. De app geeft suggesties zodra u begint." },
        { name: 'Tik op het adres in de lijst', text: 'Onder de zoekbalk verschijnen adressen die overeenkomen met wat u typt. Tik op het juiste adres.' },
        { name: 'Bekijk de locatie op de kaart', text: 'De kaart springt naar het adres. U ziet een rode kaartspeld op de plek.' },
      ],
    },
    faq: [
      { question: 'Kost Google Maps geld?', answer: 'Nee, Google Maps is helemaal gratis. U heeft wel een internetverbinding nodig via wifi of mobiele data.' },
      { question: 'Werkt het ook zonder internet?', answer: 'Deels. U kunt een kaartgebied downloaden voor offline gebruik. Voor live routes heeft u wel internet nodig.' },
      { question: 'De stem zegt iets en ik mis de afslag — wat nu?', answer: 'Geen zorgen! De app herberekent automatisch de route als u de verkeerde weg gaat.' },
      { question: 'Kan ik ook openbaar vervoer opzoeken?', answer: "Ja! Kies na 'Route' het bus-icoontje. De app laat zien welke bus of trein u moet nemen." },
      { question: 'Mijn locatie klopt niet — wat doe ik?', answer: 'Ga bij een raam staan. Binnenshuis kan de locatie afwijken. Tik opnieuw op het locatie-icoontje.' },
    ],
  },
  videobellen: {
    pageName: 'Videobellen',
    howTo: {
      name: 'Videobellen via WhatsApp',
      description: 'De makkelijkste manier om familie te zien terwijl u belt.',
      steps: [
        { name: 'Open WhatsApp', text: 'Tik op het groene WhatsApp-icoontje op uw telefoon.' },
        { name: 'Zoek het contact', text: "Tik op 'Chats' onderaan en zoek de persoon die u wilt bellen." },
        { name: 'Open het gesprek', text: 'Tik op de naam van de persoon om het gesprek te openen.' },
        { name: 'Tik op het camera-icoontje', text: 'Rechtsboven in het gesprek ziet u een camera-icoontje. Tik daarop voor een videogesprek.' },
        { name: 'Wacht tot de ander opneemt', text: 'U hoort een beltoon. Als de ander opneemt, ziet u direct hun gezicht op uw scherm.' },
      ],
    },
    faq: [
      { question: 'Kost videobellen geld?', answer: 'Via WhatsApp, FaceTime en Zoom is videobellen gratis met wifi. Mobiele data telt mee voor uw databundel.' },
      { question: 'Kan de ander mij zien als ik hen bel?', answer: 'Ja, zodra het videogesprek verbonden is, ziet de ander uw gezicht via de voorkant-camera.' },
      { question: 'Wat als het beeld hapert of bevriest?', answer: 'Ga dichter bij uw wifi-router staan of beëindig het gesprek en bel opnieuw.' },
      { question: 'Kan ik met meerdere mensen tegelijk bellen?', answer: 'Ja! Open een groepschat in WhatsApp en tik op het camera-icoontje, of gebruik Zoom voor grotere groepen.' },
    ],
  },
  'fotos-maken': {
    pageName: "Foto's maken",
    howTo: {
      name: "Betere foto's maken met uw smartphone",
      description: '5 simpele tips voor mooiere foto\'s — geen technische kennis nodig.',
      steps: [
        { name: 'Licht op uw onderwerp', text: 'Zorg dat het licht op uw onderwerp schijnt. Sta bij een raam of zorg dat de zon achter u is.' },
        { name: 'Houd uw telefoon stil', text: 'Houd uw telefoon vast met twee handen en druk af als u uitademt.' },
        { name: 'Tik op het scherm om scherp te stellen', text: 'Tik met uw vinger op de plek die scherp moet zijn voordat u de foto maakt.' },
        { name: 'Geef ruimte in uw foto', text: 'Zet uw onderwerp iets links of rechts van het midden en snij geen hoofden af.' },
        { name: 'Maak meerdere foto\'s', text: 'Maak 3 tot 5 foto\'s van hetzelfde en kies daarna de mooiste.' },
      ],
    },
  },
  veiligheid: {
    pageName: 'Oplichting herkennen',
    howTo: {
      name: 'Wat doet u als u twijfelt?',
      description: 'Stappenplan bij verdachte berichten of telefoontjes.',
      steps: [
        { name: 'Niet klikken, niet betalen, niet terugbellen', text: 'Niet klikken, niet betalen, niet terugbellen via het opgegeven nummer.' },
        { name: 'Bel zelf uw bank', text: 'Zoek zelf het telefoonnummer van uw bank op en bel zelf.' },
        { name: 'Meld verdachte berichten', text: 'Stuur verdachte SMS of e-mail door naar Fraudehelpdesk: 088 - 786 7372.' },
        { name: 'Meld oplichting', text: 'Meld het bij de politie (0900-8844) en uw bank.' },
      ],
    },
    faq: [
      { question: 'U wordt onder druk gezet — is dat verdacht?', answer: 'Ja. Echte instanties zeggen nooit dat u binnen enkele uren moet betalen. Druk = gevaar.' },
      { question: 'Moet ik op een link in een SMS klikken?', answer: 'Nee. Uw bank vraagt NOOIT via SMS om uw pincode, wachtwoord of om geld over te maken.' },
      { question: 'Hoe herken ik een nep website?', answer: 'rabobank-veilig-inloggen.com is NIET de Rabobank. Het echte adres is rabobank.nl.' },
    ],
  },
  wachtwoorden: {
    pageName: 'Wachtwoorden',
    howTo: {
      name: 'Veilig wachtwoord maken met de wachtzin-methode',
      description: 'Denk aan iets wat u altijd onthoudt en maak daar een sterk wachtwoord van.',
      steps: [
        { name: 'Denk aan een persoonlijke zin', text: 'Bijvoorbeeld: "Mijn roos bloeit elke zomer"' },
        { name: 'Pak de beginletters', text: 'MijnRoosBloeItElkeZomer' },
        { name: 'Voeg een cijfer toe', text: 'MijnRoosBloeItElkeZomer52' },
        { name: 'Voeg een leesteken toe', text: 'MijnRoosBloeItElkeZomer52! — Lang, sterk, en toch makkelijk te onthouden.' },
      ],
    },
  },
  'fotos-ordenen': {
    pageName: "Foto's ordenen",
    howTo: {
      name: "Foto's delen met familie",
      description: 'Een mooie foto doorsturen via WhatsApp of e-mail.',
      steps: [
        { name: "Open de Foto's-app", text: "Open de Foto's-app en zoek de foto op." },
        { name: 'Tik op de foto', text: 'Tik op de foto zodat hij groot te zien is.' },
        { name: 'Tik op het deelknopje', text: 'Dat is een vierkantje met een pijltje omhoog (iPhone) of drie puntjes (Android).' },
        { name: "Kies 'WhatsApp' of 'E-mail'", text: 'Kies de app waarmee u wilt delen.' },
        { name: 'Kies de ontvanger en verstuur', text: 'Selecteer het contact en tik op Verzenden.' },
      ],
    },
  },
  'email-bijlage': {
    pageName: 'E-mail bijlage',
    howTo: {
      name: 'E-mail bijlage openen op de computer',
      description: 'Een foto of brief in uw mail rustig openen en bewaren.',
      steps: [
        { name: 'Open uw e-mail', text: 'Open Chrome of Edge en ga naar gmail.com of outlook.com.' },
        { name: 'Open de e-mail met bijlage', text: 'Klik op het bericht. Ziet u een paperclip of bestandsnaam? Dan zit er een bijlage in.' },
        { name: 'Bijlage openen', text: 'Klik op de bijlage om deze te openen in een nieuw venster of tabblad.' },
        { name: 'Bijlage opslaan', text: 'Klik op het download-icoon en kies een map zoals Downloads of Afbeeldingen.' },
      ],
    },
  },
  'bestanden-vinden': {
    pageName: 'Bestanden vinden',
    howTo: {
      name: 'Bestanden vinden op uw computer (Windows)',
      description: 'Downloads, Bureaublad, Afbeeldingen — waar is mijn bestand gebleven?',
      steps: [
        { name: 'Verkenner openen', text: 'Klik op het map-icoon in de taakbalk onderaan.' },
        { name: 'Downloads openen', text: 'Klik links op Downloads. Hier belanden bestanden van internet.' },
        { name: 'Bureaublad en Afbeeldingen', text: 'Bureaublad = het scherm met iconen. Afbeeldingen = vaak de plek voor foto\'s.' },
        { name: 'Zoeken op bestandsnaam', text: 'Typ in het zoekveld linksboven een deel van de bestandsnaam.' },
      ],
    },
    faq: [
      { question: 'Ik heb op Download geklikt — waar is het?', answer: 'Meestal in de map Downloads in Verkenner.' },
      { question: 'Ik heb per ongeluk iets verwijderd', answer: 'Open de Prullenbak. Staat het bestand erin? Rechtsklik → Herstellen.' },
    ],
  },
  'computer-traag': {
    pageName: 'Computer traag',
    howTo: {
      name: 'Computer vastgelopen — wat nu?',
      description: 'Rustig stappenplan als uw computer traag is of vastloopt.',
      steps: [
        { name: 'Even wachten', text: 'Wacht 1 à 2 minuten — soms denkt de computer even na na een update.' },
        { name: 'Eén programma sluiten', text: 'Klik op het kruisje. Werkt dat niet? Open Taakbeheer met Ctrl+Shift+Esc.' },
        { name: 'Computer herstarten', text: 'Klik op Start → Aan/uit → Opnieuw opstarten.' },
      ],
    },
  },
  'screenshot-pc': {
    pageName: 'Screenshot maken',
    howTo: {
      name: 'Screenshot maken op Windows',
      description: 'Een foto van uw scherm — handig om iets te bewaren of door te sturen.',
      steps: [
        { name: 'Hele scherm — sneltoets', text: 'Druk op PrtScn. Plak in Paint of Word met Ctrl+V en sla op.' },
        { name: 'Deel van het scherm kiezen', text: 'Druk op Windows-toets + Shift + S. Sleep een rechthoek om het gewenste stuk.' },
        { name: 'Hele scherm direct opslaan', text: 'Druk op Windows-toets + PrtScn. De screenshot staat in Afbeeldingen → Schermafbeeldingen.' },
      ],
    },
  },
  'letters-groter-pc': {
    pageName: 'Letters groter maken',
    howTo: {
      name: 'Letters groter maken op Windows',
      description: 'Beter lezen op uw pc of laptop.',
      steps: [
        { name: 'Tekstgrootte aanpassen', text: 'Start → Instellingen → Toegankelijkheid → Weergave. Sleep de schuif naar rechts.' },
        { name: 'Alles groter maken', text: 'Verhoog ook Schaal naar 125% of 150% als knoppen te klein zijn.' },
      ],
    },
  },
  'programma-installeren': {
    pageName: 'Programma installeren',
    howTo: {
      name: 'Programma installeren via Microsoft Store',
      description: 'Veilig software op uw pc zetten.',
      steps: [
        { name: 'Microsoft Store openen', text: 'Klik op Start en typ Microsoft Store. Open de app.' },
        { name: 'Zoeken en installeren', text: 'Typ de programmanaam, klik op Installeren en wacht tot het klaar is.' },
      ],
    },
  },
  digid: {
    pageName: 'DigiD',
    howTo: {
      name: 'DigiD aanvragen',
      description: 'Uw digitale sleutel voor de overheid — rustig uitgelegd.',
      steps: [
        { name: 'Ga naar digid.nl', text: 'Typ zelf digid.nl in uw browser. Klik op DigiD aanvragen. U heeft uw BSN nodig.' },
        { name: 'Identiteit bevestigen', text: 'U krijgt een brief met activeringscode of bevestigt via de DigiD app.' },
        { name: 'Wachtwoord en inlogcode kiezen', text: 'Kies een lang, uniek wachtwoord en pincode. Bewaar deze veilig.' },
      ],
    },
    faq: [
      { question: 'Vraagt de overheid om mijn DigiD-code via WhatsApp?', answer: 'Nee. De overheid vraagt NOOIT om uw DigiD-code via telefoon, WhatsApp of e-mail.' },
      { question: 'Moet ik betalen voor DigiD?', answer: 'Nee. DigiD is gratis. Betaal nooit via een link in een bericht.' },
    ],
  },
  'online-bankieren': {
    pageName: 'Online bankieren',
    howTo: {
      name: 'Veilig online bankieren',
      description: 'Inloggen, betalen en oplichting voorkomen.',
      steps: [
        { name: 'Typ het bankadres zelf', text: 'Ga naar ing.nl, rabobank.nl of abnamro.nl. Klik niet op links in e-mails of sms.' },
        { name: 'Inloggen met paslezer of app', text: 'Volg alleen de stappen op het scherm van uw eigen bankwebsite.' },
        { name: 'Controleer uw saldo', text: 'Log regelmatig in en kijk of u herkenbare afschrijvingen ziet.' },
      ],
    },
  },
  ebooks: {
    pageName: 'E-books lezen',
    howTo: {
      name: 'Gratis e-books lenen via de bibliotheek',
      description: 'De makkelijkste manier om e-books te lezen.',
      steps: [
        { name: "Download de app 'Libby'", text: "Zoek in de App Store of Play Store op 'Libby'. De app is gratis." },
        { name: 'Zoek uw bibliotheek', text: 'Open Libby en tik op Bibliotheek zoeken. Typ uw gemeente in.' },
        { name: 'Log in met uw bibliotheekpas', text: 'Voer uw pasnummer in.' },
        { name: 'Zoek een boek', text: 'Typ de titel of auteur in het zoekvak.' },
        { name: "Tik op 'Lenen'", text: 'Het boek wordt direct naar uw app gestuurd.' },
        { name: 'Stel de lettergrootte in', text: 'Tik op het Aa-icoontje bovenin voor grotere letters.' },
      ],
    },
  },
  'muziek-radio': {
    pageName: 'Muziek en radio',
    howTo: {
      name: 'Spotify installeren en gebruiken',
      description: 'Muziek streamen via internet op telefoon of tablet.',
      steps: [
        { name: 'Download Spotify', text: "Zoek in de App Store of Play Store op 'Spotify' en tik op Installeren." },
        { name: 'Maak een gratis account', text: "Tik op 'Aanmelden' en gebruik uw e-mailadres." },
        { name: 'Zoek uw favoriete artiest', text: 'Tik op het vergrootglas en typ de naam in.' },
        { name: 'Tik op een nummer', text: 'Het nummer speelt meteen af.' },
        { name: 'Gebruik de bediening', text: '▶️ = spelen/pauzeren | ⏭️ = volgend nummer | ♥️ = favoriet' },
      ],
    },
  },
  'qr-code': {
    pageName: 'QR-code scannen',
    howTo: {
      name: 'QR-code scannen met uw smartphone',
      description: 'Die vierkante blokjespuzzel in 4 stappen gescand.',
      steps: [
        { name: 'Open de Camera-app', text: 'Open de Camera-app op uw telefoon.' },
        { name: 'Richt de camera op de QR-code', text: 'Houd uw telefoon stil op circa 20 cm afstand.' },
        { name: 'Wacht op de melding', text: 'Er verschijnt vanzelf een melding of banner bovenaan uw scherm.' },
        { name: 'Tik op de melding', text: 'De link of informatie opent zich automatisch.' },
      ],
    },
  },
  'e-bike': {
    pageName: 'E-bike en telefoon',
    howTo: {
      name: 'Fietsen via knooppunten',
      description: 'Routes plannen en knooppunten volgen met uw telefoon.',
      steps: [
        { name: 'Kies start- en eindpunt', text: 'Kies een startpunt en eindpunt op de kaart.' },
        { name: 'Noteer knooppuntnummers', text: 'Noteer de nummers onderweg (bijv. 12 → 34 → 56).' },
        { name: 'Typ ze in de Fietsknoop-app', text: 'De app tekent de route voor u.' },
        { name: 'Volg de blauwe bordjes', text: 'Onderweg volgt u de blauwe nummerbordjes langs de route.' },
      ],
    },
    faq: [
      { question: 'Moet ik mijn telefoon op het stuur monteren?', answer: 'Handig maar niet verplicht. Een telefoonhouder kost een paar euro.' },
      { question: 'Wat als mijn telefoon leeg raakt?', answer: 'Neem een kleine powerbank mee in uw fietstas.' },
      { question: 'Kan ik ook zonder app fietsen?', answer: 'Ja! De knooppunten staan op bordjes langs de weg.' },
      { question: 'Hoe ver kan ik rijden op één accu?', answer: 'Met lichte ondersteuning rijdt u gemiddeld 60 tot 100 km.' },
    ],
  },
  hoofdtelefoon: {
    pageName: 'Draadloze hoofdtelefoon',
    howTo: {
      name: 'Bluetooth hoofdtelefoon verbinden',
      description: 'Eenmalig instellen, daarna verbindt het vanzelf.',
      steps: [
        { name: 'Zet de hoofdtelefoon aan', text: 'Houd de aan/uit-knop ingedrukt totdat u een lampje ziet knipperen.' },
        { name: 'Open Instellingen', text: 'Tik op het tandwiel-icoontje op uw telefoon.' },
        { name: "Tik op 'Bluetooth'", text: 'Zorg dat Bluetooth aanstaat.' },
        { name: 'Tik op de naam van uw hoofdtelefoon', text: 'Tik op de naam in de lijst met apparaten.' },
        { name: 'Klaar! Muziek aan', text: 'Open uw muziek-app — het geluid klinkt via de hoofdtelefoon.' },
      ],
    },
    faq: [
      { question: 'Werkt het ook met mijn tablet?', answer: 'Ja! Koppelen gaat hetzelfde via Instellingen → Bluetooth.' },
      { question: 'Wat als het geluid hapert?', answer: 'Ga dichter bij uw telefoon staan of zet Bluetooth even uit en weer aan.' },
    ],
  },
  'whatsapp-deel2': {
    pageName: 'WhatsApp Deel 2',
    howTo: {
      name: 'WhatsApp Deel 2 — spraakberichten, bellen en groepen',
      description: 'Vervolgstappen voor WhatsApp: spraakberichten, bellen, status en groepen.',
      steps: [
        { name: 'Spraakberichten', text: 'Tik op het microfoon-icoon, spreek in en tik op Versturen.' },
        { name: 'Bellen', text: 'Open een gesprek en tik op het telefoon- of camera-icoontje bovenaan.' },
        { name: 'Status plaatsen', text: 'Ga naar Status, tik op Mijn status en maak een foto of typ tekst.' },
        { name: 'Notificaties instellen', text: 'Ga naar Instellingen → Notificaties en kies geluid of stil.' },
        { name: 'Groepen', text: 'Tik op Nieuwe groep, selecteer contacten, geef een naam en tik op Maken.' },
      ],
    },
    faq: [
      {
        question: 'Kost bellen via WhatsApp geld?',
        answer:
          'Nee, via wifi is bellen en videobellen met WhatsApp gratis. Met mobiele data telt het mee voor uw databundel.',
      },
      {
        question: 'Hoe stuur ik een spraakbericht?',
        answer:
          'Open een gesprek, houd het microfoon-icoontje rechts naast het typvak ingedrukt, spreek in en laat los om te versturen.',
      },
      {
        question: 'Kan ik een groep dempen?',
        answer:
          'Ja. Open de groep, tik op de groepsnaam bovenaan en kies meldingen dempen. U blijft in de groep, maar krijgt geen geluid meer bij elk bericht.',
      },
      {
        question: 'Wie ziet mijn status?',
        answer:
          'Standaard zien contacten die u in WhatsApp heeft uw status. U kunt dat beperken via Instellingen → Privacy → Status.',
      },
    ],
  },
  'whatsapp-deel3': {
    pageName: 'WhatsApp Deel 3',
    howTo: {
      name: 'WhatsApp Deel 3 — geavanceerde functies',
      description: 'Berichten beheren, privacy-instellingen en back-up.',
      steps: [
        { name: 'Berichten beheren', text: 'Houd lang ingedrukt op een bericht voor Doorsturen, Verwijderen of Beantwoorden.' },
        { name: 'Gesprekken organiseren', text: 'Pin een gesprek vast, archiveer of zoek via het vergrootglas.' },
        { name: 'Groepsinstellingen', text: 'Demp meldingen, maak iemand admin of verlaat de groep via groepsnaam.' },
        { name: 'Privacy instellen', text: 'Instellingen → Account → Privacy voor laatst gezien en profielfoto.' },
        { name: 'Back-up maken', text: 'Instellingen → Chats → Back-up van chat → Back-up maken.' },
      ],
    },
    faq: [
      {
        question: 'Kan ik een bericht terugtrekken?',
        answer:
          'Ja. Houd het bericht lang ingedrukt, kies Verwijderen en daarna Voor iedereen — als het nog niet te lang geleden is verstuurd.',
      },
      {
        question: 'Wat is een back-up van chats?',
        answer:
          'Een back-up bewaart uw gesprekken in de cloud (Google of iCloud). Bij een nieuwe telefoon kunt u die gesprekken terugzetten.',
      },
      {
        question: 'Hoe houd ik mijn profielfoto privé?',
        answer:
          'Ga naar Instellingen → Account → Privacy → Profielfoto en kies Mijn contacten of Niemand.',
      },
      {
        question: 'Wat doe ik bij een verdacht bericht of link?',
        answer:
          'Klik niet op de link en stuur geen codes of bankgegevens. Bel de afzender via een nummer dat u kent, of bekijk de uitleg over oplichting herkennen op SeniorEase.',
      },
    ],
  },
};
