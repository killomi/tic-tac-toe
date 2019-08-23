let activePlayer;
let field = [];
let players = ['X', 'O', ''];
let fieldNumber = 3;
let usedCells = 0;


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

function result(activePlayer) {
    for (let i = 0; i < fieldNumber; i++) {
        const changeX = row => row[i];
        const changeY = (column, i) => field.map(changeX);
        let fieldHorizontal = field;
        let fieldVertical = field[0].map(changeY);
        let firstDiagonal = field[0].map((column, i) => field[i][i]);
        let secondDiagonal = field[0].map((column, i) => field[fieldNumber - i - 1][i]);
        checkResult(fieldHorizontal, fieldVertical, firstDiagonal, secondDiagonal, i);
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

function checkResult(fieldHorizontal, fieldVertical, firstDiagonal, secondDiagonal, i) {
    let checkX = [
        fieldHorizontal[i].every(isWinX),
        fieldVertical[i].every(isWinX),
        firstDiagonal.every(isWinX),
        secondDiagonal.every(isWinX)
    ];
    let checkO = [
        fieldHorizontal[i].every(isWinO),
        fieldVertical[i].every(isWinO),
        firstDiagonal.every(isWinO),
        secondDiagonal.every(isWinO)
    ];

    if (checkX.some(isTrue)) {
        showWinner(0);
    }
    if (checkO.some(isTrue)) {
        showWinner(1);
    }
}

function isWinX(item) {
    return item == 'X';
}

function isWinO(item) {
    return item == 'O';
}

function isTrue(item) {
    return item == true;
}