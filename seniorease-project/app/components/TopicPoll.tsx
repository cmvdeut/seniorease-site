'use client';

import { useState } from 'react';

type PollOption = {
  id: string;
  emoji: string;
  label: string;
  placeholder: string;
};

const pollOptions: PollOption[] = [
  { 
    id: 'bibliotheek', 
    emoji: '📚', 
    label: 'Bibliotheek tips & tricks',
    placeholder: 'Bijvoorbeeld: Hoe scan ik een barcode? Hoe organiseer ik mijn boeken?'
  },
  { 
    id: 'video', 
    emoji: '🎬', 
    label: 'Nieuwe video tutorials',
    placeholder: 'Bijvoorbeeld: Video over de bibliotheek, video over de kalender...'
  },
  { 
    id: 'tech', 
    emoji: '💡', 
    label: 'Handige technologie tips',
    placeholder: 'Bijvoorbeeld: Smartphone tips, computer tips, internet tips...'
  },
  { 
    id: 'app', 
    emoji: '📱', 
    label: 'App updates & features',
    placeholder: 'Bijvoorbeeld: Nieuwe functie voor bibliotheek, verbetering van de app...'
  },
  { 
    id: 'faq', 
    emoji: '❓', 
    label: 'Veelgestelde vragen',
    placeholder: 'Bijvoorbeeld: Hoe werkt de licentie? Hoe installeer ik de app?'
  },
  { 
    id: 'website', 
    emoji: '🎨', 
    label: 'Website verbeteringen',
    placeholder: 'Bijvoorbeeld: Nieuwe tool, design verbetering, nieuwe functie...'
  },
];

export default function TopicPoll() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<Record<string, string>>({});
  const [otherTopic, setOtherTopic] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showOther, setShowOther] = useState(false);

  const handleOptionToggle = (optionId: string) => {
    if (selectedOptions.includes(optionId)) {
      // Verwijder optie en bijbehorende suggestie
      setSelectedOptions(selectedOptions.filter(id => id !== optionId));
      const newSuggestions = { ...suggestions };
      delete newSuggestions[optionId];
      setSuggestions(newSuggestions);
    } else {
      // Voeg optie toe
      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  const handleSuggestionChange = (optionId: string, value: string) => {
    setSuggestions({
      ...suggestions,
      [optionId]: value,
    });
  };

  const handleSubmit = async () => {
    if (selectedOptions.length === 0 && !otherTopic.trim()) {
      alert('Selecteer minimaal één onderwerp of vul een eigen suggestie in');
      return;
    }

    const results = {
      selected: selectedOptions,
      suggestions: suggestions,
      other: otherTopic.trim(),
      timestamp: new Date().toISOString(),
    };
    
    // Sla ook lokaal op (backup)
    localStorage.setItem('seniorease-poll-results', JSON.stringify(results));
    
    // Stuur naar server
    try {
      const response = await fetch('/api/poll-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(results),
      });

      if (response.ok) {
        // Toon bedankt bericht
        setSubmitted(true);
        
        // Reset na 5 seconden
        setTimeout(() => {
          setSelectedOptions([]);
          setSuggestions({});
          setOtherTopic('');
          setSubmitted(false);
          setShowOther(false);
        }, 5000);
      } else {
        alert('Er ging iets mis bij het verzenden. Uw feedback is lokaal opgeslagen.');
        setSubmitted(true);
        setTimeout(() => {
          setSelectedOptions([]);
          setSuggestions({});
          setOtherTopic('');
          setSubmitted(false);
          setShowOther(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting poll:', error);
      alert('Er ging iets mis bij het verzenden. Uw feedback is lokaal opgeslagen.');
      setSubmitted(true);
      setTimeout(() => {
        setSelectedOptions([]);
        setSuggestions({});
        setOtherTopic('');
        setSubmitted(false);
        setShowOther(false);
      }, 5000);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border-4 border-green-400 rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-senior-xl font-bold text-green-800 mb-2">
          Bedankt voor uw feedback!
        </h3>
        <p className="text-senior-base text-green-700">
          We houden rekening met uw voorkeuren bij het maken van nieuwe content.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-6 md:p-8">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">📊</div>
        <h2 className="text-senior-xl md:text-senior-2xl font-bold text-primary mb-2">
          Welke onderwerpen wilt u graag besproken zien?
        </h2>
        <p className="text-senior-base text-gray-600">
          Help ons betere content te maken door uw voorkeuren te delen
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {pollOptions.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          return (
            <div key={option.id} className="space-y-2">
              <label
                className="flex items-center p-4 bg-neutral-cream rounded-xl border-2 border-transparent hover:border-primary cursor-pointer transition-all"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleOptionToggle(option.id)}
                  className="w-6 h-6 text-primary border-2 border-gray-300 rounded focus:ring-primary focus:ring-2 mr-4 cursor-pointer"
                />
                <span className="text-2xl mr-3">{option.emoji}</span>
                <span className="text-senior-base font-medium text-gray-800 flex-1">
                  {option.label}
                </span>
              </label>
              
              {/* Suggestie veld verschijnt wanneer aangevinkt */}
              {isSelected && (
                <div className="ml-10 mr-2 mb-2">
                  <label className="block text-senior-sm font-medium text-gray-700 mb-2">
                    💬 Uw suggestie voor "{option.label}":
                  </label>
                  <textarea
                    value={suggestions[option.id] || ''}
                    onChange={(e) => handleSuggestionChange(option.id, e.target.value)}
                    placeholder={option.placeholder}
                    className="w-full p-4 border-2 border-primary rounded-xl text-senior-base focus:ring-2 focus:ring-primary focus:border-primary resize-none bg-white"
                    rows={2}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Andere onderwerpen */}
      <div className="mb-6">
        <label className="flex items-center p-4 bg-neutral-cream rounded-xl border-2 border-transparent hover:border-primary cursor-pointer transition-all mb-3">
          <input
            type="checkbox"
            checked={showOther}
            onChange={(e) => setShowOther(e.target.checked)}
            className="w-6 h-6 text-primary border-2 border-gray-300 rounded focus:ring-primary focus:ring-2 mr-4 cursor-pointer"
          />
          <span className="text-2xl mr-3">📖</span>
          <span className="text-senior-base font-medium text-gray-800">
            Andere onderwerpen
          </span>
        </label>
        
        {showOther && (
          <textarea
            value={otherTopic}
            onChange={(e) => setOtherTopic(e.target.value)}
            placeholder="Beschrijf hier uw suggestie..."
            className="w-full p-4 border-2 border-primary rounded-xl text-senior-base focus:ring-2 focus:ring-primary focus:border-primary resize-none"
            rows={3}
          />
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-primary text-white px-8 py-4 rounded-xl text-senior-lg font-bold
                 hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        📊 Stem Nu
      </button>

      <p className="text-senior-xs text-gray-500 text-center mt-4">
        U kunt meerdere onderwerpen selecteren
      </p>
    </div>
  );
}

