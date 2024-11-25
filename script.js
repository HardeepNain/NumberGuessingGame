// Initialize game variables
let randomNumber;
let attempts = 0;
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

// Function to start a new game
function startNewGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
    attempts = 0;
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('feedback').textContent = '';
    document.getElementById('guessInput').value = '';
    updateLeaderboard();
}

// Function to handle player's guess
function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        document.getElementById('feedback').textContent = 'Please enter a valid number between 1 and 100.';
        return;
    }

    attempts++;
    document.getElementById('attempts').textContent = attempts;

    if (guess < randomNumber) {
        document.getElementById('feedback').textContent = 'Too low!';
    } else if (guess > randomNumber) {
        document.getElementById('feedback').textContent = 'Too high!';
    } else {
        document.getElementById('feedback').textContent = 'Correct! You guessed it!';
        saveScore();
    }
}

// Function to save the player's score to the leaderboard
function saveScore() {
    const playerName = prompt('Enter your name:');
    const score = { name: playerName, attempts: attempts };
    leaderboard.push(score);
    leaderboard.sort((a, b) => a.attempts - b.attempts); // Sort by fewest attempts
    leaderboard = leaderboard.slice(0, 3); // Keep top 3 scores
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    updateLeaderboard();
}

// Function to update the leaderboard display
function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard');
    leaderboardList.innerHTML = '';

    leaderboard.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.name}: ${entry.attempts} attempts`;
        leaderboardList.appendChild(li);
    });
}

// Event Listeners
document.getElementById('submitGuess').addEventListener('click', checkGuess);
document.getElementById('newGame').addEventListener('click', startNewGame);

// Start a new game when the page loads
window.onload = startNewGame;