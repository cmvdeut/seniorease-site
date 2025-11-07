'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Birthday {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD format
  category: 'kinderen' | 'kleinkinderen' | 'vrienden' | 'familie' | 'anders';
  notes?: string;
}

type CategoryFilter = 'alle' | 'kinderen' | 'kleinkinderen' | 'vrienden' | 'familie' | 'anders';
type ViewMode = 'week' | 'maand' | 'jaar';

export default function KalenderPage() {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>('alle');
  const [viewMode, setViewMode] = useState<ViewMode>('maand');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateForAdd, setSelectedDateForAdd] = useState<Date | null>(null);
  
  // Form state
  const [formName, setFormName] = useState('');
  const [formMonth, setFormMonth] = useState('');
  const [formDay, setFormDay] = useState('');
  const [formCategory, setFormCategory] = useState<Birthday['category']>('familie');
  const [formNotes, setFormNotes] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('seniorease-birthdays');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBirthdays(parsed);
      } catch (e) {
        console.error('Error loading birthdays:', e);
      }
    }
  }, []);

  // Save to localStorage whenever birthdays change
  useEffect(() => {
    if (birthdays.length > 0) {
      localStorage.setItem('seniorease-birthdays', JSON.stringify(birthdays));
    } else {
      localStorage.removeItem('seniorease-birthdays');
    }
  }, [birthdays]);

  const resetForm = () => {
    setFormName('');
    setFormMonth('');
    setFormDay('');
    setFormCategory('familie');
    setFormNotes('');
    setEditingId(null);
    setSelectedDateForAdd(null);
    setShowAddForm(false);
  };

  const openAddFormForDate = (date: Date) => {
    setFormMonth(String(date.getMonth() + 1));
    setFormDay(String(date.getDate()));
    setSelectedDateForAdd(date);
    setShowAddForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formName.trim() && formMonth && formDay) {
      // Use year 2000 as placeholder (leap year, so Feb 29 is valid)
      const month = formMonth.padStart(2, '0');
      const day = formDay.padStart(2, '0');
      const dateString = `2000-${month}-${day}`;
      
      if (editingId) {
        // Update existing
        setBirthdays(birthdays.map(b => 
          b.id === editingId 
            ? { ...b, name: formName.trim(), date: dateString, category: formCategory, notes: formNotes.trim() }
            : b
        ));
      } else {
        // Add new
        const newBirthday: Birthday = {
          id: Date.now().toString(),
          name: formName.trim(),
          date: dateString,
          category: formCategory,
          notes: formNotes.trim() || undefined
        };
        setBirthdays([...birthdays, newBirthday]);
      }
      resetForm();
    }
  };

  const startEdit = (birthday: Birthday) => {
    setFormName(birthday.name);
    // Extract month and day from date (format: YYYY-MM-DD)
    const [, month, day] = birthday.date.split('-');
    setFormMonth(month);
    setFormDay(day);
    setFormCategory(birthday.category);
    setFormNotes(birthday.notes || '');
    setEditingId(birthday.id);
    setShowAddForm(true);
  };

  const deleteBirthday = (id: string) => {
    if (confirm('Weet u zeker dat u deze verjaardag wilt verwijderen?')) {
      setBirthdays(birthdays.filter(b => b.id !== id));
    }
  };

  // Get filtered birthdays
  const filteredBirthdays = selectedFilter === 'alle' 
    ? birthdays 
    : birthdays.filter(b => b.category === selectedFilter);

  // Sort by next occurrence (this year or next year)
  const getNextOccurrence = (date: string): Date => {
    const today = new Date();
    const [year, month, day] = date.split('-').map(Number);
    const thisYear = new Date(today.getFullYear(), month - 1, day);
    const nextYear = new Date(today.getFullYear() + 1, month - 1, day);
    return thisYear >= today ? thisYear : nextYear;
  };

  const sortedBirthdays = [...filteredBirthdays].sort((a, b) => {
    const dateA = getNextOccurrence(a.date);
    const dateB = getNextOccurrence(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  // Get upcoming birthdays (next 30 days)
  const getUpcomingBirthdays = () => {
    const today = new Date();
    const in30Days = new Date(today);
    in30Days.setDate(today.getDate() + 30);
    
    return sortedBirthdays.filter(birthday => {
      const nextOccurrence = getNextOccurrence(birthday.date);
      return nextOccurrence >= today && nextOccurrence <= in30Days;
    });
  };

  const upcomingBirthdays = getUpcomingBirthdays();

  // Format date for display
  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-').map(Number);
    const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 
                    'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
    return `${day} ${months[month - 1]}`;
  };

  // Get days until birthday
  const getDaysUntil = (date: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextOccurrence = getNextOccurrence(date);
    nextOccurrence.setHours(0, 0, 0, 0);
    const diff = nextOccurrence.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Get category icon and color
  const getCategoryInfo = (category: Birthday['category']) => {
    switch (category) {
      case 'kinderen':
        return { icon: '👨‍👩‍👧‍👦', color: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'kleinkinderen':
        return { icon: '👶', color: 'bg-pink-100 text-pink-800 border-pink-300' };
      case 'vrienden':
        return { icon: '👫', color: 'bg-green-100 text-green-800 border-green-300' };
      case 'familie':
        return { icon: '👨‍👩‍👧', color: 'bg-purple-100 text-purple-800 border-purple-300' };
      default:
        return { icon: '👤', color: 'bg-gray-100 text-gray-800 border-gray-300' };
    }
  };

  const categories: { value: CategoryFilter; label: string; icon: string }[] = [
    { value: 'alle', label: 'Alle', icon: '📅' },
    { value: 'kinderen', label: 'Kinderen', icon: '👨‍👩‍👧‍👦' },
    { value: 'kleinkinderen', label: 'Kleinkinderen', icon: '👶' },
    { value: 'vrienden', label: 'Vrienden', icon: '👫' },
    { value: 'familie', label: 'Familie', icon: '👨‍👩‍👧' },
    { value: 'anders', label: 'Anders', icon: '👤' }
  ];

  // Calendar helper functions
  const getBirthdaysForDate = (date: Date): Birthday[] => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return filteredBirthdays.filter(birthday => {
      const [, bMonth, bDay] = birthday.date.split('-').map(Number);
      return bMonth === month && bDay === day;
    });
  };

  const getWeekDays = (): Date[] => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);
    
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const getMonthDays = (): (Date | null)[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Monday = 0
    
    const days: (Date | null)[] = [];
    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const getYearMonths = (): Date[] => {
    const year = currentDate.getFullYear();
    const months: Date[] = [];
    for (let month = 0; month < 12; month++) {
      months.push(new Date(year, month, 1));
    }
    return months;
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (viewMode === 'maand') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'jaar') {
      newDate.setFullYear(newDate.getFullYear() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatMonthYear = (date: Date): string => {
    const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 
                    'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const formatWeekRange = (): string => {
    const weekDays = getWeekDays();
    const start = weekDays[0];
    const end = weekDays[6];
    const months = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 
                    'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
    if (start.getMonth() === end.getMonth()) {
      return `${start.getDate()}-${end.getDate()} ${months[start.getMonth()]} ${start.getFullYear()}`;
    }
    return `${start.getDate()} ${months[start.getMonth()]} - ${end.getDate()} ${months[end.getMonth()]} ${start.getFullYear()}`;
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
                width={50} 
                height={50}
                className="w-12 h-12"
              />
              <div>
                <h1 className="text-senior-xl font-bold text-primary">Verjaardagskalender</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Upcoming Birthdays Alert */}
          {upcomingBirthdays.length > 0 && (
            <div className="mb-6 bg-yellow-50 border-4 border-yellow-400 rounded-xl p-6">
              <h2 className="text-senior-lg font-bold text-yellow-900 mb-3 flex items-center gap-2">
                🎉 Aankomende Verjaardagen (binnen 30 dagen)
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {upcomingBirthdays.map(birthday => {
                  const daysUntil = getDaysUntil(birthday.date);
                  const categoryInfo = getCategoryInfo(birthday.category);
                  return (
                    <div
                      key={birthday.id}
                      className={`p-4 rounded-xl border-4 ${categoryInfo.color}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{categoryInfo.icon}</span>
                          <span className="text-senior-base font-bold">{birthday.name}</span>
                        </div>
                      </div>
                      <div className="text-senior-sm">
                        <div>{formatDate(birthday.date)}</div>
                        {daysUntil === 0 ? (
                          <div className="font-bold text-red-600 mt-1">🎂 Vandaag!</div>
                        ) : daysUntil === 1 ? (
                          <div className="font-bold text-orange-600 mt-1">Morgen!</div>
                        ) : (
                          <div className="text-gray-600 mt-1">Over {daysUntil} dagen</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedFilter(category.value)}
                  className={`px-6 py-3 rounded-xl text-senior-base font-bold transition-all border-4
                    ${selectedFilter === category.value
                      ? 'bg-primary text-white border-primary shadow-lg'
                      : 'bg-white text-primary border-neutral-stone hover:border-primary'
                    }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Selector */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setViewMode('week')}
                className={`px-6 py-3 rounded-xl text-senior-base font-bold transition-all border-4
                  ${viewMode === 'week'
                    ? 'bg-primary text-white border-primary shadow-lg'
                    : 'bg-white text-primary border-neutral-stone hover:border-primary'
                  }`}
              >
                📆 Week
              </button>
              <button
                onClick={() => setViewMode('maand')}
                className={`px-6 py-3 rounded-xl text-senior-base font-bold transition-all border-4
                  ${viewMode === 'maand'
                    ? 'bg-primary text-white border-primary shadow-lg'
                    : 'bg-white text-primary border-neutral-stone hover:border-primary'
                  }`}
              >
                📅 Maand
              </button>
              <button
                onClick={() => setViewMode('jaar')}
                className={`px-6 py-3 rounded-xl text-senior-base font-bold transition-all border-4
                  ${viewMode === 'jaar'
                    ? 'bg-primary text-white border-primary shadow-lg'
                    : 'bg-white text-primary border-neutral-stone hover:border-primary'
                  }`}
              >
                🗓️ Jaar
              </button>
            </div>
          </div>

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="mb-6 bg-white rounded-2xl shadow-xl border-4 border-primary p-6">
              <h2 className="text-senior-xl font-bold text-primary mb-4">
                {editingId ? 'Verjaardag bewerken' : 'Nieuwe verjaardag toevoegen'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-senior-sm font-bold text-gray-700 mb-2">
                    Naam *
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border-4 border-primary text-senior-base
                             focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Bijvoorbeeld: Jan Jansen"
                  />
                </div>
                
                <div>
                  <label className="block text-senior-sm font-bold text-gray-700 mb-2">
                    Verjaardag (maand en dag) *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-senior-xs text-gray-600 mb-1">Maand</label>
                      <select
                        value={formMonth}
                        onChange={(e) => setFormMonth(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border-4 border-primary text-senior-base
                                 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                      >
                        <option value="">Kies maand</option>
                        <option value="1">Januari</option>
                        <option value="2">Februari</option>
                        <option value="3">Maart</option>
                        <option value="4">April</option>
                        <option value="5">Mei</option>
                        <option value="6">Juni</option>
                        <option value="7">Juli</option>
                        <option value="8">Augustus</option>
                        <option value="9">September</option>
                        <option value="10">Oktober</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-senior-xs text-gray-600 mb-1">Dag</label>
                      <select
                        value={formDay}
                        onChange={(e) => setFormDay(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border-4 border-primary text-senior-base
                                 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                      >
                        <option value="">Kies dag</option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <p className="text-senior-xs text-gray-500 mt-1">
                    Alleen maand en dag zijn nodig, het geboortejaar niet.
                  </p>
                </div>


                <div>
                  <label className="block text-senior-sm font-bold text-gray-700 mb-2">
                    Notities (optioneel)
                  </label>
                  <textarea
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-4 border-primary text-senior-base
                             focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Bijvoorbeeld: Houdt van boeken, favoriete kleur: blauw..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white px-6 py-4 rounded-xl text-senior-lg font-bold
                             hover:bg-primary-dark transition-all shadow-lg border-4 border-primary"
                  >
                    {editingId ? '✓ Opslaan' : '+ Toevoegen'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        if (editingId && confirm('Weet u zeker dat u deze verjaardag wilt verwijderen?')) {
                          deleteBirthday(editingId);
                          resetForm();
                        }
                      }}
                      className="px-6 py-4 bg-red-600 text-white rounded-xl text-senior-base font-bold
                               hover:bg-red-700 transition-all border-4 border-red-700"
                    >
                      🗑️ Verwijderen
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-4 bg-gray-300 text-gray-700 rounded-xl text-senior-base font-bold
                             hover:bg-gray-400 transition-all border-4 border-gray-400"
                  >
                    Annuleren
                  </button>
                </div>
              </form>
            </div>
          )}


          {/* Calendar Title */}
          <div className="mb-6 text-center">
            <div className="text-senior-xl font-bold text-primary">
              {viewMode === 'week' && formatWeekRange()}
              {viewMode === 'maand' && formatMonthYear(currentDate)}
              {viewMode === 'jaar' && currentDate.getFullYear()}
            </div>
          </div>

          {/* Calendar Views */}
          {viewMode === 'week' && (
            <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-6">
              <div className="grid grid-cols-7 gap-2">
                {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((day, index) => (
                  <div key={index} className="text-center text-senior-sm font-bold text-gray-700 pb-2">
                    {day}
                  </div>
                ))}
                {getWeekDays().map((date, index) => {
                  const dayBirthdays = getBirthdaysForDate(date);
                  const isToday = date.toDateString() === new Date().toDateString();
                  return (
                    <div
                      key={index}
                      className={`min-h-[120px] p-2 rounded-xl border-4 cursor-pointer transition-all ${
                        isToday 
                          ? 'bg-yellow-100 border-yellow-500 shadow-lg ring-4 ring-yellow-300' 
                          : 'bg-neutral-cream border-neutral-stone hover:border-primary'
                      }`}
                      onClick={() => openAddFormForDate(date)}
                    >
                      <div className={`text-senior-base font-bold mb-1 flex items-center justify-between ${
                        isToday ? 'text-red-700' : 'text-gray-800'
                      }`}>
                        <span>{date.getDate()}</span>
                        {isToday && <span className="text-red-600">🎂</span>}
                      </div>
                      <div className="space-y-1">
                        {dayBirthdays.map(birthday => {
                          const catInfo = getCategoryInfo(birthday.category);
                          return (
                            <div
                              key={birthday.id}
                              className={`text-senior-xs p-1 rounded ${catInfo.color} cursor-pointer hover:opacity-80 flex items-center justify-between group`}
                              onClick={(e) => {
                                e.stopPropagation();
                                startEdit(birthday);
                              }}
                              title={birthday.name}
                            >
                              <div className="flex items-center flex-1 min-w-0">
                                <span className="mr-1">{catInfo.icon}</span>
                                <span className="truncate">{birthday.name}</span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (confirm('Weet u zeker dat u deze verjaardag wilt verwijderen?')) {
                                    deleteBirthday(birthday.id);
                                  }
                                }}
                                className="ml-2 text-red-600 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                                title="Verwijderen"
                              >
                                ×
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {viewMode === 'maand' && (
            <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-6">
              <div className="grid grid-cols-7 gap-2">
                {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((day, index) => (
                  <div key={index} className="text-center text-senior-sm font-bold text-gray-700 pb-2">
                    {day}
                  </div>
                ))}
                {getMonthDays().map((date, index) => {
                  if (!date) {
                    return <div key={index} className="min-h-[100px]"></div>;
                  }
                  const dayBirthdays = getBirthdaysForDate(date);
                  const isToday = date.toDateString() === new Date().toDateString();
                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 rounded-xl border-4 cursor-pointer transition-all ${
                        isToday 
                          ? 'bg-yellow-100 border-yellow-500 shadow-lg ring-4 ring-yellow-300' 
                          : 'bg-neutral-cream border-neutral-stone hover:border-primary'
                      }`}
                      onClick={() => openAddFormForDate(date)}
                    >
                      <div className={`text-senior-base font-bold mb-1 flex items-center justify-between ${
                        isToday ? 'text-red-700' : 'text-gray-800'
                      }`}>
                        <span>{date.getDate()}</span>
                        {isToday && <span className="text-red-600">🎂</span>}
                      </div>
                      <div className="space-y-1">
                        {dayBirthdays.slice(0, 3).map(birthday => {
                          const catInfo = getCategoryInfo(birthday.category);
                          return (
                            <div
                              key={birthday.id}
                              className={`text-senior-xs p-1 rounded ${catInfo.color} cursor-pointer hover:opacity-80 flex items-center justify-between group`}
                              onClick={(e) => {
                                e.stopPropagation();
                                startEdit(birthday);
                              }}
                              title={birthday.name}
                            >
                              <div className="flex items-center flex-1 min-w-0">
                                <span className="mr-1">{catInfo.icon}</span>
                                <span className="truncate">{birthday.name}</span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (confirm('Weet u zeker dat u deze verjaardag wilt verwijderen?')) {
                                    deleteBirthday(birthday.id);
                                  }
                                }}
                                className="ml-2 text-red-600 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity font-bold flex-shrink-0"
                                title="Verwijderen"
                              >
                                ×
                              </button>
                            </div>
                          );
                        })}
                        {dayBirthdays.length > 3 && (
                          <div className="text-senior-xs text-gray-600 font-semibold">
                            +{dayBirthdays.length - 3} meer
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {viewMode === 'jaar' && (
            <div className="bg-white rounded-2xl shadow-xl border-4 border-primary p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getYearMonths().map((monthDate, index) => {
                  const month = monthDate.getMonth();
                  const year = monthDate.getFullYear();
                  const monthBirthdays = filteredBirthdays.filter(birthday => {
                    const [, bMonth] = birthday.date.split('-').map(Number);
                    return bMonth === month + 1;
                  });
                  const months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 
                                'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
                  
                  return (
                    <div key={index} className="border-4 border-neutral-stone rounded-xl p-4 bg-neutral-cream">
                      <h3 className="text-senior-base font-bold text-primary mb-3 text-center">
                        {months[month]}
                      </h3>
                      <div className="space-y-2">
                        {monthBirthdays.length === 0 ? (
                          <p className="text-senior-xs text-gray-500 text-center py-4">Geen verjaardagen</p>
                        ) : (
                          monthBirthdays.map(birthday => {
                            const catInfo = getCategoryInfo(birthday.category);
                            const [, , day] = birthday.date.split('-').map(Number);
                            return (
                              <div
                                key={birthday.id}
                                className={`p-2 rounded ${catInfo.color} cursor-pointer hover:opacity-80 flex items-center justify-between group`}
                                onClick={() => startEdit(birthday)}
                              >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <span className="text-senior-sm font-bold">{day}</span>
                                  <span className="text-2xl">{catInfo.icon}</span>
                                  <span className="text-senior-xs font-semibold truncate">{birthday.name}</span>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm('Weet u zeker dat u deze verjaardag wilt verwijderen?')) {
                                      deleteBirthday(birthday.id);
                                    }
                                  }}
                                  className="ml-2 text-red-600 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity font-bold text-senior-base"
                                  title="Verwijderen"
                                >
                                  ×
                                </button>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}


          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="text-senior-base font-bold text-blue-900 mb-2 text-center">
              💡 Tips
            </h3>
            <ul className="text-senior-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Verjaardagen worden automatisch opgeslagen</li>
              <li>Gebruik de filters om specifieke categorieën te bekijken</li>
              <li>Aankomende verjaardagen (binnen 30 dagen) worden bovenaan getoond</li>
              <li>Voeg notities toe voor cadeautips of andere belangrijke informatie</li>
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
}

