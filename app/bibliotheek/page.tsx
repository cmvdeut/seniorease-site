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
  const [hasLicense, setHasLicense] = useState<boolean | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const [bookSearchResults, setBookSearchResults] = useState<any[]>([]);
  const [isSearchingBooks, setIsSearchingBooks] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({ type: 'book' as const, title: '', author: '', barcode: '', notes: '' });

  // WEB VERSIE: Altijd volledig gratis, geen licentie nodig
  // Alleen mobiele APK heeft licentie nodig
  // Demo mode is volledig verwijderd voor web versie - FIX 2025-12-06
  useEffect(() => {
    if (typeof window === 'undefined') return;
    console.log('✅ Web versie - volledig gratis, geen licentie nodig - FIX 2025-12-06');
    setHasLicense(true); // Web versie heeft altijd "licentie" (gratis) - NO DEMO MODE
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

  // Load items from localStorage
  useEffect(() => {
    if (hasLicense === null || typeof window === 'undefined') return;
    
    try {
      const saved = localStorage.getItem('seniorease-library');
      if (saved) {
        try {
          const loadedItems = JSON.parse(saved);
          setItems(loadedItems);
        } catch (e) {
          console.error('Error loading library:', e);
        }
      }
    } catch (e) {
      console.error('Error accessing localStorage:', e);
    }
  }, [hasLicense]);

  // Save items to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      if (items.length > 0) {
        localStorage.setItem('seniorease-library', JSON.stringify(items));
      } else {
        localStorage.removeItem('seniorease-library');
      }
    } catch (e) {
      console.error('Error saving to localStorage:', e);
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
    // Web versie is altijd volledig gratis - geen limieten
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

  // Update item
  function updateItem(id: string, updates: Partial<LibraryItem>) {
    setItems(items.map(item => item.id === id ? { ...item, ...updates } : item));
  }

  // Export to CSV
  function exportToCSV() {
    const headers = ['Type', 'Titel', 'Auteur', 'Barcode', 'Datum toegevoegd', 'Notities'];
    const rows = items.map(item => [
      'Boek',
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
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      let yPos = margin;
      const lineHeight = 8;
      const maxY = doc.internal.pageSize.getHeight() - margin;

      doc.setFontSize(18);
      doc.setTextColor(0, 100, 200);
      doc.text('Mijn Bibliotheek - SeniorEase', margin, yPos);
      yPos += lineHeight * 2;

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Gegenereerd op: ${new Date().toLocaleDateString('nl-NL')}`, margin, yPos);
      yPos += lineHeight * 2;

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Totaal items: ${items.length}`, margin, yPos);
      yPos += lineHeight;
      doc.text(`Totaal boeken: ${items.length}`, margin, yPos);
      yPos += lineHeight * 2;

      doc.setFontSize(14);
      doc.setTextColor(0, 100, 200);
      doc.text('Items:', margin, yPos);
      yPos += lineHeight * 1.5;

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      items.forEach((item, index) => {
        if (yPos > maxY - (lineHeight * 5)) {
          doc.addPage();
          yPos = margin;
        }

        doc.setFont('helvetica', 'bold');
        doc.text(`${index + 1}. 📚 Boek`, margin, yPos);
        yPos += lineHeight;

        doc.setFont('helvetica', 'normal');
        const titleLines = doc.splitTextToSize(`   Titel: ${item.title}`, pageWidth - (margin * 2));
        doc.text(titleLines, margin + 5, yPos);
        yPos += lineHeight * titleLines.length;

        doc.text(`   Auteur: ${item.author}`, margin + 5, yPos);
        yPos += lineHeight;

        if (item.barcode) {
          doc.text(`   Barcode: ${item.barcode}`, margin + 5, yPos);
          yPos += lineHeight;
        }

        if (item.notes) {
          const notesLines = doc.splitTextToSize(`   Notities: ${item.notes}`, pageWidth - (margin * 2));
          doc.text(notesLines, margin + 5, yPos);
          yPos += lineHeight * notesLines.length;
        }

        doc.setTextColor(100, 100, 100);
        doc.setFontSize(8);
        doc.text(`   Toegevoegd: ${new Date(item.dateAdded).toLocaleDateString('nl-NL')}`, margin + 5, yPos);
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        yPos += lineHeight * 1.5;

        if (index < items.length - 1) {
          doc.setDrawColor(200, 200, 200);
          doc.line(margin, yPos, pageWidth - margin, yPos);
          yPos += lineHeight;
        }
      });

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

      doc.save(`seniorease-bibliotheek-${new Date().toISOString().split('T')[0]}.pdf`);
      setShowMenu(false);
      setSuccessMessage('PDF geëxporteerd!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      setErrorMessage('Fout bij exporteren naar PDF. Zorg dat u een moderne browser gebruikt.');
    }
  }

  // Import from JSON
  function importFromJSON(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event: any) => {
      try {
        const backup = JSON.parse(event.target.result);
        const itemsToImport = Array.isArray(backup.items) ? backup.items : Array.isArray(backup) ? backup : [];
        
        // Web versie: geen limieten bij import
        if (itemsToImport.length > 0) {
          setItems([...items, ...itemsToImport]);
          setSuccessMessage(`${itemsToImport.length} items geïmporteerd!`);
          setTimeout(() => setSuccessMessage(null), 3000);
        } else {
          setErrorMessage('Geen items gevonden in bestand');
        }
      } catch (error) {
        console.error('Error importing library:', error);
        setErrorMessage('Fout bij importeren van bibliotheek. Controleer het bestandsformaat.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  // Install app
  async function installeerApp() {
    if (!deferredPrompt) {
      alert('Om de app te installeren:\n\n' +
        'Chrome/Edge: Menu (⋮) → "App installeren" of "Toevoegen aan startscherm"\n' +
        'Safari: Deel-icoon (□↑) → "Voeg toe aan beginscherm"\n' +
        'Firefox: Menu (☰) → "Installeer"');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setSuccessMessage('De app wordt geïnstalleerd. Bedankt!');
    } else {
      setErrorMessage('Installatie geannuleerd');
    }
    
    setDeferredPrompt(null);
  }

  // Start scanner
  function startScanner() {
    setShowScanner(true);
    setShowAddForm(false);
    
    if (!quaggaLoaded) {
      setErrorMessage('Scanner nog niet geladen. Wacht even...');
      return;
    }

    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).Quagga) {
        (window as any).Quagga.init({
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanner-viewport'),
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
        }, (err: any) => {
          if (err) {
            console.error('Quagga init error:', err);
            setErrorMessage('Fout bij starten van scanner. Controleer camera toestemming.');
            return;
          }
          (window as any).Quagga.start();
        });

        (window as any).Quagga.onDetected((result: any) => {
          const code = result.codeResult.code;
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

          searchBookByBarcode(code);
        });
      }
    }, 100);
  }

  // Stop scanner
  function stopScanner() {
    if (typeof window !== 'undefined' && (window as any).Quagga) {
      (window as any).Quagga.stop();
    }
    setShowScanner(false);
    setDetectedBarcode(null);
    setCountdown(0);
  }

  // Search book by barcode
  async function searchBookByBarcode(isbn: string) {
    setIsSearchingBooks(true);
    setShowSearchResults(false);
    
    try {
      const cleanIsbn = isbn.replace(/[-\s]/g, '');
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
      
      setBookSearchResults([]);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Error searching book:', error);
      setErrorMessage('Fout bij zoeken van boek informatie');
    } finally {
      setIsSearchingBooks(false);
    }
  }

  // Search book by title
  async function searchBookByTitle(query: string) {
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
  }

  // Handle book selection
  function handleBookSelected(book: any) {
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
    if (typeof window !== 'undefined' && (window as any).Quagga) {
      (window as any).Quagga.stop();
    }
  }

  // Filter items
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
              <div className="flex items-center gap-3">
                {deferredPrompt && (
                  <button
                    onClick={installeerApp}
                    className="bg-secondary text-white px-4 py-2 rounded-xl text-senior-sm font-bold
                             hover:bg-secondary-dark transition-all shadow-lg hover:shadow-xl"
                  >
                    📱 Installeer App
                  </button>
                )}
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
        </div>
      </header>

      {/* Menu Dropdown */}
      {showMenu && (
        <div className="bg-white border-b-2 border-neutral-stone py-4" data-menu="options">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto flex flex-wrap gap-3">
              <button
                onClick={exportToCSV}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl text-senior-sm font-bold
                         hover:bg-blue-600 transition-all"
              >
                📥 Exporteer CSV
              </button>
              <button
                onClick={exportToPDF}
                className="bg-red-500 text-white px-4 py-2 rounded-xl text-senior-sm font-bold
                         hover:bg-red-600 transition-all"
              >
                📄 Exporteer PDF
              </button>
              <label className="bg-green-500 text-white px-4 py-2 rounded-xl text-senior-sm font-bold
                              hover:bg-green-600 transition-all cursor-pointer">
                📤 Importeer JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={importFromJSON}
                  className="hidden"
                />
              </label>
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
                onClick={() => {
                  if (showScanner) {
                    stopScanner();
                  } else {
                    startScanner();
                  }
                }}
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
              <div id="scanner-viewport" className="relative">
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
                addItem({
                  type: 'book',
                  title: formData.title,
                  author: formData.author,
                  barcode: formData.barcode,
                  notes: formData.notes,
                });
                setFormData({ type: 'book', title: '', author: '', barcode: '', notes: '' });
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
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
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
                  value={formData.barcode}
                  onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-4 border-neutral-stone text-senior-base
                           focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-senior-base font-bold text-gray-800 mb-2">
                  Notities
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
              onClick={() => {
                setEditingItem(null);
                setFormData({ type: 'book', title: '', author: '', barcode: '', notes: '' });
                setShowAddForm(!showAddForm);
              }}
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
                                deleteItem(item.id);
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
    </main>
  );
}
