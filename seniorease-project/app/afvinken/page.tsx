'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AddToHomeScreen from '../components/AddToHomeScreen';
import ChecklistPicker from './ChecklistPicker';
import type { TemplatePack } from './templates';

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

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
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
  // Alleen voor suggesties filteren — het veld zelf is uncontrolled (voorkomt achterstevoren typen op telefoon)
  const [newItemText, setNewItemText] = useState('');
  const [newListName, setNewListName] = useState('');
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [wizardTip, setWizardTip] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const itemInputRef = useRef<HTMLInputElement>(null);
  const listNameInputRef = useRef<HTMLInputElement>(null);
  const listsSectionRef = useRef<HTMLDivElement>(null);
  const mainListRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('seniorease-checklists-v4');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setChecklists(parsed);
          setSelectedListId(parsed[0].id);
        }
      } catch (e) {
        console.error('Error loading checklists:', e);
      }
    }
    setHydrated(true);
  }, []);

  // Save to localStorage whenever checklists change (na eerste load)
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('seniorease-checklists-v4', JSON.stringify(checklists));
  }, [checklists, hydrated]);

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

  const focusList = (listId: string) => {
    setSelectedListId(listId);
    window.setTimeout(() => {
      mainListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const createNewList = () => {
    const name = (listNameInputRef.current?.value ?? newListName).trim();
    if (name) {
      const newList: Checklist = {
        id: makeId('list'),
        name,
        items: [],
      };
      setChecklists((prev) => [...prev, newList]);
      focusList(newList.id);
      setNewListName('');
      if (listNameInputRef.current) listNameInputRef.current.value = '';
      setShowNewListForm(false);
      setWizardTip('');
    }
  };

  const applyPacks = (packs: TemplatePack[], label: string) => {
    const existingNames = new Set(checklists.map((l) => l.name));
    const allAlreadyThere = packs.every((pack) =>
      pack.lists.every((t) => existingNames.has(t.name))
    );

    if (allAlreadyThere) {
      const firstName = packs[0]?.lists[0]?.name;
      const existing = checklists.find((l) => l.name === firstName);
      if (existing) focusList(existing.id);
      setWizardTip(`${label} staat al klaar — open een lijstje hieronder.`);
      return;
    }

    const stamp = Date.now();
    const fresh: Checklist[] = [];

    packs.forEach((pack, packIndex) => {
      pack.lists.forEach((t, index) => {
        if (existingNames.has(t.name)) return;
        existingNames.add(t.name);
        fresh.push({
          id: `tpl-${pack.id}-${stamp}-${packIndex}-${index}`,
          name: t.name,
          items: t.items.map((text, i) => ({
            id: `tpl-item-${stamp}-${packIndex}-${index}-${i}`,
            text,
            checked: false,
          })),
        });
      });
    });

    if (fresh.length === 0) return;

    setChecklists((prev) => [...prev, ...fresh]);
    focusList(fresh[0].id);
    setWizardTip(`${label}: ${fresh.length} lijstje${fresh.length === 1 ? '' : 's'} toegevoegd.`);
  };

  const deleteList = (listId: string) => {
    const list = checklists.find((l) => l.id === listId);
    const label = list?.name ?? 'dit lijstje';
    if (!window.confirm(`Wilt u "${label}" verwijderen?`)) return;

    const updated = checklists.filter((l) => l.id !== listId);
    setChecklists(updated);
    if (selectedListId === listId) {
      setSelectedListId(updated.length > 0 ? updated[0].id : null);
    }
    setWizardTip('Lijstje verwijderd.');
  };

  const deleteAllLists = () => {
    if (checklists.length === 0) return;
    if (
      !window.confirm(
        `Wilt u alle ${checklists.length} lijstjes verwijderen? Dit kunt u niet ongedaan maken.`
      )
    ) {
      return;
    }
    setChecklists([]);
    setSelectedListId(null);
    setWizardTip('Alle lijstjes zijn verwijderd.');
  };

  const clearItemInput = () => {
    if (itemInputRef.current) itemInputRef.current.value = '';
    setNewItemText('');
    setShowSuggestions(false);
  };

  const addItem = (text?: string) => {
    const typed = (itemInputRef.current?.value ?? newItemText).trim();
    const itemText = (text ?? typed).trim();
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
      clearItemInput();
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
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link 
              href="/tools"
              className="inline-flex items-center gap-3 text-primary hover:text-primary-dark transition-colors font-semibold"
            >
              <span className="text-3xl">←</span>
              <span className="text-senior-base">Terug naar tools</span>
            </Link>
            <div className="flex items-center gap-3">
              <Image 
                src="/images/tools/notities.png" 
                alt="" 
                width={64} 
                height={64}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <h1 className="text-senior-xl font-bold text-primary">Afvinken maar!</h1>
              </div>
            </div>
            <Link
              href="/animaties/afvinken"
              className="bg-accent text-white px-6 py-3 rounded-xl text-senior-base font-bold
                       hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl
                       flex items-center gap-2 whitespace-nowrap"
            >
              <span>📹</span>
              <span>Bekijk uitleg</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <section
            className="mb-8 rounded-senior border border-navy/10 bg-slate p-5 sm:p-6"
            aria-labelledby="afvinken-install-title"
          >
            <h2
              id="afvinken-install-title"
              className="font-serif text-navy text-senior-lg font-semibold text-center m-0 mb-2"
            >
              Zet Afvinken op uw telefoon
            </h2>
            <p className="text-senior-sm text-navy/70 text-center m-0 mb-5">
              Dan opent u het met één tik, zoals een app.
            </p>
            <div className="max-w-md mx-auto">
              <AddToHomeScreen label="Zet op beginscherm" />
            </div>
          </section>

          {/* Lists Sidebar & Main Content */}
          <div className="grid md:grid-cols-4 gap-6">
            
            {/* Sidebar - Lists */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border-4 border-primary p-4">
                <h2 className="text-senior-lg font-bold text-primary mb-2 text-center">
                  Mijn Lijstjes
                </h2>
                <p className="text-senior-xs text-gray-500 text-center mb-4 m-0 leading-snug">
                  Begin leeg, of kies een checklist-categorie.
                </p>

                <div className="mb-4">
                  {!showNewListForm ? (
                    <button
                      type="button"
                      onClick={() => setShowNewListForm(true)}
                      className="w-full min-h-[52px] bg-primary text-white py-3 rounded-xl text-senior-base font-bold
                               hover:bg-primary-dark active:bg-primary-dark transition-all shadow-lg border-4 border-primary
                               touch-manipulation"
                    >
                      + Lege lijst
                    </button>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        createNewList();
                      }}
                    >
                      <input
                        ref={listNameInputRef}
                        type="text"
                        defaultValue=""
                        onChange={(e) => setNewListName(e.target.value)}
                        placeholder="Naam lijstje..."
                        enterKeyHint="done"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        dir="ltr"
                        className="w-full min-h-[52px] px-4 py-3 rounded-xl border-4 border-primary text-senior-base mb-2
                                 focus:outline-none focus:ring-2 focus:ring-primary"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onPointerDown={(e) => {
                            e.preventDefault();
                            createNewList();
                          }}
                          className="flex-1 min-h-[48px] bg-primary text-white py-3 rounded-xl text-senior-base font-bold
                                   hover:bg-primary-dark active:bg-primary-dark transition-all touch-manipulation"
                        >
                          ✓ Klaar
                        </button>
                        <button
                          type="button"
                          onPointerDown={(e) => {
                            e.preventDefault();
                            setShowNewListForm(false);
                            setNewListName('');
                            if (listNameInputRef.current) listNameInputRef.current.value = '';
                          }}
                          className="flex-1 min-h-[48px] bg-gray-300 text-gray-700 py-3 rounded-xl text-senior-base font-bold
                                   hover:bg-gray-400 active:bg-gray-400 transition-all touch-manipulation"
                        >
                          ✕
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                <div className="mb-4 pt-3 border-t-2 border-gray-100">
                  <p className="text-senior-xs font-semibold text-navy mb-3 text-center m-0">
                    Klaar-voor-gebruik checklists
                  </p>
                  <ChecklistPicker
                    onCreate={applyPacks}
                    alreadyHasListNames={new Set(checklists.map((l) => l.name))}
                  />
                  {wizardTip ? (
                    <p className="text-senior-xs text-green-800 bg-green-50 border border-green-200 rounded-lg px-3 py-2 mt-3 m-0 leading-snug">
                      {wizardTip}
                    </p>
                  ) : null}
                </div>

                {checklists.length > 0 && (
                  <div ref={listsSectionRef} className="space-y-2 pt-3 border-t-2 border-gray-100">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <p className="text-senior-xs font-semibold text-gray-600 text-center m-0 flex-1">
                        Uw lijstjes ({checklists.length})
                      </p>
                    </div>
                    <button
                      type="button"
                      onPointerDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteAllLists();
                      }}
                      className="w-full min-h-[44px] mb-2 rounded-xl border-2 border-red-300 bg-red-50 text-red-700 text-senior-xs font-bold touch-manipulation hover:bg-red-100"
                    >
                      Alle lijstjes wissen
                    </button>
                    <div className="max-h-[280px] overflow-y-auto space-y-2">
                      {checklists.map((list) => (
                        <div
                          key={list.id}
                          className={`p-3 rounded-xl border-4 transition-all
                            ${selectedListId === list.id
                              ? 'bg-primary text-white border-primary shadow-lg'
                              : 'bg-neutral-cream border-neutral-stone hover:border-primary'
                            }`}
                        >
                          <button
                            type="button"
                            className="w-full text-left touch-manipulation"
                            onClick={() => focusList(list.id)}
                          >
                            <div className={`text-senior-sm font-bold truncate ${selectedListId === list.id ? 'text-white' : 'text-gray-800'}`}>
                              {list.name}
                            </div>
                            <div className={`text-senior-xs ${selectedListId === list.id ? 'text-white/80' : 'text-gray-500'}`}>
                              {list.items.filter((i) => i.checked).length}/{list.items.length} afgevinkt
                            </div>
                          </button>
                          <button
                            type="button"
                            onPointerDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              deleteList(list.id);
                            }}
                            className={`mt-2 w-full min-h-[44px] rounded-lg text-senior-xs font-bold border-2 touch-manipulation
                              ${
                                selectedListId === list.id
                                  ? 'bg-white/15 border-white/40 text-white hover:bg-white/25'
                                  : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'
                              }`}
                          >
                            Verwijderen
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content - Selected List */}
            <div className="md:col-span-3" ref={mainListRef}>
              {selectedList ? (
                <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-6 md:p-8">
                  {/* List Header */}
                  <div className="mb-6">
                    <h2 className="text-senior-2xl font-bold text-primary mb-2">
                      {selectedList.name}
                    </h2>
                    <div className="flex items-center gap-4 text-senior-sm text-gray-600 flex-wrap mb-3">
                      <span>
                        {selectedList.items.filter(item => item.checked).length} / {selectedList.items.length} afgevinkt
                      </span>
                      <div className="flex gap-3 flex-wrap">
                        {selectedList.items.some(item => item.checked) && (
                          <button
                            type="button"
                            onClick={clearCompleted}
                            className="text-orange-600 hover:text-orange-800 font-semibold underline"
                          >
                            Afgevinkte items wissen
                          </button>
                        )}
                        {selectedList.items.length > 0 && (
                          <button
                            type="button"
                            onClick={clearAllItems}
                            className="text-red-600 hover:text-red-800 font-semibold underline"
                          >
                            Hele lijst wissen
                          </button>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onPointerDown={(e) => {
                        e.preventDefault();
                        deleteList(selectedList.id);
                      }}
                      className="min-h-[48px] px-5 rounded-xl border-2 border-red-300 bg-red-50 text-red-700 text-senior-sm font-bold touch-manipulation hover:bg-red-100"
                    >
                      Dit lijstje verwijderen
                    </button>
                  </div>

                  {/* Add Item Form — uncontrolled input (geen cursor-reset op telefoon) */}
                  <div className="mb-6 relative">
                    <form
                      className="flex flex-col sm:flex-row gap-3"
                      onSubmit={(e) => {
                        e.preventDefault();
                        addItem();
                      }}
                    >
                      <div className="flex-1 relative">
                        <input
                          ref={itemInputRef}
                          type="text"
                          defaultValue=""
                          onChange={(e) => {
                            setNewItemText(e.target.value);
                            setShowSuggestions(true);
                          }}
                          onFocus={() => setShowSuggestions(true)}
                          onBlur={() => {
                            // Longer delay: mobile taps suggestions after keyboard closes
                            setTimeout(() => setShowSuggestions(false), 400);
                          }}
                          enterKeyHint="done"
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="sentences"
                          spellCheck={false}
                          dir="ltr"
                          inputMode="text"
                          placeholder="Nieuw item toevoegen..."
                          className="w-full min-h-[56px] px-4 py-4 rounded-xl border-4 border-primary text-senior-base
                                   focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        
                        {/* Suggestions Dropdown */}
                        {showSuggestions && filteredSuggestions.length > 0 && (
                          <div className="absolute z-20 w-full mt-2 bg-white rounded-xl shadow-xl border-4 border-primary overflow-hidden">
                            <div className="max-h-48 overflow-y-auto overscroll-contain">
                              {filteredSuggestions.map((suggestion, index) => (
                                <button
                                  key={suggestion}
                                  type="button"
                                  onPointerDown={(e) => {
                                    // Prevent input blur from swallowing the tap on mobile
                                    e.preventDefault();
                                    selectSuggestion(suggestion);
                                  }}
                                  className="w-full text-left px-4 py-3.5 min-h-[48px] text-senior-base hover:bg-primary/10 active:bg-primary/20
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
                        type="button"
                        onPointerDown={(e) => {
                          // Prevent blur + layout jump; add exactly what was typed
                          e.preventDefault();
                          addItem();
                        }}
                        className="w-full sm:w-auto bg-primary text-white px-6 py-4 rounded-xl text-senior-lg font-bold
                                 hover:bg-primary-dark active:bg-primary-dark transition-all shadow-lg border-4 border-primary
                                 min-h-[56px] sm:min-w-[140px] touch-manipulation"
                      >
                        + Toevoegen
                      </button>
                    </form>
                    
                    {/* Show all suggestions when input is empty */}
                    {newItemText.trim() === '' && showSuggestions && selectedList && (
                      <div className="mt-3">
                        <p className="text-senior-xs text-gray-600 mb-2 font-semibold">
                          💡 Suggesties voor "{selectedList.name}":
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {getSuggestions(selectedList.name)
                            .filter(suggestion => 
                              !selectedList.items.some(item => item.text.toLowerCase() === suggestion.toLowerCase())
                            )
                            .slice(0, 10)
                            .map((suggestion) => (
                              <button
                                key={suggestion}
                                type="button"
                                onPointerDown={(e) => {
                                  e.preventDefault();
                                  selectSuggestion(suggestion);
                                }}
                                className="px-4 py-3 min-h-[44px] bg-neutral-cream border-2 border-primary rounded-lg
                                         text-senior-sm font-semibold text-primary hover:bg-primary hover:text-white
                                         active:bg-primary active:text-white transition-all touch-manipulation"
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
                    Links: een <strong>lege lijst</strong>, of klap een categorie open —
                    vakantie, stedentrip, feest & gelegenheid of boodschappen.
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

