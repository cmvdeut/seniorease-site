'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';

interface LibraryItem {
  id: string;
  type: 'book' | 'cd' | 'dvd' | 'game';
  title: string;
  author: string;
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
      item.type,
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

        Quagga.onDetected((result: any) => {
          const code = result.codeResult.code;
          console.log('Barcode detected:', code);
          stopScanner();
          // Auto-fill barcode in form
          setShowAddForm(true);
          setFormData(prev => ({ ...prev, barcode: code }));
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
    author: '',
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
    cd: '💿',
    dvd: '📀',
    game: '🎮'
  };

  const typeNames: Record<LibraryItem['type'], string> = {
    book: 'Boek',
    cd: 'CD/LP',
    dvd: 'DVD',
    game: 'Game'
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
                  className="bg-accent text-white px-6 py-3 rounded-lg text-senior-base font-bold
                           hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed
                           transition-colors"
                >
                  📄 Exporteer CSV
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
                    <option value="cd">💿 CD/LP</option>
                    <option value="dvd">📀 DVD</option>
                    <option value="game">🎮 Games</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-primary text-white px-8 py-4 rounded-lg text-senior-base font-bold
                         hover:bg-primary-dark transition-colors"
              >
                ➕ Item toevoegen
              </button>
              <button
                onClick={startScanner}
                disabled={!quaggaLoaded}
                className="bg-secondary text-white px-8 py-4 rounded-lg text-senior-base font-bold
                         hover:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors"
              >
                📷 Scan barcode
              </button>
            </div>

            {/* Add Form */}
            {showAddForm && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-senior-xl font-bold text-primary mb-6">
                  Nieuw item toevoegen
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-senior-base font-bold text-gray-700 mb-2">
                      Type:
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {(['book', 'cd', 'dvd', 'game'] as const).map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, type })}
                          className={`p-4 rounded-lg border-2 text-senior-base font-bold transition-colors
                            ${formData.type === type 
                              ? 'border-primary bg-primary text-white' 
                              : 'border-gray-300 hover:border-primary'}`}
                        >
                          {typeIcons[type]} {typeNames[type]}
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
                      Auteur/Artiest: *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-senior-base
                               focus:border-primary focus:outline-none"
                      placeholder="Naam auteur of artiest"
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

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-primary text-white px-8 py-3 rounded-lg text-senior-base font-bold
                               hover:bg-primary-dark transition-colors"
                    >
                      ✓ Opslaan
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setFormData({ type: 'book', title: '', author: '', barcode: '', notes: '' });
                      }}
                      className="bg-gray-500 text-white px-8 py-3 rounded-lg text-senior-base font-bold
                               hover:bg-gray-600 transition-colors"
                    >
                      ✗ Annuleren
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
                            <strong>Door:</strong> {item.author}
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

