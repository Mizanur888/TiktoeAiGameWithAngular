import { __await } from 'tslib';

export async function FindWinner(board: string[][], dimanson: number): Promise<[boolean, string]> {

   
    let checkWinner: [boolean, string];
    let winPlayer = null;
    let winner = false;

    //check for diagonal winner top [0][2] to bottom [2][0]
    checkWinner = [false, ""];
    if (checkWinner[0] === false) {
        checkWinner = await checkforDiagonalWinner(board, dimanson);
    }

    if (checkWinner[0] === false) {
        checkWinner = await checkforDiagonalWinnertopBottom(board, dimanson);
    }

    if (checkWinner[0] === false) {
        checkWinner = await checkforhorizonal(board, dimanson);
    }
    if (checkWinner[0] === false) {
        checkWinner = await checkforHorizontalWinner(board, dimanson);
    }
    return [checkWinner[0], checkWinner[1]];
}

export async function FindWinnerAI(board: string[][], dimanson: number): Promise<number> {

    let checkWinner: [boolean, string];

    checkWinner = [false, ""];
    if (checkWinner[0] === false) {
        checkWinner = await checkforDiagonalWinner(board, dimanson);
    }

    if (checkWinner[0] === false) {
        checkWinner = await checkforDiagonalWinnertopBottom(board, dimanson);
    }

    if (checkWinner[0] === false) {
        checkWinner = await checkforhorizonal(board, dimanson);
    }
    if (checkWinner[0] === false) {
        checkWinner = await checkforHorizontalWinner(board, dimanson);
    }

    if (checkWinner[0] === true && checkWinner[1] === "x") return +10;
    else if (checkWinner[0] === true && checkWinner[1] === "o") return -10;

    return 0;
}


// This will return the best possible
// move for the player
export async function FindBestMoveForAi(board: string[][], dimanson: number): Promise<[number, number]> {
    let row = -1, col = -1;
    let bestVal = -Infinity;

    // Traverse all cells, evaluate minimax function
    // for all empty cells. And return the cell
    // with optimal value.

    for (var i = 0; i < dimanson; i++) {
        for (var j = 0; j < dimanson; j++) {
            // Check if cell is empty
            if (board[i][j] === "") {
                // Make the move
                board[i][j] = 'x';

                // compute evaluation function for this
                // move.
                let moveVal = await MinMaxAlgoAi(board, 0, false);

                board[i][j] = "";

                // If the value of the current move is
                // more than the best value, then update
                // best/

                if (moveVal > bestVal) {
                    bestVal = moveVal;
                    row = i;
                    col = j;

                }
            }
        }
    }
    return [row, col];
}

async function MinMaxAlgoAi(board: string[][], depth: number, isMax: boolean): Promise<number> {

    var dimanson = 3;
    let score = await FindWinnerAI(board, dimanson);

    if (score === 10) {
        return score;
    }
    if (score === -10) {
        return score;
    }
    if (await isMovesLeft(board, dimanson) === false) {
        return 0;
    }

    // If this maximizer's move
    if (isMax) {
        let best = -Infinity;

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < dimanson; j++) {

                // Check if cell is empty
                if (board[i][j] === "") {
                    // Make the move
                    board[i][j] = 'x';

                    // Call minimax recursively and choose
                    // the maximum value

                    best = Math.max(best, await MinMaxAlgoAi(board, depth + 1, !isMax));

                    board[i][j] = "";
                }
            }
        }

        return best;
    }
    else {
        // If this minimizer's move
        let best = +Infinity;

        for (var i = 0; i < dimanson; i++) {
            for (var j = 0; j < dimanson; j++) {

                // Check if cell is empty
                if (board[i][j] === "") {
                    // Make the move
                    board[i][j] = 'o';

                    // Call minimax recursively and choose
                    // the maximum value

                    best = Math.min(best, await MinMaxAlgoAi(board, depth + 1, !isMax));

                    board[i][j] = "";
                }
            }
        }

        return best;
    }
}

async function isMovesLeft(board: string[][], dimanson): Promise<boolean> {
    for (var i = 0; i < dimanson; i++)
        for (var j = 0; j < dimanson; j++)
            if (board[i][j] === "")
                return true;
    return false;
}
async function checkforHorizontalWinner(board: string[][], dimanson: number): Promise<[boolean, string]> {
    let winner = false;
    let winnerSymbol = "";
    let i = 0, j = 0, count = 1;
    let current = board[0][0];
    do {
        current = board[0][j];
        if (current != "") {
            for (i = 1; i < dimanson; i++) {
                if (board[i][j] === current) {
                    count++;
                }
                else {
                    count = 1;
                    i = dimanson - 1;
                    current = "";
                }
            }
        }
        if (count === dimanson) {
            winner = true;
            winnerSymbol = current;
            j = dimanson - 1;
            i = dimanson - 1;
        }
        j++;
    } while (j <= (dimanson - 1));


    return [winner, winnerSymbol];
}
async function checkforhorizonal(board: string[][], dimanson: number): Promise<[boolean, string]> {
    let winner = false;
    let winnerSymbol = "";
    let i = 0, j = 0, count = 1;
    let current = board[0][0];

    do {
        current = board[j][0];
        if (current != "") {
            for (i = 1; i < dimanson; i++) {
                if (board[j][i] === current) {
                    count++;
                }
                else {
                    count = 1;
                    current = "";
                    i = dimanson - 1;
                }
            }
        }
        if (count === dimanson) {
            winner = true;
            winnerSymbol = current;
            j = dimanson - 1;
            i = dimanson - 1;
        }
        j++;
    } while (j <= (dimanson - 1));



    return [winner, winnerSymbol];
}
async function checkforDiagonalWinner(board: string[][], dimanson: number): Promise<[boolean, string]> {

    //check for diagonal winner top [0][2] to bottom [2][0]

    var i = 0, temp = 1;
    let count = 1;
    let current = board[0][dimanson - 1];
    let winner = false;
    let winnerSymbol = "";
    if (current != "") {
        for (i = dimanson - 2; i >= 0; --i) {
            if (board[temp][i] === current) {
                count++;
            }
            else {
                count = 0;
                i = 0;
                current = "";
            }
            temp++;
        }
    }

    if (count === dimanson) {
        winner = true;
        winnerSymbol = current;
    }

    return [winner, winnerSymbol];
}
async function checkforDiagonalWinnertopBottom(board: string[][], dimanson: number): Promise<[boolean, string]> {
    let winner = false;
    let winnerSymbol = "";
    var i = 0;
    let current = board[0][0];
    let count = 1;
    if (current != "") {
        for (i = 1; i < dimanson; i++) {
            if (board[i][i] === current) {
                count++;
            }
            else {
                count = 0;
                i = dimanson;
            }
        }
    }

    if (count === dimanson) {
        winner = true;
        winnerSymbol = current;
    }
    return [winner, winnerSymbol];
}


