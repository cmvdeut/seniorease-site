'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Dagelijkse puzzel rotatie op basis van datum
function getDailyPuzzleType(): string {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const puzzleTypes = ['sudoku', 'woordzoeker', 'kruiswoord', 'memory'];
  return puzzleTypes[dayOfYear % puzzleTypes.length];
}

// Sudoku Component
function Sudoku() {
  const [board, setBoard] = useState<(number | null)[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  // Genereer een simpele senior-friendly Sudoku
  useEffect(() => {
    const newPuzzle = generateSudoku(difficulty);
    setBoard(newPuzzle.puzzle);
    setSolution(newPuzzle.solution);
    
    // Laad voortgang uit localStorage
    const saved = localStorage.getItem(`sudoku-${getTodayKey()}-${difficulty}`);
    if (saved) {
      const data = JSON.parse(saved);
      setBoard(data.board);
      setMistakes(data.mistakes || 0);
      setHintsUsed(data.hintsUsed || 0);
      setCompleted(data.completed || false);
    } else {
      setMistakes(0);
      setHintsUsed(0);
      setCompleted(false);
    }
  }, [difficulty]);

  // Save voortgang
  useEffect(() => {
    if (board.length > 0) {
      localStorage.setItem(`sudoku-${getTodayKey()}-${difficulty}`, JSON.stringify({
        board,
        mistakes,
        hintsUsed,
        completed
      }));
    }
  }, [board, mistakes, hintsUsed, completed, difficulty]);

  function getTodayKey() {
    return new Date().toISOString().split('T')[0];
  }

  function generateSudoku(level: 'easy' | 'medium' | 'hard' = 'easy') {
    // Simpele vooraf gemaakte Sudoku voor senioren
    const solution = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];

    const puzzle: (number | null)[][] = solution.map(row => [...row]);
    
    // Aantal cellen verwijderen op basis van moeilijkheidsgraad
    let cellsToRemove: number;
    if (level === 'easy') {
      cellsToRemove = 35; // Makkelijk: veel nummers blijven staan
    } else if (level === 'medium') {
      cellsToRemove = 45; // Gemiddeld
    } else {
      cellsToRemove = 55; // Moeilijk: weinig nummers blijven staan
    }
    
    let removed = 0;
    while (removed < cellsToRemove) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (puzzle[row][col] !== null) {
        puzzle[row][col] = null;
        removed++;
      }
    }

    return { puzzle, solution };
  }

  function handleCellClick(row: number, col: number) {
    if (solution[row] && solution[row][col] && board[row][col] === null) {
      setSelectedCell([row, col]);
    }
  }

  function handleNumberInput(num: number) {
    if (!selectedCell) return;
    const [row, col] = selectedCell;
    
    if (solution[row][col] === num) {
      const newBoard = board.map(r => [...r]);
      newBoard[row][col] = num;
      setBoard(newBoard);
      setSelectedCell(null);
      
      // Check of puzzel compleet is
      if (isPuzzleComplete(newBoard)) {
        setCompleted(true);
      }
    } else {
      setMistakes(mistakes + 1);
    }
  }

  function isPuzzleComplete(currentBoard: (number | null)[][]) {
    return currentBoard.every((row, i) => 
      row.every((cell, j) => cell === solution[i][j])
    );
  }

  function useHint() {
    if (!selectedCell) {
      alert('Selecteer eerst een vakje waar je een hint voor wilt!');
      return;
    }
    const [row, col] = selectedCell;
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = solution[row][col];
    setBoard(newBoard);
    setHintsUsed(hintsUsed + 1);
    setSelectedCell(null);
    
    if (isPuzzleComplete(newBoard)) {
      setCompleted(true);
    }
  }

  function resetPuzzle() {
    const newPuzzle = generateSudoku(difficulty);
    setBoard(newPuzzle.puzzle);
    setSolution(newPuzzle.solution);
    setMistakes(0);
    setHintsUsed(0);
    setCompleted(false);
    setSelectedCell(null);
    localStorage.removeItem(`sudoku-${getTodayKey()}-${difficulty}`);
  }

  if (board.length === 0) {
    return <div className="text-senior-lg text-center py-12">Laden...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Score */}
      <div className="flex justify-between items-center text-senior-base">
        <div className="text-gray-700">
          <strong>Fouten:</strong> {mistakes}
        </div>
        <div className="text-gray-700">
          <strong>Hints gebruikt:</strong> {hintsUsed}
        </div>
      </div>

      {/* Sudoku Grid */}
      <div className="grid grid-cols-9 gap-0 mx-auto" style={{ width: 'fit-content' }}>
        {board.map((row, rowIdx) => (
          row.map((cell, colIdx) => {
            const isSelected = selectedCell?.[0] === rowIdx && selectedCell?.[1] === colIdx;
            const isGiven = solution[rowIdx] && solution[rowIdx][colIdx] && 
                           generateSudoku().puzzle[rowIdx][colIdx] !== null;
            
            return (
              <div
                key={`${rowIdx}-${colIdx}`}
                onClick={() => handleCellClick(rowIdx, colIdx)}
                className={`
                  w-12 h-12 md:w-14 md:h-14 flex items-center justify-center 
                  border border-gray-400 text-senior-lg font-bold cursor-pointer
                  ${isSelected ? 'bg-blue-200' : 'bg-white'}
                  ${isGiven ? 'text-gray-800' : 'text-primary'}
                  ${(rowIdx + 1) % 3 === 0 && rowIdx !== 8 ? 'border-b-2 border-b-gray-800' : ''}
                  ${(colIdx + 1) % 3 === 0 && colIdx !== 8 ? 'border-r-2 border-r-gray-800' : ''}
                  hover:bg-blue-100
                `}
              >
                {cell || ''}
              </div>
            );
          })
        ))}
      </div>

      {/* Number Buttons */}
      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            onClick={() => handleNumberInput(num)}
            disabled={!selectedCell}
            className="py-4 px-6 bg-primary text-white rounded-lg text-senior-xl font-bold 
                     hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors"
          >
            {num}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={useHint}
          disabled={!selectedCell || completed}
          className="py-3 px-8 bg-accent text-white rounded-lg text-senior-base font-bold
                   hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors"
        >
          💡 Hint gebruiken
        </button>
        <button
          onClick={resetPuzzle}
          className="py-3 px-8 bg-gray-600 text-white rounded-lg text-senior-base font-bold
                   hover:bg-gray-700 transition-colors"
        >
          🔄 Nieuwe puzzel
        </button>
      </div>

      {/* Completion Message */}
      {completed && (
        <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 text-center">
          <div className="text-senior-xl font-bold text-green-800 mb-2">
            🎉 Gefeliciteerd!
          </div>
          <div className="text-senior-base text-green-700">
            Je hebt de Sudoku opgelost met {mistakes} fouten en {hintsUsed} hints!
          </div>
        </div>
      )}
    </div>
  );
}

  // Woordzoeker Component
function Woordzoeker() {
  const [grid, setGrid] = useState<string[][]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundWordCells, setFoundWordCells] = useState<Set<string>>(new Set());
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  useEffect(() => {
    const puzzle = generateWoordzoekerPuzzle(difficulty);
    setGrid(puzzle.grid);
    setWords(puzzle.words);
    
    // Laad voortgang
    const saved = localStorage.getItem(`woordzoeker-${getTodayKey()}-${difficulty}`);
    if (saved) {
      const data = JSON.parse(saved);
      setFoundWords(data.foundWords || []);
      setHintsUsed(data.hintsUsed || 0);
      if (data.foundWordCells) {
        setFoundWordCells(new Set(data.foundWordCells));
      }
    } else {
      // Reset als moeilijkheidsgraad verandert
      setFoundWords([]);
      setFoundWordCells(new Set());
      setHintsUsed(0);
    }
  }, [difficulty]);

  useEffect(() => {
    if (grid.length > 0) {
      localStorage.setItem(`woordzoeker-${getTodayKey()}-${difficulty}`, JSON.stringify({
        foundWords,
        hintsUsed,
        foundWordCells: Array.from(foundWordCells)
      }));
    }
  }, [foundWords, hintsUsed, foundWordCells, grid.length, difficulty]);

  // Globale mouse up handler voor als muis buiten grid gaat
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      document.body.style.userSelect = ''; // Herstel text selectie
      if (isDragging) {
        setIsDragging(false);
        // Check of laatste selectie een woord is
        if (selectedCells.length >= 3) {
          // Check woord in beide richtingen
          const wordForward = selectedCells.map(([r, c]) => grid[r]?.[c] || '').join('');
          const wordBackward = [...selectedCells].reverse().map(([r, c]) => grid[r]?.[c] || '').join('');
          const foundWord = words.find(w => w === wordForward || w === wordBackward);
          
          if (foundWord && !foundWords.includes(foundWord)) {
            setFoundWords(prev => [...prev, foundWord]);
            const newFoundCells = new Set(foundWordCells);
            selectedCells.forEach(([r, c]) => {
              newFoundCells.add(`${r}-${c}`);
            });
            setFoundWordCells(newFoundCells);
            setSelectedCells([]);
          } else {
            // Als te kort of geen woord, wis selectie na korte delay
            setTimeout(() => {
              setSelectedCells([]);
            }, 300);
          }
        } else {
          // Als te kort, wis selectie na korte delay
          setTimeout(() => {
            setSelectedCells([]);
          }, 300);
        }
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, selectedCells, grid, words, foundWords, foundWordCells]);

  function getTodayKey() {
    return new Date().toISOString().split('T')[0];
  }

  function generateWoordzoekerPuzzle(level: 'easy' | 'medium' | 'hard' = 'easy') {
    // Senior-vriendelijke woorden
    const easyWords = ['KAT', 'HOND', 'BOOM', 'ROOS', 'TAFEL', 'STOEL', 'BOEK', 'LAMP', 
                       'HUIS', 'TUIN', 'FIETS', 'AUTO', 'BLOEM', 'ZON', 'MAAN', 'STER'];
    const mediumWords = ['TUINBANK', 'BIBLIOTHEEK', 'TELEFOON', 'COMPUTER', 'KEUKEN', 
                         'SLAAPKAMER', 'BADKAMER', 'WONING', 'BUREAU', 'KRANT'];
    const hardWords = ['VERJAARDAG', 'VERJAARDAGSCAKE', 'VERJAARDAGSPARTIJ', 'VERJAARDAGSKADO',
                        'VERJAARDAGSWENS', 'VERJAARDAGSBRIEF', 'VERJAARDAGSTAFEL', 'VERJAARDAGSTOEL'];
    
    let allWords: string[];
    let size: number;
    let numWords: number;
    
    if (level === 'easy') {
      allWords = easyWords;
      size = 10;
      numWords = 4 + Math.floor(Math.random() * 2); // 4-5 woorden
    } else if (level === 'medium') {
      allWords = [...easyWords, ...mediumWords];
      size = 12;
      numWords = 5 + Math.floor(Math.random() * 2); // 5-6 woorden
    } else { // hard
      allWords = [...easyWords, ...mediumWords, ...hardWords];
      size = 15;
      numWords = 6 + Math.floor(Math.random() * 3); // 6-8 woorden
    }
    
    const grid: string[][] = Array(size).fill(null).map(() => Array(size).fill(''));
    
    // Kies willekeurig woorden
    const shuffledWords = [...allWords].sort(() => Math.random() - 0.5);
    const wordsToPlace = shuffledWords.slice(0, numWords);
    
    const placedWords: string[] = [];
    const directions = [
      { dr: 0, dc: 1 },   // horizontaal →
      { dr: 1, dc: 0 },   // verticaal ↓
      { dr: 1, dc: 1 },   // diagonaal ↘
      { dr: 1, dc: -1 }   // diagonaal ↙
    ];
    
    // Probeer elk woord te plaatsen
    for (const word of wordsToPlace) {
      let placed = false;
      let attempts = 0;
      const maxAttempts = 100;
      
      while (!placed && attempts < maxAttempts) {
        attempts++;
        
        // Kies willekeurige richting
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const { dr, dc } = direction;
        
        // Kies willekeurige startpositie
        const startRow = Math.floor(Math.random() * size);
        const startCol = Math.floor(Math.random() * size);
        
        // Bereken eindpositie
        const endRow = startRow + (word.length - 1) * dr;
        const endCol = startCol + (word.length - 1) * dc;
        
        // Check of binnen grid
        if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size) {
          continue;
        }
        
        // Check of positie vrij is of letters matchen
        let canPlace = true;
        for (let i = 0; i < word.length; i++) {
          const row = startRow + i * dr;
          const col = startCol + i * dc;
          const existingLetter = grid[row][col];
          
          if (existingLetter !== '' && existingLetter !== word[i]) {
            canPlace = false;
            break;
          }
        }
        
        if (canPlace) {
          // Plaats woord
          for (let i = 0; i < word.length; i++) {
            const row = startRow + i * dr;
            const col = startCol + i * dc;
            grid[row][col] = word[i];
          }
          placedWords.push(word);
          placed = true;
        }
      }
    }
    
    // Vul de rest met random letters
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (grid[i][j] === '') {
          grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }
    
    return { grid, words: placedWords };
  }

  // Start drag selectie
  function handleMouseDown(row: number, col: number) {
    setIsDragging(true);
    setSelectedCells([[row, col] as [number, number]]);
    // Voorkom text selectie tijdens slepen
    document.body.style.userSelect = 'none';
  }

  // Voeg cel toe tijdens slepen
  function handleMouseEnter(row: number, col: number) {
    if (!isDragging || selectedCells.length === 0) return;
    
    const firstCell = selectedCells[0];
    const [firstRow, firstCol] = firstCell;
    
    // Bepaal richting vanaf eerste cel
    const rowDiff = row - firstRow;
    const colDiff = col - firstCol;
    
    // Check of we in een rechte lijn zijn vanaf de eerste cel
    const isHorizontal = rowDiff === 0 && colDiff !== 0;
    const isVertical = colDiff === 0 && rowDiff !== 0;
    const isDiagonal = Math.abs(rowDiff) === Math.abs(colDiff) && rowDiff !== 0;
    
    if (!isHorizontal && !isVertical && !isDiagonal) {
      return; // Niet in een rechte lijn
    }
    
    // Bepaal alle cellen in deze lijn vanaf eerste cel tot huidige cel
    const directionRow = rowDiff === 0 ? 0 : (rowDiff > 0 ? 1 : -1);
    const directionCol = colDiff === 0 ? 0 : (colDiff > 0 ? 1 : -1);
    
    const newSelection: [number, number][] = [];
    let currentRow = firstRow;
    let currentCol = firstCol;
    const maxSteps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
    
    for (let i = 0; i <= maxSteps; i++) {
      newSelection.push([currentRow, currentCol] as [number, number]);
      currentRow += directionRow;
      currentCol += directionCol;
    }
    
    setSelectedCells(newSelection);
    checkForWord(newSelection);
  }

  // Stop drag selectie
  function handleMouseUp() {
    document.body.style.userSelect = ''; // Herstel text selectie
    if (isDragging) {
      setIsDragging(false);
      // Check of laatste selectie een woord is
      if (selectedCells.length >= 3) {
        checkForWord(selectedCells);
      } else {
        // Als te kort, wis selectie na korte delay
        setTimeout(() => {
          setSelectedCells([]);
        }, 300);
      }
    }
  }

  // Click handler voor mobiel (tap) - alleen als niet aan het slepen
  function handleCellClick(row: number, col: number, e: React.MouseEvent) {
    // Als we net hebben gesleept, negeer click
    if (isDragging) {
      e.preventDefault();
      return;
    }
    
    const cellIndex = selectedCells.findIndex(([r, c]) => r === row && c === col);
    if (cellIndex >= 0) {
      setSelectedCells(selectedCells.filter((_, i) => i !== cellIndex));
    } else {
      const newSelection: [number, number][] = [...selectedCells, [row, col] as [number, number]];
      setSelectedCells(newSelection);
      checkForWord(newSelection);
    }
  }

  function checkForWord(cells: [number, number][]) {
    if (cells.length < 3) return;
    
    // Check woord in beide richtingen
    const wordForward = cells.map(([r, c]) => grid[r][c]).join('');
    const wordBackward = [...cells].reverse().map(([r, c]) => grid[r][c]).join('');
    
    // Check of woord gevonden is (in beide richtingen)
    const foundWord = words.find(w => w === wordForward || w === wordBackward);
    
    if (foundWord && !foundWords.includes(foundWord)) {
      setFoundWords([...foundWords, foundWord]);
      
      // Markeer alle cellen van gevonden woord
      const newFoundCells = new Set(foundWordCells);
      cells.forEach(([r, c]) => {
        newFoundCells.add(`${r}-${c}`);
      });
      setFoundWordCells(newFoundCells);
      
      setSelectedCells([]);
      setIsDragging(false);
    }
  }

  function useHint() {
    const remainingWords = words.filter(w => !foundWords.includes(w));
    if (remainingWords.length === 0) return;
    
    alert(`Hint: Zoek naar het woord "${remainingWords[0]}"`);
    setHintsUsed(hintsUsed + 1);
  }

  function resetPuzzle() {
    const puzzle = generateWoordzoekerPuzzle(difficulty);
    setGrid(puzzle.grid);
    setWords(puzzle.words);
    setFoundWords([]);
    setFoundWordCells(new Set());
    setSelectedCells([]);
    setHintsUsed(0);
    setIsDragging(false);
    localStorage.removeItem(`woordzoeker-${getTodayKey()}-${difficulty}`);
  }

  const isComplete = foundWords.length === words.length;

  return (
    <div className="space-y-6">
      {/* Moeilijkheidsgraad selector */}
      <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
        <h3 className="text-senior-base font-bold text-primary mb-3">Moeilijkheidsgraad:</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              setDifficulty('easy');
              const puzzle = generateWoordzoekerPuzzle('easy');
              setGrid(puzzle.grid);
              setWords(puzzle.words);
              setFoundWords([]);
              setFoundWordCells(new Set());
              setSelectedCells([]);
            }}
            className={`py-2 px-6 rounded-lg text-senior-base font-bold transition-colors ${
              difficulty === 'easy'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🟢 Makkelijk
          </button>
          <button
            onClick={() => {
              setDifficulty('medium');
              const puzzle = generateWoordzoekerPuzzle('medium');
              setGrid(puzzle.grid);
              setWords(puzzle.words);
              setFoundWords([]);
              setFoundWordCells(new Set());
              setSelectedCells([]);
            }}
            className={`py-2 px-6 rounded-lg text-senior-base font-bold transition-colors ${
              difficulty === 'medium'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🟡 Gemiddeld
          </button>
          <button
            onClick={() => {
              setDifficulty('hard');
              const puzzle = generateWoordzoekerPuzzle('hard');
              setGrid(puzzle.grid);
              setWords(puzzle.words);
              setFoundWords([]);
              setFoundWordCells(new Set());
              setSelectedCells([]);
            }}
            className={`py-2 px-6 rounded-lg text-senior-base font-bold transition-colors ${
              difficulty === 'hard'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🔴 Moeilijk
          </button>
        </div>
      </div>

      {/* Woorden lijst */}
      <div className="bg-neutral-cream p-4 rounded-lg">
        <h3 className="text-senior-lg font-bold text-primary mb-3">Zoek deze woorden:</h3>
        <div className="grid grid-cols-2 gap-2">
          {words.map(word => (
            <div
              key={word}
              className={`text-senior-base p-2 rounded ${
                foundWords.includes(word) 
                  ? 'bg-green-200 text-green-800 line-through' 
                  : 'bg-white text-gray-800'
              }`}
            >
              {word}
            </div>
          ))}
        </div>
        <div className="mt-3 text-senior-sm text-gray-600">
          Gevonden: {foundWords.length} / {words.length}
        </div>
      </div>

      {/* Grid */}
      <div 
        className="grid gap-1 mx-auto select-none" 
        style={{ 
          gridTemplateColumns: `repeat(${grid[0]?.length || 10}, minmax(0, 1fr))`,
          maxWidth: '500px'
        }}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {grid.map((row, rowIdx) => (
          row.map((cell, colIdx) => {
            const isSelected = selectedCells.some(([r, c]) => r === rowIdx && c === colIdx);
            const isFound = foundWordCells.has(`${rowIdx}-${colIdx}`);
            
            return (
              <div
                key={`${rowIdx}-${colIdx}`}
                onClick={(e) => handleCellClick(rowIdx, colIdx, e)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleMouseDown(rowIdx, colIdx);
                }}
                onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
                onMouseUp={handleMouseUp}
                className={`
                  aspect-square flex items-center justify-center 
                  border-2 text-senior-base font-bold cursor-pointer rounded
                  ${isFound ? 'bg-green-200 border-green-500' : isSelected ? 'bg-blue-300 border-blue-500' : 'bg-white border-gray-300'}
                  hover:bg-blue-100 transition-colors
                  select-none
                `}
                style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
              >
                {cell}
              </div>
            );
          })
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={useHint}
          disabled={isComplete}
          className="py-3 px-8 bg-accent text-white rounded-lg text-senior-base font-bold
                   hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          💡 Hint ({hintsUsed} gebruikt)
        </button>
        <button
          onClick={() => setSelectedCells([])}
          className="py-3 px-8 bg-gray-500 text-white rounded-lg text-senior-base font-bold
                   hover:bg-gray-600"
        >
          ✖️ Wis selectie
        </button>
        <button
          onClick={resetPuzzle}
          className="py-3 px-8 bg-gray-600 text-white rounded-lg text-senior-base font-bold
                   hover:bg-gray-700"
        >
          🔄 Nieuwe puzzel
        </button>
      </div>

      {/* Completion */}
      {isComplete && (
        <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 text-center">
          <div className="text-senior-xl font-bold text-green-800 mb-2">
            🎉 Geweldig gedaan!
          </div>
          <div className="text-senior-base text-green-700">
            Je hebt alle {words.length} woorden gevonden met {hintsUsed} hints!
          </div>
        </div>
      )}
    </div>
  );
}

// Kruiswoord Component (vereenvoudigd)
function Kruiswoord() {
  return (
    <div className="text-center py-12 space-y-6">
      <div className="text-senior-2xl">🚧</div>
      <div className="text-senior-lg text-gray-700">
        Kruiswoordpuzzel komt binnenkort!
      </div>
      <div className="text-senior-base text-gray-600">
        Deze puzzel is in ontwikkeling.
      </div>
    </div>
  );
}

// Memory Game Component
function Memory() {
  const [cards, setCards] = useState<{ id: number; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  useEffect(() => {
    initializeGame();
    
    // Laad voortgang
    const saved = localStorage.getItem(`memory-${getTodayKey()}-${difficulty}`);
    if (saved) {
      const data = JSON.parse(saved);
      setCards(data.cards || []);
      setMoves(data.moves || 0);
      setHintsUsed(data.hintsUsed || 0);
      setGameWon(data.gameWon || false);
    } else {
      setMoves(0);
      setHintsUsed(0);
      setGameWon(false);
    }
  }, [difficulty]);

  useEffect(() => {
    if (cards.length > 0) {
      localStorage.setItem(`memory-${getTodayKey()}-${difficulty}`, JSON.stringify({
        cards,
        moves,
        hintsUsed,
        gameWon
      }));
    }
  }, [cards, moves, hintsUsed, gameWon, difficulty]);

  function getTodayKey() {
    return new Date().toISOString().split('T')[0];
  }

  function initializeGame() {
    // Senior-vriendelijke emojis - aantal paren op basis van moeilijkheidsgraad
    let emojis: string[];
    if (difficulty === 'easy') {
      emojis = ['🌸', '🌻', '🌹', '🌷', '🌺', '🌼']; // 6 paren = 12 kaarten
    } else if (difficulty === 'medium') {
      emojis = ['🌸', '🌻', '🌹', '🌷', '🌺', '🌼', '🍀', '🌿']; // 8 paren = 16 kaarten
    } else {
      emojis = ['🌸', '🌻', '🌹', '🌷', '🌺', '🌼', '🍀', '🌿', '🌵', '🌴', '🌳', '🌲']; // 12 paren = 24 kaarten
    }
    
    const gameCards = [...emojis, ...emojis].map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false
    }));
    
    // Shuffle
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }
    
    setCards(gameCards);
    setFlippedIndices([]);
    setMoves(0);
    setHintsUsed(0);
    setGameWon(false);
  }

  function handleCardClick(index: number) {
    if (flippedIndices.length === 2) return;
    if (cards[index].flipped || cards[index].matched) return;
    if (flippedIndices.includes(index)) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlippedIndices;
      
      if (cards[first].emoji === cards[second].emoji) {
        // Match!
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[first].matched = true;
          updatedCards[second].matched = true;
          setCards(updatedCards);
          setFlippedIndices([]);
          
          // Check if game is won
          if (updatedCards.every(card => card.matched)) {
            setGameWon(true);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[first].flipped = false;
          updatedCards[second].flipped = false;
          setCards(updatedCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  }

  function useHint() {
    // Laat twee ongematched kaarten zien die hetzelfde zijn
    const unmatchedCards = cards.filter(card => !card.matched);
    if (unmatchedCards.length < 2) return;
    
    const emoji = unmatchedCards[0].emoji;
    const pairIndices = cards
      .map((card, idx) => ({ card, idx }))
      .filter(({ card }) => card.emoji === emoji && !card.matched)
      .map(({ idx }) => idx)
      .slice(0, 2);
    
    if (pairIndices.length === 2) {
      const newCards = [...cards];
      pairIndices.forEach(idx => {
        newCards[idx].flipped = true;
      });
      setCards(newCards);
      setHintsUsed(hintsUsed + 1);
      
      setTimeout(() => {
        const updatedCards = [...newCards];
        pairIndices.forEach(idx => {
          if (!updatedCards[idx].matched) {
            updatedCards[idx].flipped = false;
          }
        });
        setCards(updatedCards);
      }, 2000);
    }
  }

  return (
    <div className="space-y-6">
      {/* Moeilijkheidsgraad selector */}
      <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
        <h3 className="text-senior-base font-bold text-primary mb-3">Moeilijkheidsgraad:</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              setDifficulty('easy');
              initializeGame();
              localStorage.removeItem(`memory-${getTodayKey()}-easy`);
            }}
            className={`py-2 px-6 rounded-lg text-senior-base font-bold transition-colors ${
              difficulty === 'easy'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🟢 Makkelijk (12 kaarten)
          </button>
          <button
            onClick={() => {
              setDifficulty('medium');
              initializeGame();
              localStorage.removeItem(`memory-${getTodayKey()}-medium`);
            }}
            className={`py-2 px-6 rounded-lg text-senior-base font-bold transition-colors ${
              difficulty === 'medium'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🟡 Gemiddeld (16 kaarten)
          </button>
          <button
            onClick={() => {
              setDifficulty('hard');
              initializeGame();
              localStorage.removeItem(`memory-${getTodayKey()}-hard`);
            }}
            className={`py-2 px-6 rounded-lg text-senior-base font-bold transition-colors ${
              difficulty === 'hard'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🔴 Moeilijk (24 kaarten)
          </button>
        </div>
      </div>

      {/* Score */}
      <div className="flex justify-between items-center text-senior-base">
        <div className="text-gray-700">
          <strong>Zetten:</strong> {moves}
        </div>
        <div className="text-gray-700">
          <strong>Hints:</strong> {hintsUsed}
        </div>
      </div>

      {/* Memory Grid */}
      <div className={`grid gap-3 mx-auto ${
        difficulty === 'easy' ? 'grid-cols-3 max-w-md' : 
        difficulty === 'medium' ? 'grid-cols-4 max-w-lg' : 
        'grid-cols-6 max-w-2xl'
      }`}>
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={`
              aspect-square flex items-center justify-center text-4xl md:text-5xl
              rounded-lg cursor-pointer transition-all duration-300 transform
              ${card.flipped || card.matched 
                ? 'bg-white border-2 border-primary' 
                : 'bg-primary hover:bg-primary-dark'}
              ${card.matched ? 'opacity-60' : ''}
              hover:scale-105
            `}
          >
            {(card.flipped || card.matched) ? card.emoji : '❓'}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={useHint}
          disabled={gameWon}
          className="py-3 px-8 bg-accent text-white rounded-lg text-senior-base font-bold
                   hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          💡 Hint gebruiken
        </button>
        <button
          onClick={() => {
            initializeGame();
            localStorage.removeItem(`memory-${getTodayKey()}-${difficulty}`);
          }}
          className="py-3 px-8 bg-gray-600 text-white rounded-lg text-senior-base font-bold
                   hover:bg-gray-700"
        >
          🔄 Nieuw spel
        </button>
      </div>

      {/* Win Message */}
      {gameWon && (
        <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 text-center">
          <div className="text-senior-xl font-bold text-green-800 mb-2">
            🎉 Gefeliciteerd!
          </div>
          <div className="text-senior-base text-green-700">
            Je hebt het spel voltooid in {moves} zetten met {hintsUsed} hints!
          </div>
        </div>
      )}
    </div>
  );
}

// Main Puzzels Page
export default function PuzzelsPage() {
  const [todaysPuzzle, setTodaysPuzzle] = useState<string>('');

  useEffect(() => {
    setTodaysPuzzle(getDailyPuzzleType());
  }, []);

  const puzzleNames: { [key: string]: string } = {
    sudoku: 'Sudoku',
    woordzoeker: 'Woordzoeker',
    kruiswoord: 'Kruiswoordpuzzel',
    memory: 'Memory'
  };

  return (
    <div className="min-h-screen bg-neutral-cream">
      {/* Header */}
      <header className="bg-white border-b-2 border-neutral-stone py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark text-senior-base"
              >
                ← Terug naar tools
              </Link>
              <Link
                href="/animaties/puzzel"
                className="bg-accent text-white px-6 py-3 rounded-xl text-senior-base font-bold
                         hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl
                         flex items-center gap-2 whitespace-nowrap"
              >
                <span>📹</span>
                <span>Bekijk uitleg</span>
              </Link>
            </div>
            <h1 className="text-senior-2xl md:text-senior-3xl font-bold text-primary">
              Dagelijkse Puzzel
            </h1>
            <p className="text-senior-base text-gray-600 mt-2">
              Vandaag: {puzzleNames[todaysPuzzle] || 'Laden...'}
            </p>
          </div>
        </div>
      </header>

      {/* Puzzel Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
          {todaysPuzzle === 'sudoku' && <Sudoku />}
          {todaysPuzzle === 'woordzoeker' && <Woordzoeker />}
          {todaysPuzzle === 'kruiswoord' && <Kruiswoord />}
          {todaysPuzzle === 'memory' && <Memory />}
        </div>

        {/* Info */}
        <div className="max-w-4xl mx-auto mt-8 text-center text-senior-sm text-gray-600">
          <p>🔄 Elke dag om middernacht een nieuwe puzzel!</p>
          <p className="mt-2">Je voortgang wordt automatisch opgeslagen.</p>
        </div>
      </main>
    </div>
  );
}

