// EX1 -- # Triangle
console.log("EXERCISE 1:\n")
for (let i = 1; i < 8; i++) {
    let row = "";
    let j = 0;
    while(j < i) {
        row = row + "#"
        j++;
    }
    console.log(row)
}

// EX2 -- FizzBuzz
console.log("\nEXERCISE 2:\n")
for (let num = 0; num < 100; num++) {
    console.log(num);
    if ((num % 5 == 0) && (num % 3 == 0)) {console.log("FizzBuzz");}
    else if (num % 3 == 0) {console.log("Fizz");}
    else if (num % 5 == 0) {console.log("Buzz");}
}

// EX3 -- ChessBoard
console.log("\nEXERCISE 3:\n")
let board = ""
for (let row = 0; row < 8; row++) {
    let boardRow = "";
    for (let col = 0; col < 8; col++) {
        if (row % 2 == 0) {
            if (col % 2 == 0) {
                boardRow = boardRow + " ";
            } else {
                boardRow = boardRow + "#";
            }
        } else {
            if (col % 2 == 0) {
                boardRow = boardRow + "#";
            } else {
                boardRow = boardRow + " ";
            }
        }
    }
    boardRow = boardRow + "\n";
    board = board + boardRow;
}

console.log(board);