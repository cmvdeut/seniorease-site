'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';

interface LibraryItem {
  id: string;
  type: 'book' | 'music'; // Alleen boeken en muziek
  title: string;
  author: string; // Auteur voor boeken, artiest voor muziek
  barcode: string;
  dateAdded: string;
  notes?: string;
}

export default function BibliotheekPage() {
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
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

  // Check licentie (alleen voor mobiele apparaten)
  useEffect(() => {
    // Check of het een mobiel apparaat is
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                     (window.innerWidth <= 768 && window.innerHeight <= 1024);
    
    if (!isMobile) {
      // Desktop: altijd toegang
      setHasLicense(true);
      return;
    }

    // Mobiel: check licentie
    const licentie = localStorage.getItem('seniorease-licentie');
    if (licentie) {
      try {
        const licentieData = JSON.parse(licentie);
        if (licentieData.valid) {
          setHasLicense(true);
          return;
        }
      } catch (e) {
        console.error('Error checking license:', e);
      }
    }
    setHasLicense(false);
  }, []);

  // Blokkeer PWA install prompt totdat er een licentie is
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // ALTIJD voorkomen dat de browser prompt automatisch toont
      e.preventDefault();
      
      // Alleen de prompt opslaan als er een licentie is
      if (hasLicense === true) {
        setDeferredPrompt(e);
      } else {
        // Zonder licentie: prompt weggooien en niet tonen
        setDeferredPrompt(null);
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
    if (!hasLicense) return;
    
    const saved = localStorage.getItem('seniorease-library');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading library:', e);
      }
    }
  }, [hasLicense]);

  // Save items to localStorage
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('seniorease-library', JSON.stringify(items));
    }
  }, [items]);

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
    const newItem: LibraryItem = {
      ...item,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString()
    };
    setItems([newItem, ...items]);
    setShowAddForm(false);
  }

  // Delete item
  function deleteItem(id: string) {
    if (confirm('Weet u zeker dat u dit item wilt verwijderen?')) {
      setItems(items.filter(item => item.id !== id));
    }
  }

  // Export to CSV
  function exportToCSV() {
    const headers = ['Type', 'Titel', 'Auteur/Artiest', 'Barcode', 'Datum toegevoegd', 'Notities'];
    const rows = filteredItems.map(item => [
      typeNames[item.type], // Gebruik leesbare naam (Boek of Album/CD)
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
        alert('Backup succesvol opgeslagen!');
      } else {
        // Fallback voor browsers zonder File System Access API
        // Gebruik standaard download (browser vraagt meestal wel om locatie)
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
        setShowMenu(false);
        alert('Backup wordt gedownload. U kunt in uw browser kiezen waar u deze wilt opslaan.');
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
          if (backup.items && Array.isArray(backup.items)) {
            if (confirm(`Weet u zeker dat u de backup van ${new Date(backup.date).toLocaleDateString('nl-NL')} wilt terugzetten? Dit overschrijft alle huidige data.`)) {
              setItems(backup.items);
              alert('Backup succesvol teruggezet!');
            }
          } else {
            alert('Ongeldig backup bestand.');
          }
        } catch (error) {
          alert('Fout bij het lezen van het backup bestand.');
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
    const boeken = items.filter(i => i.type === 'book').length;
    const muziek = items.filter(i => i.type === 'music').length;
    
    const tekst = `Mijn SeniorEase Bibliotheek\n\n📚 Totaal: ${total} items\n📖 Boeken: ${boeken}\n💿 Albums/CD's: ${muziek}\n\nBekijk mijn collectie op seniorease.nl`;
    const url = `https://wa.me/?text=${encodeURIComponent(tekst)}`;
    window.open(url, '_blank');
    setShowMenu(false);
  }

  // Toon statistieken
  function toonStatistieken() {
    const total = items.length;
    const boeken = items.filter(i => i.type === 'book').length;
    const muziek = items.filter(i => i.type === 'music').length;
    
    const statistieken = `
📊 Mijn Bibliotheek Statistieken

📚 Totaal aantal items: ${total}
📖 Boeken: ${boeken}
💿 Albums/CD's: ${muziek}

${total > 0 ? `\nLaatste toevoeging: ${new Date(Math.max(...items.map(i => new Date(i.dateAdded).getTime()))).toLocaleDateString('nl-NL')}` : ''}
    `.trim();
    
    alert(statistieken);
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
• Wis uw data wanneer u de app niet meer gebruikt

Voor vragen: bezoek seniorease.nl
    `.trim();
    
    alert(privacyTekst);
    setShowMenu(false);
  }

  // Installeer app (alleen met licentie)
  async function installeerApp() {
    if (!deferredPrompt) {
      alert('De installatie optie is niet beschikbaar. U kunt de app installeren via het menu van uw browser (meestal drie puntjes of hamburger menu).');
      setShowMenu(false);
      return;
    }

    try {
      // Toon de install prompt
      deferredPrompt.prompt();

      // Wacht op gebruiker response
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        alert('De app wordt geïnstalleerd. Bedankt!');
        setDeferredPrompt(null);
      } else {
        // Gebruiker heeft geannuleerd
      }

      setDeferredPrompt(null);
      setShowMenu(false);
    } catch (error) {
      console.error('Error installing app:', error);
      alert('Er ging iets mis bij de installatie. Probeer het opnieuw of installeer via het browser menu.');
      setShowMenu(false);
    }
  }

  // Alle data wissen
  function wisAlleData() {
    if (confirm('WAARSCHUWING: Weet u zeker dat u alle data wilt wissen? Dit kan niet ongedaan worden gemaakt!\n\nGebruik eerst "Backup maken" om uw data te bewaren.')) {
      if (confirm('Laatste bevestiging: alle data wordt nu permanent verwijderd.')) {
        setItems([]);
        localStorage.removeItem('seniorease-library');
        setSearchQuery('');
        setFilterType('all');
        alert('Alle data is gewist.');
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
      alert('Scanner bibliotheek wordt nog geladen. Wacht even en probeer het opnieuw.');
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
        alert('Scanner bibliotheek wordt nog geladen. Wacht even en probeer het opnieuw.');
        stopScanner();
        return;
      }
      
      setDebugLogs(prev => [...prev, '✓ Quagga bibliotheek geladen']);
      
      const container = document.querySelector('#scanner-container');
      
      if (!container) {
        const errorMsg = 'Scanner container niet gevonden';
        setDebugLogs(prev => [...prev, `❌ ${errorMsg}`]);
        alert('Scanner container niet gevonden. Probeer de pagina te vernieuwen.');
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
      
      // Test of camera beschikbaar is en permissie gegeven kan worden
      try {
        const testStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        // Stop test stream onmiddellijk
        testStream.getTracks().forEach(track => track.stop());
        setDebugLogs(prev => [...prev, '✓ Camera beschikbaar en toegestaan']);
      } catch (permError: any) {
        const errorMsg = permError.message || 'Camera permissie geweigerd';
        setDebugLogs(prev => [...prev, `❌ Camera fout: ${errorMsg}`]);
        alert(`Camera permissie nodig: ${errorMsg}. Controleer de instellingen van uw browser.`);
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
        const initConfig: any = {
          inputStream: {
            type: "LiveStream",
            target: container,
            constraints: {
              facingMode: "environment"
            }
          },
          locator: {
            patchSize: "medium",
            halfSample: false
          },
          numOfWorkers: 0, // Geen workers voor betere compatibiliteit
          frequency: 10,
          decoder: {
            readers: [
              "ean_reader",
              "ean_8_reader",
              "upc_reader",
              "upc_e_reader"
            ]
          },
          locate: true
        };
        
        setDebugLogs(prev => [...prev, `Config: ${JSON.stringify(initConfig).substring(0, 100)}...`]);
        
        Quagga.init(initConfig, function(err: any) {
        // Clear timeout omdat callback is aangeroepen
        clearTimeout(initTimeout);
        
        if (err) {
          console.error('Quagga init error:', err);
          const errorMsg = `Fout: ${err.message || err.toString() || 'Camera niet beschikbaar'}`;
          setDebugLogs(prev => [...prev, `❌ Init fout: ${errorMsg}`]);
          alert('Camera kon niet worden gestart. Controleer de permissies en zorg dat de camera beschikbaar is.');
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
        alert('Scanner kon niet worden geïnitialiseerd. Probeer de pagina te vernieuwen.');
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
      setLoadError('Ongeldige barcode format. Voer een geldige ISBN of EAN code in.');
      return;
    }
    
    // Bepaal automatisch het type op basis van de barcode
    const isISBN = normalizedCode.startsWith('978') || 
                   normalizedCode.startsWith('979') || 
                   (normalizedCode.length === 10 && /^[0-9]{9}[0-9X]$/.test(normalizedCode));
    
    // Update formData type voordat we zoeken
    setFormData(prev => ({
      ...prev,
      type: isISBN ? 'book' : 'music',
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
        console.log('Gedetecteerd als EAN (muziek), zoeken...');
        // Zoek muziek via MusicBrainz API (met Discogs fallback)
        await lookupMusic(normalizedCode);
      }
    } catch (error) {
      console.error('Error looking up barcode:', error);
      setLoadError('Kon geen gegevens vinden voor deze barcode. U kunt handmatig invullen.');
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

  // Lookup muziek via MusicBrainz API (hoofd API)
  async function lookupMusic(ean: string) {
    try {
      // EAN is al genormaliseerd
      const cleanEAN = normalizeBarcode(ean);
      console.log('Zoeken naar muziek met EAN:', cleanEAN);
      
      // Valideer EAN lengte voor muziek (meestal 13 cijfers, soms 8)
      if (cleanEAN.length !== 13 && cleanEAN.length !== 8 && cleanEAN.length !== 12) {
        console.warn('Ongeldige EAN lengte voor muziek:', cleanEAN.length);
        // Toch proberen, sommige codes kunnen afwijken
      }
      
      // MusicBrainz API vereist een User-Agent header
      // Gebruik includes om meer data te krijgen (artists, labels)
      const response = await fetch(
        `https://musicbrainz.org/ws/2/release?query=barcode:${cleanEAN}&fmt=json&limit=5`,
        {
          headers: {
            'User-Agent': 'SeniorEase/1.0 (https://seniorease.nl)',
            'Accept': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        console.warn('MusicBrainz API error:', response.status, response.statusText);
        throw new Error('MusicBrainz API error');
      }

      const data = await response.json();
      console.log('MusicBrainz response:', data);
      
      if (data.releases && data.releases.length > 0) {
        // Zoek de beste match (exacte barcode match heeft voorkeur)
        let release = data.releases.find((r: any) => 
          r.barcode === cleanEAN || r.barcode === ean
        ) || data.releases[0];
        
        console.log('Gevonden release:', release.title, 'door', release['artist-credit']);
        
        // Haal artiesten op (verbeterde extractie)
        let artist = 'Onbekend';
        if (release['artist-credit'] && release['artist-credit'].length > 0) {
          artist = release['artist-credit']
            .map((credit: any) => {
              // Probeer verschillende manieren om de naam te krijgen
              if (credit.name) return credit.name;
              if (credit.artist && credit.artist.name) return credit.artist.name;
              if (typeof credit === 'string') return credit;
              return '';
            })
            .filter((name: string) => name && name.trim())
            .join(', ');
        }
        
        // Haal label op (optioneel, voor notities)
        let label = '';
        if (release['label-info'] && release['label-info'].length > 0) {
          const labels = release['label-info']
            .map((li: any) => li.label?.name || '')
            .filter((name: string) => name);
          if (labels.length > 0) {
            label = labels[0];
          }
        }
        
        // Vul formulier in
        setFormData(prev => ({
          ...prev,
          type: 'music',
          title: release.title || '',
          author: artist || 'Onbekend',
          barcode: cleanEAN,
          notes: label ? `Label: ${label}` : '' // Voeg label toe aan notities indien beschikbaar
        }));
        
        setIsLoadingData(false);
        return; // Succes!
      } else {
        console.log('Geen releases gevonden in MusicBrainz, probeer fallback...');
        throw new Error('Geen releases gevonden');
      }
    } catch (error) {
      console.error('Error looking up music in MusicBrainz:', error);
      // Probeer fallback naar Discogs
      await lookupMusicDiscogs(ean);
    }
  }

  // Fallback: Discogs API voor muziek
  async function lookupMusicDiscogs(ean: string) {
    try {
      const cleanEAN = normalizeBarcode(ean);
      console.log('Zoeken naar muziek met Discogs API, EAN:', cleanEAN);
      
      // Discogs API (gratis, geen API key nodig voor basis queries)
      // Gebruik de database search endpoint
      const response = await fetch(
        `https://api.discogs.com/database/search?barcode=${cleanEAN}&type=release&per_page=5`,
        {
          headers: {
            'User-Agent': 'SeniorEase/1.0 (https://seniorease.nl)',
            'Accept': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        console.warn('Discogs API error:', response.status);
        throw new Error('Discogs API error');
      }

      const data = await response.json();
      console.log('Discogs response:', data);
      
      if (data.results && data.results.length > 0) {
        const release = data.results[0];
        
        // Discogs geeft title en artist direct
        const title = release.title || '';
        const artist = release.artist || 'Onbekend';
        
        console.log('Gevonden via Discogs:', title, 'door', artist);
        
        setFormData(prev => ({
          ...prev,
          type: 'music',
          title: title,
          author: artist,
          barcode: cleanEAN
        }));
        
        setIsLoadingData(false);
        return; // Succes!
      } else {
        throw new Error('Geen resultaten gevonden');
      }
    } catch (error) {
      console.error('Error looking up music in Discogs:', error);
      // Als beide APIs falen, toon foutmelding
      setLoadError('Kon geen album vinden voor deze EAN code. U kunt handmatig invullen.');
      setIsLoadingData(false);
    }
  }

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.barcode.includes(searchQuery);
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Form state
  const [formData, setFormData] = useState({
    type: 'book' as LibraryItem['type'],
    title: '',
    author: '', // Auteur (boeken) of artiest (muziek)
    barcode: '',
    notes: ''
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title || !formData.author) {
      alert('Vul minimaal een titel en auteur/artiest in');
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
    let query = '';
    if (item.type === 'book') {
      query = `${item.title} ${item.author}`;
    } else {
      query = `${item.title} ${item.author} album`;
    }
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(googleUrl, '_blank');
  }

  const typeIcons: Record<LibraryItem['type'], string> = {
    book: '📚',
    music: '💿'
  };

  const typeNames: Record<LibraryItem['type'], string> = {
    book: 'Boek',
    music: 'Album/CD'
  };

  // Licentie check overlay
  if (hasLicense === false) {
    return (
      <div className="min-h-screen bg-neutral-cream flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border-4 border-primary p-8 md:p-12">
          <div className="text-center">
            <div className="text-6xl mb-6">🔒</div>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary mb-4">
              Mobiele versie vereist
            </h1>
            <p className="text-senior-lg text-gray-700 mb-6">
              Om de bibliotheek app te gebruiken op uw telefoon of tablet, heeft u een licentie nodig.
            </p>
            
            <div className="bg-neutral-cream rounded-xl p-6 mb-6 border-2 border-gray-200">
              <p className="text-senior-base font-bold text-gray-800 mb-2">
                Wat krijgt u?
              </p>
              <ul className="text-left text-senior-sm text-gray-700 space-y-2">
                <li>✓ Volledige bibliotheek app</li>
                <li>✓ Barcode scanner</li>
                <li>✓ Offline werken</li>
                <li>✓ Levenslange licentie</li>
              </ul>
            </div>

            <div className="space-y-4">
              <Link
                href="/betalen"
                className="block bg-primary text-white px-10 py-6 rounded-xl text-senior-xl font-bold
                         hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl text-center"
              >
                💳 Koop licentie voor € 2,99
              </Link>
              
              <Link
                href="/"
                className="block text-senior-base text-primary hover:underline"
              >
                ← Terug naar home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        {/* Header */}
        <header className="bg-white border-b-2 border-neutral-stone py-6">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 text-senior-base"
              >
                ← Terug naar home
              </Link>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
                    Mijn Bibliotheek
                  </h1>
                  <p className="text-senior-base text-gray-600 mt-2">
                    {items.length} item{items.length !== 1 ? 's' : ''} in collectie
                  </p>
                </div>
                <Link
                  href="/animaties/bibliotheek"
                  className="bg-accent text-white px-6 py-3 rounded-xl text-senior-base font-bold
                           hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl
                           flex items-center gap-2 whitespace-nowrap"
                >
                  <span>📹</span>
                  <span>Bekijk uitleg</span>
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
                    <span>Opties</span>
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
                          <span>Exporteer CSV</span>
                        </button>
                        
                        <div className="border-t border-gray-200 my-1"></div>
                        
                        <button
                          onClick={backupMaken}
                          className="w-full text-left px-6 py-4 text-senior-base hover:bg-gray-100 flex items-center gap-3 transition-colors"
                        >
                          <span className="text-2xl">💾</span>
                          <span>Backup maken</span>
                        </button>
                        
                        <button
                          onClick={backupTerugzetten}
                          className="w-full text-left px-6 py-4 text-senior-base hover:bg-gray-100 flex items-center gap-3 transition-colors"
                        >
                          <span className="text-2xl">📥</span>
                          <span>Backup terugzetten</span>
                        </button>
                        
                        <div className="border-t border-gray-200 my-1"></div>
                        
                        {/* Install app button - alleen met licentie */}
                        {hasLicense === true && deferredPrompt && (
                          <>
                            <button
                              onClick={installeerApp}
                              className="w-full text-left px-6 py-4 text-senior-base hover:bg-green-50 text-green-700 flex items-center gap-3 transition-colors border-l-4 border-green-500"
                            >
                              <span className="text-2xl">📲</span>
                              <span>Installeer als app</span>
                            </button>
                            <div className="border-t border-gray-200 my-1"></div>
                          </>
                        )}
                        
                        <button
                          onClick={delenWhatsApp}
                          className="w-full text-left px-6 py-4 text-senior-base hover:bg-gray-100 flex items-center gap-3 transition-colors"
                        >
                          <span className="text-2xl">📱</span>
                          <span>Delen (WhatsApp)</span>
                        </button>
                        
                        <button
                          onClick={toonStatistieken}
                          className="w-full text-left px-6 py-4 text-senior-base hover:bg-gray-100 flex items-center gap-3 transition-colors"
                        >
                          <span className="text-2xl">📊</span>
                          <span>Statistieken</span>
                        </button>
                        
                        <div className="border-t border-gray-200 my-1"></div>
                        
                        <button
                          onClick={toonPrivacybeleid}
                          className="w-full text-left px-6 py-4 text-senior-base hover:bg-gray-100 flex items-center gap-3 transition-colors"
                        >
                          <span className="text-2xl">🔒</span>
                          <span>Privacybeleid</span>
                        </button>
                        
                        <div className="border-t border-gray-200 my-1"></div>
                        
                        <button
                          onClick={wisAlleData}
                          className="w-full text-left px-6 py-4 text-senior-base hover:bg-red-50 text-red-600 flex items-center gap-3 transition-colors"
                        >
                          <span className="text-2xl">🗑️</span>
                          <span>Alle data wissen</span>
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
                    Zoeken:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Zoek op titel, auteur of barcode..."
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
                        aria-label="Wis zoekopdracht"
                      >
                        ✗
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-senior-base font-bold text-gray-700 mb-2">
                    Filter:
                  </label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-base
                             focus:border-primary focus:outline-none"
                  >
                    <option value="all">Alle items</option>
                    <option value="book">📚 Boeken</option>
                    <option value="music">💿 Albums/CD's</option>
                  </select>
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
                <span>Item handmatig toevoegen</span>
              </button>
              <button
                onClick={startScanner}
                disabled={!quaggaLoaded}
                className="bg-secondary text-white px-10 py-6 rounded-xl text-senior-lg font-bold
                         hover:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all shadow-lg hover:shadow-xl
                         flex items-center justify-center gap-3 min-h-[70px]"
              >
                <span className="text-3xl">📷</span>
                <span>Barcode scannen met camera</span>
              </button>
            </div>

            {/* Add Form */}
            {showAddForm && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-senior-xl font-bold text-primary mb-6">
                  {editingItem ? 'Item bewerken' : 'Nieuw item toevoegen'}
                </h2>
                
                {/* Countdown timer - toont 4 seconden aftelling */}
                {countdown > 0 && (
                  <div className="mb-6 p-6 bg-blue-50 rounded-xl border-2 border-blue-300">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl animate-pulse">⏱️</div>
                      <div>
                        <p className="text-senior-base font-bold text-blue-900">
                          Barcode gedetecteerd! Zoeken start over {countdown} seconde{countdown !== 1 ? 'n' : ''}...
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
                          Gegevens ophalen...
                        </p>
                        <p className="text-senior-sm text-gray-600 mt-1">
                          Zoeken in online database...
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
                  <div>
                    <label className="block text-senior-base font-bold text-gray-700 mb-2">
                      Type:
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {(['book', 'music'] as const).map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, type })}
                          className={`p-6 rounded-lg border-2 text-senior-lg font-bold transition-colors
                            ${formData.type === type 
                              ? 'border-primary bg-primary text-white' 
                              : 'border-gray-300 hover:border-primary bg-white'}`}
                        >
                          <span className="text-4xl block mb-2">{typeIcons[type]}</span>
                          {typeNames[type]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-senior-base font-bold text-gray-700 mb-2">
                      Titel: *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-base
                               focus:border-primary focus:outline-none"
                      placeholder="Titel van het item"
                    />
                  </div>

                  <div>
                    <label className="block text-senior-base font-bold text-gray-700 mb-2">
                      {formData.type === 'book' ? 'Auteur:' : 'Artiest:'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-base
                               focus:border-primary focus:outline-none"
                      placeholder={formData.type === 'book' ? 'Naam van de auteur' : 'Naam van de artiest'}
                    />
                  </div>

                  <div>
                    <label className="block text-senior-base font-bold text-gray-700 mb-2">
                      Barcode:
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
                        placeholder="ISBN of EAN code"
                      />
                      <button
                        type="button"
                        onClick={handleSearchBarcode}
                        disabled={!formData.barcode.trim() || !isValidBarcode(formData.barcode) || isLoadingData}
                        className="bg-secondary text-white px-6 py-3 rounded-lg text-senior-base font-bold
                                 hover:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-all shadow-lg hover:shadow-xl whitespace-nowrap
                                 flex items-center justify-center gap-2"
                        title="Zoek informatie online op"
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
                      Notities:
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-base
                               focus:border-primary focus:outline-none"
                      placeholder="Optionele notities..."
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
                      <span>{editingItem ? 'Bijwerken' : 'Opslaan'}</span>
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
                      <span>Annuleren</span>
                    </button>
                  </div>
                </form>
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
                <div className="relative w-full max-w-2xl mx-auto flex items-center justify-center px-4 sm:px-2">
                  <div id="scanner-container" className="w-full aspect-video bg-black rounded-lg overflow-hidden relative max-w-full" />
                  
                  {/* Scanner Kader Overlay - perfect gecentreerd en binnen scherm */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Buitenste overlay (donker) */}
                    <div className="absolute inset-0 bg-black bg-opacity-60">
                      {/* Transparant venster in het midden - kleiner op mobiel, perfect gecentreerd */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                    w-[75%] max-w-[240px] h-[55%] max-h-[220px]
                                    sm:w-64 sm:h-48
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
                  aria-label="Sluiten"
                >
                  <span className="text-2xl sm:text-3xl text-red-600 font-bold">✗</span>
                </button>
              </div>
            )}

            {/* Items List */}
            <div className="space-y-4">
              {filteredItems.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-senior-xl font-bold text-gray-700 mb-2">
                    {items.length === 0 ? 'Geen items' : 'Geen resultaten'}
                  </h3>
                  <p className="text-senior-base text-gray-600">
                    {items.length === 0 
                      ? 'Voeg uw eerste item toe om te beginnen!'
                      : 'Probeer een andere zoekterm of filter.'}
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
                            <strong>{item.type === 'book' ? 'Auteur:' : 'Artiest:'}</strong> {item.author}
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
            </div>
          </div>
        </main>
      </div>
    </>
  );
}


