// Translation system for SeniorEase
// Supports Dutch (nl) and English (en)

export type Language = 'nl' | 'en';

export interface Translations {
  // Common
  common: {
    backToHome: string;
    loading: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    search: string;
    open: string;
    close: string;
  };
  
  // Navigation
  nav: {
    myLibrary: string;
    howItWorks: string;
    tutorialVideos: string;
    help: string;
    contact: string;
    handyExtras: string;
  };
  
  // Homepage
  home: {
    heroTitle: string;
    heroSubtitle: string;
    useLibraryButton: string;
    watchVideoButton: string;
    trustRule: string;
    recognitionTitle: string;
    recognitionText: string;
    whatIsTitle: string;
    whatIsText: string;
    howItWorksTitle: string;
    howItWorksText: string;
    demoTitle: string;
    demoText: string;
    startButton: string;
  };
  
  // Library page
  library: {
    welcomeTitle: string;
    welcomeSubtitle: string;
    pcFreeText: string;
    reassuranceText: string;
    useLibraryButton: string;
    tryMobileButton: string;
    noBooksYet: string;
    noBooksText: string;
    firstBookSuccess: string;
    firstBookMessage: string;
    firstBookNext: string;
    firstBookOptions: string;
    tipBottom: string;
    addItemButton: string;
    scanBarcodeButton: string;
    startWithBook: string;
    formTip: string;
  };
  
  // Try page
  try: {
    title: string;
    introTitle: string;
    introText: string;
    features: string;
    limitText: string;
    startButton: string;
  };
  
  // Options menu
  options: {
    exportCSV: string;
    exportPDF: string;
    backup: string;
    restore: string;
    shareWhatsApp: string;
    shareEmail: string;
    statistics: string;
    privacy: string;
    deleteAll: string;
    install: string;
  };
  
  // Feedback
  feedback: {
    question: string;
    questionText: string;
    explanation: string;
    threeWords: string;
    clear: string;
    calm: string;
    gettingUsedTo: string;
    sendOptional: string;
  };
  
  // Extras page
  extras: {
    title: string;
    intro1: string;
    intro2: string;
    intro3: string;
    intro4: string;
    viewAll: string;
  };
  
  // Error messages
  errors: {
    demoLimitReached: string;
    invalidBarcode: string;
    bookNotFound: string;
    searchFailed: string;
    fillRequired: string;
  };
  
  // Success messages
  success: {
    itemAdded: string;
    itemUpdated: string;
    itemDeleted: string;
    backupCreated: string;
    backupRestored: string;
  };
}

export const translations: Record<Language, Translations> = {
  nl: {
    common: {
      backToHome: '← Terug naar home',
      loading: 'Laden...',
      save: 'Opslaan',
      cancel: 'Annuleren',
      delete: 'Verwijderen',
      edit: 'Bewerken',
      search: 'Zoeken',
      open: 'Open',
      close: 'Sluiten',
    },
    nav: {
      myLibrary: 'Mijn Bibliotheek',
      howItWorks: 'Zo werkt het',
      tutorialVideos: "Uitlegvideo's",
      help: 'Hulp',
      contact: 'Contact',
      handyExtras: "Handige extra's",
    },
    home: {
      heroTitle: 'Weet altijd welke boeken u al heeft',
      heroSubtitle: 'Bewaar uw boeken eenvoudig op één plek.\nGratis op de pc. Rustig uit te proberen op telefoon of tablet.',
      useLibraryButton: '👉 Gebruik Mijn Bibliotheek',
      watchVideoButton: '▶️ Bekijk de uitlegvideo',
      trustRule: 'Gratis op de pc • Telefoon/tablet: gratis proberen (10 boeken) • Geen abonnement',
      recognitionTitle: 'Herkent u dit?',
      recognitionText: 'U staat in de boekhandel en twijfelt:\n"Heb ik dit boek al, of niet?"\n\nMet Mijn Bibliotheek ziet u het meteen.\nThuis op de pc, of onderweg op uw telefoon.',
      whatIsTitle: 'Wat is Mijn Bibliotheek?',
      whatIsText: 'Mijn Bibliotheek is een eenvoudige manier\nom bij te houden welke boeken u heeft.\n\nOp de pc gebruikt u het volledig gratis.\nOp telefoon of tablet kunt u het eerst\nrustig proberen.',
      howItWorksTitle: 'Hoe werkt het op pc, telefoon en tablet?',
      howItWorksText: '• Op de pc\n  U gebruikt Mijn Bibliotheek gratis,\n  zonder beperking.\n\n• Op telefoon of tablet\n  U kunt het eerst proberen tot 10 boeken.\n  Zo kunt u kijken of het prettig werkt.\n\nWilt u daarna verder?\nDan kunt u zelf kiezen voor de volledige versie eenmalig aan te schaffen.\nGeen abonnement.',
      demoTitle: 'Eerst proberen, daarna pas beslissen',
      demoText: 'Wij vinden het belangrijk dat u eerst\nrustig kunt kijken of dit bij u past.\n\nDaarom:\n• pc: gratis\n• telefoon/tablet: gratis proberen\n• pas daarna eventueel aanschaffen',
      startButton: '👉 Start met Mijn Bibliotheek',
    },
    library: {
      welcomeTitle: 'Welkom bij Mijn Bibliotheek',
      welcomeSubtitle: 'Hier houdt u eenvoudig bij welke boeken u heeft.',
      pcFreeText: 'Gebruikt u deze pagina op de pc?\nDan is Mijn Bibliotheek gratis te gebruiken.',
      reassuranceText: 'U kunt niets kapot maken.\nU mag alles rustig proberen.',
      useLibraryButton: '👉 Gebruik Mijn Bibliotheek',
      tryMobileButton: '👉 Probeer op telefoon of tablet',
      noBooksYet: 'Nog geen boeken toegevoegd?',
      noBooksText: 'Dat is normaal.\nU kunt beginnen met één boek,\nof eerst even rondkijken.',
      firstBookSuccess: 'Goed bezig 🙂',
      firstBookMessage: 'U heeft uw eerste boek toegevoegd.\n\nVeel mensen beginnen met één boek.\nU kunt later altijd verdergaan,\nwanneer het u uitkomt.',
      firstBookNext: 'Wilt u verder?',
      firstBookOptions: 'U kunt bijvoorbeeld:\n• nog een boek toevoegen\n• of dit later doen\n\nEr is geen haast.',
      tipBottom: 'Tip: U hoeft uw hele boekenkast\nniet in één keer toe te voegen.',
      addItemButton: 'Item handmatig toevoegen',
      scanBarcodeButton: 'Barcode scannen met camera',
      startWithBook: 'Begin bijvoorbeeld met een boek\ndat u nu bij de hand heeft.',
      formTip: 'Tip: U hoeft niet alles tegelijk toe te voegen.\nEén boek is genoeg om te beginnen.',
    },
    try: {
      title: 'Probeer Mijn Bibliotheek',
      introTitle: 'U kunt dit eerst rustig proberen',
      introText: 'Tijdens het proberen kunt u maximaal 10 boeken toevoegen.',
      features: 'Alle functionaliteit is beschikbaar:\n• Barcode scannen\n• Boeken zoeken\n• Bibliotheek beheren',
      limitText: 'Wilt u meer dan 10 boeken? Dan kunt u later de volledige versie eenmalig aanschaffen.',
      startButton: '👉 Start met proberen (web versie)',
    },
    options: {
      exportCSV: 'Exporteer CSV',
      exportPDF: 'Exporteer PDF',
      backup: 'Backup maken',
      restore: 'Backup terugzetten',
      shareWhatsApp: 'Delen (WhatsApp)',
      shareEmail: 'Delen via Email',
      statistics: 'Statistieken',
      privacy: 'Privacybeleid',
      deleteAll: 'Alle data wissen',
      install: 'Installeer Mijn Bibliotheek',
    },
    feedback: {
      question: 'Mag ik u iets vragen?',
      questionText: 'Wat vond u van het toevoegen van uw eerste boek?',
      explanation: 'U hoeft niets uit te leggen.\nEen paar woorden is genoeg.',
      threeWords: 'drie woorden (nog veiliger)',
      clear: 'Duidelijk',
      calm: 'Rustig',
      gettingUsedTo: 'Even wennen',
      sendOptional: 'Verzenden (optioneel)',
    },
    extras: {
      title: "Handige extra's",
      intro1: 'Dit zijn eenvoudige hulpmiddelen binnen SeniorEase.',
      intro2: 'Sommige mensen vinden ze prettig naast Mijn Bibliotheek.',
      intro3: 'U hoeft hier niets mee.',
      intro4: 'Mijn Bibliotheek blijft altijd de hoofdzaak.',
      viewAll: "Bekijk alle extra's",
    },
    errors: {
      demoLimitReached: 'Demo limiet bereikt: u kunt maximaal 10 boeken toevoegen. Wilt u meer boeken? Schaf dan de volledige versie eenmalig aan.',
      invalidBarcode: 'Ongeldige barcode format. Voer een geldige ISBN of EAN code in.',
      bookNotFound: 'Kon geen gegevens vinden voor deze barcode. U kunt handmatig invullen.',
      searchFailed: 'Zoeken mislukt. Probeer het opnieuw of vul handmatig in.',
      fillRequired: 'Vul minimaal een titel en auteur in',
    },
    success: {
      itemAdded: 'Item toegevoegd!',
      itemUpdated: 'Item bijgewerkt!',
      itemDeleted: 'Item verwijderd!',
      backupCreated: 'Backup succesvol gemaakt!',
      backupRestored: 'Backup succesvol teruggezet!',
    },
  },
  
  en: {
    common: {
      backToHome: '← Back to home',
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search',
      open: 'Open',
      close: 'Close',
    },
    nav: {
      myLibrary: 'My Library',
      howItWorks: 'How it works',
      tutorialVideos: 'Tutorial videos',
      help: 'Help',
      contact: 'Contact',
      handyExtras: 'Handy extras',
    },
    home: {
      heroTitle: 'Always know which books you already have',
      heroSubtitle: 'Keep track of your books easily in one place.\nFree on PC. Try it out on phone or tablet.',
      useLibraryButton: '👉 Use My Library',
      watchVideoButton: '▶️ Watch tutorial video',
      trustRule: 'Free on PC • Phone/tablet: free trial (10 books) • No subscription',
      recognitionTitle: 'Do you recognize this?',
      recognitionText: 'You are in the bookstore and wonder:\n"Do I already have this book, or not?"\n\nWith My Library you see it immediately.\nAt home on your PC, or on the go on your phone.',
      whatIsTitle: 'What is My Library?',
      whatIsText: 'My Library is a simple way\nto keep track of which books you have.\n\nOn PC you use it completely free.\nOn phone or tablet you can first\ntry it out.',
      howItWorksTitle: 'How does it work on PC, phone and tablet?',
      howItWorksText: '• On PC\n  You use My Library for free,\n  without restrictions.\n\n• On phone or tablet\n  You can first try it with up to 10 books.\n  This way you can see if it works well for you.\n\nWant to continue after that?\nThen you can choose to purchase the full version one-time.\nNo subscription.',
      demoTitle: 'Try first, then decide',
      demoText: 'We think it is important that you first\ncan see if this suits you.\n\nTherefore:\n• PC: free\n• phone/tablet: free trial\n• only then optionally purchase',
      startButton: '👉 Start with My Library',
    },
    library: {
      welcomeTitle: 'Welcome to My Library',
      welcomeSubtitle: 'Here you easily keep track of which books you have.',
      pcFreeText: 'Are you using this page on PC?\nThen My Library is free to use.',
      reassuranceText: 'You cannot break anything.\nYou may try everything.',
      useLibraryButton: '👉 Use My Library',
      tryMobileButton: '👉 Try on phone or tablet',
      noBooksYet: 'No books added yet?',
      noBooksText: 'That is normal.\nYou can start with one book,\nor look around first.',
      firstBookSuccess: 'Well done 🙂',
      firstBookMessage: 'You have added your first book.\n\nMany people start with one book.\nYou can always continue later,\nwhen it suits you.',
      firstBookNext: 'Would you like to continue?',
      firstBookOptions: 'You can for example:\n• add another book\n• or do this later\n\nThere is no rush.',
      tipBottom: 'Tip: You do not need to add\nyour entire book collection at once.',
      addItemButton: 'Add item manually',
      scanBarcodeButton: 'Scan barcode with camera',
      startWithBook: 'For example, start with a book\nthat you have at hand right now.',
      formTip: 'Tip: You do not need to add everything at once.\nOne book is enough to get started.',
    },
    try: {
      title: 'Try My Library',
      introTitle: 'You can try this first',
      introText: 'During the trial you can add up to 10 books.',
      features: 'All functionality is available:\n• Scan barcode\n• Search books\n• Manage library',
      limitText: 'Want more than 10 books? You can later purchase the full version one-time.',
      startButton: '👉 Start trying (web version)',
    },
    options: {
      exportCSV: 'Export CSV',
      exportPDF: 'Export PDF',
      backup: 'Create backup',
      restore: 'Restore backup',
      shareWhatsApp: 'Share (WhatsApp)',
      shareEmail: 'Share via Email',
      statistics: 'Statistics',
      privacy: 'Privacy policy',
      deleteAll: 'Delete all data',
      install: 'Install My Library',
    },
    feedback: {
      question: 'May I ask you something?',
      questionText: 'What did you think of adding your first book?',
      explanation: 'You do not need to explain anything.\nA few words is enough.',
      threeWords: 'three words (even safer)',
      clear: 'Clear',
      calm: 'Calm',
      gettingUsedTo: 'Getting used to it',
      sendOptional: 'Send (optional)',
    },
    extras: {
      title: 'Handy extras',
      intro1: 'These are simple tools within SeniorEase.',
      intro2: 'Some people find them nice alongside My Library.',
      intro3: 'You do not need to use these.',
      intro4: 'My Library always remains the main thing.',
      viewAll: 'View all extras',
    },
    errors: {
      demoLimitReached: 'Demo limit reached: you can add a maximum of 10 books. Want more books? Then purchase the full version one-time.',
      invalidBarcode: 'Invalid barcode format. Enter a valid ISBN or EAN code.',
      bookNotFound: 'Could not find data for this barcode. You can fill in manually.',
      searchFailed: 'Search failed. Try again or fill in manually.',
      fillRequired: 'Fill in at least a title and author',
    },
    success: {
      itemAdded: 'Item added!',
      itemUpdated: 'Item updated!',
      itemDeleted: 'Item deleted!',
      backupCreated: 'Backup created successfully!',
      backupRestored: 'Backup restored successfully!',
    },
  },
};

// Helper function to get translations
export function getTranslations(lang: Language): Translations {
  return translations[lang] || translations.nl;
}

// Helper to get current language from URL or localStorage
export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') return 'nl';
  
  // Check URL path
  if (window.location.pathname.startsWith('/en')) {
    return 'en';
  }
  
  // Check localStorage
  try {
    const saved = localStorage.getItem('seniorease-language');
    if (saved === 'en' || saved === 'nl') {
      return saved;
    }
  } catch (e) {
    // Ignore
  }
  
  return 'nl';
}

// Helper to set language
export function setLanguage(lang: Language) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('seniorease-language', lang);
  } catch (e) {
    // Ignore
  }
}

// Helper to get language-specific localStorage keys
export function getStorageKey(key: string, lang: Language): string {
  if (lang === 'en') {
    return `${key}-en`;
  }
  return key;
}

