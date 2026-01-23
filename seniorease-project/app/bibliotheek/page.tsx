'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useLanguage } from '../../lib/useLanguage';
import { getStorageKey } from '../../lib/translations';
import LanguageSwitcher from '../components/LanguageSwitcher';

// Social Media URLs
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@SeniorEaseNL';

interface LibraryItem {
  id: string;
  type: 'book'; // Alleen boeken
  title: string;
  author: string; // Auteur
  barcode: string;
  dateAdded: string;
  notes?: string;
}

export default function BibliotheekPage() {
  const { language, translations } = useLanguage();
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  // Filter verwijderd - alleen boeken beschikbaar
  const [quaggaLoaded, setQuaggaLoaded] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [detectedBarcode, setDetectedBarcode] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [showMenu, setShowMenu] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [hasLicense, setHasLicense] = useState<boolean | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const [bookSearchResults, setBookSearchResults] = useState<any[]>([]);
  const [isSearchingBooks, setIsSearchingBooks] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [feedbackGiven, setFeedbackGiven] = useState<boolean>(false);
  const [feedbackValue, setFeedbackValue] = useState<string>('');
  
  const t = translations;

  // Check of feedback al is gegeven
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const feedbackKey = getStorageKey('seniorease-first-book-feedback', language);
      const feedbackSent = localStorage.getItem(feedbackKey);
      if (feedbackSent === 'true') {
        setFeedbackGiven(true);
      }
    } catch (e) {
      // Ignore
    }
  }, [language]);

  // Check demo mode en licentie
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check URL parameter voor demo mode
    const urlParams = new URLSearchParams(window.location.search);
    const demoParam = urlParams.get('demo');
    
    // Check localStorage voor demo mode (taal-specifiek)
    const demoKey = getStorageKey('seniorease-demo-mode', language);
    const demoMode = localStorage.getItem(demoKey) === 'true' || demoParam === 'true';
    setIsDemoMode(demoMode);
    
    // WEB VERSIE: Altijd volledig gratis, geen licentie nodig
    // Alleen mobiele APK heeft licentie nodig
    // Op de website is alles altijd beschikbaar zonder limieten (behalve in demo mode)
    if (demoMode) {
      console.log('✅ Demo mode actief - max 10 boeken');
    } else {
      console.log('✅ Web versie - volledig gratis, geen licentie nodig - FIX 2025-12-06');
    }
    setHasLicense(true); // Web versie heeft altijd "licentie" (gratis)
  }, []);

  // PWA install prompt
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleBeforeInstallPrompt = (e: Event) => {
      if (hasLicense === true) {
        e.preventDefault();
        setDeferredPrompt(e);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [hasLicense]);

  // Wanneer licentie wordt toegevoegd, check of er al een prompt was
  useEffect(() => {
    if (hasLicense === true && typeof window !== 'undefined') {
      // Als er al een prompt was geweest maar we die hadden geblokkeerd,
      // kan de gebruiker nu handmatig installeren via browser menu
      // We kunnen ook een eigen install button toevoegen als we de prompt hebben
    }
  }, [hasLicense]);

  // Load items from localStorage
  useEffect(() => {
    if (hasLicense === null || typeof window === 'undefined') return;
    
    try {
      const libraryKey = getStorageKey('seniorease-library', language);
      const saved = localStorage.getItem(libraryKey);
      if (saved) {
        try {
          const loadedItems = JSON.parse(saved);
          setItems(loadedItems);
        } catch (e) {
          console.error('Error loading library:', e);
        }
      }
    } catch (e) {
      // localStorage kan niet beschikbaar zijn (bijv. in private mode)
      console.error('Error accessing localStorage:', e);
    }
  }, [hasLicense, language]);

  // Save items to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const libraryKey = getStorageKey('seniorease-library', language);
      if (items.length > 0) {
        localStorage.setItem(libraryKey, JSON.stringify(items));
      } else {
        // Verwijder localStorage entry als leeg
        localStorage.removeItem(libraryKey);
      }
    } catch (e) {
      // localStorage kan niet beschikbaar zijn (bijv. in private mode)
      console.error('Error saving to localStorage:', e);
    }
  }, [items, language]);

  // Sluit menu bij klikken buiten het menu
  useEffect(() => {
    if (!showMenu) return;
    
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const menu = document.querySelector('[data-menu="options"]');
      if (menu && !menu.contains(target)) {
        setShowMenu(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  // Add new item
  function addItem(item: Omit<LibraryItem, 'id' | 'dateAdded'>) {
    // Check demo mode limiet (max 10 boeken)
    if (isDemoMode && items.length >= 10) {
      setErrorMessage(t.errors.demoLimitReached);
      setShowAddForm(false);
      return;
    }
    
    const newItem: LibraryItem = {
      ...item,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString()
    };
    setItems([newItem, ...items]);
    setShowAddForm(false);
    
    if (isDemoMode && items.length + 1 === 10) {
      setSuccessMessage(language === 'nl' 
        ? 'U heeft nu 10 boeken toegevoegd. Dit is de limiet voor het proberen. Wilt u meer? Schaf dan de volledige versie eenmalig aan.'
        : 'You have now added 10 books. This is the limit for trying. Want more? Then purchase the full version one-time.');
    }
  }

  // Delete item
  function deleteItem(id: string) {
    const confirmMsg = language === 'nl' 
      ? 'Weet u zeker dat u dit item wilt verwijderen?'
      : 'Are you sure you want to delete this item?';
    if (confirm(confirmMsg)) {
      setItems(items.filter(item => item.id !== id));
    }
  }

  // Export to CSV
  function exportToCSV() {
    const headers = ['Type', 'Titel', 'Auteur', 'Barcode', 'Datum toegevoegd', 'Notities'];
    const rows = filteredItems.map(item => [
      typeNames[item.type], // Gebruik leesbare naam (Boek)
      item.title,
      item.author,
      item.barcode,
      new Date(item.dateAdded).toLocaleDateString('nl-NL'),
      item.notes || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `seniorease-bibliotheek-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    setShowMenu(false);
  }

  // Export to PDF
  async function exportToPDF() {
    try {
      // Dynamisch importeren van jsPDF om SSR problemen te voorkomen
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      let yPos = margin;
      const lineHeight = 8;
      const maxY = doc.internal.pageSize.getHeight() - margin;

      // Titel
      doc.setFontSize(18);
      doc.setTextColor(0, 100, 200);
      doc.text('Mijn Bibliotheek - SeniorEase', margin, yPos);
      yPos += lineHeight * 2;

      // Datum
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Gegenereerd op: ${new Date().toLocaleDateString('nl-NL')}`, margin, yPos);
      yPos += lineHeight * 2;

      // Statistieken
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Totaal items: ${items.length}`, margin, yPos);
      yPos += lineHeight;
      const booksCount = items.length;
      doc.text(`Totaal boeken: ${booksCount}`, margin, yPos);
      yPos += lineHeight * 2;

      // Items
      doc.setFontSize(14);
      doc.setTextColor(0, 100, 200);
      doc.text('Items:', margin, yPos);
      yPos += lineHeight * 1.5;

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      filteredItems.forEach((item, index) => {
        // Check of we een nieuwe pagina nodig hebben
        if (yPos > maxY - (lineHeight * 5)) {
          doc.addPage();
          yPos = margin;
        }

        // Type en nummer
        doc.setFont('helvetica', 'bold');
        doc.text(`${index + 1}. ${typeIcons[item.type]} ${typeNames[item.type]}`, margin, yPos);
        yPos += lineHeight;

        // Titel
        doc.setFont('helvetica', 'normal');
        const titleLines = doc.splitTextToSize(`   Titel: ${item.title}`, pageWidth - (margin * 2));
        doc.text(titleLines, margin + 5, yPos);
        yPos += lineHeight * titleLines.length;

        // Auteur
        const authorLabel = 'Auteur';
        doc.text(`   ${authorLabel}: ${item.author}`, margin + 5, yPos);
        yPos += lineHeight;

        // Barcode (als aanwezig)
        if (item.barcode) {
          doc.text(`   Barcode: ${item.barcode}`, margin + 5, yPos);
          yPos += lineHeight;
        }

        // Notities (als aanwezig)
        if (item.notes) {
          const notesLines = doc.splitTextToSize(`   Notities: ${item.notes}`, pageWidth - (margin * 2));
          doc.text(notesLines, margin + 5, yPos);
          yPos += lineHeight * notesLines.length;
        }

        // Datum toegevoegd
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(8);
        doc.text(`   Toegevoegd: ${new Date(item.dateAdded).toLocaleDateString('nl-NL')}`, margin + 5, yPos);
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        yPos += lineHeight * 1.5;

        // Lijn tussen items
        if (index < filteredItems.length - 1) {
          doc.setDrawColor(200, 200, 200);
          doc.line(margin, yPos, pageWidth - margin, yPos);
          yPos += lineHeight;
        }
      });

      // Footer op elke pagina
      const totalPages = doc.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `Pagina ${i} van ${totalPages} - SeniorEase Bibliotheek`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
      }

      // Download PDF
      const fileName = `seniorease-bibliotheek-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      setShowMenu(false);
      setSuccessMessage('PDF succesvol gedownload!');
    } catch (error: any) {
      console.error('Error generating PDF:', error);
      setErrorMessage('Er is een fout opgetreden bij het genereren van de PDF. Probeer het opnieuw.');
    }
  }

  // Delen via email
  function delenViaEmail() {
    try {
      // Maak een tekstversie van de bibliotheek
      let emailBody = 'Mijn Bibliotheek - SeniorEase\n\n';
      emailBody += `Gegenereerd op: ${new Date().toLocaleDateString('nl-NL')}\n\n`;
      emailBody += `Totaal boeken: ${items.length}\n\n`;
      emailBody += '---\n\n';

      filteredItems.forEach((item, index) => {
        emailBody += `${index + 1}. ${typeIcons[item.type]} ${typeNames[item.type]}\n`;
        emailBody += `   Titel: ${item.title}\n`;
        const authorLabel = 'Auteur';
        emailBody += `   ${authorLabel}: ${item.author}\n`;
        if (item.barcode) {
          emailBody += `   Barcode: ${item.barcode}\n`;
        }
        if (item.notes) {
          emailBody += `   Notities: ${item.notes}\n`;
        }
        emailBody += `   Toegevoegd: ${new Date(item.dateAdded).toLocaleDateString('nl-NL')}\n`;
        emailBody += '\n';
      });

      emailBody += '\n---\n';
      emailBody += 'Gegenereerd met Mijn Bibliotheek\n';
      emailBody += 'https://seniorease.nl';

      // Maak ook een CSV attachment ready
      const headers = ['Type', 'Titel', 'Auteur', 'Barcode', 'Datum toegevoegd', 'Notities'];
      const rows = filteredItems.map(item => [
        typeNames[item.type],
        item.title,
        item.author,
        item.barcode,
        new Date(item.dateAdded).toLocaleDateString('nl-NL'),
        item.notes || ''
      ]);
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      // Encode voor mailto
      const subject = encodeURIComponent('Mijn Bibliotheek - SeniorEase');
      const body = encodeURIComponent(emailBody);
      
      // Maak mailto link
      const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Toon instructie voor CSV attachment
      setTimeout(() => {
        if (confirm('Email client geopend!\n\nTip: Als u de bibliotheek als bijlage wilt toevoegen:\n1. Download eerst de CSV via "Exporteer CSV"\n2. Voeg het bestand toe aan uw email\n\nWilt u nu de CSV downloaden?')) {
          exportToCSV();
        }
      }, 500);
      
      setShowMenu(false);
    } catch (error: any) {
      console.error('Error sharing via email:', error);
      setErrorMessage('Er is een fout opgetreden bij het openen van de email client. Probeer het opnieuw.');
    }
  }

  // Backup maken - met keuze van opslaglocatie
  async function backupMaken() {
    const backup = {
      date: new Date().toISOString(),
      items: items
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const fileName = `seniorease-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    try {
      // Probeer moderne File System Access API (Chrome, Edge, Opera)
      // Dit geeft de gebruiker een dialoog om de locatie te kiezen
      if ('showSaveFilePicker' in window) {
        const fileHandle = await (window as any).showSaveFilePicker({
          suggestedName: fileName,
          types: [{
            description: 'JSON Backup Bestand',
            accept: { 'application/json': ['.json'] }
          }]
        });
        
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
        
        setShowMenu(false);
        setSuccessMessage('Backup succesvol opgeslagen!');
      } else {
        // Fallback voor browsers zonder File System Access API
        // Gebruik standaard download (browser vraagt meestal wel om locatie)
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
        setShowMenu(false);
        setSuccessMessage('Backup wordt gedownload. U kunt in uw browser kiezen waar u deze wilt opslaan.');
      }
    } catch (error: any) {
      // Gebruiker heeft de dialoog geannuleerd
      if (error.name === 'AbortError') {
        return; // Stil afbreken, gebruiker heeft geannuleerd
      }
      
      // Als er een fout is, val terug op standaard download
      console.error('Error saving backup:', error);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(link.href);
      setShowMenu(false);
      alert('Backup wordt gedownload. U kunt in uw browser kiezen waar u deze wilt opslaan.');
    }
  }

  // Backup terugzetten
  function backupTerugzetten() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          const backup = JSON.parse(event.target.result);
          
          // Web versie: geen limieten bij import
          if (backup.items && Array.isArray(backup.items)) {
            if (confirm(`Weet u zeker dat u de backup van ${new Date(backup.date).toLocaleDateString('nl-NL')} wilt terugzetten? Dit overschrijft alle huidige data.`)) {
              setItems(backup.items);
              setSuccessMessage('Backup succesvol teruggezet!');
            }
          } else {
            setErrorMessage('Ongeldig backup bestand.');
          }
        } catch (error) {
          setErrorMessage('Fout bij het lezen van het backup bestand.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
    setShowMenu(false);
  }

  // Delen via WhatsApp
  function delenWhatsApp() {
    const total = items.length;
    const boeken = items.length;
    
    const tekst = `Mijn SeniorEase Bibliotheek\n\n📚 Totaal: ${total} boeken\n\nBekijk mijn collectie op seniorease.nl`;
    const url = `https://wa.me/?text=${encodeURIComponent(tekst)}`;
    window.open(url, '_blank');
    setShowMenu(false);
  }

  // Toon statistieken
  function toonStatistieken() {
    const total = items.length;
    const boeken = items.length;
    
    const statistieken = `
📊 Mijn Bibliotheek Statistieken

📚 Totaal aantal boeken: ${total}

${total > 0 ? `\nLaatste toevoeging: ${new Date(Math.max(...items.map(i => new Date(i.dateAdded).getTime()))).toLocaleDateString('nl-NL')}` : ''}
    `.trim();
    
    setSuccessMessage(statistieken.replace(/\n/g, ' '));
    setShowMenu(false);
  }

  // Toon privacybeleid
  function toonPrivacybeleid() {
    const privacyTekst = `
🔒 Privacybeleid SeniorEase Bibliotheek

Uw gegevens blijven privé:
• Alle data wordt alleen lokaal opgeslagen in uw browser
• Geen gegevens worden naar servers gestuurd
• U heeft volledige controle over uw data
• U kunt op elk moment een backup maken of alles wissen

Backup & Veiligheid:
• Maak regelmatig een backup van uw collectie
• Deel backups alleen met mensen die u vertrouwt
• Wis uw data wanneer u Mijn Bibliotheek niet meer gebruikt

Voor vragen: bezoek seniorease.nl
    `.trim();
    
    setSuccessMessage(privacyTekst.replace(/\n/g, ' '));
    setShowMenu(false);
  }

  // Installeer Mijn Bibliotheek
  async function installeerApp() {
    if (!deferredPrompt) {
      setErrorMessage('De installatie optie is niet beschikbaar. U kunt Mijn Bibliotheek installeren via het menu van uw browser (meestal drie puntjes of hamburger menu).');
      setShowMenu(false);
      return;
    }

    try {
      // Toon de install prompt
      deferredPrompt.prompt();

      // Wacht op gebruiker response
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        setSuccessMessage('Mijn Bibliotheek wordt geïnstalleerd. Bedankt!');
        setDeferredPrompt(null);
      } else {
        // Gebruiker heeft geannuleerd
      }

      setDeferredPrompt(null);
      setShowMenu(false);
    } catch (error) {
      console.error('Error installing app:', error);
      setErrorMessage('Er ging iets mis bij de installatie. Probeer het opnieuw of installeer via het browser menu.');
      setShowMenu(false);
    }
  }

  // Alle data wissen
  function wisAlleData() {
    const confirmMsg1 = language === 'nl' 
      ? 'WAARSCHUWING: Weet u zeker dat u alle data wilt wissen? Dit kan niet ongedaan worden gemaakt!\n\nGebruik eerst "Backup maken" om uw data te bewaren.'
      : 'WARNING: Are you sure you want to delete all data? This cannot be undone!\n\nFirst use "Create backup" to save your data.';
    const confirmMsg2 = language === 'nl'
      ? 'Laatste bevestiging: alle data wordt nu permanent verwijderd.'
      : 'Final confirmation: all data will now be permanently deleted.';
    const successMsg = language === 'nl' ? 'Alle data is gewist.' : 'All data has been deleted.';
    
    if (confirm(confirmMsg1)) {
      if (confirm(confirmMsg2)) {
        setItems([]);
        const libraryKey = getStorageKey('seniorease-library', language);
        localStorage.removeItem(libraryKey);
        setSearchQuery('');
        setSuccessMessage(successMsg);
        setShowMenu(false);
      }
    }
  }

  // Valideer ISBN/EAN code
  function isValidBarcode(code: string): boolean {
    if (!code) return false;
    
    // Verwijder alle niet-numerieke tekens (behalve X voor ISBN-10)
    const cleanCode = code.replace(/[^0-9X]/g, '');
    
    // ISBN-13: 13 cijfers, begint met 978 of 979
    if (cleanCode.length === 13) {
      if (cleanCode.startsWith('978') || cleanCode.startsWith('979')) {
        return true; // ISBN-13
      }
      // EAN-13 voor muziek (13 cijfers, niet 978/979)
      if (/^\d{13}$/.test(cleanCode)) {
        return true; // EAN-13
      }
    }
    
    // ISBN-10: 10 tekens (cijfers of X)
    if (cleanCode.length === 10 && /^[0-9]{9}[0-9X]$/.test(cleanCode)) {
      return true; // ISBN-10
    }
    
    // EAN-8: 8 cijfers
    if (cleanCode.length === 8 && /^\d{8}$/.test(cleanCode)) {
      return true; // EAN-8
    }
    
    // UPC-A: 12 cijfers
    if (cleanCode.length === 12 && /^\d{12}$/.test(cleanCode)) {
      return true; // UPC-A
    }
    
    // UPC-E: 6-8 cijfers
    if (cleanCode.length >= 6 && cleanCode.length <= 8 && /^\d+$/.test(cleanCode)) {
      return true; // UPC-E
    }
    
    return false;
  }

  // Normaliseer barcode (verwijder streepjes/spaties, behoud X voor ISBN-10)
  function normalizeBarcode(code: string): string {
    // Voor ISBN-10: behoud X aan het einde
    if (code.length === 10 && code.toUpperCase().endsWith('X')) {
      return code.replace(/[^0-9X]/g, '').toUpperCase();
    }
    // Voor andere codes: alleen cijfers
    return code.replace(/[^0-9]/g, '');
  }

  // Start barcode scanner
  function startScanner() {
    if (typeof window === 'undefined' || !(window as any).Quagga) {
      setErrorMessage('Scanner bibliotheek wordt nog geladen. Wacht even en probeer het opnieuw.');
      return;
    }

    setShowScanner(true);
    setDetectedBarcode(null);
    setCountdown(0);
    setLoadError(null);
    setDebugLogs(['Scanner wordt gestart...']);
    
    // Verzamel meerdere detecties voor betrouwbaarheid
    let detectionCounts: Map<string, number> = new Map();
    let detectionTimeout: NodeJS.Timeout | null = null;
    
    // Wacht tot de scanner container in de DOM staat
    setTimeout(async () => {
      const Quagga = (window as any).Quagga;
      
      // Check of Quagga geladen is
      if (!Quagga) {
        const errorMsg = 'Quagga bibliotheek niet geladen';
        setDebugLogs(prev => [...prev, `❌ ${errorMsg}`]);
        setErrorMessage('Scanner bibliotheek wordt nog geladen. Wacht even en probeer het opnieuw.');
        stopScanner();
        return;
      }
      
      setDebugLogs(prev => [...prev, '✓ Quagga bibliotheek geladen']);
      
      const container = document.querySelector('#scanner-container');
      
      if (!container) {
        const errorMsg = 'Scanner container niet gevonden';
        setDebugLogs(prev => [...prev, `❌ ${errorMsg}`]);
        setErrorMessage('Scanner container niet gevonden. Probeer de pagina te vernieuwen.');
        stopScanner();
        return;
      }
      
      setDebugLogs(prev => [...prev, '✓ Container gevonden']);

      // Verwijder oude event listeners als die er zijn
      try {
        Quagga.offDetected();
        setDebugLogs(prev => [...prev, '✓ Oude listeners verwijderd']);
      } catch (e) {
        // Negeer als er geen oude listeners zijn
      }
      
      // Detecteer of het mobiel is voor andere constraints
      const isMobile = window.innerWidth <= 768 || window.innerHeight <= 1024;
      
      setDebugLogs(prev => [...prev, 'Test camera beschikbaarheid...']);
      
      // Check of mediaDevices beschikbaar is (vereist HTTPS of localhost)
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const isHTTPS = window.location.protocol === 'https:';
        const isHTTP = window.location.protocol === 'http:';
        
        let errorMsg = 'Camera API niet beschikbaar.\n\n';
        
        if (isHTTP && !isLocalhost) {
          errorMsg += '⚠️ BELANGRIJK: Camera vereist HTTPS verbinding!\n\n';
          errorMsg += 'Oplossingen:\n';
          errorMsg += '1. Gebruik HTTPS (https://...) in plaats van HTTP\n';
          errorMsg += '2. Of test op localhost: http://localhost:3001\n';
          errorMsg += '3. Of gebruik echte telefoon met HTTPS website\n\n';
          errorMsg += 'Huidige URL: ' + window.location.href;
        } else {
          errorMsg += 'Camera API wordt niet ondersteund door deze browser.\n';
          errorMsg += 'Probeer een andere browser (Chrome, Firefox, Edge).';
        }
        
        setDebugLogs(prev => [...prev, `❌ Camera API niet beschikbaar`]);
        setErrorMessage(errorMsg.replace(/\n/g, ' '));
        stopScanner();
        return;
      }
      
      // Test of camera beschikbaar is en permissie gegeven kan worden
      try {
        // Probeer eerst environment (achterkant camera), dan fallback naar user (voorkant)
        let testStream;
        try {
          testStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
          });
        } catch (envError) {
          // Fallback naar voorkant camera
          console.log('Environment camera niet beschikbaar, probeer voorkant camera...');
          testStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" }
          });
        }
        // Stop test stream onmiddellijk
        testStream.getTracks().forEach(track => track.stop());
        setDebugLogs(prev => [...prev, '✓ Camera beschikbaar en toegestaan']);
      } catch (permError: any) {
        const errorMsg = permError.message || 'Camera permissie geweigerd';
        setDebugLogs(prev => [...prev, `❌ Camera fout: ${errorMsg}`]);
        setErrorMessage(`Camera permissie nodig: ${errorMsg}. Controleer browser permissies, HTTPS verbinding, of of de camera niet door een andere app wordt gebruikt.`);
        stopScanner();
        return;
      }
      
      setDebugLogs(prev => [...prev, 'Initialiseer Quagga...']);
      
      // Voeg een timeout toe om te zien of init callback wordt aangeroepen
      const initTimeout = setTimeout(() => {
        setDebugLogs(prev => [...prev, '⏱️ Init timeout - callback niet aangeroepen na 5 sec']);
        // Probeer Quagga te stoppen als die vastloopt
        try {
          if ((window as any).Quagga) {
            (window as any).Quagga.stop();
          }
        } catch (e) {
          console.error('Error stopping Quagga:', e);
        }
      }, 5000);
      
      try {
        console.log('Aanroepen Quagga.init()...');
        setDebugLogs(prev => [...prev, 'Quagga.init() aangeroepen...']);
        
        // Eenvoudigste configuratie mogelijk voor mobiel compatibiliteit
        // Probeer eerst environment camera, met fallback
        const initConfig: any = {
          inputStream: {
            type: "LiveStream",
            target: container,
            constraints: {
              facingMode: "environment",
              width: { min: 640, ideal: 1280, max: 1920 },
              height: { min: 480, ideal: 720, max: 1080 }
            }
          },
          locator: {
            patchSize: "medium",
            halfSample: true // Betere performance
          },
          numOfWorkers: 2, // Gebruik workers voor betere performance
          frequency: 10,
          decoder: {
            readers: [
              "ean_reader",
              "ean_8_reader",
              "upc_reader",
              "upc_e_reader",
              "code_128_reader"
            ]
          },
          locate: true
        };
        
        // Log config zonder DOM elementen (om circular reference te voorkomen)
        const configForLog = {
          inputStream: {
            type: initConfig.inputStream.type,
            constraints: initConfig.inputStream.constraints
          },
          locator: initConfig.locator,
          numOfWorkers: initConfig.numOfWorkers,
          frequency: initConfig.frequency,
          decoder: initConfig.decoder,
          locate: initConfig.locate
        };
        setDebugLogs(prev => [...prev, `Config: ${JSON.stringify(configForLog).substring(0, 100)}...`]);
        
        Quagga.init(initConfig, function(err: any) {
        // Clear timeout omdat callback is aangeroepen
        clearTimeout(initTimeout);
        
        if (err) {
          console.error('Quagga init error:', err);
          const errorMsg = `Fout: ${err.message || err.toString() || 'Camera niet beschikbaar'}`;
          setDebugLogs(prev => [...prev, `❌ Init fout: ${errorMsg}`]);
          
          // Probeer fallback configuratie met voorkant camera
          if (err.message && err.message.includes('environment')) {
            console.log('Probeer fallback met voorkant camera...');
            setDebugLogs(prev => [...prev, '🔄 Probeer voorkant camera...']);
            
            const fallbackConfig = {
              ...initConfig,
              inputStream: {
                ...initConfig.inputStream,
                constraints: {
                  facingMode: "user",
                  width: { min: 640, ideal: 1280 },
                  height: { min: 480, ideal: 720 }
                }
              }
            };
            
            Quagga.init(fallbackConfig, function(fallbackErr: any) {
              if (fallbackErr) {
                setErrorMessage(`Camera kon niet worden gestart. Fout: ${fallbackErr.message || 'Onbekend'}. Controleer browser permissies, HTTPS verbinding en camera beschikbaarheid.`);
                stopScanner();
                return;
              }
              
              // Fallback succesvol
              try {
                // Registreer detection handler voor fallback
                Quagga.offDetected();
                Quagga.onDetected(async (result: any) => {
                  const rawCode = result.codeResult?.code;
                  if (!rawCode || !isValidBarcode(rawCode)) return;
                  
                  const normalizedCode = normalizeBarcode(rawCode);
                  Quagga.stop();
                  stopScanner();
                  setShowAddForm(true);
                  setFormData(prev => ({ ...prev, barcode: normalizedCode }));
                  setDetectedBarcode(normalizedCode);
                  setCountdown(4);
                  
                  const interval = setInterval(() => {
                    setCountdown((prev) => {
                      if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                      }
                      return prev - 1;
                    });
                  }, 1000);
                  
                  setTimeout(async () => {
                    clearInterval(interval);
                    setCountdown(0);
                    await lookupBarcode(normalizedCode);
                  }, 4000);
                });
                
                Quagga.start();
                setDebugLogs(prev => [...prev, '✓ Camera gestart (voorkant)', '✓ Wacht op barcode...']);
              } catch (startError: any) {
                console.error('Quagga.start() error:', startError);
                setDebugLogs(prev => [...prev, `❌ Start fout: ${startError.message || 'Onbekend'}`]);
                setErrorMessage('Camera kon niet worden gestart. Probeer de pagina te vernieuwen.');
                stopScanner();
              }
            });
            return;
          }
          
          setErrorMessage(`Camera kon niet worden gestart. Fout: ${errorMsg}. Controleer browser permissies, HTTPS verbinding en camera beschikbaarheid.`);
          stopScanner();
          return;
        }
        
        console.log('Quagga init succesvol - callback uitgevoerd');
        setDebugLogs(prev => [...prev, '✓ Callback ontvangen', '✓ Quagga geïnitialiseerd']);
        
        console.log('Quagga gestart, wacht op barcode...');
        const settingsMsg = `Instellingen: Mobiel=${isMobile}, Workers=2, PatchSize=medium`;
        console.log('Scanner instellingen:', {
          isMobile,
          area: { top: "20%", right: "12.5%", left: "12.5%", bottom: "20%" },
          patchSize: isMobile ? "medium" : "medium",
          workers: isMobile ? 2 : 2
        });
        setDebugLogs(prev => [...prev, 'Start camera...', settingsMsg]);
        
        try {
          Quagga.start();
          setDebugLogs(prev => [...prev, '✓ Camera gestart, wacht op barcode...']);
          console.log('Quagga.start() aangeroepen');
        } catch (startError: any) {
          console.error('Quagga.start() error:', startError);
          setDebugLogs(prev => [...prev, `❌ Start fout: ${startError.message || 'Onbekend'}`]);
        }
        
        // Registreer detection handler NA dat Quagga is gestart
        setDebugLogs(prev => [...prev, 'Detectie handler geregistreerd']);
        
        // Verwijder oude detection handler eerst
        Quagga.offDetected();
        
        Quagga.onDetected(async (result: any) => {
          const rawCode = result.codeResult?.code;
          const codeFormat = result.codeResult?.format || 'onbekend';
          
          console.log('=== Barcode Detection ===');
          console.log('Raw result:', result);
          console.log('Raw code:', rawCode);
          console.log('Code type:', codeFormat);
          
          setDebugLogs(prev => [...prev.slice(-4), `🔍 Detectie: ${rawCode || 'geen code'} (${codeFormat})`]);
          
          if (!rawCode) {
            console.warn('Geen code gevonden in result');
            setDebugLogs(prev => [...prev, '⚠️ Geen code gevonden']);
            return;
          }
          
          // Valideer en normaliseer de code
          if (!isValidBarcode(rawCode)) {
            console.warn('Ongeldige barcode gedetecteerd:', rawCode);
            setDebugLogs(prev => [...prev, `❌ Ongeldig: ${rawCode}`]);
            return;
          }
          
          const normalizedCode = normalizeBarcode(rawCode);
          console.log('Barcode normalized:', normalizedCode);
          setDebugLogs(prev => [...prev, `✓ Genormaliseerd: ${normalizedCode}`]);
          
          // Tel hoe vaak deze code is gedetecteerd
          const currentCount = (detectionCounts.get(normalizedCode) || 0) + 1;
          detectionCounts.set(normalizedCode, currentCount);
          
          console.log(`Code "${normalizedCode}" gedetecteerd ${currentCount}x`);
          
          // Reset timeout bij elke nieuwe detectie
          if (detectionTimeout) {
            clearTimeout(detectionTimeout);
          }
          
          // Accepteer code na 1 consistente detectie (verlaagd voor betere mobiele detectie), of na timeout
          if (currentCount >= 1) {
            setDebugLogs(prev => [...prev, `✅ Code geaccepteerd: ${normalizedCode} (${currentCount}x)`]);
            
            // Stop scanner
            Quagga.stop();
            stopScanner();
            
            // Toon formulier en vul barcode in
            setShowAddForm(true);
            setFormData(prev => ({ ...prev, barcode: normalizedCode }));
            setDetectedBarcode(normalizedCode);
            setCountdown(4);
            setLoadError(null);
            
            // Start countdown en wacht 4 seconden voordat we gaan zoeken
            const interval = setInterval(() => {
              setCountdown((prev) => {
                if (prev <= 1) {
                  clearInterval(interval);
                  return 0;
                }
                return prev - 1;
              });
            }, 1000);
            
            // Wacht 4 seconden, dan zoek online
            setTimeout(async () => {
              clearInterval(interval);
              setCountdown(0);
              await lookupBarcode(normalizedCode);
            }, 4000);
          } else {
            // Wacht op meer detecties of timeout
            detectionTimeout = setTimeout(() => {
              // Na 1 seconde zonder nieuwe detecties, accepteer de meest voorkomende code
              let bestCode = '';
              let bestCount = 0;
              detectionCounts.forEach((count, code) => {
                if (count > bestCount) {
                  bestCount = count;
                  bestCode = code;
                }
              });
              
              if (bestCode && bestCount >= 1) {
                console.log(`Accepteer code na timeout: ${bestCode} (${bestCount}x)`);
                
                // Stop scanner
                Quagga.stop();
                stopScanner();
                
                // Toon formulier en vul barcode in
                setShowAddForm(true);
                setFormData(prev => ({ ...prev, barcode: bestCode }));
                setDetectedBarcode(bestCode);
                setCountdown(4);
                setLoadError(null);
                
                // Start countdown en wacht 4 seconden voordat we gaan zoeken
                const interval = setInterval(() => {
                  setCountdown((prev) => {
                    if (prev <= 1) {
                      clearInterval(interval);
                      return 0;
                    }
                    return prev - 1;
                  });
                }, 1000);
                
                // Wacht 4 seconden, dan zoek online
                setTimeout(async () => {
                  clearInterval(interval);
                  setCountdown(0);
                  await lookupBarcode(bestCode);
                }, 4000);
              }
            }, 1000);
          }
        });
        });
        
        console.log('Quagga.init() call voltooid, wacht op callback...');
        setDebugLogs(prev => [...prev, '✓ Init call voltooid, wacht op callback...']);
        
      } catch (initError: any) {
        clearTimeout(initTimeout);
        console.error('Quagga.init() exception:', initError);
        const errorMsg = `Init exception: ${initError.message || initError.toString()}`;
        setDebugLogs(prev => [...prev, `❌ ${errorMsg}`]);
        setErrorMessage('Scanner kon niet worden geïnitialiseerd. Probeer de pagina te vernieuwen.');
        stopScanner();
      }
      }, 300); // Iets langer wachten voor DOM ready
  }

  // Stop barcode scanner
  function stopScanner() {
    if (typeof window !== 'undefined' && (window as any).Quagga) {
      try {
        (window as any).Quagga.stop();
        (window as any).Quagga.offDetected();
      } catch (e) {
        console.error('Error stopping scanner:', e);
      }
    }
    setShowScanner(false);
    setDetectedBarcode(null);
    setCountdown(0);
    setDebugLogs([]);
    
    // Stop eventuele camera streams
    if (typeof window !== 'undefined' && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          stream.getTracks().forEach(track => track.stop());
        })
        .catch(() => {
          // Negeer errors bij het stoppen
        });
    }
  }

  // Handle search button click - zoek online informatie voor ingevulde barcode
  async function handleSearchBarcode() {
    if (!formData.barcode.trim()) {
      return;
    }
    
    const normalizedCode = normalizeBarcode(formData.barcode);
    
    if (!isValidBarcode(normalizedCode)) {
      setLoadError(t.errors.invalidBarcode);
      return;
    }
    
    // Bepaal automatisch het type op basis van de barcode
    const isISBN = normalizedCode.startsWith('978') || 
                   normalizedCode.startsWith('979') || 
                   (normalizedCode.length === 10 && /^[0-9]{9}[0-9X]$/.test(normalizedCode));
    
    // Update formData type voordat we zoeken
    setFormData(prev => ({
      ...prev,
      type: 'book',
      barcode: normalizedCode
    }));
    
    // Wacht even zodat de type update doorwerkt
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Start de lookup
    await lookupBarcode(normalizedCode);
  }

  // Lookup barcode in online databases
  async function lookupBarcode(code: string) {
    setIsLoadingData(true);
    setLoadError(null);

    try {
      // Normaliseer de code eerst
      const normalizedCode = normalizeBarcode(code);
      
      // Valideer nogmaals
      if (!isValidBarcode(normalizedCode)) {
        throw new Error('Ongeldige barcode format');
      }
      
      console.log('Zoeken naar barcode:', normalizedCode, '(lengte:', normalizedCode.length + ')');
      
      // Bepaal of het ISBN (boek) of EAN (muziek) is
      // ISBN-13 begint met 978 of 979, ISBN-10 heeft 10 tekens
      // EAN voor muziek is meestal 13 cijfers maar niet 978/979
      
      const isISBN = normalizedCode.startsWith('978') || 
                     normalizedCode.startsWith('979') || 
                     (normalizedCode.length === 10 && /^[0-9]{9}[0-9X]$/.test(normalizedCode));
      
      if (isISBN) {
        console.log('Gedetecteerd als ISBN (boek), zoeken...');
        // Zoek boek via Open Library API
        await lookupBook(normalizedCode);
      } else {
        console.log('EAN gedetecteerd, probeer als boek te zoeken...');
        // Probeer als boek te zoeken (sommige EAN codes zijn ook boeken)
        await lookupBook(normalizedCode);
      }
    } catch (error) {
      console.error('Error looking up barcode:', error);
      setLoadError(t.errors.bookNotFound);
      setIsLoadingData(false);
    }
  }

  // Lookup boek via Open Library API
  async function lookupBook(isbn: string) {
    try {
      // ISBN is al genormaliseerd, maar zorg dat het formaat correct is voor API
      // Open Library accepteert ISBN-10 en ISBN-13 zonder streepjes
      const cleanISBN = normalizeBarcode(isbn);
      
      console.log('Zoeken naar boek met ISBN:', cleanISBN);
      
      // Probeer Open Library API
      const response = await fetch(`https://openlibrary.org/isbn/${cleanISBN}.json`);
      
      if (!response.ok) {
        throw new Error('Boek niet gevonden');
      }

      const data = await response.json();
      
      // Haal uitgebreide gegevens op
      let title = data.title || '';
      let authors: string[] = [];
      
      if (data.authors && data.authors.length > 0) {
        // Haal auteur details op
        const authorPromises = data.authors.slice(0, 3).map(async (author: any) => {
          if (author.key) {
            try {
              const authorRes = await fetch(`https://openlibrary.org${author.key}.json`);
              if (authorRes.ok) {
                const authorData = await authorRes.json();
                return authorData.name || '';
              }
            } catch (e) {
              console.error('Error fetching author:', e);
            }
          }
          return '';
        });
        
        authors = (await Promise.all(authorPromises)).filter(a => a);
      }
      
      // Vul formulier in
      setFormData(prev => ({
        ...prev,
        type: 'book',
        title: title,
        author: authors.join(', ') || 'Onbekend',
        barcode: cleanISBN
      }));
      
      setIsLoadingData(false);
    } catch (error) {
      console.error('Error looking up book:', error);
      // Probeer Google Books als fallback
      await lookupBookGoogle(isbn);
    }
  }

  // Fallback: Google Books API
  async function lookupBookGoogle(isbn: string) {
    try {
      // ISBN is al genormaliseerd
      const cleanISBN = normalizeBarcode(isbn);
      console.log('Zoeken naar boek met Google Books API, ISBN:', cleanISBN);
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanISBN}`);
      
      if (!response.ok) {
        throw new Error('Boek niet gevonden');
      }

      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        const book = data.items[0].volumeInfo;
        const authors = book.authors ? book.authors.join(', ') : 'Onbekend';
        
        setFormData(prev => ({
          ...prev,
          type: 'book',
          title: book.title || '',
          author: authors,
          barcode: cleanISBN
        }));
        
        setIsLoadingData(false);
      } else {
        throw new Error('Boek niet gevonden');
      }
    } catch (error) {
      console.error('Error looking up book in Google Books:', error);
      setLoadError('Kon geen boek vinden. Controleer de ISBN of vul handmatig in.');
      setIsLoadingData(false);
    }
  }

  // Zoek boeken op basis van titel en/of auteur (Google Books API)
  async function searchBooksByTitleOrAuthor() {
    if (!formData.title.trim() && !formData.author.trim()) {
      setLoadError('Vul minimaal een titel of auteur in om te zoeken.');
      return;
    }

    setIsSearchingBooks(true);
    setLoadError(null);
    setBookSearchResults([]);
    setShowSearchResults(true);

    try {
      // Bouw zoekquery op
      let query = '';
      if (formData.title.trim() && formData.author.trim()) {
        query = `intitle:${encodeURIComponent(formData.title.trim())}+inauthor:${encodeURIComponent(formData.author.trim())}`;
      } else if (formData.title.trim()) {
        query = `intitle:${encodeURIComponent(formData.title.trim())}`;
      } else if (formData.author.trim()) {
        query = `inauthor:${encodeURIComponent(formData.author.trim())}`;
      }

      console.log('Zoeken naar boeken met query:', query);
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&langRestrict=nl`);

      if (!response.ok) {
        throw new Error('Zoeken mislukt');
      }

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const results = data.items.map((item: any) => {
          const volumeInfo = item.volumeInfo;
          return {
            title: volumeInfo.title || 'Onbekend',
            authors: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Onbekend',
            isbn: volumeInfo.industryIdentifiers?.find((id: any) => id.type === 'ISBN_13' || id.type === 'ISBN_10')?.identifier || '',
            publishedDate: volumeInfo.publishedDate || '',
            description: volumeInfo.description || '',
            thumbnail: volumeInfo.imageLinks?.thumbnail || ''
          };
        });
        setBookSearchResults(results);
      } else {
        setLoadError('Geen boeken gevonden. Probeer andere zoektermen of vul handmatig in.');
        setShowSearchResults(false);
      }
    } catch (error) {
      console.error('Error searching books:', error);
      setLoadError(t.errors.searchFailed);
      setShowSearchResults(false);
    } finally {
      setIsSearchingBooks(false);
    }
  }

  // Selecteer een boek uit de zoekresultaten
  function selectBookFromSearch(book: any) {
    setFormData(prev => ({
      ...prev,
      type: 'book',
      title: book.title,
      author: book.authors,
      barcode: book.isbn || prev.barcode
    }));
    setShowSearchResults(false);
    setBookSearchResults([]);
  }

  // Music lookup functies verwijderd - alleen boeken worden ondersteund

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.barcode.includes(searchQuery);
    // Geen filter meer nodig - alleen boeken
    return matchesSearch;
  });

  // Form state
  const [formData, setFormData] = useState({
    type: 'book' as LibraryItem['type'],
    title: '',
    author: '', // Auteur
    barcode: '',
    notes: ''
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title || !formData.author) {
      setErrorMessage(t.errors.fillRequired);
      return;
    }
    
    if (editingItem) {
      // Bewerk bestaand item
      updateItem(editingItem, formData);
      setEditingItem(null);
    } else {
      // Voeg nieuw item toe
      addItem(formData);
    }
    
    setFormData({ type: 'book', title: '', author: '', barcode: '', notes: '' });
    setShowAddForm(false);
  }

  // Update item
  function updateItem(id: string, updatedData: Omit<LibraryItem, 'id' | 'dateAdded'>) {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, ...updatedData }
        : item
    ));
  }

  // Start bewerken van item
  function startEdit(item: LibraryItem) {
    setFormData({
      type: item.type,
      title: item.title,
      author: item.author,
      barcode: item.barcode,
      notes: item.notes || ''
    });
    setEditingItem(item.id);
    setShowAddForm(true);
    // Scroll naar formulier
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Zoek item op Google
  function zoekOpGoogle(item: LibraryItem) {
    const query = `${item.title} ${item.author}`;
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(googleUrl, '_blank');
  }

  const typeIcons: Record<LibraryItem['type'], string> = {
    book: '📚'
  };

  const typeNames: Record<LibraryItem['type'], string> = {
    book: 'Boek'
  };

  // Licentie check overlay verwijderd - web versie is altijd volledig gratis

  // Loading state
  if (hasLicense === null) {
    return (
      <div className="min-h-screen bg-neutral-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <p className="text-senior-lg text-gray-700">Laden...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Load QuaggaJS for barcode scanning */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/quagga/0.12.1/quagga.min.js"
        onLoad={() => setQuaggaLoaded(true)}
      />

      <div className="min-h-screen bg-neutral-cream">
        {/* Demo mode banner */}
        {isDemoMode && (
          <div className="bg-yellow-50 border-b-2 border-yellow-400 py-4">
            <div className="container mx-auto px-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="text-senior-base font-bold text-yellow-900">
                  {language === 'nl' ? 'Demo versie' : 'Demo version'} - {items.length}/10 {language === 'nl' ? 'boeken gebruikt' : 'books used'}
                </p>
                <Link 
                  href="/betalen"
                  className="text-senior-sm text-primary hover:text-primary-dark font-bold underline"
                >
                  {language === 'nl' ? 'Volledige versie eenmalig aanschaffen' : 'Purchase full version one-time'} →
                </Link>
              </div>
            </div>
          </div>
        )}
        
        {/* Error message banner */}
        {(errorMessage || loadError) && (
          <div className="bg-red-50 border-4 border-red-300 rounded-xl p-4 mx-6 mt-6 mb-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">⚠️</div>
              <div className="flex-1">
                <p className="text-senior-base font-bold text-red-800 mb-1">
                  {language === 'nl' ? 'Foutmelding' : 'Error'}
                </p>
                <p className="text-senior-sm text-red-700">
                  {errorMessage || loadError}
                </p>
                <button
                  onClick={() => {
                    setErrorMessage(null);
                    setLoadError(null);
                  }}
                  className="mt-2 text-senior-xs text-red-600 hover:text-red-800 underline"
                  aria-label={language === 'nl' ? 'Sluit foutmelding' : 'Close error'}
                >
                  {t.common.close}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success message banner */}
        {successMessage && (
          <div className="bg-green-50 border-4 border-green-300 rounded-xl p-4 mx-6 mt-6 mb-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">✅</div>
              <div className="flex-1">
                <p className="text-senior-base font-bold text-green-800 mb-1">
                  {language === 'nl' ? 'Succesvol' : 'Success'}
                </p>
                <p className="text-senior-sm text-green-700">
                  {successMessage}
                </p>
                <button
                  onClick={() => setSuccessMessage(null)}
                  className="mt-2 text-senior-xs text-green-600 hover:text-green-800 underline"
                  aria-label={language === 'nl' ? 'Sluit succesmelding' : 'Close success message'}
                >
                  {t.common.close}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Header */}
        <header className="bg-white border-b-2 border-neutral-stone py-6">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <Link 
                  href={language === 'en' ? '/en' : '/'}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-dark text-senior-base"
                >
                  ← {t.common.backToHome}
                </Link>
                <LanguageSwitcher />
              </div>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary mb-3">
                    {t.library.welcomeTitle}
                  </h1>
                  <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
                    {t.library.welcomeSubtitle}
                  </p>
                  <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-4">
                    {t.library.pcFreeText.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < t.library.pcFreeText.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  <div className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-4 mb-4">
                    <p className="text-senior-base md:text-senior-lg text-gray-800 leading-relaxed font-bold text-center">
                      {t.library.reassuranceText.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < t.library.reassuranceText.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                  {/* Actie knoppen */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <a
                      href={language === 'en' ? '/en/bibliotheek' : '/bibliotheek'}
                      onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-block bg-primary text-white px-6 py-3 rounded-xl text-senior-base font-bold text-center
                               hover:bg-primary-dark transition-all cursor-pointer"
                    >
                      {t.library.useLibraryButton}
                    </a>
                    <Link 
                      href={language === 'en' ? '/en/probeer-mijn-bibliotheek' : '/probeer-mijn-bibliotheek'}
                      className="inline-block bg-white text-primary border-2 border-primary px-6 py-3 rounded-xl text-senior-base font-bold text-center
                               hover:bg-primary/10 transition-all"
                    >
                      {t.library.tryMobileButton}
                    </Link>
                  </div>
                </div>
                <Link
                  href="/animaties/bibliotheek"
                  className="bg-accent text-white px-6 py-3 rounded-xl text-senior-base font-bold
                           hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl
                           flex items-center gap-2 whitespace-nowrap"
                >
                  <span>📹</span>
                  <span>{language === 'nl' ? 'Bekijk uitleg' : 'Watch tutorial'}</span>
                </Link>
                {/* Menu Dropdown */}
                <div className="relative" data-menu="options">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    disabled={items.length === 0}
                    className="bg-accent text-white px-8 py-4 rounded-xl text-senior-base font-bold
                             hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <span className="text-2xl">⚙️</span>
                    <span>{language === 'nl' ? 'Opties' : 'Options'}</span>
                    <span className="text-xl">{showMenu ? '▲' : '▼'}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border-2 border-gray-200 z-50 overflow-hidden" data-menu="options">
                      <div className="py-2">
                        <button
                          onClick={exportToCSV}
                          className="w-full text-left px-6 py-4 text-senior-base hover:bg-gray-100 flex items-center gap-3 transition-colors"
                        >
                          <span className="text-2xl">📄</span>
                          <span>{t.options.exportCSV}</span>
                        </button>
                        
                        <button
                          onClick={exportToPDF}
                          className="w-full text-left px-6 py-4 text-senior-base hover:bg-gray-100 flex items-center gap-3 transition-colors"
                        >
                          <span className="text-2xl">📑</span>
                          <span>{t.options.exportPDF}</span>
                        </button>
                        
                        <div className="border-t border-gray-200 my-1"></div>
                        
                        <button
                          onClick={backupMaken}
                          className="w-full text-left px-6 py-4 text-senior-base hover:bg-gray-100 flex items-center gap-3 transition-colors"
                        >
                          <span className="text-2xl">💾</span>
                          <span>{t.options.backup}</span>
                        </button>
                        
                        <button
                          onClick={backupTerugzetten}
                          className="w-full text-left px-6 py-4 text-senior-base hover:bg-gray-100 flex items-center gap-3 transition-colors"
                        >
                          <span className="text-2xl">📥</span>
                          <span>{t.options.restore}</span>
                        </button>
                        
                        <div className="border-t border-gray-200 my-1"></div>
                        
                        {/* Install app button */}
                        {hasLicense === true && deferredPrompt && (
                          <>
                            <button
                              onClick={installeerApp}
                              disabled={!deferredPrompt}
                              className="w-full text-left px-6 py-4 text-senior-base hover:bg-green-50 text-green-700 flex items-center gap-3 transition-colors border-l-4 border-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <span className="text-2xl">📲</span>
                              <span>
                                {t.options.install}
                              </span>
                            </button>
                            <div className="border-t border-gray-200 my-1"></div>
                          </>
                        )}
                        
                        <button
                          onClick={delenWhatsApp}
                          className="w-full text-left px-6 py-4 text-senior-base hover:bg-gray-100 flex items-center gap-3 transition-colors"
                        >
                          <span className="text-2xl">📱</span>
                          <span>{t.options.shareWhatsApp}</span>
                        </button>
                        
                        <button
                          onClick={delenViaEmail}
                          className="w-full text-left px-6 py-4 text-senior-base hover:bg-gray-100 flex items-center gap-3 transition-colors"
                        >
                          <span className="text-2xl">📧</span>
                          <span>{t.options.shareEmail}</span>
                        </button>
                        
                        <button
                          onClick={toonStatistieken}
                          className="w-full text-left px-6 py-4 text-senior-base hover:bg-gray-100 flex items-center gap-3 transition-colors"
                        >
                          <span className="text-2xl">📊</span>
                          <span>{t.options.statistics}</span>
                        </button>
                        
                        <div className="border-t border-gray-200 my-1"></div>
                        
                        <button
                          onClick={toonPrivacybeleid}
                          className="w-full text-left px-6 py-4 text-senior-base hover:bg-gray-100 flex items-center gap-3 transition-colors"
                        >
                          <span className="text-2xl">🔒</span>
                          <span>{t.options.privacy}</span>
                        </button>
                        
                        <div className="border-t border-gray-200 my-1"></div>
                        
                        <button
                          onClick={wisAlleData}
                          className="w-full text-left px-6 py-4 text-senior-base hover:bg-red-50 text-red-600 flex items-center gap-3 transition-colors"
                        >
                          <span className="text-2xl">🗑️</span>
                          <span>{t.options.deleteAll}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-senior-base font-bold text-gray-700 mb-2">
                      {t.common.search}:
                    </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={language === 'nl' ? 'Zoek op titel, auteur of barcode...' : 'Search by title, author or barcode...'}
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg text-senior-base
                               focus:border-primary focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2
                                 text-gray-500 hover:text-gray-700 text-2xl font-bold
                                 w-8 h-8 flex items-center justify-center rounded-full
                                 hover:bg-gray-100 transition-colors"
                        aria-label={language === 'nl' ? 'Wis zoekopdracht' : 'Clear search'}
                      >
                        ✗
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  {/* Filter verwijderd - alleen boeken beschikbaar */}
                </div>
              </div>
            </div>


            {/* Action Buttons - EXTRA GROOT VOOR SENIOREN */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setEditingItem(null);
                  setFormData({ type: 'book', title: '', author: '', barcode: '', notes: '' });
                  setShowAddForm(!showAddForm);
                }}
                className="bg-primary text-white px-10 py-6 rounded-xl text-senior-lg font-bold
                         hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl
                         flex items-center justify-center gap-3 min-h-[70px]"
              >
                <span className="text-3xl">➕</span>
                <span>{t.library.addItemButton}</span>
              </button>
              <button
                onClick={() => {
                  startScanner();
                }}
                disabled={!quaggaLoaded}
                className="bg-secondary text-white px-10 py-6 rounded-xl text-senior-lg font-bold
                         hover:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all shadow-lg hover:shadow-xl
                         flex items-center justify-center gap-3 min-h-[70px]"
              >
                <span className="text-3xl">📷</span>
                <span>{t.library.scanBarcodeButton}</span>
              </button>
            </div>
            
            {/* Kleine tekst onder de knoppen */}
            <p className="text-senior-sm text-gray-600 text-center mt-3">
              {t.library.startWithBook.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < t.library.startWithBook.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>

            {/* Add Form */}
            {showAddForm && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-senior-xl font-bold text-primary mb-6">
                  {editingItem ? t.common.edit + ' ' + (language === 'nl' ? 'item' : 'item') : (language === 'nl' ? 'Nieuw item toevoegen' : 'Add new item')}
                </h2>
                
                {/* Countdown timer - toont 4 seconden aftelling */}
                {countdown > 0 && (
                  <div className="mb-6 p-6 bg-blue-50 rounded-xl border-2 border-blue-300">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl animate-pulse">⏱️</div>
                      <div>
                        <p className="text-senior-base font-bold text-blue-900">
                          {language === 'nl' 
                            ? `Barcode gedetecteerd! Zoeken start over ${countdown} seconde${countdown !== 1 ? 'n' : ''}...`
                            : `Barcode detected! Search starts in ${countdown} second${countdown !== 1 ? 's' : ''}...`}
                        </p>
                        <p className="text-senior-sm text-blue-700 mt-1">
                          U kunt nu de camera goed richten. De informatie wordt automatisch opgehaald.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Loading indicator - tijdens het zoeken */}
                {isLoadingData && (
                  <div className="mb-6 p-6 bg-primary/10 rounded-xl border-2 border-primary">
                    <div className="flex items-center gap-4">
                      <div className="animate-spin text-4xl">⏳</div>
                      <div>
                        <p className="text-senior-base font-bold text-primary">
                          {language === 'nl' ? 'Gegevens ophalen...' : 'Fetching data...'}
                        </p>
                        <p className="text-senior-sm text-gray-600 mt-1">
                          {language === 'nl' ? 'Zoeken in online database...' : 'Searching online database...'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Error message */}
                {loadError && (
                  <div className="mb-6 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-300">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">⚠️</span>
                      <div>
                        <p className="text-senior-base font-bold text-yellow-800">
                          {loadError}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Type selectie verwijderd - alleen boeken beschikbaar */}

                  <div>
                    <label className="block text-senior-base font-bold text-gray-700 mb-2">
                      {language === 'nl' ? 'Titel' : 'Title'}: *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => {
                          setFormData({ ...formData, title: e.target.value });
                          setShowSearchResults(false); // Sluit resultaten bij wijziging
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && formData?.type === 'book' && (formData.title.trim() || formData.author.trim())) {
                            e.preventDefault();
                            searchBooksByTitleOrAuthor();
                          }
                        }}
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-base
                                 focus:border-primary focus:outline-none"
                        placeholder={language === 'nl' ? 'Titel van het item' : 'Title of the item'}
                      />
                      {formData?.type === 'book' && (formData.title.trim() || formData.author.trim()) && (
                        <button
                          type="button"
                          onClick={searchBooksByTitleOrAuthor}
                          disabled={isSearchingBooks}
                          className="bg-primary text-white px-6 py-3 rounded-lg text-senior-base font-bold
                                   hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl
                                   disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                          {isSearchingBooks ? '⏳' : `🔍 ${t.common.search}`}
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-senior-base font-bold text-gray-700 mb-2">
                      {language === 'nl' ? 'Auteur' : 'Author'}: *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.author}
                      onChange={(e) => {
                        setFormData({ ...formData, author: e.target.value });
                        setShowSearchResults(false); // Sluit resultaten bij wijziging
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && formData?.type === 'book' && (formData.title.trim() || formData.author.trim())) {
                          e.preventDefault();
                          searchBooksByTitleOrAuthor();
                        }
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-base
                               focus:border-primary focus:outline-none"
                      placeholder={language === 'nl' ? 'Naam van de auteur' : 'Name of the author'}
                    />
                  </div>

                  {/* Zoekresultaten voor boeken */}
                  {formData?.type === 'book' && showSearchResults && bookSearchResults.length > 0 && (
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mb-4 max-h-96 overflow-y-auto">
                      <p className="text-senior-base font-bold text-blue-900 mb-3">
                        📚 {bookSearchResults.length} boek{bookSearchResults.length !== 1 ? 'en' : ''} gevonden:
                      </p>
                      <div className="space-y-2">
                        {bookSearchResults.map((book, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => selectBookFromSearch(book)}
                            className="w-full text-left bg-white hover:bg-blue-100 border-2 border-blue-200 rounded-lg p-4 transition-all"
                          >
                            <div className="flex gap-3">
                              {book.thumbnail && (
                                <img 
                                  src={book.thumbnail} 
                                  alt={book.title}
                                  className="w-16 h-24 object-cover rounded flex-shrink-0"
                                />
                              )}
                              <div className="flex-1">
                                <p className="text-senior-base font-bold text-gray-900 mb-1">
                                  {book.title}
                                </p>
                                <p className="text-senior-sm text-gray-700 mb-1">
                                  Door: {book.authors}
                                </p>
                                {book.isbn && (
                                  <p className="text-senior-xs text-gray-500">
                                    ISBN: {book.isbn}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center text-primary text-2xl">
                                →
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setShowSearchResults(false);
                          setBookSearchResults([]);
                        }}
                        className="mt-3 text-senior-sm text-blue-700 hover:text-blue-900 underline"
                      >
                        Sluit resultaten
                      </button>
                    </div>
                  )}

                  <div>
                    <label className="block text-senior-base font-bold text-gray-700 mb-2">
                      {language === 'nl' ? 'Barcode' : 'Barcode'}:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.barcode}
                        onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && formData.barcode.trim() && isValidBarcode(formData.barcode)) {
                            e.preventDefault();
                            handleSearchBarcode();
                          }
                        }}
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-base
                                 focus:border-primary focus:outline-none"
                        placeholder={language === 'nl' ? 'ISBN of EAN code' : 'ISBN or EAN code'}
                      />
                      <button
                        type="button"
                        onClick={handleSearchBarcode}
                        disabled={!formData.barcode.trim() || !isValidBarcode(formData.barcode) || isLoadingData}
                        className="bg-secondary text-white px-6 py-3 rounded-lg text-senior-base font-bold
                                 hover:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-all shadow-lg hover:shadow-xl whitespace-nowrap
                                 flex items-center justify-center gap-2"
                        title={language === 'nl' ? 'Zoek informatie online op' : 'Search information online'}
                      >
                        <span className="text-xl">🔍</span>
                        <span className="hidden sm:inline">Zoeken</span>
                      </button>
                    </div>
                    {formData.barcode.trim() && !isValidBarcode(formData.barcode) && (
                      <p className="mt-2 text-senior-sm text-red-600">
                        ⚠️ Voer een geldige ISBN of EAN code in (minimaal 10 cijfers)
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-senior-base font-bold text-gray-700 mb-2">
                      {language === 'nl' ? 'Notities' : 'Notes'}:
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-base
                               focus:border-primary focus:outline-none"
                      placeholder={language === 'nl' ? 'Optionele notities...' : 'Optional notes...'}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      className="bg-primary text-white px-10 py-5 rounded-xl text-senior-lg font-bold
                               hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl
                               flex items-center justify-center gap-3 min-h-[70px]"
                    >
                      <span className="text-2xl">✓</span>
                      <span>{editingItem ? (language === 'nl' ? 'Bijwerken' : 'Update') : t.common.save}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingItem(null);
                        setFormData({ type: 'book', title: '', author: '', barcode: '', notes: '' });
                      }}
                      className="bg-gray-500 text-white px-10 py-5 rounded-xl text-senior-lg font-bold
                               hover:bg-gray-600 transition-all shadow-lg hover:shadow-xl
                               flex items-center justify-center gap-3 min-h-[70px]"
                    >
                      <span className="text-2xl">✗</span>
                      <span>{t.common.cancel}</span>
                    </button>
                  </div>
                </form>
                
                {/* Tip onder het formulier */}
                <div className="mt-6 bg-neutral-cream border-2 border-primary/30 rounded-xl p-4">
                  <p className="text-senior-sm md:text-senior-base text-gray-700 leading-relaxed text-center">
                    {t.library.formTip.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < t.library.formTip.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            )}

            {/* Scanner Overlay */}
            {showScanner && (
              <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-4">
                {/* Waarschuwing banner */}
                <div className="mb-4 bg-yellow-100 border-2 border-yellow-300 rounded-xl p-3 sm:p-4 shadow-lg max-w-2xl w-full">
                  <div className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl">💡</span>
                    <p className="text-sm sm:text-senior-base font-bold text-yellow-900">
                      Tip: Barcode scanner werkt het beste op telefoon of tablet
                    </p>
                  </div>
                </div>
                
                {/* Scanner Container met Overlay */}
                <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center px-4 sm:px-2">
                  <div id="scanner-container" className="w-full aspect-video bg-black rounded-lg overflow-hidden relative max-w-full min-h-[400px] sm:min-h-[500px]" />
                  
                  {/* Scanner Kader Overlay - perfect gecentreerd en binnen scherm */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Buitenste overlay (donker) */}
                    <div className="absolute inset-0 bg-black bg-opacity-60">
                      {/* Transparant venster in het midden - groter gemaakt voor betere scanning */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                    w-[90%] max-w-[400px] h-[70%] max-h-[400px]
                                    sm:w-[80%] sm:max-w-[500px] sm:h-[75%] sm:max-h-[500px]
                                    border-4 border-white rounded-lg shadow-2xl">
                        {/* Hoek decoraties */}
                        <div className="absolute -top-2 -left-2 w-5 h-5 sm:w-8 sm:h-8 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                        <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-8 sm:h-8 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                        <div className="absolute -bottom-2 -left-2 w-5 h-5 sm:w-8 sm:h-8 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                        <div className="absolute -bottom-2 -right-2 w-5 h-5 sm:w-8 sm:h-8 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Instructie tekst - onder het scanner kader */}
                <div className="mt-4 text-center max-w-2xl">
                  <p className="text-white text-base sm:text-senior-lg font-bold mb-2 drop-shadow-lg">
                    Houd de barcode in het kader
                  </p>
                  <p className="text-white text-sm sm:text-senior-base drop-shadow-lg mb-3">
                    Zorg dat de barcode helemaal zichtbaar is en goed verlicht
                  </p>
                  
                  {/* Debug panel - toon laatste detecties */}
                  <div className="mt-3 bg-black bg-opacity-50 rounded-lg p-3 max-h-32 overflow-y-auto">
                    <p className="text-white text-xs font-bold mb-1">Status:</p>
                    <div className="text-left space-y-0.5">
                      {debugLogs.slice(-5).map((log, idx) => (
                        <p key={idx} className="text-white text-xs font-mono break-all">
                          {log}
                        </p>
                      ))}
                      {debugLogs.length === 0 && (
                        <p className="text-white text-xs font-mono text-gray-400">
                          Wacht op barcode...
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Sluit knop - rechtsboven */}
                <button
                  onClick={stopScanner}
                  className="absolute top-4 sm:top-8 right-4 sm:right-8 bg-white border-4 border-red-600 rounded-full
                           w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center hover:bg-red-50 
                           transition-all shadow-xl hover:shadow-2xl z-10"
                  aria-label={t.common.close}
                >
                  <span className="text-2xl sm:text-3xl text-red-600 font-bold">✗</span>
                </button>
              </div>
            )}

            {/* Items List */}
            <div className="space-y-4">
              {/* Geruststellende tekst wanneer er nog geen boeken zijn */}
              {items.length === 0 && !showAddForm && (
                <div className="bg-neutral-cream border-2 border-primary/30 rounded-xl p-6 mb-4">
                  <p className="text-senior-base md:text-senior-lg text-gray-800 leading-relaxed text-center">
                    <span className="font-bold">{t.library.noBooksYet}</span><br />
                    {t.library.noBooksText.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < t.library.noBooksText.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              )}
              
              {/* Succesmelding na het eerste boek */}
              {items.length === 1 && !showAddForm && (
                <>
                  <div className="bg-green-50 border-4 border-green-400 rounded-xl p-6 mb-4">
                    <div className="text-center">
                      <div className="text-5xl mb-3">😊</div>
                      <h3 className="text-senior-xl md:text-senior-2xl font-bold text-green-800 mb-3">
                        {t.library.firstBookSuccess}
                      </h3>
                      <p className="text-senior-base md:text-senior-lg text-gray-800 leading-relaxed">
                        {t.library.firstBookMessage.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < t.library.firstBookMessage.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                  
                  {/* Zachte volgende stap (optioneel) */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-4">
                    <div className="text-center">
                      <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed">
                        {t.library.firstBookNext.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < t.library.firstBookNext.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                      <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-2">
                        {t.library.firstBookOptions.split('\n').slice(0, 1).join('')}
                      </p>
                      <ul className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed mb-3 space-y-1">
                        {t.library.firstBookOptions.split('\n').slice(1, 3).map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                      <p className="text-senior-base md:text-senior-lg text-gray-600 leading-relaxed">
                        {t.library.firstBookOptions.split('\n').slice(3).join(' ')}
                      </p>
                    </div>
                  </div>
                  
                  {/* Feedback formulier */}
                  {!feedbackGiven && (
                    <div className="bg-white border-2 border-primary/30 rounded-xl p-6 mb-4">
                      <div className="text-center space-y-4">
                        <p className="text-senior-base md:text-senior-lg text-gray-800 leading-relaxed font-bold">
                          {t.feedback.question}
                        </p>
                        <p className="text-senior-base md:text-senior-lg text-gray-700 leading-relaxed">
                          {t.feedback.questionText}
                        </p>
                        <p className="text-senior-sm md:text-senior-base text-gray-600 leading-relaxed">
                          {t.feedback.explanation.split('\n').map((line, i) => (
                            <span key={i}>
                              {line}
                              {i < t.feedback.explanation.split('\n').length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                        <p className="text-senior-xs md:text-senior-sm text-gray-500 leading-relaxed">
                          {t.feedback.threeWords}
                        </p>
                        
                        {/* Radio buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="feedback"
                              value="clear"
                              checked={feedbackValue === 'clear'}
                              onChange={(e) => setFeedbackValue(e.target.value)}
                              className="w-5 h-5 text-primary focus:ring-primary"
                            />
                            <span className="text-senior-base text-gray-700">{t.feedback.clear}</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="feedback"
                              value="calm"
                              checked={feedbackValue === 'calm'}
                              onChange={(e) => setFeedbackValue(e.target.value)}
                              className="w-5 h-5 text-primary focus:ring-primary"
                            />
                            <span className="text-senior-base text-gray-700">{t.feedback.calm}</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="feedback"
                              value="getting-used-to"
                              checked={feedbackValue === 'getting-used-to'}
                              onChange={(e) => setFeedbackValue(e.target.value)}
                              className="w-5 h-5 text-primary focus:ring-primary"
                            />
                            <span className="text-senior-base text-gray-700">{t.feedback.gettingUsedTo}</span>
                          </label>
                        </div>
                        
                        {/* Optionele verzend knop (alleen wanneer een keuze is gemaakt) */}
                        {feedbackValue && (
                          <button
                            onClick={async () => {
                              // Stuur feedback (optioneel - kan later naar API)
                              console.log('Feedback:', feedbackValue);
                              // Markeer als gegeven
                              setFeedbackGiven(true);
                              // Optioneel: sla op in localStorage om niet opnieuw te tonen
                              try {
                                const feedbackKey = getStorageKey('seniorease-first-book-feedback', language);
                                localStorage.setItem(feedbackKey, 'true');
                              } catch (e) {
                                // Ignore
                              }
                            }}
                            className="mt-4 text-senior-sm text-primary hover:text-primary-dark underline"
                          >
                            {t.feedback.sendOptional}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
              
              {filteredItems.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-senior-xl font-bold text-gray-700 mb-2">
                    {items.length === 0 ? (language === 'nl' ? 'Geen items' : 'No items') : (language === 'nl' ? 'Geen resultaten' : 'No results')}
                  </h3>
                  <p className="text-senior-base text-gray-600">
                    {items.length === 0 
                      ? (language === 'nl' ? 'Voeg uw eerste item toe om te beginnen!' : 'Add your first item to get started!')
                      : (language === 'nl' ? 'Probeer een andere zoekterm of filter.' : 'Try a different search term or filter.')}
                  </p>
                </div>
              ) : (
                filteredItems.map(item => (
                  <div key={item.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        <div className="text-5xl">{typeIcons[item.type]}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-senior-lg font-bold text-gray-800">
                              {item.title}
                            </h3>
                            <span className="text-senior-sm text-gray-500">
                              {typeNames[item.type]}
                            </span>
                          </div>
                          <p className="text-senior-base text-gray-600 mb-2">
                            <strong>Auteur:</strong> {item.author}
                          </p>
                          {item.barcode && (
                            <p className="text-senior-sm text-gray-500 mb-2">
                              <strong>Barcode:</strong> {item.barcode}
                            </p>
                          )}
                          {item.notes && (
                            <p className="text-senior-sm text-gray-600 italic">
                              {item.notes}
                            </p>
                          )}
                          <p className="text-senior-xs text-gray-400 mt-2">
                            Toegevoegd: {new Date(item.dateAdded).toLocaleDateString('nl-NL')}
                          </p>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col gap-2">
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="text-red-600 hover:text-red-800 text-senior-xl font-bold transition-colors"
                          title="Verwijderen"
                        >
                          🗑️
                        </button>
                        <button
                          onClick={() => startEdit(item)}
                          className="text-blue-600 hover:text-blue-800 text-senior-xl font-bold transition-colors"
                          title="Bewerken"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => zoekOpGoogle(item)}
                          className="text-green-600 hover:text-green-800 text-senior-xl font-bold transition-colors"
                          title="Zoeken op Google"
                        >
                          🔍
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
              
              {/* Extra geruststelling onderaan (alleen wanneer er items zijn) */}
              {items.length > 0 && !showAddForm && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-senior-xs md:text-senior-sm text-gray-500 text-center leading-relaxed">
                    <span className="font-bold">{language === 'nl' ? 'Tip:' : 'Tip:'}</span> {t.library.tipBottom.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < t.library.tipBottom.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

      </div>
    </>
  );
}


