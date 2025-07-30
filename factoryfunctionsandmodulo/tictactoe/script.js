import * as readline from 'readline';

// Creating the board first --
// Initializing the spaces we can play on

/*
// You’re going to store the gameboard as 
an array inside of a Gameboard object, so start there! 

// Your players are also going to be stored in objects, 

// you’re probably going to want an object to control 
the flow of the game itself.
*/
function Gameboard() {
    const rows = 3, cols = 3;
    const board = []

    function Cell() {
        let value = 0;
        // 
        const addToken = (player) => {
            value = player;
        };
        const getValue = () => value;
        return {
            addToken, 
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

    const dropToken = (col, player) => {
        
        // val col
        if (col < 0 || col >= cols) {
            console.log("Invalid column");
            return false;
        }
        
        for (let row = rows - 1; row >= 0; row--) {
            if (board[row][col].getValue() === 0) {
                board[row][col].addToken(player);
                return true;
            }
        }
        console.log("Column is full");
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

    return {getBoard, dropToken, printBoard}
}

function GameController(gameBoard) {
    const players = {
        1: { name: "Player 1", marker: "X" },
        2: { name: "Player 2", marker: "O" }
    }

    // Starts from player 1
    let currentPlayer = 1;

    const getCurrentPlayer = () => currentPlayer; // Add this method

    const playTurn = (col) => {
        const previousPlayer = currentPlayer; // Store who's making the move
        if (gameBoard.dropToken(col, currentPlayer)) {
            currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch after successful move
            return { success: true, player: previousPlayer }; // Return success and who played
        }
        return { success: false }; // Return failure
    }

    return { playTurn, getCurrentPlayer }
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

async function GameFlow(gameboard, gameController) {
    // This function can handle the game flow logic
    // For example, it can take user input and call gameController.playTurn(col)
    // It can also check for win conditions, etc.
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const playerInput = (question) => {
        return new Promise((resolve) => {
            rl.question(question, (answer) => {
                resolve(answer);
            });
        });
    }

    let gameOver = false;
    let winner = null;

    gameboard.printBoard();
    
    while (!gameOver) {
        const currentPlayer = gameController.getCurrentPlayer(); // Use the getter method
        const input = await playerInput(`Player ${currentPlayer}: Enter a col (0-2): `);
        const col = parseInt(input);

        if (isNaN(col) || col < 0 || col > 2) {
            console.log("Invalid input! Please enter 0, 1, or 2");
            continue;
        }
        
        const moveResult = gameController.playTurn(col);
        if (moveResult.success) { // Check if move was successful
            gameboard.printBoard();
            
            const board = gameboard.getBoard();
            
            // Check if the player who just moved won
            if (checkWin(board, moveResult.player)) { // Use the player who actually made the move
                console.log(`🎉 Player ${moveResult.player} wins!`);
                winner = moveResult.player;
                gameOver = true;
            } else {
                // Check for tie (board full)
                let movesPlayed = 0;
                const rows = board.length;
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < rows; j++) {
                        if (board[i][j].getValue() !== 0) {
                            movesPlayed++;
                        }
                    }
                }
                
                if (movesPlayed >= 9) {
                    console.log("It's a tie! Board is full.");
                    gameOver = true;
                }
            }
        } else {
            console.log("Invalid move! Try again.");
        }
    }

    rl.close();
    console.log("Game Over!");
}


const gameBoard = Gameboard();
const gameController = GameController(gameBoard);

GameFlow(gameBoard, gameController)
// gameboard.dropToken(0, 1); // Player 1 drops a token in column 0
// gameboard.printBoard(); // Initial empty board
// gameboard.dropToken(0, 2); // Player 2 drops a token in column 0
// gameboard.printBoard(); // Board after Player 2's move

// gameboard.dropToken(0, 1); // Player 1 drops a token in column 0
// //console.log(gameboard.getBoard());
