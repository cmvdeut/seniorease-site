// Sudoku generator en validatie logica
class SudokuGenerator {
    constructor() {
        this.size = 9;
        this.grid = Array(this.size).fill().map(() => Array(this.size).fill(0));
        this.randomSeed = null;
        this.randomState = null;
    }

    // Genereer een volledig opgeloste Sudoku
    generateSolved() {
        this.grid = Array(this.size).fill().map(() => Array(this.size).fill(0));
        this.solve(this.grid);
        return this.grid.map(row => [...row]);
    }

    // Backtracking algoritme om Sudoku op te lossen
    solve(grid) {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (grid[row][col] === 0) {
                    const numbers = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                    for (let num of numbers) {
                        if (this.isValid(grid, row, col, num)) {
                            grid[row][col] = num;
                            if (this.solve(grid)) {
                                return true;
                            }
                            grid[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    // Controleer of een nummer geldig is op een positie
    isValid(grid, row, col, num) {
        // Check rij
        for (let x = 0; x < this.size; x++) {
            if (grid[row][x] === num) return false;
        }

        // Check kolom
        for (let x = 0; x < this.size; x++) {
            if (grid[x][col] === num) return false;
        }

        // Check 3x3 blok
        const startRow = row - row % 3;
        const startCol = col - col % 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i + startRow][j + startCol] === num) return false;
            }
        }

        return true;
    }

    // Random functie die seed kan gebruiken
    random() {
        if (this.randomState !== null) {
            this.randomState = (this.randomState * 9301 + 49297) % 233280;
            return this.randomState / 233280;
        }
        return Math.random();
    }

    // Schud array voor randomisatie
    shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(this.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Genereer een puzzel door nummers te verwijderen
    generatePuzzle(difficulty = 'easy') {
        const solved = this.generateSolved();
        const puzzle = solved.map(row => row.map(cell => cell));

        // Aantal cellen om te verwijderen gebaseerd op moeilijkheidsgraad
        const removals = difficulty === 'easy' ? 40 : 50;

        // Verwijder willekeurige cellen
        const cells = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                cells.push([i, j]);
            }
        }

        const shuffledCells = this.shuffle(cells);
        for (let i = 0; i < removals && i < shuffledCells.length; i++) {
            const [row, col] = shuffledCells[i];
            puzzle[row][col] = 0;
        }

        return {
            puzzle: puzzle,
            solution: solved
        };
    }

    // Valideer een volledige Sudoku
    validateComplete(grid) {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const num = grid[row][col];
                if (num === 0) return false;
                
                // Check of nummer geldig is
                const temp = grid[row][col];
                grid[row][col] = 0;
                if (!this.isValid(grid, row, col, temp)) {
                    grid[row][col] = temp;
                    return false;
                }
                grid[row][col] = temp;
            }
        }
        return true;
    }

    // Valideer een individuele cel
    validateCell(grid, row, col, num) {
        if (num === 0) return true;
        return this.isValid(grid, row, col, num);
    }

    // Genereer een dagelijkse puzzel op basis van datum
    generateDailyPuzzle(difficulty = 'easy') {
        // Gebruik datum als seed voor reproduceerbare puzzels
        const today = new Date();
        const dateString = today.toISOString().split('T')[0];
        const seed = this.stringToSeed(dateString + difficulty);
        
        // Gebruik seed voor random
        this.randomState = seed;
        
        const result = this.generatePuzzle(difficulty);
        
        // Reset random state
        this.randomState = null;
        
        return result;
    }

    // Converteer string naar seed
    stringToSeed(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }
}

