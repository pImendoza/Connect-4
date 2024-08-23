var playerOne = prompt("Player One Enter Your Name, you will be Blue");
var playerTwo = prompt("Player Two Enter Your Name, you will be Red");

var playerOneColor = 'rgb(0, 0, 255)';
var playerTwoColor = 'rgb(255, 0, 0)';

var game_start = true;
var table = $('table tr'); 

function reportWin(rowNum, colNum) {
    console.log("You won starting at this %s,%s", rowNum, colNum);
}

function changeColor(rowIndex, colIndex, color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function returnColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
    var colorReport = returnColor(5, colIndex);
    
    for (var row = 5; row > -1; row--) {
        colorReport = returnColor(row, colIndex);
        if (colorReport === 'rgb(128, 128, 128)') {
            return row
        }      
    }
}

function colorMatchCheck(one, two, three, four){
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

function horizontalWinCheck() {
    for (var row = 0; row < 6; row++) {
        for (var col = 0; col < 4; col++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row, col+1), returnColor(row, col+2), returnColor(row, col+3))) {
                console.log('horizontal');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

function verticalWinCheck() {
    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 3; row++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row+1, col), returnColor(row+2, col), returnColor(row+3, col))) {
                console.log('vertical');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

function diagonalWinCheck() {
    for (var col = 0; col < 5; col++) {
        for (var row = 0; row < 7; row++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row+1, col+1), returnColor(row+2, col+2), returnColor(row+3, col+3))) {
                console.log('diagonal');
                reportWin(row, col);
                return true;
            } else if (colorMatchCheck(returnColor(row, col), returnColor(row-1, col+1), returnColor(row-2, col+2), returnColor(row-3, col+3))) {
                console.log('diagonal');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

// Game End
function gameEnd(winningPlayer) {
    for (var col = 0; col < 7; col++){
        for (var row = 0; row < 7; row++){
            $('h3').fadeOut('fast');
            $('h2').fadeOut('fast');
            $('h1').text(winningPlayer + ", you have won! Refreash your browser to play again!").css("fontSize", "50px");
        }
    }
}

//Game Start with Player 1
var currentPlayer = 1;
var currentName = playerOne;
var currentColor = playerOneColor;

$('h3').text(playerOne+": it is your turn, please pick a column to drop your blue chip.")

$('table button').on('click',function() {
    var col = $(this).closest("td").index();
    var bottomAvail = checkBottom(col);
    
    changeColor(bottomAvail, col, currentColor);

    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
        gameEnd(currentName);
    }

    currentPlayer = currentPlayer * -1;

    if (currentPlayer === 1) {
        currentName = playerOne;
        $('h3').text(currentName+": it is your turn, please pick a column to drop your blue chip.");
        currentColor = playerOneColor
    }else {
        currentName = playerTwo;
        $('h3').text(currentName+": it is your turn, please pick a column to drop your red chip.");
        currentColor = playerTwoColor;
    }
})