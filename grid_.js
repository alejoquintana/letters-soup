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
    const grid = Array.from({ length: n }, () => Array(n).fill(''));

    // Function to generate a random letter
    function getRandomLetter() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return letters[Math.floor(Math.random() * letters.length)];
    }

    // Function to place a word in the grid
    function placeWord(word) {
        const startX = Math.floor(Math.random() * n);
        const startY = Math.floor(Math.random() * n);

        for (let i = 0; i < word.length; i++) {
            if (startX + i >= n || startY >= n) return false; // Horizontal placement out of bounds

            if (grid[startY][startX + i] !== '' && grid[startY][startX + i] !== word[i]) return false;
        }

        for (let i = 0; i < word.length; i++) {
            grid[startY][startX + i] = word[i];
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
        row.forEa
