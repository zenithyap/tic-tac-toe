const gameboard = (function() {
    const board = [];

    function initBoard() {}
    function getBoard() {}
    function changeSymbol() {}
    function isWinBoard() {}

    // for debugging in console
    function printBoard() {}

    return { initBoard, getBoard, changeSymbol, checkWinBoard, printBoard };
})();

function cell() {
    const symbol = "_";

    function changeSymbol() {}
    function getSymbol() {}

    return { changeSymbol, getSymbol };
}

function player(name, symbol) {
    return { name, symbol };
}

const gameController = (function(playerOneName="Player One", playerTwoName="Player Two") {
    gameboard.initBoard();

    const players = [
        player(playerOneName, "X"), 
        player(playerTwoName, "O")
    ]

    let activePlayer = players[0];

    function switchActivePlayer() {}
    function getActivePlayer() {}
    function printNewRound() {}
    function playRound(row, col) {
        board.changeSymbol();
        if (board.isWinBoard()) {

        } else {
            switchActivePlayer();
            board.printBoard();
        }   
    }

    return { getActivePlayer, playRound };
})();
