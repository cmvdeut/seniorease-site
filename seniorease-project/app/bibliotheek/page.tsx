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
    if (typeof window !== 'undefined' && (window as any).Quagga) {
      setShowScanner(true);
      
      setTimeout(() => {
        const Quagga = (window as any).Quagga;
        Quagga.init({
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanner-container'),
            constraints: {
              width: 640,
              height: 480,
              facingMode: "environment"
            },
          },
          decoder: {
            readers: ["ean_reader", "ean_8_reader", "code_128_reader", "code_39_reader"]
          },
        }, function(err: any) {
          if (err) {
            console.error(err);
            alert('Camera kon niet worden gestart. Controleer de permissies.');
            stopScanner();
            return;
          }
          Quagga.start();
        });

        Quagga.onDetected(async (result: any) => {
          const code = result.codeResult.code;
          console.log('Barcode detected:', code);
          stopScanner();
          
          // Toon formulier en start met zoeken
          setShowAddForm(true);
          setIsLoadingData(true);
          setLoadError(null);
          setFormData(prev => ({ ...prev, barcode: code }));
          
          // Probeer gegevens op te halen
          await lookupBarcode(code);
        });
      }, 100);
    } else {
      alert('Scanner bibliotheek wordt geladen...');
    }
  }

  // Stop barcode scanner
  function stopScanner() {
    if (typeof window !== 'undefined' && (window as any).Quagga) {
      (window as any).Quagga.stop();
    }
    setShowScanner(false);
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
                
                {/* Loading indicator */}
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
                      disabled={isLoadingData}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-base
                               focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
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
                      disabled={isLoadingData}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-base
                               focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
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
                        disabled={isLoadingData}
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-base
                                 focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="ISBN of EAN code"
                      />
                      {formData.barcode && !isLoadingData && (
                        <button
                          type="button"
                          onClick={() => lookupBarcode(formData.barcode)}
                          className="bg-secondary text-white px-6 py-3 rounded-lg text-senior-base font-bold
                                   hover:bg-secondary-dark transition-colors whitespace-nowrap"
                          title="Zoek gegevens op"
                        >
                          🔍 Zoek
                        </button>
                      )}
                    </div>
                    <p className="text-senior-xs text-gray-500 mt-2">
                      Scan met camera of voer handmatig in. Klik op "Zoek" om automatisch gegevens op te halen.
                    </p>
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
                  <div id="scanner-container" className="w-full h-96 bg-black rounded-lg overflow-hidden" />
                  <button
                    onClick={stopScanner}
                    className="absolute top-8 right-8 bg-red-600 text-white px-6 py-3 rounded-lg
                             text-senior-base font-bold hover:bg-red-700"
                  >
                    ✗ Sluiten
                  </button>
                  <p className="text-white text-center mt-4 text-senior-base">
                    Houd de barcode voor de camera...
                  </p>
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


