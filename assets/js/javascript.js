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


  //   turn of the display of the form once the number of players selected has been submitted
  if (numberOfPlayers > 0) {
    document.getElementById("numbers-selected-row").style.display = "none";
    document.getElementById("nameRow").style.display = "block";
    // access the element of playerPromt 
    // document.getElementById("playerPromt").innerText = `Player ${currentPlayer}`;

    console.log("its working");
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

    // document.getElementById("playerPromt").innerText = `Player ${currentPlayer}`;

    //switch the displays of the detial collecting elements off
    if (addedPlayers >= numberOfPlayers) {
      document.getElementById("nameRow").style.display = "none";
      document.getElementById("guess-row").style.display = "block";
    }
  }
});


function addPlayer(name, word, playerScore) {
  players.push({
    name: name,
    word: word,
    hiddenWord: "_ ".repeat(word.length), //????????
    playerScore: playerScore,
    matchingLetters: [],
    incorrectLetters: []
  })
  console.log(players);
  if (playerScore === 0) {
    document.getElementById("draco-game-img").src = `./assets/images/game-images/draco${playerScore}.jpg`;
  }
  addPlayerDetails();
};

// logic for game play

function addPlayerDetails() {

  for (i = 0; i < players.length; i++) {
    secretWord = players[i].word;
  }

  console.log(`player${i} ; secret word now: ${secretWord} ; score ${playerScore}`)

}

document.getElementById("display_word").innerHTML = secretWord;

// changes opponent after every guess by incrementing currentopponent, once you have played agains everyone exept yourself it switches to the next players turn
let currentOpponent = 0;
function nextPlayer(){
  //Cant meet yourself
  if(currentPlayer == currentOpponent){
    currentOpponent++;
  }
  //Switch to next player
  if(currentOpponent >= numberOfPlayers){
    console.log("CHANGING PLAYER");
    currentPlayer = (++currentPlayer%numberOfPlayers)
    currentOpponent = 0;

    //Cant meet yourself
    if(currentPlayer == currentOpponent){
      currentOpponent++;
    }
  }
  
  //this increments currentOpponent after it has returned a value
  return currentOpponent++
}


//coppo = currentOpponent
let coppo = -1;
function guess() {
    //runs first time the script is started to give coppo
    if(coppo == -1){
      coppo = nextPlayer();
    }

    //Gets the variables for the array due to pass by value
    playerScore = players[currentPlayer].playerScore;  
    incorrectLetters = players[coppo].incorrectLetters
    matchingLetters = players[coppo].matchingLetters
    secretWord = players[coppo].word

    
    document.getElementById("draco-game-img").src = `./assets/images/game-images/draco${playerScore}.jpg`;

    
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
    players[coppo].hiddenWord = displaySecretWord; 
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
    


    if(playerScore === 11) {
      document.getElementById("winner-pop-up").style.display = "inline";
      console.log("we have a loser")
    }
    

  }
  document.getElementById("guess").value = "";


  //saves the variables to the array due to pass by value
  players[currentPlayer].playerScore = playerScore;  
  players[coppo].incorrectLetters = incorrectLetters;
  players[coppo].matchingLetters = matchingLetters

  //make sure its ready for the next guess
  coppo = nextPlayer()


  displayName = players[currentPlayer].name;

  //Displays currentplayers name 
  document.getElementById("game-promt").innerHTML = displayName + "'s time to guess " + players[coppo].name + "'s word";

  //Displays secret word
  document.getElementById("display_word").innerHTML = players[coppo].hiddenWord;

  // Update incorrect guesses element
  document.getElementById("incorrect-guesses").innerText = players[coppo].incorrectLetters; 
}


