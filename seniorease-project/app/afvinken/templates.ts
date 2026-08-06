/**
 * Checklist-categorieën voor Afvinken.
 * Elke categorie = één of meer uitgebreide lijstjes.
 */

export type TemplateList = {
  name: string;
  items: string[];
};

export type TemplatePack = {
  id: string;
  title: string;
  description: string;
  /** Groep in de UI */
  category: 'vakantie' | 'thuis' | 'boodschappen';
  lists: TemplateList[];
};

export const TEMPLATE_PACKS: TemplatePack[] = [
  // ——— Vakantie lang ———
  {
    id: 'vakantie-lang-europa',
    title: 'Lange vakantie — Europa',
    description: 'Meerdaagse vakantie in Europa: documenten, kleding, toilet, elektronica, auto/tol en verblijf.',
    category: 'vakantie',
    lists: [
      {
        name: 'Vakantie EU · Documenten',
        items: [
          'ID-kaart of paspoort (geldig!)',
          'Rijbewijs',
          'EHIC / Europese zorgpas',
          'Reisverzekering',
          'Bankpas / creditcard',
          'Contant geld',
          'Reserveringsbevestigingen',
          'Adres en route van verblijf',
          'Noodnummers genoteerd',
          'Kopie ID (apart bewaren)',
        ],
      },
      {
        name: 'Vakantie EU · Kleding',
        items: [
          'Ondergoed',
          'Sokken',
          'Shirts / tops',
          'Broeken',
          'Trui / vest',
          'Jas',
          'Regenjas',
          'Nachtkleding',
          'Zwemkleding',
          'Slippers',
          'Wandelschoenen',
          'Nette kleding (uit eten)',
        ],
      },
      {
        name: 'Vakantie EU · Toilet & gezondheid',
        items: [
          'Tandenborstel',
          'Tandpasta',
          'Shampoo',
          'Douchegel',
          'Deodorant',
          'Scheerspullen',
          'Haarborstel',
          'Medicijnen (genoeg voor de hele reis)',
          'EHBO-set',
          'Zonnebrand',
          'Aftersun',
          'Muggenmiddel',
          'Paracetamol',
        ],
      },
      {
        name: 'Vakantie EU · Elektronica',
        items: [
          'Telefoon',
          'Oplader',
          'Powerbank',
          'Tablet / laptop',
          'Oordopjes',
          'Verlengsnoer',
          'Stekkerdoos',
          'Reisadapter (indien nodig in EU)',
        ],
      },
      {
        name: 'Vakantie EU · Onderweg / auto',
        items: [
          'Navigatie / offline kaarten',
          'Tolbadge of tolgeld',
          'Wegenvignet (indien nodig)',
          'Gevarendriehoek',
          'Veiligheidshesjes',
          'Autolader',
          'Koelbox',
          'Drinken en snacks voor onderweg',
        ],
      },
      {
        name: 'Vakantie EU · Verblijf (huisje/hotel)',
        items: [
          'Check: bedlinnen inbegrepen?',
          'Check: handdoeken inbegrepen?',
          'Eigen kussen (optioneel)',
          'Ontbijt voor eerste ochtend',
          'Koffie / thee',
          'Vuilniszakken (indien zelf meenemen)',
        ],
      },
      {
        name: 'Vakantie EU · Vrije tijd',
        items: ['Boeken', 'Tijdschriften', 'Kaarten', 'Bordspel', 'Bluetooth-speaker', 'Zonnebril', 'Paraplu'],
      },
    ],
  },
  {
    id: 'vakantie-lang-wereld',
    title: 'Lange vakantie — buiten Europa',
    description: 'Lange reis buiten Europa: paspoort, visa, adapters, gezondheid en geld.',
    category: 'vakantie',
    lists: [
      {
        name: 'Vakantie wereld · Documenten',
        items: [
          'Paspoort (min. 6 maanden geldig)',
          'Visum / ESTA / eTA (indien nodig)',
          'Kopie paspoort (apart + digitaal)',
          'Tickets / boardingpasses',
          'Reisverzekering (werelddekking)',
          'Vaccinatieboekje / bewijs',
          'Hotelvoucher / adres verblijf',
          'Noodnummers ambassade / consulaat',
          'Rijbewijs / internationaal rijbewijs',
        ],
      },
      {
        name: 'Vakantie wereld · Geld',
        items: [
          'Creditcard',
          'Bankpas die wereldwijd werkt',
          'Contant geld / lokale valuta',
          'Pincodes controleren',
          'Bank geïnformeerd over reis?',
          'Reservekaart apart bewaren',
        ],
      },
      {
        name: 'Vakantie wereld · Gezondheid',
        items: [
          'Reisadvies / vaccinaties gecheckt',
          'Medicijnen (ruim genoeg)',
          'Recept of medicijnenlijst (Engels)',
          'Reisapotheek',
          'Muggenmiddel',
          'ORS',
          'Imodium',
          'Paracetamol',
          'Zonnebrand (hoge factor)',
          'EHBO-set',
        ],
      },
      {
        name: 'Vakantie wereld · Kleding',
        items: [
          'Ondergoed',
          'Sokken',
          'Shirts (licht + iets warms)',
          'Broeken',
          'Trui / vest',
          'Jas (passend bij klimaat)',
          'Regenjas',
          'Nachtkleding',
          'Zwemkleding',
          'Stevige schoenen',
          'Slippers',
          'Hoed / pet tegen zon',
        ],
      },
      {
        name: 'Vakantie wereld · Toiletartikelen',
        items: [
          'Tandenborstel',
          'Tandpasta',
          'Shampoo',
          'Douchegel',
          'Deodorant',
          'Scheerspullen',
          'Haarborstel',
          'Toilettas (handbagage-proof indien vliegen)',
        ],
      },
      {
        name: 'Vakantie wereld · Elektronica & stekkers',
        items: [
          'Telefoon + oplader',
          'Powerbank (in handbagage)',
          'Wereldstekker / reisadapter',
          'Extra adapter',
          'Verlengsnoer',
          'Stekkerdoos',
          'Tablet / laptop + oplader',
          'Oordopjes / koptelefoon',
          'Roaming / eSIM geregeld?',
        ],
      },
      {
        name: 'Vakantie wereld · Vliegen',
        items: [
          'Online inchecken',
          'Bagagelimiet gecheckt',
          'Vloeistoffen in 100 ml-zak',
          'Medicijnen in handbagage',
          'Nekkussen',
          'Snacks voor onderweg',
          'Lege waterfles (na security vullen)',
        ],
      },
      {
        name: 'Vakantie wereld · Thuis regelen',
        items: [
          'Post / buren',
          'Planten water',
          'Alarm of lampentimer',
          'Koelkast leeggemaakt',
          'Sleutel bij vertrouwenspersoon',
          'Afval buiten gezet',
        ],
      },
    ],
  },

  // ——— Stedentrip ———
  {
    id: 'stedentrip-europa',
    title: 'Stedentrip (kort) — Europa',
    description: 'Kort citytrip in Europa: compacte maar complete lijst.',
    category: 'vakantie',
    lists: [
      {
        name: 'Stedentrip · Documenten',
        items: [
          'ID-kaart of paspoort',
          'Tickets (trein / vliegtuig / bus)',
          'Hotelbevestiging',
          'Bankpas',
          'Contant kleingeld',
          'OV- of citykaart (indien nodig)',
          'Reisverzekering',
        ],
      },
      {
        name: 'Stedentrip · Tas / koffer',
        items: [
          'Ondergoed',
          'Sokken',
          'Shirts',
          'Broek / rok',
          'Trui of jas',
          'Nachtkleding',
          'Comfortabele schoenen',
          'Nette outfit (avond)',
          'Regenjas of paraplu',
        ],
      },
      {
        name: 'Stedentrip · Toilet & medicijnen',
        items: [
          'Tandenborstel',
          'Tandpasta',
          'Deodorant',
          'Medicijnen',
          'Paracetamol',
          'Pleisters',
          'Zonnebrand (klein)',
        ],
      },
      {
        name: 'Stedentrip · Elektronica',
        items: [
          'Telefoon + oplader',
          'Powerbank',
          'Oordopjes',
          'Reisadapter (indien nodig)',
          'Offline kaart gedownload',
        ],
      },
      {
        name: 'Stedentrip · Onderweg & in de stad',
        items: [
          'Waterfles',
          'Kleine rugzak / schoudertas',
          'Zonnebril',
          'Museumkaart of tickets',
          'Notitie met hoteladres',
          'Boek of podcast voor onderweg',
        ],
      },
    ],
  },

  // ——— Weekendje weg ———
  {
    id: 'weekendje-weg',
    title: 'Weekendje weg (Nederland)',
    description:
      'Typisch NL-weekend: vakantiehuisje, auto, e-bike en Twinny Load — plus slaapkamer, badkamer en keuken.',
    category: 'vakantie',
    lists: [
      {
        name: 'Weekend · Documenten',
        items: [
          'ID-kaart of paspoort',
          'Rijbewijs',
          'Bankpas',
          'Contant kleingeld',
          'Reserveringsbevestiging',
          'Adres en route',
          'OV-chipkaart of bankpas voor OV',
        ],
      },
      {
        name: 'Weekend · Auto',
        items: [
          'Autosleutels',
          'Brandstof / laden getankt of opgeladen',
          'Bandenspanning controleren (zwaarder met fietsdrager)',
          'Navigatie / route klaarzetten',
          'Autolader / USB-kabel',
          'Koelbox (optioneel)',
          'Drinken en snack voor onderweg',
          'Gevarendriehoek + veiligheidshesjes',
        ],
      },
      {
        name: 'Weekend · E-bike & Twinny Load',
        items: [
          'E-bike(s)',
          'Twinny Load / fietsdrager op de trekhaak',
          'Trekhaak ontgrendeld / stekker aangesloten',
          'Fietsen vastgezet (banden + frame)',
          'Sloten op de fietsen tijdens transport',
          'Verlichting drager / kentekenplaat zichtbaar',
          'Max. snelheid / handleiding Twinny Load gecheckt',
          'Oplader e-bike meegenomen',
          'Sleutel batterij / display',
          'Reservebatterij (indien aanwezig)',
          'Fietssloten voor op bestemming',
          'Fietspomp',
          'Bandplakset',
          'Helm (indien gewenst)',
          'Fietstassen of mand',
          'Regenponcho / regenjas voor op de fiets',
          'Spiegel / bel controleren',
        ],
      },
      {
        name: 'Weekend · Tas',
        items: [
          'Ondergoed (2–3×)',
          'Sokken',
          'Shirts / tops',
          'Broek',
          'Trui of vest',
          'Jas',
          'Nachtkleding',
          'Comfortabele schoenen',
          'Fietsschoenen of stevige schoenen',
          'Slippers',
          'Regenjas of paraplu',
          'Zwemkleding (indien spa/zwembad)',
        ],
      },
      {
        name: 'Weekend · Toilet & medicijnen',
        items: [
          'Tandenborstel',
          'Tandpasta',
          'Deodorant',
          'Shampoo / douchegel (of check of aanwezig)',
          'Medicijnen',
          'Paracetamol',
          'Zonnebrand (zomer)',
          'Haarborstel',
        ],
      },
      {
        name: 'Weekend · Elektronica',
        items: [
          'Telefoon + oplader',
          'Powerbank',
          'Oordopjes',
          'Verlengsnoer / stekkerdoos (opladers e-bike + telefoon)',
        ],
      },
      {
        name: 'Weekend · Aankomst & check',
        items: [
          'Check: aankomsttijd / sleutelregeling',
          'Check: ontbijt inbegrepen?',
          'Check: handdoeken / beddengoed aanwezig?',
          'Check: oplaadpunt e-bike / stopcontact bij huisje',
          'Fietsen van Twinny Load af en op slot',
          'Drager / trekhaak veilig achtergelaten',
        ],
      },
      {
        name: 'Weekend · Thuis regelen',
        items: [
          'Planten water (indien nodig)',
          'Afval buiten',
          'Deuren/ramen dicht',
          'Alarm of lampentimer (optioneel)',
          'Iemand geïnformeerd waar u bent',
        ],
      },
      {
        name: 'Weekend · Vakantiehuisje · Slaapkamer',
        items: ['Dekbedovertrek', 'Hoeslaken', 'Kussensloop'],
      },
      {
        name: 'Weekend · Vakantiehuisje · Badkamer',
        items: ['Handdoeken', 'Badlakens', 'Washandjes', 'Badmat'],
      },
      {
        name: 'Weekend · Vakantiehuisje · Keuken',
        items: [
          'Theedoeken',
          'Keukenhanddoeken',
          'Vaatdoekjes',
          'Spons',
          'Afwasmiddel',
          'Vaatwastabletten',
          'Keukenrol',
          'Vuilniszakken',
          'Aluminiumfolie',
          'Vershoudfolie',
          'Bakpapier',
          'Koffie',
          'Thee',
          'Suiker',
          'Olie',
          'Peper & zout',
          'Ontbijt voor eerste ochtend',
        ],
      },
    ],
  },

  // ——— Feest & gelegenheid ———
  {
    id: 'verjaardag-thuis',
    title: 'Verjaardag thuis',
    description: 'Huiselijke verjaardag: eten, drinken, versiering en gasten.',
    category: 'thuis',
    lists: [
      {
        name: 'Verjaardag · Eten',
        items: [
          'Taart / gebak',
          'Slagroom',
          'Kaarsen / cijferkaars',
          'Chips',
          'Nootjes',
          'Borrelhapjes',
          'Broodjes / sandwiches',
          'Fruit',
          'Kaas',
          'Worst',
          'Sla / salade',
          'Sauzen',
        ],
      },
      {
        name: 'Verjaardag · Drinken',
        items: [
          'Koffie',
          'Thee',
          'Melk',
          'Suiker',
          'Frisdrank',
          'Sappen',
          'Water / spa rood',
          'Wijn',
          'Bier',
          'IJsblokjes',
        ],
      },
      {
        name: 'Verjaardag · Tafel & keuken',
        items: [
          'Borden',
          'Bekers / glazen',
          'Bestek',
          'Servetten',
          'Tafelkleed',
          'Schalen',
          'Taartschep',
          'Keukenrol',
          'Afwasmiddel',
          'Vuilniszakken',
        ],
      },
      {
        name: 'Verjaardag · Versiering & organisatie',
        items: [
          'Ballonnen',
          'Slinger',
          'Kaartjes',
          'Gastenlijst',
          'Uitnodigingen verstuurd?',
          'Huis opgeruimd',
          'Extra stoelen',
          'Toilet schoon + papier',
          'Muziek klaarzetten',
          'Bloemen',
        ],
      },
    ],
  },
  {
    id: 'koffie-gebak',
    title: 'Koffie met gebak',
    description: 'Gezellig koffie-uurtje: gebak, koffie en een gedekte tafel.',
    category: 'thuis',
    lists: [
      {
        name: 'Koffie · Drinken',
        items: ['Koffie', 'Thee', 'Melk / koffiemelk', 'Suiker', 'Koekjes bij de thee', 'Water'],
      },
      {
        name: 'Koffie · Gebak',
        items: ['Taart of gebak', 'Slagroom', 'Servetten', 'Taartschep', 'Gebaksbordjes', 'Vorkjes'],
      },
      {
        name: 'Koffie · Tafel',
        items: [
          'Kopjes en schotels',
          'Lepeltjes',
          'Tafelkleed of placemats',
          'Bloemen / kaarsje',
          'Extra stoelen',
          'Huis opgeruimd',
        ],
      },
    ],
  },
  {
    id: 'borrel',
    title: 'Borrel',
    description: 'Borrelavond: hapjes, drankjes en sfeer.',
    category: 'thuis',
    lists: [
      {
        name: 'Borrel · Hapjes',
        items: [
          'Chips',
          'Nootjes',
          'Olijven',
          'Kaas',
          'Worst',
          'Borrelnootjes',
          'Crackers',
          'Dipsaus',
          'Groente met dip',
          'Bitterballen / ovenhapjes',
        ],
      },
      {
        name: 'Borrel · Drinken',
        items: [
          'Wijn',
          'Bier',
          'Frisdrank',
          'Sap',
          'Water / spa',
          'IJsblokjes',
          'Citroen / limoen',
          'Kurkentrekker',
          'Flesopener',
        ],
      },
      {
        name: 'Borrel · Tafel & sfeer',
        items: [
          'Glazen',
          'Schaaltjes',
          'Servetten',
          'Prikkers',
          'Muziek',
          'Kaarsen',
          'Vuilniszakken',
          'Extra stoelen',
        ],
      },
    ],
  },
  {
    id: 'bbq',
    title: 'BBQ',
    description: 'Barbecue: vlees/vis/veggie, bijgerechten, houtskool en veiligheidsitems.',
    category: 'thuis',
    lists: [
      {
        name: 'BBQ · Grill & vuur',
        items: [
          'Barbecue schoon?',
          'Houtskool of gas',
          'Aansteker / lucifers',
          'Aanmaakblokjes',
          'Grilltang',
          'Ovenwanten',
          'Aluminiumfolie',
          'Schoonmaakborstel voor rooster',
        ],
      },
      {
        name: 'BBQ · Eten',
        items: [
          'Vlees / worst',
          'Kip',
          'Vis of garnalen',
          'Vegetarische burgers',
          'Broodjes',
          'Sla / salade',
          'Sauzen (ketchup, mayo, mosterd)',
          'Uien / tomaten',
          'Mais / groente voor op de grill',
          'Aardappelsalade of pasta',
        ],
      },
      {
        name: 'BBQ · Drinken & tafel',
        items: [
          'Frisdrank',
          'Bier / wijn',
          'Water',
          'IJsblokjes',
          'Borden',
          'Bestek',
          'Servetten',
          'Vuilniszakken',
          'Insectenspray / kaarsen',
          'Extra stoelen / bankjes',
        ],
      },
    ],
  },
  {
    id: 'kinderverjaardag',
    title: 'Kinderverjaardag',
    description: 'Feestje voor kinderen: traktaties, spelletjes en versiering.',
    category: 'thuis',
    lists: [
      {
        name: 'Kinderfeest · Eten & traktatie',
        items: [
          'Taart of cupcakes',
          'Kaarsen',
          'Traktatie voor school / opvang',
          'Chips / popcorn',
          'Fruitspiesjes',
          'Sapjes / limonade',
          'IJsjes',
          'Allergieën gecheckt?',
        ],
      },
      {
        name: 'Kinderfeest · Spel & versiering',
        items: [
          'Ballonnen',
          'Slinger',
          'Tafelkleed (feest)',
          'Spelletjes',
          'Prijzen / stickers',
          'Knutselmateriaal (optioneel)',
          'Muziek / speaker',
          'Fototoestel of telefoon opgeladen',
        ],
      },
      {
        name: 'Kinderfeest · Praktisch',
        items: [
          'Uitnodigingen',
          'Gastenlijst + ouders contact',
          'Goodybags / bedankje',
          'Extra servetten',
          'Schoonmaakdoekjes',
          'Pleisters',
          'Vuilniszakken',
          'Regenplan (binnenactiviteit)',
        ],
      },
    ],
  },
  {
    id: 'seniorenverjaardag',
    title: 'Verjaardag vieren (senior)',
    description:
      'Complete checklist voor een huiselijke seniorenverjaardag — per onderwerp af te vinken.',
    category: 'thuis',
    lists: [
      {
        name: 'Seniorenverjaardag · Gasten',
        items: [
          'Gastenlijst maken',
          'Uitnodigingen versturen',
          'Aantal gasten tellen',
          'Dieetwensen navragen',
          'Bevestigingen bijhouden',
        ],
      },
      {
        name: 'Seniorenverjaardag · Gebak',
        items: [
          'Taart bestellen of bakken',
          'Gebak',
          'Slagroom',
          'Kaarsjes',
          'Aansteker',
        ],
      },
      {
        name: 'Seniorenverjaardag · Hapjes',
        items: [
          'Kaas',
          'Worst',
          'Toastjes',
          'Chips',
          'Nootjes',
          'Komkommer',
          'Tomaatjes',
          'Borrelhapjes',
        ],
      },
      {
        name: 'Seniorenverjaardag · Drank',
        items: [
          'Koffie',
          'Thee',
          'Melk',
          'Suiker',
          'Frisdrank',
          'Sap',
          'Bier',
          'Wijn',
          'Water',
        ],
      },
      {
        name: 'Seniorenverjaardag · Servies',
        items: [
          'Koffiekopjes',
          'Glazen',
          'Bordjes',
          'Gebaksvorkjes',
          'Lepeltjes',
          'Servetten',
          'Schalen',
          'Taartschep',
        ],
      },
      {
        name: 'Seniorenverjaardag · Huis klaarmaken',
        items: [
          'Stoelen klaarzetten',
          'Tafels neerzetten',
          'Huis opruimen',
          'Stofzuigen',
          'Toilet schoonmaken',
          'Toiletpapier aanvullen',
          'Handdoek toilet ophangen',
          'Zeep bijvullen',
        ],
      },
      {
        name: 'Seniorenverjaardag · Versiering',
        items: [
          'Slingers',
          'Ballonnen',
          'Bloemen',
          'Kaarsen',
          'Tafelloper',
          'Feestservetten',
        ],
      },
      {
        name: 'Seniorenverjaardag · Cadeaus',
        items: [
          'Cadeautafel vrijmaken',
          'Cadeaulijstje',
          'Pen voor kaartjes',
          'Bedankjes (optioneel)',
        ],
      },
      {
        name: 'Seniorenverjaardag · Herinneringen',
        items: [
          'Camera of telefoon opladen',
          'Groepsfoto maken',
          "Foto's delen",
        ],
      },
      {
        name: 'Seniorenverjaardag · Gezelligheid',
        items: [
          'Muziek afspeellijst',
          'Bluetooth-speaker',
          'Achtergrondmuziek',
        ],
      },
      {
        name: 'Seniorenverjaardag · Extra aandacht',
        items: [
          'Voldoende zitplaatsen',
          'Goede verlichting',
          'Loopruimte vrijhouden',
          'Toilet goed bereikbaar',
          'Eventueel trap vermijden',
          'Water beschikbaar',
          'Eventuele medicijnen binnen handbereik',
        ],
      },
      {
        name: 'Seniorenverjaardag · Na afloop',
        items: [
          'Restjes opbergen',
          'Afwassen',
          'Vuilniszak vervangen',
          'Cadeaus uitpakken',
          'Bedankje sturen (optioneel)',
        ],
      },
    ],
  },
  {
    id: 'kerst',
    title: 'Kerst',
    description: 'Kerstviering: eten, versiering, cadeaus en planning.',
    category: 'thuis',
    lists: [
      {
        name: 'Kerst · Eten',
        items: [
          'Kerstmenu vastgelegd',
          'Voorgerecht',
          'Hoofdgerecht',
          'Bijgerechten',
          'Dessert',
          'Borrelhapjes',
          'Dieetwensen gasten',
          'Boodschappenlijst gemaakt',
        ],
      },
      {
        name: 'Kerst · Drinken',
        items: ['Koffie / thee', 'Wijn', 'Bubbels', 'Frisdrank', 'Glühwein (optioneel)', 'IJsblokjes'],
      },
      {
        name: 'Kerst · Versiering',
        items: [
          'Kerstboom',
          'Kerstballen / verlichting',
          'Tafeldecoratie',
          'Kaarsen',
          'Kerstservies / tafelkleed',
          'Kerstmuziek',
          'Kerststukje / bloemen',
        ],
      },
      {
        name: 'Kerst · Cadeaus & gasten',
        items: [
          'Cadeaulijst',
          'Inpakpapier / lint',
          'Kaartjes',
          'Gasten uitgenodigd',
          'Zitplaatsen verdeeld',
          'Overnachting geregeld (indien nodig)',
        ],
      },
    ],
  },
  {
    id: 'oud-nieuw',
    title: 'Oud & Nieuw',
    description: 'Oudejaarsavond: eten, drank, vuurwerkveiligheid en countdown.',
    category: 'thuis',
    lists: [
      {
        name: 'Oud & Nieuw · Eten & drinken',
        items: [
          'Oliebollen / appelflappen',
          'Borrelhapjes',
          'Bubbels',
          'Wijn / bier',
          'Frisdrank',
          'IJsblokjes',
          'Koffie voor later',
        ],
      },
      {
        name: 'Oud & Nieuw · Feest',
        items: [
          'Muziek / TV-programma',
          'Klok zichtbaar voor countdown',
          'Confetti / sterretjes (veilig)',
          'Vuurwerk (indien gewenst) + veiligheidsbril',
          'Emmer water / blusdeken',
          'Oordopjes',
          'Warme jas voor buiten',
        ],
      },
      {
        name: 'Oud & Nieuw · Praktisch',
        items: [
          'Gastenlijst',
          'Overnachten / taxi geregeld?',
          'Medicijnen meegenomen',
          'Telefoon opgeladen',
          'Vuilniszakken',
          'Ochtend-na: schoonmaakdoekjes',
        ],
      },
    ],
  },
  {
    id: 'pasen',
    title: 'Pasen',
    description: 'Pasen: brunch, eieren zoeken en lentetafel.',
    category: 'thuis',
    lists: [
      {
        name: 'Pasen · Brunch / eten',
        items: [
          'Eieren',
          'Brood / croissants',
          'Beleg',
          'Paasbrood',
          'Chocolade-eieren',
          'Fruit',
          'Koffie / thee',
          'Sap / prosecco (optioneel)',
        ],
      },
      {
        name: 'Pasen · Activiteit & tafel',
        items: [
          'Eieren verven',
          'Eieren verstoppen (kinderen)',
          'Mandjes / zakjes',
          'Lentebloemen',
          'Paasdecoratie',
          'Tafelkleed',
          'Servetten',
          'Gasten uitgenodigd',
        ],
      },
    ],
  },
  {
    id: 'valentijn',
    title: 'Valentijn',
    description: 'Valentijnsdag: diner, cadeau en sfeer voor twee.',
    category: 'thuis',
    lists: [
      {
        name: 'Valentijn · Diner',
        items: [
          'Menu bedacht of restaurant gereserveerd',
          'Voorgerecht / hapjes',
          'Hoofdgerecht',
          'Dessert',
          'Wijn of bubbels',
          'Kaarsen',
          'Mooie tafel',
        ],
      },
      {
        name: 'Valentijn · Cadeau & sfeer',
        items: [
          'Cadeau',
          'Kaartje',
          'Bloemen / chocola',
          'Muziek',
          'Foto maken',
          'Telefoon stil (ononderbroken avond)',
        ],
      },
    ],
  },
  {
    id: 'familiedag',
    title: 'Familiedag',
    description: 'Dag met de familie: eten, activiteiten en praktische organisatie.',
    category: 'thuis',
    lists: [
      {
        name: 'Familiedag · Eten & drinken',
        items: [
          'Lunch of diner gepland',
          'Barbecue of buffet?',
          'Kindermenu / dieetwensen',
          'Dranken genoeg',
          'Taart of gebak',
          'Servetten en borden',
        ],
      },
      {
        name: 'Familiedag · Activiteit',
        items: [
          'Spelletjes / buitenactiviteit',
          'Regenplan',
          'Fotograaf of groepsfoto',
          'Naambordjes (grote familie)',
          'Tijdschema (niet te strak)',
        ],
      },
      {
        name: 'Familiedag · Praktisch',
        items: [
          'Uitnodigingen',
          'Adres / route gedeeld',
          'Parkeren',
          'Extra stoelen',
          'EHBO',
          'Opruimplan',
        ],
      },
    ],
  },
  {
    id: 'kraambezoek',
    title: 'Kraambezoek',
    description: 'Op kraamvisite: cadeau, timing en wat u meeneemt.',
    category: 'thuis',
    lists: [
      {
        name: 'Kraambezoek · Meenemen',
        items: [
          'Cadeau voor baby',
          'Cadeau voor broertje of zusje',
          'Kaartje',
          'Bloemen of plant (vraag eerst)',
          'Iets lekkers voor ouders',
          'Eigen fles water',
        ],
      },
      {
        name: 'Kraambezoek · Etiquette',
        items: [
          'Afspraak gemaakt (niet zomaar langskomen)',
          'Handen wassen',
          'Niet te lang blijven',
          'Geen zieke bezoekers',
          'Foto alleen met toestemming',
          'Hulp aanbieden (boodschap / maaltijd)',
        ],
      },
    ],
  },
  {
    id: 'sinterklaas',
    title: 'Sinterklaas',
    description: 'Pakjesavond: lootjes, surprises, gedichten en lekkernijen.',
    category: 'thuis',
    lists: [
      {
        name: 'Sinterklaas · Pakjesavond',
        items: [
          'Lootjes getrokken',
          'Budget afgesproken',
          'Surprise gemaakt / gekregen',
          'Gedicht geschreven',
          'Cadeaus ingepakt',
          'Zak van Sinterklaas / jutezak',
        ],
      },
      {
        name: 'Sinterklaas · Lekkernijen',
        items: [
          'Pepernoten',
          'Chocoladeletters',
          'Speculaas',
          'Mandarijnen',
          'Hot chocolate / thee',
          'Borden en servetten',
        ],
      },
      {
        name: 'Sinterklaas · Sfeer',
        items: [
          'Sinterklaas-muziek',
          'Schoen zetten (kinderen)',
          'Wortel / hooi voor het paard',
          'Foto’s maken',
          'Tijdschema avond',
        ],
      },
    ],
  },
  {
    id: 'diploma',
    title: 'Diploma-uitreiking',
    description: 'Diploma of bul: outfit, cadeau, foto’s en na-borrel.',
    category: 'thuis',
    lists: [
      {
        name: 'Diploma · Voorbereiding',
        items: [
          'Uitnodiging / tijd en locatie',
          'Route en parkeren',
          'Nette kleding',
          'Kaartje / cadeau',
          'Bloemen',
          'Telefoon opgeladen (foto’s)',
          'Tissues',
        ],
      },
      {
        name: 'Diploma · Na afloop',
        items: [
          'Lunch of borrel gereserveerd?',
          'Taart of gebak thuis',
          'Groepsfoto gepland',
          'Bedankje voor docenten (optioneel)',
        ],
      },
    ],
  },
  {
    id: 'jubileum',
    title: 'Jubileum',
    description: 'Huwelijks- of ander jubileum: gasten, toast en herinneringen.',
    category: 'thuis',
    lists: [
      {
        name: 'Jubileum · Organisatie',
        items: [
          'Datum en thema',
          'Gastenlijst',
          'Uitnodigingen',
          'Locatie / thuis voorbereid',
          'Speech of toast',
          'Foto’s / album van vroeger',
        ],
      },
      {
        name: 'Jubileum · Eten & drinken',
        items: [
          'Taart of cake',
          'Bubbels',
          'Hapjes',
          'Koffie / thee',
          'Dieetwensen',
          'Glazen en borden',
        ],
      },
      {
        name: 'Jubileum · Cadeau & sfeer',
        items: [
          'Cadeau of gezamenlijk cadeau',
          'Kaartjes',
          'Bloemen',
          'Muziek',
          'Versiering',
          'Fotograaf of familie-fotograaf',
        ],
      },
    ],
  },
  {
    id: 'bruiloft',
    title: 'Bruiloft',
    description: 'Als gast of helper: outfit, cadeau, reizen en etiquette.',
    category: 'thuis',
    lists: [
      {
        name: 'Bruiloft · Als gast',
        items: [
          'RSVP verstuurd',
          'Outfit / kleding',
          'Schoenen',
          'Cadeau of envelop',
          'Kaartje',
          'Route en parkeren',
          'Overnachting (indien nodig)',
          'Telefoon opgeladen',
        ],
      },
      {
        name: 'Bruiloft · Praktisch',
        items: [
          'Tijdstip ceremonie + receptie',
          'Dresscode gecheckt',
          'Allergieën doorgegeven (eten)',
          'Cadeaulijst bekeken',
          'Vervoer / taxi na afloop',
          'Medicijnen meegenomen',
        ],
      },
    ],
  },
  {
    id: 'condoleance',
    title: 'Condoleance / uitvaart',
    description: 'Waardig afscheid: praktische zaken, kleding en nazorg.',
    category: 'thuis',
    lists: [
      {
        name: 'Uitvaart · Praktisch',
        items: [
          'Tijd en locatie genoteerd',
          'Route / parkeren',
          'Donkere / passende kleding',
          'Condoleancekaart',
          'Bloemen of donatie (wens familie)',
          'Contant kleingeld (collecte)',
          'Zakdoekjes',
        ],
      },
      {
        name: 'Uitvaart · Nazorg',
        items: [
          'Koffie na afloop?',
          'Hulp aanbieden (maaltijd / boodschap)',
          'Niet te lang blijven tenzij gevraagd',
          'Later: berichtje of bezoek',
          'Eigen emoties: rust plannen',
        ],
      },
    ],
  },
  {
    id: 'reunie',
    title: 'Reünie (veel mensen)',
    description: 'Grote bijeenkomst: catering, ruimte en planning.',
    category: 'thuis',
    lists: [
      {
        name: 'Reünie · Uitnodigen',
        items: [
          'Adressenlijst',
          'Uitnodiging',
          'Datum en locatie',
          'RSVP-deadline',
          'Aantal gasten',
        ],
      },
      {
        name: 'Reünie · Locatie & eten',
        items: [
          'Ruimte / stoelen',
          'Catering of buffet',
          'Koffie en thee',
          'Naambordjes',
          'Programma',
          'Opruimplan',
        ],
      },
    ],
  },

  // ——— Boodschappen ———
  {
    id: 'boodschappen-wekelijks',
    title: 'Wekelijkse boodschappen',
    description: 'Uitgebreide weeklijst voor de supermarkt.',
    category: 'boodschappen',
    lists: [
      {
        name: 'Boodschappen · Zuivel & eieren',
        items: ['Melk', 'Karnemelk', 'Yoghurt', 'Kwark', 'Kaas', 'Boter / margarine', 'Eieren', 'Room'],
      },
      {
        name: 'Boodschappen · Brood & ontbijt',
        items: [
          'Brood',
          'Beschuit',
          'Cracottes',
          'Havermout',
          'Muesli',
          'Jam',
          'Hagelslag',
          'Pindakaas',
          'Honig',
        ],
      },
      {
        name: 'Boodschappen · Groente & fruit',
        items: [
          'Sla',
          'Komkommer',
          'Tomaten',
          'Paprika',
          'Wortelen',
          'Uien',
          'Knoflook',
          'Aardappelen',
          'Appels',
          'Bananen',
          'Sinaasappels',
          'Druiven / seizoensfruit',
        ],
      },
      {
        name: 'Boodschappen · Vlees / vis / veggie',
        items: [
          'Kip',
          'Gehakt',
          'Vis',
          'Worst',
          'Ham / vleeswaren',
          'Vegetarisch alternatief',
          'Tofu / peulvruchten',
        ],
      },
      {
        name: 'Boodschappen · Voorraad',
        items: [
          'Pasta',
          'Rijst',
          'Conserven',
          'Soep',
          'Saus',
          'Olie',
          'Azijn',
          'Zout',
          'Peper',
          'Kruiden',
          'Suiker',
          'Meel',
        ],
      },
      {
        name: 'Boodschappen · Drinken',
        items: ['Koffie', 'Thee', 'Sap', 'Frisdrank', 'Water', 'Wijn / bier (optioneel)'],
      },
      {
        name: 'Boodschappen · Huishouden',
        items: [
          'Toiletpapier',
          'Keukenrol',
          'Afwasmiddel',
          'Wasmiddel',
          'Allesreiniger',
          'Vuilniszakken',
          'Tandenpasta',
          'Zeep / douchegel',
          'Shampoo',
        ],
      },
      {
        name: 'Boodschappen · Diepvries & snacks',
        items: ['Diepvriesgroente', 'IJs', 'Pizza / ovenschotel', 'Chips', 'Koekjes', 'Chocola'],
      },
    ],
  },
];

export const CATEGORY_LABELS: Record<TemplatePack['category'], string> = {
  vakantie: 'Vakantie & wegwezen',
  thuis: 'Feest & gelegenheid',
  boodschappen: 'Boodschappen',
};

export const CATEGORY_ORDER: TemplatePack['category'][] = [
  'vakantie',
  'thuis',
  'boodschappen',
];

/** Volgorde binnen Vakantie — weekendje eerst (meest gebruikt) */
export const VAKANTIE_PACK_ORDER = [
  'weekendje-weg',
  'stedentrip-europa',
  'vakantie-lang-europa',
  'vakantie-lang-wereld',
] as const;

/** @deprecated — compat voor oude imports */
export type LegacyKind = 'type' | 'module';

export function getPackById(id: string): TemplatePack | undefined {
  return TEMPLATE_PACKS.find((p) => p.id === id);
}

export function packsByCategory(category: TemplatePack['category']): TemplatePack[] {
  return TEMPLATE_PACKS.filter((p) => p.category === category);
}
