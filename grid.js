function createLetterSoup(n, words) {
    const container = document.getElementById('gridContainer');

    // Clear previous grid if any
    container.innerHTML = '';

    // Calculate the size of each cell
    const cellSize = 500 / n; // Total width/height divided by number of rows/columns

    // Set the number of rows and columns
    container.style.gridTemplateColumns = `repeat(${n}, ${cellSize}px)`;
    container.style.gridTemplateRows = `repeat(${n}, ${cellSize}px)`;

    // Create an empty grid
    const grid = Array.from({
        length: n
    }, () => Array(n).fill(''));

    // Function to generate a random letter
    function getRandomLetter() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return letters[Math.floor(Math.random() * letters.length)];
    }

    // Function to place a word in the grid
    function placeWord(word) {
        const directions = [{
                dx: 1,
                dy: 0
            }, // Horizontal
            {
                dx: 0,
                dy: 1
            }, // Vertical
            {
                dx: 1,
                dy: 1
            }, // Diagonal down-right
            {
                dx: 1,
                dy: -1
            } // Diagonal down-left
        ];
        const direction = directions[Math.floor(Math.random() * directions.length)];

        const startX = Math.floor(Math.random() * n);
        const startY = Math.floor(Math.random() * n);
        const endX = startX + direction.dx * (word.length - 1);
        const endY = startY + direction.dy * (word.length - 1);

        // Check if the word fits in the grid
        if (endX < 0 || endX >= n || endY < 0 || endY >= n) return false;

        // Check if the word can be placed without overlapping existing letters
        for (let i = 0; i < word.length; i++) {
            const x = startX + direction.dx * i;
            const y = startY + direction.dy * i;
            if (grid[y][x] !== '' && grid[y][x] !== word[i]) return false;
        }

        // Place the word in the grid
        for (let i = 0; i < word.length; i++) {
            const x = startX + direction.dx * i;
            const y = startY + direction.dy * i;
            grid[y][x] = word[i];
        }

        return true;
    }

    // Place all words in the grid
    words.forEach(word => {
        let placed = false;
        while (!placed) {
            placed = placeWord(word);
        }
    });

    // Fill the rest of the grid with random letters
    for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
            if (grid[y][x] === '') {
                grid[y][x] = getRandomLetter();
            }
        }
    }

    // Create the grid items
    grid.forEach(row => {
        row.forEach(letter => {
            const cell = document.createElement('div');
            cell.classList.add('grid-item');
            cell.textContent = letter; // Fill each cell with the letter from the grid
            container.appendChild(cell);
        });
    });
}

// Define words to find
const words = ['JAVASCRIPT', 'HTML', 'CSS', 'FUNCTION', 'VARIABLE', 'ARRAY', 'LOOP'];

// Create a letter soup grid with 10 rows and 10 columns
createLetterSoup(10, words);
