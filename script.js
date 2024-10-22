let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let wins = 0;
let losses = 0;
let draws = 0;
let gameActive = true; // Controla se o jogo está ativo ou não

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');
const drawsDisplay = document.getElementById('draws');
const resetButton = document.getElementById('reset');

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false; // Desativa o jogo
        if (currentPlayer === 'X') {
            wins++;
            winsDisplay.textContent = wins;
            alert("Você venceu!");
        } else {
            losses++;
            lossesDisplay.textContent = losses;
            alert("Você perdeu!");
        }
        return true;
    }

    if (!gameBoard.includes('')) {
        gameActive = false; // Desativa o jogo
        draws++;
        drawsDisplay.textContent = draws;
        alert("Empate!");
        return true;
    }

    return false;
}

function handleClick(e) {
    const index = e.target.getAttribute('data-index');

    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (currentPlayer === 'X') {
            e.target.classList.add('player-x');
        } else {
            e.target.classList.add('player-o');
        }

        if (!checkWinner()) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('player-x', 'player-o'); // Remove classes ao resetar
    });
    currentPlayer = 'X';
    gameActive = true;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    gameActive = true; // Reativa o jogo
}

cells.forEach(cell => cell.addEventListener('click', handleClick));

resetButton.addEventListener('click', resetGame);
