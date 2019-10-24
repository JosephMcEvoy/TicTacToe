$(document).ready(function() {
    $('.board').hide();
    $('.chooseturn').hide();
});

/*
0 1 2
3 4 5
6 7 8
*/

var board = ['', '', '', '', '', '', '', '', ''];

var moves = 9,
    turn = 'x',
    ai = false,
    aiTurn = '',
    humanTurn = '';

// This function is called after player makes a move and has selected AI game mode.
function aiEval() {
    var aiBoard = board;
    var x = false;
    for (i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = aiTurn;
            if (eval(board) !== false) {
                x = true;
                makeMove(i);
                break;
            } else {
                board[i] = '';
            }
        }
    }
    if (!x) {
        for (var i = 0; i < board.length; i++) {
            if (board[i] === '') {
                makeMove(i)
                break;
            }
        }
    }
}


// Puts board variable into corresponding squares in the html
function displayBoard() {
    $('#0').html(board[0]);
    $('#1').html(board[1]);
    $('#2').html(board[2]);
    $('#3').html(board[3]);
    $('#4').html(board[4]);
    $('#5').html(board[5]);
    $('#6').html(board[6]);
    $('#7').html(board[7]);
    $('#8').html(board[8]);
};

// Determines if there is a winner or a tie
function eval(brd) {
    // Win Conditions if x
    if ((brd[0] === 'x' && brd[3] === 'x' && brd[6] === 'x') ||
        (brd[1] === 'x' && brd[4] === 'x' && brd[7] === 'x') ||
        (brd[2] === 'x' && brd[5] === 'x' && brd[8] === 'x') ||
        (brd[0] === 'x' && brd[1] === 'x' && brd[2] === 'x') ||
        (brd[3] === 'x' && brd[4] === 'x' && brd[5] === 'x') ||
        (brd[6] === 'x' && brd[7] === 'x' && brd[8] === 'x') ||
        (brd[6] === 'x' && brd[4] === 'x' && brd[2] === 'x') ||
        (brd[8] === 'x' && brd[4] === 'x' && brd[0] === 'x')) {
        return 'x';
    // Win conditions if o
    } else if ((brd[0] === 'o' && brd[3] === 'o' && brd[6] === 'o') ||
        (brd[1] === 'o' && brd[4] === 'o' && brd[7] === 'o') ||
        (brd[2] === 'o' && brd[5] === 'o' && brd[8] === 'o') ||
        (brd[0] === 'o' && brd[1] === 'o' && brd[2] === 'o') ||
        (brd[3] === 'o' && brd[4] === 'o' && brd[5] === 'o') ||
        (brd[6] === 'o' && brd[7] === 'o' && brd[8] === 'o') ||
        (brd[6] === 'o' && brd[4] === 'o' && brd[2] === 'o') ||
        (brd[8] === 'o' && brd[4] === 'o' && brd[0] === 'o')) {
        return 'o';
    } else if (moves === 0) {
        return 'nobody';
    } else {
        return false;
    }
}

// Resets the board
function clearBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
};

// Starts the game
function startGame() {
    clearBoard();
    displayBoard();
    moves = 9;
    turn = 'x';
    $('.playerselect').hide();
    $('.result').hide();
    $('.board').show();
    $('.chooseturn').hide();
};

//Ends the game
function endGame() {
    moves = 0;
    ai = false;
    $('.result').html(eval(board).charAt(0).toUpperCase() + eval(board).slice(1) + ' wins')
    $('.result').show();
    $('.playerselect').show();
};

// This is where most of the game logic is
function makeMove(boxCode) {
    if (board[boxCode] === '') { // Check if box is empty
        board[boxCode] = turn; // Set the letter in the board array
        moves -= 1;
        displayBoard();
        turn = turn === "x" ? "o" : "x"; //switch to o or x
        if (eval(board)) {
            endGame();
        }
    }
    if (turn === aiTurn && ai === true) {
        aiEval();
    }
};

// Highlight player or AI selection
$(".player").hover(
    function() {
        $(this).css("color", "rgba(84, 31, 20, 1)");
    },
    function() {
        $(this).css("color", "rgba(24, 26, 27, 1)");
    }
);

$(".ai").hover(
    function() {
        $(this).css("color", "rgba(84, 31, 20, 1)");
    },
    function() {
        $(this).css("color", "rgba(24, 26, 27, 1)");
    }
);

// 2 Player selection
$(".player").click(
    function() {
        ai = false;
        aiTurn = '';
        startGame();
    }
);

// AI selection
$(".ai").click(
    function() {
        ai = true;
        $('.playerselect').hide();
        $('.board').hide();
        $('.result').hide();
        $('.chooseturn').show();
    }
);

// Pick X or O (Only happens if playing against computer)
$("#x").click(
    function() {
        aiTurn = 'o';
        humanTurn = 'x';
        startGame(board);
    }
);

$("#o").click(
    function() {
        aiTurn = 'x';
        humanTurn = 'o';
        startGame();
        aiEval();

    }
);

// Highlight the box
$(".box").hover(
    function() {
        $(this).css("background-color", "rgba(204,158,97,.50)");
    },
    function() {
        $(this).css("background-color", "rgba(147, 129, 114, 1)");
    }
).click( // Selecting a box
    function() {
        if (turn !== aiTurn) {
            makeMove($(this).attr('id'));
        }
    });