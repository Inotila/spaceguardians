const numPlayers = prompt("Enter the number of players (2-6):");
const players = [];
const maxAttempts = 6; // Set the maximum number of attempts

for (let i = 1; i <= numPlayers; i++) {
    const username = prompt(`Enter Player ${i}'s username:`);
    const word = prompt(`Enter Player ${i}'s word:`);

    players.push({ username, word, attempts: 0 });
}

const playersDiv = document.getElementById("players");
players.forEach(player => {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("player");
    playerDiv.textContent = `${player.username}'s word: ${Array(player.word.length).fill('_').join(' ')}`;
    playersDiv.appendChild(playerDiv);
});

const stickmenDiv = document.getElementById("stickmen");
players.forEach((player, index) => {
    const stickmanDiv = document.createElement("div");
    stickmanDiv.classList.add("stickman");

    for (let j = 0; j < maxAttempts; j++) {
        const bodyPartImg = document.createElement("img");
        bodyPartImg.src = `stick_figure_part${j + 1}.png`; // Set the image source
        stickmanDiv.appendChild(bodyPartImg);
    }

    stickmenDiv.appendChild(stickmanDiv);
});

function updateHangman(playerIndex) {
    const stickmanDiv = document.querySelectorAll(".stickman")[playerIndex];
    const attempts = players[playerIndex].attempts;

    // Display the corresponding stick figure part based on the number of attempts
    for (let i = 0; i < maxAttempts; i++) {
        const bodyPartImg = stickmanDiv.children[i];
        bodyPartImg.style.display = i < attempts ? "block" : "none";
    }
}

// Example usage: Call updateHangman(0) to update the hangman for the first player.