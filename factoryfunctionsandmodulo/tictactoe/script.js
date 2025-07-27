// Creating the board first --
// Initializing the spaces we can play on
function Gameboard() {
    const rows = 6;
    const cols = 7;
    const board = []

    function Cell() {
        let value = 0;

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
        const availableCells = board.filter((row) => row[column].getValue() === 0)
    }

    return {getBoard, dropToken}
}

const gameboard = Gameboard()

Gameboard.dropToken()
console.log(gameboard.getBoard());
