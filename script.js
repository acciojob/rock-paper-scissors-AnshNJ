const buttons = document.querySelectorAll('.btn');
const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissor = document.querySelector(".scissor");
const playButton = document.querySelector(".play-game");
const roundsLeft = document.querySelector(".rounds-left");
const gameResult = document.querySelector(".game-result");
const possibleHands = ["ROCK", "PAPER", "SCISSOR"];

// Disable buttons initially
disableButtons();

playButton.addEventListener("click", () => {
    const rounds = parseInt(document.querySelector(".game-number").value);
    if (rounds <= 0 || isNaN(rounds)) {
        alert("Please enter a valid number of rounds");
    } else {
        enableButtons();
        gameLogic(rounds);
    }
});

const gameLogic = (rounds) => {
    if (rounds <= 0) {
        disableButtons();
        return;
    }
    roundsLeft.innerHTML = `Rounds Left: ${rounds}`;
};

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const playerHand = button.textContent;
        const computerHand = possibleHands[Math.floor(Math.random() * 3)];
        document.querySelector(".player-choose").innerHTML = playerHand;
        document.querySelector(".computer-choose").innerHTML = computerHand;
        
        // Determine the winner
        let result = "";
        if (playerHand === computerHand) {
            result = "TIE";
        } else if (
            (playerHand === "ROCK" && computerHand === "SCISSOR") ||
            (playerHand === "SCISSOR" && computerHand === "PAPER") ||
            (playerHand === "PAPER" && computerHand === "ROCK")
        ) {
            result = "WON";
        } else {
            result = "LOSE";
        }
        gameResult.innerHTML = result;

        const currentRounds = parseInt(roundsLeft.innerHTML.split(": ")[1]);
        if (currentRounds > 1) {
            gameLogic(currentRounds - 1);
        } else {
            disableButtons();
        }
    });
});

function disableButtons() {
    buttons.forEach(button => {
        button.disabled = true;
    });
}

function enableButtons() {
    buttons.forEach(button => {
        button.disabled = false;
    });
}