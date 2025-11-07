'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ListItem {
  id: string;
  text: string;
  checked: boolean;
}

interface Checklist {
  id: string;
  name: string;
  items: ListItem[];
}

// Suggesties per lijst type
const getSuggestions = (listName: string): string[] => {
  const name = listName.toLowerCase();
  
  if (name.includes('boodschap') || name.includes('winkel') || name.includes('super')) {
    return [
      'Melk', 'Brood', 'Eieren', 'Boter', 'Kaas', 'Yoghurt', 'Fruit', 'Groenten',
      'Kip', 'Vlees', 'Vis', 'Pasta', 'Rijst', 'Aardappelen', 'Uien', 'Knoflook',
      'Koffie', 'Thee', 'Suiker', 'Zout', 'Peper', 'Olijfolie', 'Azijn', 'Tomaten',
      'Sla', 'Komkommer', 'Wortelen', 'Paprika', 'Appels', 'Bananen', 'Sinaasappels'
    ];
  }
  
  if (name.includes('reis') || name.includes('vakantie') || name.includes('trip')) {
    return [
      'Paspoort/ID', 'Koffer', 'Reistas', 'Medicijnen', 'Telefoon oplader', 'Powerbank',
      'Kleding', 'Schoenen', 'Toiletspullen', 'Handdoek', 'Zonnebrand', 'Zonnebril',
      'Boeken', 'Camera', 'Reisverzekering', 'Reserveringen', 'Reisdocumenten',
      'Contant geld', 'Creditcard', 'EHIC kaart', 'Reisgids', 'Paraplu'
    ];
  }
  
  if (name.includes('verjaardag') || name.includes('feest') || name.includes('feestje')) {
    return [
      'Taart', 'Cadeau', 'Kaartjes', 'Ballonnen', 'Versiering', 'Slagroom',
      'Kaarsen', 'Chips', 'Nootjes', 'Drankjes', 'Frisdrank', 'Wijn',
      'Servetten', 'Borden', 'Bekers', 'Bestek', 'Tafelkleed', 'Muziek',
      'Foto\'s', 'Gastenlijst', 'Uitnodigingen'
    ];
  }
  
  if (name.includes('medicijn') || name.includes('pil') || name.includes('medicatie')) {
    return [
      'Paracetamol', 'Ibuprofen', 'Vitamines', 'Bloeddruk medicatie',
      'Cholesterol medicatie', 'Diabetes medicatie', 'Allergie medicatie',
      'Maagzuurremmer', 'Slaapmedicatie', 'Pijnstillers', 'Ontstekingsremmers'
    ];
  }
  
  if (name.includes('klus') || name.includes('doe-het-zelf') || name.includes('gereedschap')) {
    return [
      'Hammer', 'Schroevendraaier', 'Boor', 'Zaag', 'Meetlint', 'Schuurpapier',
      'Verf', 'Kwasten', 'Lijm', 'Spijkers', 'Schroeven', 'Ducttape',
      'Werkhandschoenen', 'Veiligheidsbril', 'Schort', 'Kruiwagen'
    ];
  }
  
  // Algemene suggesties
  return [
    'Belangrijk', 'Niet vergeten', 'Checken', 'Controleren', 'Afspraak maken',
    'Bellen', 'Emailen', 'Betalen', 'Ophalen', 'Afleveren', 'Repareren',
    'Schoonmaken', 'Organiseren', 'Plannen', 'Voorbereiden'
  ];
};

export default function AfvinkenPage() {
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [newItemText, setNewItemText] = useState('');
  const [newListName, setNewListName] = useState('');
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('seniorease-checklists');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setChecklists(parsed);
        // Select first list if available
        if (parsed.length > 0 && !selectedListId) {
          setSelectedListId(parsed[0].id);
        }
      } catch (e) {
        console.error('Error loading checklists:', e);
      }
    }
  }, []);

  // Save to localStorage whenever checklists change
  useEffect(() => {
    if (checklists.length > 0) {
      localStorage.setItem('seniorease-checklists', JSON.stringify(checklists));
    }
  }, [checklists]);

  const selectedList = checklists.find(list => list.id === selectedListId);
  
  // Get filtered suggestions based on input
  const getFilteredSuggestions = (): string[] => {
    if (!selectedList || !newItemText.trim()) {
      return [];
    }
    const suggestions = getSuggestions(selectedList.name);
    const input = newItemText.toLowerCase().trim();
    return suggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(input) && 
        !selectedList.items.some(item => item.text.toLowerCase() === suggestion.toLowerCase())
      )
      .slice(0, 8); // Max 8 suggestions
  };

  const filteredSuggestions = getFilteredSuggestions();

  const createNewList = () => {
    if (newListName.trim()) {
      const newList: Checklist = {
        id: Date.now().toString(),
        name: newListName.trim(),
        items: []
      };
      setChecklists([...checklists, newList]);
      setSelectedListId(newList.id);
      setNewListName('');
      setShowNewListForm(false);
    }
  };

  const deleteList = (listId: string) => {
    if (confirm('Weet u zeker dat u deze lijst wilt verwijderen?')) {
      const updated = checklists.filter(list => list.id !== listId);
      setChecklists(updated);
      if (selectedListId === listId) {
        setSelectedListId(updated.length > 0 ? updated[0].id : null);
      }
    }
  };

  const addItem = (text?: string) => {
    const itemText = text || newItemText.trim();
    if (itemText && selectedListId) {
      const newItem: ListItem = {
        id: Date.now().toString(),
        text: itemText,
        checked: false
      };
      setChecklists(checklists.map(list => 
        list.id === selectedListId 
          ? { ...list, items: [...list.items, newItem] }
          : list
      ));
      setNewItemText('');
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    addItem(suggestion);
  };

  const toggleItem = (listId: string, itemId: string) => {
    setChecklists(checklists.map(list => 
      list.id === listId 
        ? { 
            ...list, 
            items: list.items.map(item => 
              item.id === itemId ? { ...item, checked: !item.checked } : item
            )
          }
        : list
    ));
  };

  const deleteItem = (listId: string, itemId: string) => {
    setChecklists(checklists.map(list => 
      list.id === listId 
        ? { ...list, items: list.items.filter(item => item.id !== itemId) }
        : list
    ));
  };

  const clearCompleted = () => {
    if (selectedListId) {
      setChecklists(checklists.map(list => 
        list.id === selectedListId 
          ? { ...list, items: list.items.filter(item => !item.checked) }
          : list
      ));
    }
  };

  const clearAllItems = () => {
    if (selectedListId && selectedList && selectedList.items.length > 0) {
      if (confirm('Weet u zeker dat u alle items uit deze lijst wilt verwijderen?')) {
        setChecklists(checklists.map(list => 
          list.id === selectedListId 
            ? { ...list, items: [] }
            : list
        ));
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-cream flex flex-col">
      {/* Header */}
      <header className="bg-neutral-cream border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/tools"
              className="inline-flex items-center gap-3 text-primary hover:text-primary-dark transition-colors font-semibold"
            >
              <span className="text-3xl">←</span>
              <span className="text-senior-base">Terug naar tools</span>
            </Link>
            <div className="flex items-center gap-3">
              <Image 
                src="/heart-logo.png" 
                alt="SeniorEase hartlogo" 
                width={100} 
                height={100}
                className="w-32 h-32"
              />
              <div>
                <h1 className="text-senior-xl font-bold text-primary">Afvinken maar!</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Lists Sidebar & Main Content */}
          <div className="grid md:grid-cols-4 gap-6">
            
            {/* Sidebar - Lists */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border-4 border-primary p-4">
                <h2 className="text-senior-lg font-bold text-primary mb-4 text-center">
                  Mijn Lijstjes
                </h2>
                
                {/* New List Button */}
                {!showNewListForm ? (
                  <button
                    onClick={() => setShowNewListForm(true)}
                    className="w-full bg-primary text-white py-3 rounded-xl text-senior-base font-bold
                             hover:bg-primary-dark transition-all shadow-lg mb-4 border-4 border-primary"
                  >
                    + Nieuw Lijstje
                  </button>
                ) : (
                  <div className="mb-4">
                    <input
                      type="text"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && createNewList()}
                      placeholder="Naam lijstje..."
                      className="w-full px-4 py-3 rounded-xl border-4 border-primary text-senior-base mb-2
                               focus:outline-none focus:ring-2 focus:ring-primary"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={createNewList}
                        className="flex-1 bg-primary text-white py-2 rounded-xl text-senior-sm font-bold
                                 hover:bg-primary-dark transition-all"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => {
                          setShowNewListForm(false);
                          setNewListName('');
                        }}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-xl text-senior-sm font-bold
                                 hover:bg-gray-400 transition-all"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}

                {/* Lists */}
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {checklists.length === 0 ? (
                    <p className="text-senior-sm text-gray-500 text-center py-4">
                      Maak uw eerste lijstje!
                    </p>
                  ) : (
                    checklists.map((list) => (
                      <div
                        key={list.id}
                        className={`p-3 rounded-xl border-4 cursor-pointer transition-all
                          ${selectedListId === list.id
                            ? 'bg-primary text-white border-primary shadow-lg'
                            : 'bg-neutral-cream border-neutral-stone hover:border-primary'
                          }`}
                        onClick={() => setSelectedListId(list.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className={`text-senior-sm font-bold ${selectedListId === list.id ? 'text-white' : 'text-gray-800'}`}>
                              {list.name}
                            </div>
                            <div className={`text-senior-xs ${selectedListId === list.id ? 'text-white/80' : 'text-gray-500'}`}>
                              {list.items.length} items
                            </div>
                          </div>
                          {checklists.length > 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteList(list.id);
                              }}
                              className="text-red-500 hover:text-red-700 text-xl font-bold ml-2"
                              title="Verwijder lijstje"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Main Content - Selected List */}
            <div className="md:col-span-3">
              {selectedList ? (
                <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-6 md:p-8">
                  {/* List Header */}
                  <div className="mb-6">
                    <h2 className="text-senior-2xl font-bold text-primary mb-2">
                      {selectedList.name}
                    </h2>
                    <div className="flex items-center gap-4 text-senior-sm text-gray-600 flex-wrap">
                      <span>
                        {selectedList.items.filter(item => item.checked).length} / {selectedList.items.length} afgevinkt
                      </span>
                      <div className="flex gap-3">
                        {selectedList.items.some(item => item.checked) && (
                          <button
                            onClick={clearCompleted}
                            className="text-orange-600 hover:text-orange-800 font-semibold underline"
                          >
                            Afgevinkte items wissen
                          </button>
                        )}
                        {selectedList.items.length > 0 && (
                          <button
                            onClick={clearAllItems}
                            className="text-red-600 hover:text-red-800 font-semibold underline"
                          >
                            Hele lijst wissen
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Add Item Form */}
                  <div className="mb-6 relative">
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newItemText}
                          onChange={(e) => {
                            setNewItemText(e.target.value);
                            setShowSuggestions(true);
                          }}
                          onFocus={() => setShowSuggestions(true)}
                          onBlur={() => {
                            // Delay to allow clicking on suggestions
                            setTimeout(() => setShowSuggestions(false), 200);
                          }}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              if (filteredSuggestions.length > 0) {
                                selectSuggestion(filteredSuggestions[0]);
                              } else {
                                addItem();
                              }
                            }
                          }}
                          placeholder="Nieuw item toevoegen..."
                          className="w-full px-4 py-4 rounded-xl border-4 border-primary text-senior-base
                                   focus:outline-none focus:ring-2 focus:ring-primary"
                          autoFocus
                        />
                        
                        {/* Suggestions Dropdown */}
                        {showSuggestions && filteredSuggestions.length > 0 && (
                          <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl border-4 border-primary overflow-hidden">
                            <div className="max-h-64 overflow-y-auto">
                              {filteredSuggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => selectSuggestion(suggestion)}
                                  className="w-full text-left px-4 py-3 text-senior-base hover:bg-primary/10 
                                           border-b-2 border-neutral-stone last:border-b-0 transition-colors
                                           font-semibold text-gray-800"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => addItem()}
                        className="bg-primary text-white px-6 py-4 rounded-xl text-senior-lg font-bold
                                 hover:bg-primary-dark transition-all shadow-lg border-4 border-primary
                                 min-w-[120px]"
                      >
                        + Toevoegen
                      </button>
                    </div>
                    
                    {/* Show all suggestions when input is empty */}
                    {newItemText.trim() === '' && showSuggestions && selectedList && (
                      <div className="mt-2">
                        <p className="text-senior-xs text-gray-600 mb-2 font-semibold">
                          💡 Suggesties voor "{selectedList.name}":
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {getSuggestions(selectedList.name)
                            .filter(suggestion => 
                              !selectedList.items.some(item => item.text.toLowerCase() === suggestion.toLowerCase())
                            )
                            .slice(0, 10)
                            .map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => selectSuggestion(suggestion)}
                                className="px-4 py-2 bg-neutral-cream border-2 border-primary rounded-lg
                                         text-senior-sm font-semibold text-primary hover:bg-primary hover:text-white
                                         transition-all"
                              >
                                {suggestion}
                              </button>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Items List */}
                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {selectedList.items.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <div className="text-4xl mb-2">📝</div>
                        <p className="text-senior-base">Nog geen items. Voeg er een toe!</p>
                      </div>
                    ) : (
                      selectedList.items.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center gap-4 p-4 rounded-xl border-4 transition-all
                            ${item.checked
                              ? 'bg-green-50 border-green-300 line-through'
                              : 'bg-neutral-cream border-neutral-stone hover:border-primary'
                            }`}
                        >
                          <button
                            onClick={() => toggleItem(selectedList.id, item.id)}
                            className={`flex-shrink-0 w-10 h-10 rounded-xl border-4 font-bold text-senior-xl
                              transition-all flex items-center justify-center
                              ${item.checked
                                ? 'bg-green-500 text-white border-green-600'
                                : 'bg-white border-primary hover:bg-primary/10'
                              }`}
                            aria-label={item.checked ? 'Afvinken ongedaan maken' : 'Afvinken'}
                          >
                            {item.checked ? '✓' : ''}
                          </button>
                          <div className="flex-1">
                            <p className={`text-senior-base font-semibold ${item.checked ? 'text-gray-500' : 'text-gray-800'}`}>
                              {item.text}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteItem(selectedList.id, item.id)}
                            className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-100 text-red-600
                                     hover:bg-red-200 border-2 border-red-300 font-bold text-senior-lg
                                     transition-all flex items-center justify-center"
                            aria-label="Verwijderen"
                            title="Verwijderen"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-8 text-center">
                  <div className="text-6xl mb-4">📋</div>
                  <h2 className="text-senior-xl font-bold text-primary mb-2">
                    Maak uw eerste lijstje!
                  </h2>
                  <p className="text-senior-base text-gray-600 mb-6">
                    Klik op "Nieuw Lijstje" om te beginnen
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="text-senior-base font-bold text-blue-900 mb-2 text-center">
              💡 Tips
            </h3>
            <ul className="text-senior-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Maak verschillende lijstjes voor verschillende doeleinden (boodschappen, reis, verjaardag, etc.)</li>
              <li>Uw lijstjes worden automatisch opgeslagen</li>
              <li>Klik op het vinkje om items af te vinken</li>
              <li>Verwijder afgevinkte items met "Afgevinkte items wissen"</li>
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
}

