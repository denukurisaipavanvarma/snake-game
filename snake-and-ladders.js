// Game state
let currentPlayer = 1;
let player1Position = 1;
let player2Position = 1;
let gameEnded = false;

// Snake and Ladder positions (key: start position, value: end position)
const snakes = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78
};

const ladders = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100
};

// Initialize the game board
function initializeBoard() {
    const gameBoard = document.getElementById('gameBoard');
    let numbers = Array.from({length: 100}, (_, i) => i + 1).reverse();
    
    for (let row = 0; row < 10; row++) {
        const rowNumbers = row % 2 === 0 
            ? numbers.slice(row * 10, (row + 1) * 10)
            : numbers.slice(row * 10, (row + 1) * 10).reverse();
            
        rowNumbers.forEach(num => {
            const square = document.createElement('div');
            square.className = 'board-square';
            square.id = `square-${num}`;
            square.textContent = num;
            
            if (snakes[num]) {
                square.classList.add('snake');
                square.title = `Snake to ${snakes[num]}`;
            } else if (ladders[num]) {
                square.classList.add('ladder');
                square.title = `Ladder to ${ladders[num]}`;
            }
            
            gameBoard.appendChild(square);
        });
    }
    updatePlayerPanels();
}

// Roll dice and move player
function rollDice() {
    if (gameEnded) return;
    
    const dice = document.getElementById('dice');
    const rollButton = document.getElementById('rollButton');
    const gameMessage = document.getElementById('gameMessage');
    
    rollButton.disabled = true;
    dice.classList.add('rolling');
    
    setTimeout(() => {
        const roll = Math.floor(Math.random() * 6) + 1;
        dice.textContent = roll;
        dice.classList.remove('rolling');
        
        movePlayer(roll);
        
        setTimeout(() => {
            checkSnakesAndLadders();
            checkWinCondition();
            if (!gameEnded) {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                updatePlayerPanels();
                rollButton.disabled = false;
            }
        }, 500);
    }, 500);
}

// Move player token
function movePlayer(spaces) {
    const currentPosition = currentPlayer === 1 ? player1Position : player2Position;
    let newPosition = currentPosition + spaces;
    
    if (newPosition > 100) {
        newPosition = currentPosition;
        document.getElementById('gameMessage').textContent = 'Need exact number to win!';
        return;
    }
    
    if (currentPlayer === 1) {
        player1Position = newPosition;
    } else {
        player2Position = newPosition;
    }
    
    updatePlayerPositions();
}

// Check for snakes and ladders
function checkSnakesAndLadders() {
    const position = currentPlayer === 1 ? player1Position : player2Position;
    let newPosition = position;
    
    if (snakes[position]) {
        newPosition = snakes[position];
        document.getElementById('gameMessage').textContent = `Oops! Snake at ${position} brings you down to ${newPosition}`;
        const square = document.querySelector(`.board-square[data-position="${position}"]`);
        square.setAttribute('title', `Snake: Slides down to ${newPosition}`);
        square.style.transform = 'scale(1.1)';
        setTimeout(() => square.style.transform = 'scale(1)', 500);
    } else if (ladders[position]) {
        newPosition = ladders[position];
        document.getElementById('gameMessage').textContent = `Yay! Ladder at ${position} takes you up to ${newPosition}`;
        const square = document.querySelector(`.board-square[data-position="${position}"]`);
        square.setAttribute('title', `Ladder: Climbs up to ${newPosition}`);
        square.style.transform = 'scale(1.1)';
        setTimeout(() => square.style.transform = 'scale(1)', 500);
    }
    
    if (newPosition !== position) {
        if (currentPlayer === 1) {
            player1Position = newPosition;
        } else {
            player2Position = newPosition;
        }
        updatePlayerPositions();
    }
}

// Update player positions on the board
function updatePlayerPositions() {
    document.getElementById('player1Pos').textContent = player1Position;
    document.getElementById('player2Pos').textContent = player2Position;
}

// Update player panels to show current turn
function updatePlayerPanels() {
    document.getElementById('player1Panel').classList.toggle('current-player', currentPlayer === 1);
    document.getElementById('player2Panel').classList.toggle('current-player', currentPlayer === 2);
    document.getElementById('gameMessage').textContent = `Player ${currentPlayer}'s turn`;
}

// Check win condition
function checkWinCondition() {
    if (player1Position === 100 || player2Position === 100) {
        gameEnded = true;
        const winner = player1Position === 100 ? 1 : 2;
        document.getElementById('gameMessage').textContent = `Player ${winner} wins! 🎉`;
        document.getElementById('rollButton').disabled = true;
    }
}

// Event listeners
document.getElementById('rollButton').addEventListener('click', rollDice);

// Initialize the game
initializeBoard();