// Creating the board first --
// Initializing the spaces we can play on

/*
// You're going to store the gameboard as 
an array inside of a Gameboard object, so start there! 

// Your players are also going to be stored in objects, 

// you're probably going to want an object to control 
the flow of the game itself.
*/

function Gameboard() {
    const rows = 3, cols = 3;
    const board = []

    function Cell() {
        let value = 0;
        // 
        const addSymbol = (player) => {
            value = player;
        };
        const getValue = () => value;
        return {
            addSymbol, 
            getValue
        };
    }

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(Cell());
        }
    }
    
    // get whole board for ui
    const getBoard = () => board;

    const placeSymbol = (row, col, player) => {
        
        // val col
        if (col < 0 || col >= cols) {
            console.log("Invalid column");
            return false;
        }

        if (row < 0 || row >= rows) {
            console.log("Invalid row");
            return false;
        }
        
        if (board[row][col].getValue() === 0) {
                board[row][col].addSymbol(player);
                return true;
        }

        console.log("Position already taken");
        return false; 
    }

    const printBoard = () => {
        console.log("\n--- BOARD ---");
        for (let i = 0; i < rows; i++) {
            let rowString = "";
            for (let j = 0; j < cols; j++) {
                const value = board[i][j].getValue();
                rowString += value === 0 ? "[ ]" : `[${value}]`;
            }
            console.log(rowString);
        }
        console.log("--- ----- ---\n");
    }

    return {getBoard, placeSymbol, printBoard}
}

function GameController(gameBoard) {
    const players = {
        1: { name: "Player 1", marker: "X" },
        2: { name: "Player 2", marker: "O" }
    }

    // Starts from player 1
    let currentPlayer = 1;

    const getCurrentPlayer = () => currentPlayer; // Add this method

    const playTurn = (row, col) => {
        const previousPlayer = currentPlayer; // Store who's making the move
        if (gameBoard.placeSymbol(row, col, currentPlayer)) {
            currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch after successful move
            return { success: true, player: previousPlayer }; // Return success and who played
        }
        return { success: false }; // Return failure
    }

    return { players, playTurn, getCurrentPlayer }
}

function checkWin(board, player) {
    const rows = board.length;
    const cols = board[0].length;

    // Check horizontal
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col <= cols - 3; col++) {
            if (board[row][col].getValue() === player &&
                board[row][col + 1].getValue() === player &&
                board[row][col + 2].getValue() === player) {
                return true;
            }
        }
    }

    // Check vert
    for (let row = 0; row <= rows - 3; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col].getValue() === player &&
                board[row + 1][col].getValue() === player &&
                board[row + 2][col].getValue() === player) {
                return true;
            }
        }
    }

    // Check diagonal
    for (let row = 0; row <= rows - 3; row++) {
        for (let col = 0; col <= cols - 3; col++) {
            if (board[row][col].getValue() === player &&
                board[row + 1][col + 1].getValue() === player &&
                board[row + 2][col + 2].getValue() === player) {
                return true;
            }
        }
    }

    // Check diagonal wins (top-right to bottom-left)
    for (let row = 0; row <= rows - 3; row++) {
        for (let col = 2; col < cols; col++) {
            if (board[row][col].getValue() === player &&
                board[row + 1][col - 1].getValue() === player &&
                board[row + 2][col - 2].getValue() === player) {
                return true;
            }
        }
    }

    return false;
}

const gameBoard = Gameboard();
const gameController = GameController(gameBoard);

// Modal functions
function showWinModal(message) {
    const modal = document.getElementById('winModal');
    const winMessage = document.getElementById('winMessage');
    winMessage.textContent = message;
    modal.style.display = 'block';
}

function hideWinModal() {
    const modal = document.getElementById('winModal');
    modal.style.display = 'none';
}

function resetGame() {
    // Clear all cells
    const gridCells = document.querySelectorAll('.grid-cell');
    gridCells.forEach(cell => {
        cell.textContent = '';
    });
    
    // Reset game state (create new instances)
    const newGameBoard = Gameboard();
    const newGameController = GameController(newGameBoard);
    
    // Update global references
    Object.assign(gameBoard, newGameBoard);
    Object.assign(gameController, newGameController);
    
    hideWinModal();
}

// DOM Event Listeners for Web Interface
document.addEventListener('DOMContentLoaded', () => {
    // Get all grid cells
    const gridCells = document.querySelectorAll('.grid-cell');
    
    // Add click event listeners to each cell
    gridCells.forEach((cell, index) => {
        cell.addEventListener('click', (e) => {
            console.log(`Cell ${index} clicked`);
            const col = index % 3, row = Math.floor(index / 3);
            const result = gameController.playTurn(row, col);
            if (result.success) {
                cell.textContent = gameController.players[result.player].marker;
                if (checkWin(gameBoard.getBoard(), result.player)) {
                    const playerName = gameController.players[result.player].name;
                    const marker = gameController.players[result.player].marker;
                    
                    // Show custom modal
                    showWinModal(`🎉 ${playerName} (${marker}) wins! 🎉`);
                    
                    console.log(`Player ${result.player} wins!`);
                }
            }
        });
    });

    // Add event listeners for menu buttons
    const resetBtn = document.getElementById('resetBtn');
    const timerBtn = document.getElementById('timerBtn');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    
    resetBtn.addEventListener('click', () => {
        console.log('Reset button clicked');
        resetGame();
    });
    
    timerBtn.addEventListener('click', () => {
        console.log('Timer button clicked');
        // TODO: Timer logic
    });

    themeToggleBtn.addEventListener('click', () => {
        const root = document.documentElement;
        const isLightTheme = root.classList.contains('light-theme');
        
        if (isLightTheme) {
            root.classList.remove('light-theme');
            themeToggleBtn.textContent = '🌙 Dark';
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.add('light-theme');
            themeToggleBtn.textContent = '☀️ Light';
            localStorage.setItem('theme', 'light');
        }
    });

    // load the saved theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        themeToggleBtn.textContent = '☀️ Light';
    }
    
    settingsBtn.addEventListener('click', () => {
        console.log('Settings button clicked');
        // TODO: Settings 
    });

    // modal button evenlisteners
    const playAgainBtn = document.getElementById('playAgainBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    playAgainBtn.addEventListener('click', () => {
        resetGame();
    });
    
    closeModalBtn.addEventListener('click', () => {
        hideWinModal();
    });

    const modal = document.getElementById('winModal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideWinModal();
        }
    });
});
