let currentPlayer = 'X';
let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let playerXScore = 0;
let playerOScore = 0;
let gameMode = '';

function showModeSelection() {
    document.getElementById('startButtonContainer').style.display = 'none';
    document.getElementById('modeSelection').style.display = 'block';
}

function setGameMode(mode) {
    gameMode = mode;
    document.getElementById('modeSelection').style.display = 'none';
    document.getElementById('ticTacToe').style.display = 'block';
    document.getElementById('score').style.display = 'block';
    document.getElementById('gameInfo').style.display = 'block';
    updateGameInfo();
}

function updateGameInfo() {
    document.getElementById('currentPlayerInfo').innerText = 'Текущий игрок: ' + currentPlayer;
    document.getElementById('turnInfo').innerText = 'Сделайте свой ход!';
}

function newGame() {
    playerXScore=0;
    document.getElementById('playerXScore').innerText = playerXScore;
    playerOScore=0
    document.getElementById('playerOScore').innerText = playerOScore;
    document.getElementById('modeSelection').style.display = 'block';
    document.getElementById('ticTacToe').style.display = 'none';
    document.getElementById('score').style.display = 'none';
    document.getElementById('gameInfo').style.display = 'none';
    resetGame();
}

function cellClick(cell) {
    if (gameMode === 'player') {
        handlePlayerMove(cell);
    } else if (gameMode === 'bot') {
        handlePlayerMove(cell);
        if (currentPlayer === 'O') {
            //ход
            setTimeout(handleBotMove, 500);
        }
    }
}

function handlePlayerMove(cell) {
    const rowIndex = cell.parentNode.rowIndex;
    const cellIndex = cell.cellIndex;

    if (gameBoard[rowIndex][cellIndex] === '') {
        gameBoard[rowIndex][cellIndex] = currentPlayer;
        cell.innerHTML = currentPlayer;

        if (checkWinner()) {
            alert(currentPlayer + ' выиграл!');
            updateScore();
            resetGame();
        } else if (isBoardFull()) {
            alert('Ничья!');
            resetGame();
        } else {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            updateGameInfo();
        }
    } else {
        alert('Эта ячейка уже занята!');
    }
}

function handleBotMove() {
  // Случайный ход бота
 const availableCells = getAvailableCells();
 if (availableCells.length > 0) {
     const randomIndex = Math.floor(Math.random() * availableCells.length);
     const randomCell = availableCells[randomIndex];
     makeBotMove(randomCell);
 }
}

function getAvailableCells() {
    // Получаем список свободных ячеек
    const availableCells = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameBoard[i][j] === '') {
                availableCells.push({ rowIndex: i, cellIndex: j });
            }
        }
    }
    return availableCells;
}

function makeBotMove(cell) {
    // Выполняем ход бота
    gameBoard[cell.rowIndex][cell.cellIndex] = 'O';
    document.getElementById('ticTacToe').rows[cell.rowIndex].cells[cell.cellIndex].innerHTML = 'O';

    if (checkWinner()) {
        alert('Бот выиграл!');
        updateScore();
        resetGame();
    } else if (isBoardFull()) {
        alert('Ничья!');
        resetGame();
    } else {
        currentPlayer = 'X';
        updateGameInfo();
    }
}

function checkWinner() {
    // Проверка по строкам, столбцам и диагоналям
    for (let i = 0; i < 3; i++) {
        if (checkLine(gameBoard[i][0], gameBoard[i][1], gameBoard[i][2]) ||
            checkLine(gameBoard[0][i], gameBoard[1][i], gameBoard[2][i])) {
            return true;
        }
    }

    if (checkLine(gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]) ||
        checkLine(gameBoard[0][2], gameBoard[1][1], gameBoard[2][0])) {
        return true;
    }

    return false;
}

function checkLine(a, b, c) {
    return (a !== '' && a === b && b === c);
}

function isBoardFull() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameBoard[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const cells = document.getElementsByTagName('td');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
    }

    updateGameInfo();
}

function updateScore() {
    if (currentPlayer === 'X') {
        playerXScore++;
        document.getElementById('playerXScore').innerText = playerXScore;
    } else {
        playerOScore++;
        document.getElementById('playerOScore').innerText = playerOScore;
    }
}
