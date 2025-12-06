'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';

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
  const [hasLicense, setHasLicense] = useState<boolean | 'demo' | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const [bookSearchResults, setBookSearchResults] = useState<any[]>([]);
  const [isSearchingBooks, setIsSearchingBooks] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Check licentie - demo mode beschikbaar op alle apparaten
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check licentie
    let licentie = null;
    try {
      licentie = localStorage.getItem('seniorease-licentie');
    } catch (e) {
      // localStorage kan niet beschikbaar zijn - gebruik demo mode
      console.error('Error accessing localStorage:', e);
      setHasLicense('demo');
      return;
    }
    
    if (licentie) {
      try {
        // Probeer JSON te parsen
        const licentieData = JSON.parse(licentie);
        
        // Check verschillende licentie formaten
        // Nieuw formaat: { valid: true, code: "...", ... }
        if (licentieData.valid === true) {
          console.log('✅ Licentie gevonden (nieuw formaat):', licentieData.code);
          setHasLicense(true);
          return;
        }
        
        // Oud formaat: string "actief"
        if (licentie === 'actief' || licentieData === 'actief') {
          console.log('✅ Licentie gevonden (oud formaat: "actief")');
          // Upgrade naar nieuw formaat
          const upgradedLicentie = {
            code: 'LEGACY',
            email: 'Onbekend',
            date: new Date().toISOString(),
            valid: true,
            source: 'legacy'
          };
          localStorage.setItem('seniorease-licentie', JSON.stringify(upgradedLicentie));
          setHasLicense(true);
          return;
        }
        
        // Als licentieData bestaat maar valid is false/undefined
        console.warn('⚠️ Licentie gevonden maar niet geldig:', licentieData);
      } catch (e) {
        // Als licentie geen JSON is, check of het "actief" string is
        if (licentie === 'actief') {
          console.log('✅ Licentie gevonden (string formaat: "actief")');
          // Upgrade naar nieuw formaat
          const upgradedLicentie = {
            code: 'LEGACY',
            email: 'Onbekend',
            date: new Date().toISOString(),
            valid: true,
            source: 'legacy'
          };
          localStorage.setItem('seniorease-licentie', JSON.stringify(upgradedLicentie));
          setHasLicense(true);
          return;
        }
        console.error('Error checking license:', e, 'Raw value:', licentie);
      }
    }
    
    // Geen licentie: demo mode beschikbaar op alle apparaten (met limiet van 10 items)
    console.log('ℹ️ Geen licentie gevonden - demo mode actief');
    setHasLicense('demo');
  }, []);

  // PWA install prompt - toestaan voor licentie EN demo mode
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleBeforeInstallPrompt = (e: Event) => {
      // Alleen blokkeren als we de prompt ook kunnen tonen (heeft licentie of demo)
      // Dit voorkomt de browser warning "preventDefault() called but prompt() not called"
      if (hasLicense === true || hasLicense === 'demo') {
        // Blokkeer automatische prompt en bewaar voor later gebruik via onze knop
        e.preventDefault();
        setDeferredPrompt(e);
      }
      // Als geen licentie/demo: laat browser zijn eigen prompt tonen (geen preventDefault)
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

  // Laad items uit localStorage wanneer component mount
  useEffect(() => {
    if (hasLicense === null || typeof window === 'undefined') return;
    
    setIsLoadingData(true);
    try {
      const savedItems = localStorage.getItem('seniorease-bibliotheek');
      if (savedItems) {
        const loadedItems = JSON.parse(savedItems);
        // In demo mode: beperk tot 10 items
        if (hasLicense === 'demo' && loadedItems.length > 10) {
          const limitedItems = loadedItems.slice(0, 10);
          setItems(limitedItems);
          // Sla beperkte versie op
          localStorage.setItem('seniorease-bibliotheek', JSON.stringify(limitedItems));
        } else {
          setItems(loadedItems);
        }
      }
    } catch (error) {
      console.error('Error loading library data:', error);
      setLoadError('Fout bij laden van bibliotheek data');
    } finally {
      setIsLoadingData(false);
    }
  }, [hasLicense]);

  // Sla items op in localStorage wanneer items veranderen
  useEffect(() => {
    if (typeof window === 'undefined' || hasLicense === null) return;
    
    try {
      // In demo mode: beperk tot 10 items bij opslaan (extra beveiliging)
      const itemsToSave = hasLicense === 'demo' && items.length > 10 
        ? items.slice(0, 10)
        : items;
      
      if (hasLicense === 'demo' && items.length > 10) {
        setItems(itemsToSave);
      }
      
      localStorage.setItem('seniorease-bibliotheek', JSON.stringify(itemsToSave));
    } catch (error) {
      console.error('Error saving library data:', error);
    }
  }, [items, hasLicense]);

  const addItem = (newItem: Omit<LibraryItem, 'id' | 'dateAdded'>) => {
    // Check demo mode limiet
    if (hasLicense === 'demo' && items.length >= 10) {
      setErrorMessage('Demo limiet bereikt! Je hebt al 10 items toegevoegd. Koop de volledige versie voor onbeperkt gebruik.');
      return;
    }

    const item: LibraryItem = {
      ...newItem,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
    };

    setItems([...items, item]);
    setSuccessMessage('Item toegevoegd!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    setSuccessMessage('Item verwijderd!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const updateItem = (id: string, updates: Partial<LibraryItem>) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updates } : item));
    setSuccessMessage('Item bijgewerkt!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleBarcodeDetected = (code: string) => {
    setDetectedBarcode(code);
    setCountdown(3);
    
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Zoek boek via Google Books API
    searchBookByBarcode(code);
  };

  const searchBookByBarcode = async (isbn: string) => {
    setIsSearchingBooks(true);
    setShowSearchResults(false);
    
    try {
      // Clean ISBN (verwijder streepjes en spaties)
      const cleanIsbn = isbn.replace(/[-\s]/g, '');
      
      // Probeer eerst met ISBN-13, dan ISBN-10
      const urls = [
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanIsbn}`,
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanIsbn.substring(0, 10)}`
      ];
      
      for (const url of urls) {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
          const book = data.items[0].volumeInfo;
          setBookSearchResults([{
            title: book.title || 'Onbekende titel',
            author: book.authors ? book.authors.join(', ') : 'Onbekende auteur',
            barcode: isbn,
            thumbnail: book.imageLinks?.thumbnail || null
          }]);
          setShowSearchResults(true);
          setIsSearchingBooks(false);
          return;
        }
      }
      
      // Geen resultaat gevonden
      setBookSearchResults([]);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Error searching book:', error);
      setErrorMessage('Fout bij zoeken van boek informatie');
    } finally {
      setIsSearchingBooks(false);
    }
  };

  const searchBookByTitle = async (query: string) => {
    if (!query.trim()) {
      setBookSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setIsSearchingBooks(true);
    setShowSearchResults(false);
    
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`);
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        const results = data.items.map((item: any) => ({
          title: item.volumeInfo.title || 'Onbekende titel',
          author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Onbekende auteur',
          barcode: item.volumeInfo.industryIdentifiers?.[0]?.identifier || '',
          thumbnail: item.volumeInfo.imageLinks?.thumbnail || null
        }));
        setBookSearchResults(results);
        setShowSearchResults(true);
      } else {
        setBookSearchResults([]);
        setShowSearchResults(true);
      }
    } catch (error) {
      console.error('Error searching books:', error);
      setErrorMessage('Fout bij zoeken van boeken');
    } finally {
      setIsSearchingBooks(false);
    }
  };

  const handleBookSelected = (book: any) => {
    addItem({
      type: 'book',
      title: book.title,
      author: book.author,
      barcode: book.barcode || '',
      notes: ''
    });
    setShowSearchResults(false);
    setSearchQuery('');
    setDetectedBarcode(null);
    setShowScanner(false);
  };

  const exportLibrary = () => {
    const dataStr = JSON.stringify(items, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `seniorease-bibliotheek-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setSuccessMessage('Bibliotheek geëxporteerd!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const importLibrary = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedItems = JSON.parse(e.target?.result as string);
        if (!Array.isArray(importedItems)) {
          setErrorMessage('Ongeldig bestandsformaat');
          return;
        }

        // Check demo limiet bij import
        if (hasLicense === 'demo') {
          const currentCount = items.length;
          const itemsToImport = importedItems.slice(0, Math.max(0, 10 - currentCount));
          
          if (importedItems.length > itemsToImport.length) {
            const message = 
              `Je probeert ${importedItems.length} items te importeren, maar de demo versie heeft een limiet van 10 items.\n\n` +
              `Je hebt al ${currentCount} items. Alleen de eerste ${itemsToImport.length} items worden geïmporteerd.\n\n` +
              `Koop de volledige versie voor onbeperkt gebruik.`;
            alert(message);
          }
          
          if (itemsToImport.length === 0) {
            setErrorMessage('Demo limiet bereikt! Je hebt al 10 items. Verwijder eerst items of koop de volledige versie.');
            return;
          }
          
          setItems([...items, ...itemsToImport]);
        } else {
          setItems([...items, ...importedItems]);
        }
        
        setSuccessMessage('Bibliotheek geïmporteerd!');
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (error) {
        console.error('Error importing library:', error);
        setErrorMessage('Fout bij importeren van bibliotheek');
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = '';
  };

  const installApp = async () => {
    if (!deferredPrompt) {
      // Geen prompt beschikbaar - toon instructies
      alert('Om de app te installeren:\n\n' +
        'Chrome/Edge: Menu (⋮) → "App installeren" of "Toevoegen aan startscherm"\n' +
        'Safari: Deel-icoon (□↑) → "Voeg toe aan beginscherm"\n' +
        'Firefox: Menu (☰) → "Installeer"');
      return;
    }

    // Toon install prompt
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setSuccessMessage('App wordt geïnstalleerd...');
    } else {
      setErrorMessage('Installatie geannuleerd');
    }
    
    setDeferredPrompt(null);
  };

  // Filter items op basis van zoekquery
  const filteredItems = items.filter(item => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.author.toLowerCase().includes(query) ||
      item.barcode.toLowerCase().includes(query)
    );
  });

  if (hasLicense === null) {
    return (
      <main className="min-h-screen bg-neutral-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <p className="text-senior-lg text-gray-700">Laden...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-cream">
      <Script
        src="https://unpkg.com/quagga@0.12.1/dist/quagga.min.js"
        onLoad={() => setQuaggaLoaded(true)}
        strategy="lazyOnload"
      />

      {/* Header */}
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="text-4xl hover:scale-110 transition-transform"
                title="Terug naar home"
              >
                🏠
              </Link>
              <div>
                <h1 className="text-senior-xl md:text-senior-2xl font-bold text-primary">
                  Mijn Bibliotheek
                </h1>
                <p className="text-senior-sm text-gray-600">
                  Beheer uw boeken collectie
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Demo Banner */}
              {hasLicense === 'demo' && (
                <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl px-4 py-2">
                  <p className="text-senior-xs font-bold text-yellow-900">
                    Demo Versie - {items.length}/10 items gebruikt
                  </p>
                </div>
              )}

              {/* Licentie Status */}
              {hasLicense === true && (
                <div className="bg-green-100 border-2 border-green-400 rounded-xl px-4 py-2">
                  <p className="text-senior-xs font-bold text-green-900">
                    ✅ Volledige Versie
                  </p>
                </div>
              )}

              {/* Upgrade Knop (alleen in demo mode) */}
              {hasLicense === 'demo' && (
                <Link
                  href="/betalen"
                  className="bg-primary text-white px-4 py-2 rounded-xl text-senior-sm font-bold
                           hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
                >
                  Koop licentie (€2,99)
                </Link>
              )}

              {/* Install App Knop */}
              {deferredPrompt && (
                <button
                  onClick={installApp}
                  className="bg-secondary text-white px-4 py-2 rounded-xl text-senior-sm font-bold
                           hover:bg-secondary-dark transition-all shadow-lg hover:shadow-xl"
                >
                  📱 Installeer App
                </button>
              )}

              {/* Menu Knop */}
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl text-senior-base font-bold
                         transition-all"
                aria-label="Menu"
              >
                {showMenu ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Dropdown */}
      {showMenu && (
        <div className="bg-white border-b-2 border-neutral-stone py-4">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={exportLibrary}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl text-senior-sm font-bold
                         hover:bg-blue-600 transition-all"
              >
                📥 Exporteer Bibliotheek
              </button>
              <label className="bg-green-500 text-white px-4 py-2 rounded-xl text-senior-sm font-bold
                              hover:bg-green-600 transition-all cursor-pointer">
                📤 Importeer Bibliotheek
                <input
                  type="file"
                  accept=".json"
                  onChange={importLibrary}
                  className="hidden"
                />
              </label>
              {hasLicense === 'demo' && (
                <Link
                  href="/betalen"
                  className="bg-primary text-white px-4 py-2 rounded-xl text-senior-sm font-bold
                           hover:bg-primary-dark transition-all inline-block"
                >
                  💳 Upgrade naar Volledige Versie
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      {errorMessage && (
        <div className="container mx-auto px-6 py-4">
          <div className="bg-red-50 border-4 border-red-300 rounded-xl p-4">
            <p className="text-senior-base font-bold text-red-800">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage(null)}
              className="mt-2 text-senior-sm text-red-600 hover:text-red-800 underline"
            >
              Sluiten
            </button>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="container mx-auto px-6 py-4">
          <div className="bg-green-50 border-4 border-green-300 rounded-xl p-4">
            <p className="text-senior-base font-bold text-green-800">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Content */}
      <section className="container mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-md border-2 border-neutral-stone p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Zoek op titel, auteur of barcode..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim()) {
                    searchBookByTitle(e.target.value);
                  } else {
                    setShowSearchResults(false);
                  }
                }}
                className="flex-1 px-4 py-3 rounded-xl border-4 border-neutral-stone text-senior-base
                         focus:border-primary focus:outline-none"
              />
              <button
                onClick={() => setShowScanner(!showScanner)}
                className="bg-primary text-white px-6 py-3 rounded-xl text-senior-base font-bold
                         hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
              >
                {showScanner ? '✕ Sluit Scanner' : '📷 Scan Barcode'}
              </button>
            </div>

            {/* Book Search Results */}
            {showSearchResults && (
              <div className="mt-4 bg-white border-2 border-gray-200 rounded-xl p-4 max-h-64 overflow-y-auto">
                {isSearchingBooks ? (
                  <p className="text-senior-sm text-gray-600 text-center py-4">Zoeken...</p>
                ) : bookSearchResults.length > 0 ? (
                  <div className="space-y-2">
                    {bookSearchResults.map((book, index) => (
                      <button
                        key={index}
                        onClick={() => handleBookSelected(book)}
                        className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all
                                 border-2 border-transparent hover:border-primary"
                      >
                        <div className="flex items-center gap-3">
                          {book.thumbnail && (
                            <img
                              src={book.thumbnail}
                              alt={book.title}
                              className="w-12 h-16 object-cover rounded"
                            />
                          )}
                          <div className="flex-1">
                            <p className="text-senior-sm font-bold text-gray-800">{book.title}</p>
                            <p className="text-senior-xs text-gray-600">{book.author}</p>
                            {book.barcode && (
                              <p className="text-senior-xs text-gray-500">ISBN: {book.barcode}</p>
                            )}
                          </div>
                          <span className="text-2xl">➕</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-senior-sm text-gray-600 text-center py-4">
                    Geen boeken gevonden. Probeer een andere zoekterm.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Barcode Scanner */}
        {showScanner && (
          <div className="mb-6 bg-white rounded-xl shadow-md border-4 border-primary p-6">
            <div className="text-center mb-4">
              <h2 className="text-senior-lg font-bold text-primary mb-2">Barcode Scanner</h2>
              <p className="text-senior-sm text-gray-600">
                Richt de camera op de barcode van het boek
              </p>
            </div>
            
            {!quaggaLoaded ? (
              <div className="text-center py-8">
                <div className="animate-spin text-4xl mb-4">⏳</div>
                <p className="text-senior-sm text-gray-600">Scanner laden...</p>
              </div>
            ) : (
              <div id="scanner-container" className="relative">
                <div id="interactive" className="w-full" style={{ minHeight: '300px' }}></div>
                {detectedBarcode && (
                  <div className="mt-4 bg-green-50 border-2 border-green-300 rounded-xl p-4">
                    <p className="text-senior-sm font-bold text-green-800 mb-2">
                      Barcode gedetecteerd: {detectedBarcode}
                    </p>
                    {countdown > 0 && (
                      <p className="text-senior-xs text-green-700">
                        Zoeken naar boek informatie... {countdown}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Add Item Form */}
        {showAddForm && (
          <div className="mb-6 bg-white rounded-xl shadow-md border-4 border-primary p-6">
            <h2 className="text-senior-lg font-bold text-primary mb-4">Voeg Boek Toe</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                addItem({
                  type: 'book',
                  title: formData.get('title') as string,
                  author: formData.get('author') as string,
                  barcode: formData.get('barcode') as string,
                  notes: formData.get('notes') as string || '',
                });
                (e.target as HTMLFormElement).reset();
                setShowAddForm(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-senior-base font-bold text-gray-800 mb-2">
                  Titel <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-4 py-3 rounded-xl border-4 border-neutral-stone text-senior-base
                           focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-senior-base font-bold text-gray-800 mb-2">
                  Auteur <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="author"
                  required
                  className="w-full px-4 py-3 rounded-xl border-4 border-neutral-stone text-senior-base
                           focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-senior-base font-bold text-gray-800 mb-2">
                  Barcode / ISBN
                </label>
                <input
                  type="text"
                  name="barcode"
                  className="w-full px-4 py-3 rounded-xl border-4 border-neutral-stone text-senior-base
                           focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-senior-base font-bold text-gray-800 mb-2">
                  Notities
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-4 border-neutral-stone text-senior-base
                           focus:border-primary focus:outline-none resize-y"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white px-6 py-3 rounded-xl text-senior-base font-bold
                           hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
                >
                  Toevoegen
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-300 text-gray-800 px-6 py-3 rounded-xl text-senior-base font-bold
                           hover:bg-gray-400 transition-all"
                >
                  Annuleren
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Items List */}
        <div className="bg-white rounded-xl shadow-md border-2 border-neutral-stone p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-senior-xl font-bold text-primary">
              Mijn Boeken ({filteredItems.length})
            </h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-primary text-white px-6 py-3 rounded-xl text-senior-base font-bold
                       hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
            >
              {showAddForm ? '✕ Sluiten' : '+ Voeg Boek Toe'}
            </button>
          </div>

          {isLoadingData ? (
            <div className="text-center py-12">
              <div className="animate-spin text-6xl mb-4">⏳</div>
              <p className="text-senior-lg text-gray-700">Laden...</p>
            </div>
          ) : loadError ? (
            <div className="text-center py-12">
              <p className="text-senior-lg text-red-600 mb-4">{loadError}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary text-white px-6 py-3 rounded-xl text-senior-base font-bold
                         hover:bg-primary-dark transition-all"
              >
                Herlaad Pagina
              </button>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-senior-lg text-gray-700 mb-4">
                {searchQuery ? 'Geen boeken gevonden' : 'Nog geen boeken toegevoegd'}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-primary text-white px-6 py-3 rounded-xl text-senior-base font-bold
                           hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
                >
                  + Voeg Eerste Boek Toe
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-neutral-cream rounded-xl p-4 border-2 border-neutral-stone
                           hover:border-primary transition-all shadow-md hover:shadow-lg"
                >
                  {editingItem === item.id ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target as HTMLFormElement);
                        updateItem(item.id, {
                          title: formData.get('title') as string,
                          author: formData.get('author') as string,
                          barcode: formData.get('barcode') as string,
                          notes: formData.get('notes') as string || '',
                        });
                        setEditingItem(null);
                      }}
                      className="space-y-3"
                    >
                      <input
                        type="text"
                        name="title"
                        defaultValue={item.title}
                        required
                        className="w-full px-3 py-2 rounded-lg border-2 border-neutral-stone text-senior-sm
                                 focus:border-primary focus:outline-none"
                      />
                      <input
                        type="text"
                        name="author"
                        defaultValue={item.author}
                        required
                        className="w-full px-3 py-2 rounded-lg border-2 border-neutral-stone text-senior-sm
                                 focus:border-primary focus:outline-none"
                      />
                      <input
                        type="text"
                        name="barcode"
                        defaultValue={item.barcode}
                        className="w-full px-3 py-2 rounded-lg border-2 border-neutral-stone text-senior-sm
                                 focus:border-primary focus:outline-none"
                      />
                      <textarea
                        name="notes"
                        defaultValue={item.notes}
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border-2 border-neutral-stone text-senior-sm
                                 focus:border-primary focus:outline-none resize-y"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg text-senior-sm font-bold
                                   hover:bg-green-600 transition-all"
                        >
                          Opslaan
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingItem(null)}
                          className="bg-gray-300 text-gray-800 px-3 py-2 rounded-lg text-senior-sm font-bold
                                   hover:bg-gray-400 transition-all"
                        >
                          Annuleren
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-senior-base font-bold text-gray-800 mb-1">
                            {item.title}
                          </h3>
                          <p className="text-senior-sm text-gray-600 mb-1">
                            {item.author}
                          </p>
                          {item.barcode && (
                            <p className="text-senior-xs text-gray-500">
                              ISBN: {item.barcode}
                            </p>
                          )}
                          {item.notes && (
                            <p className="text-senior-xs text-gray-600 mt-2 italic">
                              {item.notes}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col gap-1 ml-2">
                          <button
                            onClick={() => setEditingItem(item.id)}
                            className="bg-blue-500 text-white px-2 py-1 rounded text-senior-xs font-bold
                                     hover:bg-blue-600 transition-all"
                            title="Bewerken"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('Weet u zeker dat u dit boek wilt verwijderen?')) {
                                removeItem(item.id);
                              }
                            }}
                            className="bg-red-500 text-white px-2 py-1 rounded text-senior-xs font-bold
                                     hover:bg-red-600 transition-all"
                            title="Verwijderen"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <p className="text-senior-xs text-gray-500 mt-2">
                        Toegevoegd: {new Date(item.dateAdded).toLocaleDateString('nl-NL')}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quagga Scanner Script */}
      {showScanner && quaggaLoaded && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              Quagga.init({
                inputStream: {
                  name: "Live",
                  type: "LiveStream",
                  target: document.querySelector('#interactive'),
                  constraints: {
                    width: 640,
                    height: 480,
                    facingMode: "environment"
                  }
                },
                locator: {
                  patchSize: "medium",
                  halfSample: true
                },
                numOfWorkers: 2,
                decoder: {
                  readers: ["ean_reader", "ean_8_reader", "code_128_reader", "code_39_reader", "upc_reader"]
                },
                locate: true
              }, function(err) {
                if (err) {
                  console.error('Quagga init error:', err);
                  return;
                }
                Quagga.start();
              });

              Quagga.onDetected(function(result) {
                const code = result.codeResult.code;
                window.dispatchEvent(new CustomEvent('barcodeDetected', { detail: code }));
                Quagga.stop();
              });

              window.addEventListener('barcodeDetected', function(e) {
                const code = e.detail;
                if (typeof handleBarcodeDetected === 'function') {
                  handleBarcodeDetected(code);
                }
              });
            `,
          }}
        />
      )}

      {/* Quagga Event Handler */}
      {showScanner && quaggaLoaded && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const originalHandleBarcodeDetected = ${handleBarcodeDetected.toString()};
                window.handleBarcodeDetected = function(code) {
                  originalHandleBarcodeDetected(code);
                };
              })();
            `,
          }}
        />
      )}
    </main>
  );
}
