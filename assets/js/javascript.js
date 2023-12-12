// variables for choosing number of players
let numberOfPlayers = 0;
let currentPlayer = 1;

// add player variables
let players = [];
let addedPlayers = 0;

//game play variables
let secretWord = "";
let matchingLetters = "";
let incorrectLetters = "";
let guessCounter = 0;
let playerScore = 0;
let numberOfTurns = 0;
let gameHasStarted = false;
let firstGuessEntered = false;

// Access the form and select element
const numberOfPlayersForm = document.getElementById('playerForm');
const selectNumberOfPlayersElement = document.getElementById('playerCount');

// Event listener for form submission
numberOfPlayersForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevents the default form submission behavior

  // Get the selected value from the dropdown
  numberOfPlayers = parseInt(selectNumberOfPlayersElement.value);

  // test log to see if it numberOfPlayers Updated
  console.log(`Number of players selected: ${numberOfPlayers}`);

  // turn of the display of the form once the number of players selected has been submitted
  if (numberOfPlayers > 0) {
    document.getElementById("numbers-selected-row").style.display = "none";
    document.getElementById("nameRow").style.display = "block";
    document.getElementById("game-promt").innerHTML = `Player ${currentPlayer} identify yourself! <br> & <br> pick a word to keep you safe from Draco`;
    // access the element of playerPromt 
  } 
  return numberOfPlayers
});

//Store player name, chosen word & _ _ _ dashed lines according to lenght of word in array

document.getElementById("player-info-form").addEventListener("submit", function (event) {
  event.preventDefault();
  if (addedPlayers < numberOfPlayers) {
    let name = document.getElementById("name").value;
    let word = document.getElementById("word").value.split(''); //spilt the word to turn it into an array
    //  console.log(`split word ${word}`)
    addPlayer(name, word, playerScore);
    addedPlayers++;

    const playerInfoForm = document.getElementById("player-info-form");
    playerInfoForm.reset();

    //  update the currentplayer to the next one once the form is sumbitted
    currentPlayer++;

    if (currentPlayer > numberOfPlayers) {
      currentPlayer = 1; // Reset back to Player 1 after reaching the last player
    }

    document.getElementById("game-promt").innerHTML = `Player ${currentPlayer} identify yourself! <br> & <br> pick a word to keep you safe from Draco`;
    
    gameHasStarted = true;

   

    //switch the displays of the detial collecting elements off
    if (addedPlayers >= numberOfPlayers) {
      document.getElementById("nameRow").style.display = "none";
      document.getElementById("guess-row").style.display = "block";
      document.getElementById("game-promt").style.display = "none";
      document.getElementById("game-promt-start").innerHTML = `Player ${currentPlayer} you are up`;
    }
  }
  printDashedWord();
});


function addPlayer(name, word, playerScore) {
  players.push({
    name: name,
    word: word,
    hiddenWord: "_ ".repeat(word.length),
    playerScore: playerScore
  })
  if (playerScore === 0) {
    document.getElementById("draco-game-img").src = `./assets/images/game-images/draco${playerScore}.jpg`;
  }
};

// logic for game play

document.getElementById("display_word").innerHTML = secretWord;

function printDashedWord() {
  let divBox = document.getElementById("display-word-div"); // change id
  let textbox = document.createElement("h3");

  divBox.appendChild(textbox);

  textbox.innerHTML = players[addedPlayers - 1].hiddenWord;
  console.log("The word:", players[addedPlayers - 1].word);
};

function switchToInGamePromts(){
  // document.getElementById("game-promt").innerHTML = `Player ${currentPlayer} idendado`;
  console.log("rwrrffrr")
}


function guess() {
  // number of turns counter that will be used to trigger next players turn
  numberOfTurns++;
 firstGuessEntered = true;

 document.getElementById("game-promt-start").style.display = "none";
 document.getElementById("game-promt-first-guess-entered").innerHTML = `player ${currentPlayer} take a chance`;


  let letter = document.getElementById("guess").value;

  if (secretWord.includes(letter)) {
    matchingLetters += letter;
    let displaySecretWord = '';

    for (let i = 0; i < secretWord.length; i++) {
      if (matchingLetters.includes(secretWord[i])) {
        // If the guessed letter matches, show the letter
        displaySecretWord += secretWord[i];
      } else {
        // If the guessed letter doesn't match, show "_"
        displaySecretWord += "_ ";
      }
    }

    // let checkIfMatch = new RegExp(`[^${matchingLetters}]`, 'g');
    // secretWord = secretWord.replaceAll(checkIfMatch, "_ ");
    document.getElementById("display_word").innerHTML = displaySecretWord;
    console.log(true);
    console.log(`matching letters ${matchingLetters}`);
    console.log(`secret word ${secretWord}`);
  } else {
    playerScore++;
    console.log(playerScore)
    document.getElementById("draco-game-img").src = `./assets/images/game-images/draco${playerScore}.jpg`;
    if (incorrectLetters !== "") {
      incorrectLetters += ` ${letter}`; // Add a space between letters
    } else {
      incorrectLetters += letter;
    }
    document.getElementById("incorrect-guesses").innerText = incorrectLetters; // Update incorrect guesses element


    // console.log(`secret word ${secretWord}`);
  }
  document.getElementById("guess").value = "";
}
