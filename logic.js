let activePlayer;
let field = [];
let fieldForCheck = [];
let players = ['X', 'O', ''];
let fieldNumber = 3;
let usedCells = 0;

function drawField(activePlayer, row = -1, column = -1) {
    if (row == -1 && column == -1) {
        for (let i = 0; i < fieldNumber; i++) {
            let fieldColumn = [];
            for (let j = 0; j < fieldNumber; j++) {
                fieldColumn.push(players[activePlayer]);
            }
            field.push(fieldColumn);
        }
        activePlayer = 0;
    }
    else {
        field[row][column] = players[activePlayer];
        usedCells++;
    }
    return activePlayer;
}

function isWinX(item) {
    return item =='X';
}

function isWinO(item) {
    return item =='O';
}

function result(activePlayer) {
    for (let i = 0; i < fieldNumber; i++) {
        const changeX = row => row[i];
        const changeY = (column, i) => field.map(changeX);
        let fieldHorizontal = field;
        let fieldVertical = field[0].map(changeY);
        console.log(fieldVertical[i]);
        checkResult(fieldHorizontal, fieldVertical, i);
    }

    if (usedCells < (fieldNumber * fieldNumber)) {
        switch (activePlayer) {
            case 0:
                activePlayer = 1;
                return activePlayer;
            case 1:
                activePlayer = 0;
                return activePlayer;
        }
    }
    else {
        showNoMoreSpace();
    }
}

function checkResult(fieldHorizontal, fieldVertical, i) {
    let checkXHor = fieldHorizontal[i].every(isWinX);
    let checkOHor = fieldHorizontal[i].every(isWinO);
    let checkXVer = fieldVertical[i].every(isWinX);
    let checkOVer = fieldVertical[i].every(isWinO);
    if (checkXHor == true || checkXVer == true) {
        showWinner(0);
    }
    if (checkOHor == true || checkOVer == true) {
        showWinner(1);
    }
}

function startGame() {
    activePlayer = 2;
    activePlayer = drawField(activePlayer);
    renderBoard(field);
}

function click(row, column) {
    activePlayer = drawField(activePlayer, row, column);
    renderBoard(field);
    activePlayer = result(activePlayer);
}