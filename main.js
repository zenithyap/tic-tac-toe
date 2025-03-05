const gameboard = (function() {
    const BOARD_SIZE = 3;
    const board = [];

    function initBoard() {
        for (let i = 0; i < BOARD_SIZE; i++) {
            board[i] = [];
            for (let j = 0; j < BOARD_SIZE; j++) {
                board[i].push(cell());
            }
        }
    }

    function getBoard() {
        return board;
    }

    function changeSymbol(row, col, symbol) {
        board[row][col].changeSymbol(symbol);
    }

    // Module to check if board state has a winner
    const checkWin = (function() {
        function areThreeCellsEquals(firstCell, secondCell, thirdCell) {
            const firstRowCellSymbol = firstCell.getSymbol();
            const secondRowCellSymbol = secondCell.getSymbol();
            const thirdRowCellSymbol = thirdCell.getSymbol();

            return (firstRowCellSymbol === secondRowCellSymbol
                && secondRowCellSymbol === thirdRowCellSymbol
                && firstCell.hasSymbol());
        }

        const rows = () => {
            for (let row = 0; row < BOARD_SIZE; row++) {
                const firstCellSymbol = board[row][0].getSymbol();
                const isEquals = cell => cell.getSymbol() === firstCellSymbol && cell.hasSymbol();
                if (board[row].every(isEquals)) {
                    return true;
                }
            }
            return false;
        }

        const cols = () => {
            for (let row = 0; row < BOARD_SIZE; row++) {
                const firstRowCell = board[0][row];
                const secondRowCell = board[1][row];
                const thirdRowCell = board[2][row];

                if (areThreeCellsEquals(firstRowCell, secondRowCell, thirdRowCell)) {
                    return true;
                }
            }
            return false;
        }

        const diagonals = () => {
            function hasTopLeftToBottomRight() {
                const firstRowCell = board[0][0];
                const secondRowCell = board[1][1];
                const thirdRowCell = board[2][2];

                return areThreeCellsEquals(firstRowCell, secondRowCell, thirdRowCell);
            };

            function hasBottomLeftToTopRight() {
                const firstRowCell = board[0][2];
                const secondRowCell = board[1][1];
                const thirdRowCell = board[2][0];

                return areThreeCellsEquals(firstRowCell, secondRowCell, thirdRowCell);
            };

            return hasTopLeftToBottomRight() || hasBottomLeftToTopRight();
        }
        
        return { rows, cols, diagonals };
    })();

    function isWinBoard() {
        if (checkWin.rows() || checkWin.cols() || checkWin.diagonals()) {
            return true;
        }
        return false;
    }

    // for debugging in console
    function printBoard() {
        const boardWithCellSymbols = board.map(row => row.map(cell => cell.getSymbol()));
        console.log(boardWithCellSymbols);
    }

    return { initBoard, getBoard, changeSymbol, isWinBoard, printBoard, BOARD_SIZE };
})();

function cell() {
    const EMPTY = "_";
    let symbol = EMPTY;

    function changeSymbol(newSymbol) {
        symbol = newSymbol;
    }

    function getSymbol() {
        return symbol;
    }

    function hasSymbol() {
        return symbol !== EMPTY;
    }

    return { changeSymbol, getSymbol, hasSymbol };
}

function player(name, symbol) {
    return { name, symbol };
}

const gameController = (function(playerOneName="Player One", playerTwoName="Player Two") {
    gameboard.initBoard();

    const players = [
        player(playerOneName, "X"),
        player(playerTwoName, "O")
    ];

    let activePlayer = players[0];

    function switchActivePlayer() {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }
    }

    function getActivePlayer() {
        return activePlayer;
    }

    function playRound(row, col) {
        gameboard.changeSymbol(row, col, activePlayer.symbol);
        if (gameboard.isWinBoard()) {
            console.log(`${activePlayer.name} has won!`)
        } else {
            switchActivePlayer();
            gameboard.printBoard();
        }   
    }

    return { getActivePlayer, playRound };
})();

const displayController = (function() {
    function renderDisplay() {
        const board = gameboard.getBoard();
        const rows = {
            0: document.querySelector(".first-row"),
            1: document.querySelector(".second-row"),
            2: document.querySelector(".third-row")
        };

        for (let row = 0; row < gameboard.BOARD_SIZE; row++) {
            for (let col = 0; col < gameboard.BOARD_SIZE; col++) {
                const symbol = document.createElement("div");
                symbol.textContent = board[row][col].getSymbol();
                rows[0].appendChild(symbol);
            }
        }
    }

    return { renderDisplay };
})();

gameController.playRound(0, 0);
gameController.playRound(0, 1);
gameController.playRound(2, 0);
gameController.playRound(0, 2);


displayController.renderDisplay();