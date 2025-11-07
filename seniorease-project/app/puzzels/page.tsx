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

  // Genereer een simpele senior-friendly Sudoku
  useEffect(() => {
    const newPuzzle = generateSudoku();
    setBoard(newPuzzle.puzzle);
    setSolution(newPuzzle.solution);
    
    // Laad voortgang uit localStorage
    const saved = localStorage.getItem(`sudoku-${getTodayKey()}`);
    if (saved) {
      const data = JSON.parse(saved);
      setBoard(data.board);
      setMistakes(data.mistakes || 0);
      setHintsUsed(data.hintsUsed || 0);
      setCompleted(data.completed || false);
    }
  }, []);

  // Save voortgang
  useEffect(() => {
    if (board.length > 0) {
      localStorage.setItem(`sudoku-${getTodayKey()}`, JSON.stringify({
        board,
        mistakes,
        hintsUsed,
        completed
      }));
    }
  }, [board, mistakes, hintsUsed, completed]);

  function getTodayKey() {
    return new Date().toISOString().split('T')[0];
  }

  function generateSudoku() {
    // Simpele vooraf gemaakte Sudoku voor senioren (makkelijk niveau)
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

    // Verwijder ~40 nummers voor makkelijke moeilijkheidsgraad
    const puzzle: (number | null)[][] = solution.map(row => [...row]);
    const cellsToRemove = 40;
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
    const newPuzzle = generateSudoku();
    setBoard(newPuzzle.puzzle);
    setSolution(newPuzzle.solution);
    setMistakes(0);
    setHintsUsed(0);
    setCompleted(false);
    setSelectedCell(null);
    localStorage.removeItem(`sudoku-${getTodayKey()}`);
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
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);

  useEffect(() => {
    const puzzle = generateWoordzoekerPuzzle();
    setGrid(puzzle.grid);
    setWords(puzzle.words);
    
    // Laad voortgang
    const saved = localStorage.getItem(`woordzoeker-${getTodayKey()}`);
    if (saved) {
      const data = JSON.parse(saved);
      setFoundWords(data.foundWords || []);
      setHintsUsed(data.hintsUsed || 0);
    }
  }, []);

  useEffect(() => {
    if (grid.length > 0) {
      localStorage.setItem(`woordzoeker-${getTodayKey()}`, JSON.stringify({
        foundWords,
        hintsUsed
      }));
    }
  }, [foundWords, hintsUsed, grid.length]);

  function getTodayKey() {
    return new Date().toISOString().split('T')[0];
  }

  function generateWoordzoekerPuzzle() {
    // Senior-vriendelijke woorden (niet te lang, bekend)
    const wordList = ['KAT', 'HOND', 'BOOM', 'ROOS', 'TAFEL', 'STOEL', 'BOEK', 'LAMP'];
    const size = 10;
    const grid: string[][] = Array(size).fill(null).map(() => Array(size).fill(''));
    
    // Plaats woorden horizontaal en verticaal
    const placedWords: string[] = [];
    
    // Plaats KAT horizontaal
    grid[0][0] = 'K'; grid[0][1] = 'A'; grid[0][2] = 'T';
    placedWords.push('KAT');
    
    // Plaats HOND verticaal
    grid[1][3] = 'H'; grid[2][3] = 'O'; grid[3][3] = 'N'; grid[4][3] = 'D';
    placedWords.push('HOND');
    
    // Plaats BOOM horizontaal
    grid[2][5] = 'B'; grid[2][6] = 'O'; grid[2][7] = 'O'; grid[2][8] = 'M';
    placedWords.push('BOOM');
    
    // Plaats ROOS verticaal
    grid[4][1] = 'R'; grid[5][1] = 'O'; grid[6][1] = 'O'; grid[7][1] = 'S';
    placedWords.push('ROOS');
    
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

  function handleCellClick(row: number, col: number) {
    const cellIndex = selectedCells.findIndex(([r, c]) => r === row && c === col);
    if (cellIndex >= 0) {
      setSelectedCells(selectedCells.filter((_, i) => i !== cellIndex));
    } else {
      setSelectedCells([...selectedCells, [row, col]]);
      checkForWord([...selectedCells, [row, col]]);
    }
  }

  function checkForWord(cells: [number, number][]) {
    if (cells.length < 3) return;
    
    const word = cells.map(([r, c]) => grid[r][c]).join('');
    
    if (words.includes(word) && !foundWords.includes(word)) {
      setFoundWords([...foundWords, word]);
      setSelectedCells([]);
    }
  }

  function useHint() {
    const remainingWords = words.filter(w => !foundWords.includes(w));
    if (remainingWords.length === 0) return;
    
    alert(`Hint: Zoek naar het woord "${remainingWords[0]}"`);
    setHintsUsed(hintsUsed + 1);
  }

  function resetPuzzle() {
    const puzzle = generateWoordzoekerPuzzle();
    setGrid(puzzle.grid);
    setWords(puzzle.words);
    setFoundWords([]);
    setSelectedCells([]);
    setHintsUsed(0);
    localStorage.removeItem(`woordzoeker-${getTodayKey()}`);
  }

  const isComplete = foundWords.length === words.length;

  return (
    <div className="space-y-6">
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
      <div className="grid gap-1 mx-auto" style={{ 
        gridTemplateColumns: `repeat(${grid[0]?.length || 10}, minmax(0, 1fr))`,
        maxWidth: '500px'
      }}>
        {grid.map((row, rowIdx) => (
          row.map((cell, colIdx) => {
            const isSelected = selectedCells.some(([r, c]) => r === rowIdx && c === colIdx);
            
            return (
              <div
                key={`${rowIdx}-${colIdx}`}
                onClick={() => handleCellClick(rowIdx, colIdx)}
                className={`
                  aspect-square flex items-center justify-center 
                  border-2 text-senior-base font-bold cursor-pointer rounded
                  ${isSelected ? 'bg-blue-300 border-blue-500' : 'bg-white border-gray-300'}
                  hover:bg-blue-100 transition-colors
                `}
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

  useEffect(() => {
    initializeGame();
    
    // Laad voortgang
    const saved = localStorage.getItem(`memory-${getTodayKey()}`);
    if (saved) {
      const data = JSON.parse(saved);
      setCards(data.cards || []);
      setMoves(data.moves || 0);
      setHintsUsed(data.hintsUsed || 0);
      setGameWon(data.gameWon || false);
    }
  }, []);

  useEffect(() => {
    if (cards.length > 0) {
      localStorage.setItem(`memory-${getTodayKey()}`, JSON.stringify({
        cards,
        moves,
        hintsUsed,
        gameWon
      }));
    }
  }, [cards, moves, hintsUsed, gameWon]);

  function getTodayKey() {
    return new Date().toISOString().split('T')[0];
  }

  function initializeGame() {
    // Senior-vriendelijke emojis (8 paren = 16 kaarten)
    const emojis = ['🌸', '🌻', '🌹', '🌷', '🌺', '🌼', '🍀', '🌿'];
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
      <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto">
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
            localStorage.removeItem(`memory-${getTodayKey()}`);
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
                href="/"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark text-senior-base"
              >
                ← Terug naar home
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

