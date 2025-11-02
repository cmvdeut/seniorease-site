// App logica voor Sudoku game
class SudokuGame {
    constructor() {
        this.generator = new SudokuGenerator();
        this.currentPuzzle = null;
        this.solution = null;
        this.difficulty = 'easy';
        this.selectedCell = null;
        this.currentDate = new Date().toISOString().split('T')[0];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDateDisplay();
        this.loadPuzzle();
    }

    setupEventListeners() {
        // Moeilijkheidsgraad knoppen
        document.getElementById('easy-btn').addEventListener('click', () => {
            this.setDifficulty('easy');
        });
        
        document.getElementById('medium-btn').addEventListener('click', () => {
            this.setDifficulty('medium');
        });

        // Nummer knoppen
        document.querySelectorAll('.number-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const value = parseInt(e.target.dataset.value);
                this.selectNumber(value);
            });
        });

        // Actie knoppen
        document.getElementById('check-btn').addEventListener('click', () => {
            this.checkPuzzle();
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetPuzzle();
        });

        document.getElementById('hint-btn').addEventListener('click', () => {
            this.giveHint();
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '1' && e.key <= '9') {
                this.selectNumber(parseInt(e.key));
            } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
                this.selectNumber(0);
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
                       e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                this.navigateCell(e.key);
            }
        });
    }

    setDifficulty(difficulty) {
        this.difficulty = difficulty;
        
        // Update UI
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`${difficulty}-btn`).classList.add('active');
        
        // Genereer nieuwe puzzel
        this.loadPuzzle();
    }

    loadPuzzle() {
        // Genereer dagelijkse puzzel
        const puzzleData = this.generator.generateDailyPuzzle(this.difficulty);
        this.currentPuzzle = puzzleData.puzzle.map(row => row.map(cell => cell));
        this.solution = puzzleData.solution;
        
        this.renderGrid();
        this.showMessage('Nieuwe puzzel geladen! Veel plezier!', 'info');
    }

    renderGrid() {
        const grid = document.getElementById('sudoku-grid');
        grid.innerHTML = '';

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.createElement('button');
                cell.className = 'sudoku-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                const value = this.currentPuzzle[row][col];
                if (value !== 0) {
                    cell.textContent = value;
                    cell.classList.add('prefilled');
                } else {
                    cell.textContent = '';
                }

                cell.addEventListener('click', () => {
                    this.selectCell(row, col);
                });

                grid.appendChild(cell);
            }
        }
    }

    selectCell(row, col) {
        // Alleen lege cellen kunnen worden geselecteerd
        if (this.currentPuzzle[row][col] !== 0) {
            return;
        }

        // Verwijder vorige selectie
        document.querySelectorAll('.sudoku-cell').forEach(cell => {
            cell.classList.remove('selected');
        });

        // Selecteer nieuwe cel
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
            cell.classList.add('selected');
            this.selectedCell = { row, col };
        }
    }

    selectNumber(value) {
        if (!this.selectedCell) {
            this.showMessage('Selecteer eerst een cel!', 'info');
            return;
        }

        const { row, col } = this.selectedCell;
        
        // Update puzzel
        this.currentPuzzle[row][col] = value;

        // Update UI
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
            cell.textContent = value === 0 ? '' : value;
            cell.classList.remove('error', 'correct');
            
            // Valideer cel
            if (value !== 0) {
                const isValid = this.generator.validateCell(
                    this.currentPuzzle.map(r => [...r]), 
                    row, 
                    col, 
                    value
                );
                
                if (!isValid) {
                    cell.classList.add('error');
                    this.showMessage('Dit cijfer klopt niet!', 'error');
                } else {
                    cell.classList.add('correct');
                }
            }
        }

        // Check of puzzel compleet is
        this.checkIfComplete();
    }

    navigateCell(direction) {
        if (!this.selectedCell) {
            // Selecteer eerste lege cel
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (this.currentPuzzle[row][col] === 0) {
                        this.selectCell(row, col);
                        return;
                    }
                }
            }
            return;
        }

        let { row, col } = this.selectedCell;
        
        switch (direction) {
            case 'ArrowUp':
                row = Math.max(0, row - 1);
                break;
            case 'ArrowDown':
                row = Math.min(8, row + 1);
                break;
            case 'ArrowLeft':
                col = Math.max(0, col - 1);
                break;
            case 'ArrowRight':
                col = Math.min(8, col + 1);
                break;
        }

        // Skip prefilled cellen
        if (this.currentPuzzle[row][col] === 0) {
            this.selectCell(row, col);
        }
    }

    checkPuzzle() {
        const isComplete = this.generator.validateComplete(
            this.currentPuzzle.map(row => [...row])
        );

        // Check ook tegen oplossing
        let isCorrect = true;
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.currentPuzzle[row][col] !== this.solution[row][col]) {
                    isCorrect = false;
                    break;
                }
            }
            if (!isCorrect) break;
        }

        if (isComplete && isCorrect) {
            this.showMessage('Gefeliciteerd! De puzzel is correct opgelost! 🎉', 'success');
            
            // Markeer alle cellen als correct
            document.querySelectorAll('.sudoku-cell').forEach(cell => {
                cell.classList.remove('error');
                cell.classList.add('correct');
            });
        } else if (isComplete) {
            this.showMessage('De puzzel is ingevuld, maar er staan nog fouten in.', 'error');
        } else {
            const emptyCount = this.countEmptyCells();
            this.showMessage(`Nog ${emptyCount} cellen te vullen.`, 'info');
        }
    }

    countEmptyCells() {
        let count = 0;
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.currentPuzzle[row][col] === 0) {
                    count++;
                }
            }
        }
        return count;
    }

    checkIfComplete() {
        const emptyCount = this.countEmptyCells();
        if (emptyCount === 0) {
            this.checkPuzzle();
        }
    }

    resetPuzzle() {
        if (confirm('Weet u zeker dat u opnieuw wilt beginnen? Alle ingevulde antwoorden worden gewist.')) {
            // Reset alleen ingevulde cellen
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    // Behoud alleen de originele puzzel cellen
                    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                    if (cell && !cell.classList.contains('prefilled')) {
                        this.currentPuzzle[row][col] = 0;
                        cell.textContent = '';
                        cell.classList.remove('error', 'correct', 'selected');
                    }
                }
            }
            this.selectedCell = null;
            this.showMessage('Puzzel gereset. Begin opnieuw!', 'info');
        }
    }

    giveHint() {
        // Vind een willekeurige lege cel en geef de oplossing
        const emptyCells = [];
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.currentPuzzle[row][col] === 0) {
                    emptyCells.push({ row, col });
                }
            }
        }

        if (emptyCells.length === 0) {
            this.showMessage('De puzzel is al compleet!', 'info');
            return;
        }

        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const { row, col } = randomCell;
        const correctValue = this.solution[row][col];

        // Vul de cel in
        this.currentPuzzle[row][col] = correctValue;
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
            cell.textContent = correctValue;
            cell.classList.add('correct');
            this.showMessage(`Hint: cel ${row + 1},${col + 1} is ${correctValue}`, 'info');
        }
    }

    updateDateDisplay() {
        const dateDisplay = document.getElementById('puzzle-date');
        const today = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateDisplay.textContent = `Puzzel voor ${today.toLocaleDateString('nl-NL', options)}`;
    }

    showMessage(text, type = 'info') {
        const messageEl = document.getElementById('message');
        messageEl.textContent = text;
        messageEl.className = `message ${type}`;
        
        // Verberg bericht na 5 seconden (behalve success)
        if (type !== 'success') {
            setTimeout(() => {
                messageEl.classList.add('hidden');
            }, 5000);
        }
    }
}

// Start de game wanneer de pagina geladen is
document.addEventListener('DOMContentLoaded', () => {
    new SudokuGame();
});

