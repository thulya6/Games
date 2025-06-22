const choice = ["rock", "paper", "scissors"];
let mode = "";
let targetScore = 0;
let player1Score = 0;
let player2Score = 0;
let timerInterval;
let player1Choice = "";
let player2Choice = "";
let gameActive = true;

const modeSelection = document.getElementById("mode-selection");
const targetScoreContainer = document.getElementById("target-score-container");
const gameArea = document.getElementById("game-area");
const singlePlayerArea = document.getElementById("single-player-area");
const multiPlayerArea = document.getElementById("multi-player-area");
const player1ScoreDisplay = document.getElementById("player1-score");
const player2ScoreDisplay = document.getElementById("player2-score");
const resultDisplay = document.getElementById("result");
const timerDisplay = document.getElementById("timer");
const resetButton = document.getElementById("reset-game");

document.getElementById("single-player-button").onclick = () => startMode("single");
document.getElementById("multi-player-button").onclick = () => startMode("multi");
document.getElementById("start-game").onclick = startGame;
resetButton.onclick = resetGame;

function startMode(selectedMode) {
    mode = selectedMode;
    modeSelection.style.display = "none";
    targetScoreContainer.style.display = "block";
    resetButton.style.display="block";
}

function startGame() {
    targetScore = parseInt(document.getElementById("target-score").value);
    if (!targetScore || targetScore <= 0) {
        alert("Please enter a valid target score.");
        return;
    }
    targetScoreContainer.style.display = "none";
    gameArea.style.display = "block";
    resetButton.style.display = "block";
    singlePlayerArea.style.display = mode === "single" ? "flex" : "none";
    multiPlayerArea.style.display = mode === "multi" ? "flex" : "none";
    player1Score = 0; 
    player2Score = 0;
    gameActive = true;
    if (mode === "multi") {
        startMultiplayerTimer();
    } else if (mode === "single") {
        startSinglePlayerTimer();
    }
}

function startSinglePlayerTimer() {
    if (!gameActive) return;
    let timer = 5;
    player1Choice = "";
    resultDisplay.textContent = "";
    timerDisplay.textContent = `Timer: ${timer}`;

    timerInterval = setInterval(() => {
        if (!gameActive) {
            clearInterval(timerInterval);
            return;
        }
        timer--;
        timerDisplay.textContent = `Timer: ${timer}`;
        if (timer === 0) {
            clearInterval(timerInterval);
            if (!player1Choice) {
                const computerChoice = choice[Math.floor(Math.random() * 3)];
                resultDisplay.textContent = `Time's up! Computer wins. Computer chose: ${computerChoice}`;
                player2Score++;
                updateScores();
                if (!isGameOver()) setTimeout(startSinglePlayerTimer, 3000);
            }
        }
    }, 1000);
}

function makeChoice(playerChoice) {
    if (!gameActive) return;

    clearInterval(timerInterval); 
    const computerChoice = choice[Math.floor(Math.random() * 3)];
    resultDisplay.textContent = `Player 1 chose: ${playerChoice}, Computer chose: ${computerChoice}`;
    determineRoundWinner(playerChoice, computerChoice); 

    if (!isGameOver()) {
        setTimeout(() => {
            if (gameActive) startSinglePlayerTimer();
        }, 2000); 
    }
}

function startMultiplayerTimer() {
    if (!gameActive) return;
    let timer = 5;
    player1Choice = "";
    player2Choice = "";
    resultDisplay.textContent = "";
    timerDisplay.textContent = `Timer: ${timer}`;

    document.removeEventListener("keydown", handleMultiplayerInput);
    document.addEventListener("keydown", handleMultiplayerInput);

    timerInterval = setInterval(() => {
        if (!gameActive) {
            clearInterval(timerInterval);
            document.removeEventListener("keydown", handleMultiplayerInput);
            return;
        }
        timer--;
        timerDisplay.textContent = `Timer: ${timer}`;
        if (timer === 0) {
            clearInterval(timerInterval);
            document.removeEventListener("keydown", handleMultiplayerInput);
            if (!player1Choice && !player2Choice) {
                resultDisplay.textContent = "Both players missed the round!";
            } else if (player1Choice && !player2Choice) {
                resultDisplay.textContent = "Player 1 scores!";
                player1Score++;
            } else if (!player1Choice && player2Choice) {
                resultDisplay.textContent = "Player 2 scores!";
                player2Score++;
            }
            updateScores();
            if (!isGameOver()) setTimeout(startMultiplayerTimer, 3000);
        }
    }, 1000);
}

function handleMultiplayerInput(event) {
    if (!gameActive || (player1Choice && player2Choice)) return;

    if (["a", "s", "d"].includes(event.key) && !player1Choice) {
        player1Choice = { a: "rock", s: "paper", d: "scissors" }[event.key];
    }

    if (["1", "2", "3"].includes(event.key) && !player2Choice) {
        player2Choice = { 1: "rock", 2: "paper", 3: "scissors" }[event.key];
    }

    if (player1Choice && player2Choice) {
        clearInterval(timerInterval);
        document.removeEventListener("keydown", handleMultiplayerInput);
        resultDisplay.textContent = `Player 1 chose: ${player1Choice}, Player 2 chose: ${player2Choice}`;
        determineRoundWinner(player1Choice, player2Choice);
        if (!isGameOver()) setTimeout(startMultiplayerTimer, 3000);
    }
}

function determineRoundWinner(choice1, choice2) {
    if (choice1 === choice2) {
        resultDisplay.textContent += " It's a tie!";
    } else if (
        (choice1 === "rock" && choice2 === "scissors") ||
        (choice1 === "paper" && choice2 === "rock") ||
        (choice1 === "scissors" && choice2 === "paper")
    ) {
        resultDisplay.textContent += " Player 1 wins!";
        player1Score++;
    } else {
        resultDisplay.textContent += " Player 2 wins!";
        player2Score++;
    }
    updateScores();
}

function updateScores() {
    player1ScoreDisplay.textContent = player1Score;
    player2ScoreDisplay.textContent = player2Score;
}

function isGameOver() {
    if (player1Score >= targetScore || player2Score >= targetScore) {
        gameActive = false;
        resultDisplay.textContent =
            player1Score > player2Score
                ? "🎉 Player 1 wins the game! 🎉"
                : "🎉 Player 2/Computer wins the game! 🎉";
        setTimeout(resetGame, 5000);
        return true;
    }
    return false;
}

function resetGame() {
    gameActive = false;
    clearInterval(timerInterval);
    player1Score = 0;
    player2Score = 0;
    player1Choice = "";
    player2Choice = "";
    mode = "";
    targetScore=0;
    updateScores();
    resultDisplay.textContent = "";
    timerDisplay.textContent = "";
    modeSelection.style.display = "block";
    targetScoreContainer.style.display = "none";
    gameArea.style.display = "none";
    resetButton.style.display = "none";
}
