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

  // Load items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('seniorease-library');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading library:', e);
      }
    }
  }, []);

  // Save items to localStorage
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('seniorease-library', JSON.stringify(items));
    }
  }, [items]);

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
    
    // Wacht tot de scanner container in de DOM staat
    setTimeout(() => {
      const Quagga = (window as any).Quagga;
      const container = document.querySelector('#scanner-container');
      
      if (!container) {
        alert('Scanner container niet gevonden. Probeer de pagina te vernieuwen.');
        stopScanner();
        return;
      }

      // Verwijder oude event listeners als die er zijn
      Quagga.offDetected();
      
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: container,
          constraints: {
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 480, ideal: 720, max: 1080 },
            facingMode: "environment"
          },
          area: { // Focus gebied voor betere detectie
            top: "20%",
            right: "20%",
            left: "20%",
            bottom: "20%"
          }
        },
        locator: {
          patchSize: "medium",
          halfSample: true
        },
        numOfWorkers: 2,
        decoder: {
          readers: [
            "ean_reader",
            "ean_8_reader", 
            "code_128_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader"
          ],
          debug: {
            showCanvas: false,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showBoundingBox: false,
            showBoundingBoxes: false
          }
        },
        locate: true
      }, function(err: any) {
        if (err) {
          console.error('Quagga init error:', err);
          alert('Camera kon niet worden gestart. Controleer de permissies en zorg dat de camera beschikbaar is.');
          stopScanner();
          return;
        }
        
        console.log('Quagga gestart, wacht op barcode...');
        Quagga.start();
        
        // Registreer detection handler NA dat Quagga is gestart
        Quagga.onDetected(async (result: any) => {
          const code = result.codeResult.code;
          console.log('Barcode detected:', code);
          
          // Verifieer dat we een geldige code hebben
          if (!code || code.length < 5) {
            console.warn('Ongeldige barcode gedetecteerd:', code);
            return;
          }
          
          // Stop scanner direct
          Quagga.stop();
          stopScanner();
          
          // Toon formulier en vul barcode in
          setShowAddForm(true);
          setFormData(prev => ({ ...prev, barcode: code }));
          setDetectedBarcode(code);
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
            await lookupBarcode(code);
          }, 4000);
        });
      });
    }, 200); // Iets langer wachten voor DOM ready
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
  }

  // Lookup barcode in online databases
  async function lookupBarcode(code: string) {
    setIsLoadingData(true);
    setLoadError(null);

    try {
      // Bepaal of het ISBN (boek) of EAN (muziek) is
      // ISBN-13 begint met 978 of 979, ISBN-10 heeft 10 cijfers
      // EAN voor muziek is meestal 13 cijfers maar niet 978/979
      
      const isISBN = code.startsWith('978') || code.startsWith('979') || code.length === 10;
      
      if (isISBN) {
        // Zoek boek via Open Library API
        await lookupBook(code);
      } else {
        // Zoek muziek via MusicBrainz API
        await lookupMusic(code);
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
      // Normaliseer ISBN (verwijder streepjes)
      const cleanISBN = isbn.replace(/[-\s]/g, '');
      
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
      const cleanISBN = isbn.replace(/[-\s]/g, '');
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

  // Lookup muziek via MusicBrainz API
  async function lookupMusic(ean: string) {
    try {
      // MusicBrainz API vereist een User-Agent header
      const response = await fetch(
        `https://musicbrainz.org/ws/2/release?query=barcode:${ean}&fmt=json`,
        {
          headers: {
            'User-Agent': 'SeniorEase/1.0 (https://seniorease.nl)',
            'Accept': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Album niet gevonden');
      }

      const data = await response.json();
      
      if (data.releases && data.releases.length > 0) {
        const release = data.releases[0];
        
        // Haal artiesten op
        let artist = 'Onbekend';
        if (release['artist-credit'] && release['artist-credit'].length > 0) {
          artist = release['artist-credit']
            .map((credit: any) => credit.name || credit.artist?.name || '')
            .filter((name: string) => name)
            .join(', ');
        }
        
        setFormData(prev => ({
          ...prev,
          type: 'music',
          title: release.title || '',
          author: artist,
          barcode: ean
        }));
        
        setIsLoadingData(false);
      } else {
        throw new Error('Album niet gevonden');
      }
    } catch (error) {
      console.error('Error looking up music:', error);
      setLoadError('Kon geen album vinden. Controleer de EAN code of vul handmatig in.');
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
    addItem(formData);
    setFormData({ type: 'book', title: '', author: '', barcode: '', notes: '' });
  }

  const typeIcons: Record<LibraryItem['type'], string> = {
    book: '📚',
    music: '💿'
  };

  const typeNames: Record<LibraryItem['type'], string> = {
    book: 'Boek',
    music: 'Album/CD'
  };

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
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
                    Mijn Bibliotheek
                  </h1>
                  <p className="text-senior-base text-gray-600 mt-2">
                    {items.length} item{items.length !== 1 ? 's' : ''} in collectie
                  </p>
                </div>
                <button
                  onClick={exportToCSV}
                  disabled={items.length === 0}
                  className="bg-accent text-white px-8 py-4 rounded-xl text-senior-base font-bold
                           hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <span className="text-2xl">📄</span>
                  <span>Exporteer CSV</span>
                </button>
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
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Zoek op titel, auteur of barcode..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-base
                             focus:border-primary focus:outline-none"
                  />
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
                onClick={() => setShowAddForm(!showAddForm)}
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
                  Nieuw item toevoegen
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
                    <input
                      type="text"
                      value={formData.barcode}
                      onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-base
                               focus:border-primary focus:outline-none"
                      placeholder="ISBN of EAN code"
                    />
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
                      <span>Opslaan</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
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
              <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
                <div className="relative w-full max-w-2xl p-4">
                  {/* Waarschuwing banner */}
                  <div className="mb-4 bg-yellow-500 border-2 border-yellow-600 rounded-xl p-4 shadow-lg">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">📱</span>
                      <div>
                        <p className="text-senior-base font-bold text-yellow-900 mb-1">
                          💡 Tip: Barcode scanner werkt het beste op telefoon of tablet
                        </p>
                        <p className="text-senior-sm text-yellow-800">
                          Gebruik de achtercamera voor het beste resultaat. Op computer kan het scannen soms moeizamer gaan.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Scanner Container met Overlay */}
                  <div className="relative w-full">
                    <div id="scanner-container" className="w-full h-96 bg-black rounded-lg overflow-hidden relative" />
                    
                    {/* Scanner Kader Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {/* Buitenste overlay (donker) */}
                      <div className="absolute inset-0 bg-black bg-opacity-60">
                        {/* Transparant venster in het midden */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                      w-64 h-48 border-4 border-white rounded-lg shadow-2xl">
                          {/* Hoek decoraties */}
                          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Instructie tekst */}
                    <div className="absolute bottom-20 left-0 right-0 text-center pointer-events-none">
                      <p className="text-white text-senior-lg font-bold mb-2 drop-shadow-lg">
                        Houd de barcode in het kader
                      </p>
                      <p className="text-white text-senior-base drop-shadow-lg">
                        Zorg dat de barcode helemaal zichtbaar is en goed verlicht
                      </p>
                    </div>
                  </div>
                  
                  {/* Sluit knop */}
                  <button
                    onClick={stopScanner}
                    className="absolute top-8 right-8 bg-red-600 text-white px-8 py-4 rounded-xl
                             text-senior-lg font-bold hover:bg-red-700 transition-all shadow-xl
                             flex items-center gap-2 min-h-[70px]"
                  >
                    <span className="text-2xl">✗</span>
                    <span>Sluiten</span>
                  </button>
                </div>
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
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="ml-4 text-red-600 hover:text-red-800 text-senior-xl font-bold"
                        title="Verwijderen"
                      >
                        🗑️
                      </button>
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


