const cells = document.querySelectorAll('[data-cell]');
const gameBoard = document.querySelector('.game-board');
let currentPlayer = 'X';

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    const cell = e.target;
    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        alert(`${currentPlayer} wins!`);
        resetGame();
    } else if (isBoardFull()) {
        alert('It\'s a draw!');
        resetGame();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin(player) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function isBoardFull() {
    return [...cells].every(cell => {
        return cell.textContent !== '';
    });
}

function resetGame() {
    setTimeout(() => {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true });
        });
        currentPlayer = 'X';
    }, 1000);
}
