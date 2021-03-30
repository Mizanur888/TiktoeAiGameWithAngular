
export async function FindWinner(board: string[][], dimanson: number): Promise<[boolean, string]> {

    console.log("FindWinner " + dimanson)
    let checkWinner: [boolean, string];
    let winPlayer = null;
    let winner = false;

    //check for diagonal winner top [0][2] to bottom [2][0]
    checkWinner = await checkforDiagonalWinner(board, dimanson);

    if (checkWinner[0] === false) {
        //check for diagonal winner top [0][0] to bottom [2][2]
        checkWinner = await checkforDiagonalWinnertopBottom(board, dimanson);
    }

    if (checkWinner[0] === false) {
        //check for diagonal winner top [0][0] to bottom [2][2]
        checkWinner = await checkforhorizonal(board, dimanson);
    }

    return [checkWinner[0], checkWinner[1]];
}

//check winner on horizonal --------------
async function checkforhorizonal(board: string[][], dimanson: number): Promise<[boolean, string]> {
    let winner = false;
    let winnerSymbol = "";
    let i = 0, j = 0, count = 1;
    let current = board[0][0];

    if (winner === false) {
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
    }


    return [winner, winnerSymbol];
}
async function checkforDiagonalWinner(board: string[][], dimanson: number): Promise<[boolean, string]> {

    //check for diagonal winner top [0][2] to bottom [2][0]

    var i = 0, temp = 1;
    let count = 1;
    let current = board[0][dimanson - 1];
    let winner = false;
    let winnerSymbol = "";
    if (current !== "" && winner === false) {
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
    if (current != "" && winner === false) {
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

