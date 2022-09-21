'use strict'

const MINES = "MINES"
const MINES_IMG = '\n\t\t<img src="img/mines.png">\n'
const EMPTY = "NUMBER"

//Model
var gBoard;
var gPLayer;

function initGame() {
    gPLayer = { i: 2, j: 9 }
    gBoard = buildBoard()
    renderBoard(gBoard)
    // console.log(gBoard);
    console.table(gBoard);
}

function buildBoard() {
    var board = []

    // Create the Matrix 4 * 4;
    board = createMat(4, 4)

    //Create EMPTY cells eneywhere.
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j] = { type: EMPTY, gameElement: null, isShown: false }
        }
    }

    //Place 2 MINES on board.
    board[0][0].gameElement = MINES
    board[3][2].gameElement = MINES

    // console.log("isShown", isShown);
    console.log(board[0][0].gameElement);
    return board;
}

//Render the board to HTML Table.
function renderBoard(board) {

    var elBoard = document.querySelector('.board')
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'

        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]

            var cellClass = getClassName({ i, j })

            if (currCell.gameElement === MINES) cellClass += ' mines'
            else if (currCell.type === EMPTY) cellClass += ' number'

            strHTML += `\t<td class="cell ${cellClass}" onclick="clickedOnBoardGame(${i}, ${j})">`

            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'
    }
    // console.log(strHTML)
    elBoard.innerHTML = strHTML
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector)
    console.log(elCell);
    elCell.innerHTML = value
}

//Recognize the cell just clicked  and target him with a Temporary var.
function clickedOnBoardGame(i, j) {
    var tragetCell = gBoard[i][j];
    console.log(gBoard);
    if (tragetCell) {
        tragetCell.isShown = true
    }

    if (tragetCell.gameElement === MINES) {
        renderCell({ i, j }, MINES_IMG)
        console.log("Boom");
    }
}

// Add evenet lisener to mouse click.
function handleClick(click) {
    console.log(click);
}

// Returns the class name for a specific cell
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}