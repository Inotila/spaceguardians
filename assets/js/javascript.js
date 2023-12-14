// variables for choosing number of players
let numberOfPlayers = 0;
let currentPlayer = 1;
let currentOpponent = -1;

// add player variables
let players = [];
let addedPlayers = 0;

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
    addPlayer(name, word);
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

      // INIT code
      initGuessing();
    }
  }
});

function initGuessing() {
    nextPlayer2();



}

class Player {
  constructor(name, word) {
        this.name = name;
        this.word = word;
        this.hiddenWord =  "_ ".repeat(word.length);
        this.playerScore = 0;
        this.matchingLetters= [];
        this.incorrectLetters= [];
        this.active = true

  }
  guessLetter(string){
    if (!this.word.includes(string)) {
      if(this.incorrectLetters.includes(string)){
        return true
      }else {
        if (this.incorrectLetters !== "") {
          this.incorrectLetters += ` ${string}`; // Add a space between letters
        } else {
          this.incorrectLetters += string;
        }
        return false
      }
    }else{
      this.matchingLetters += string;
      let displaySecretWord = '';

      for (let i = 0; i < this.word.length; i++) {
        if (this.matchingLetters.includes(this.word[i])) {
          // If the guessed letter matches, show the letter
          displaySecretWord += this.word[i];
        } else {
          // If the guessed letter doesn't match, show "_"
          displaySecretWord += "_ ";
        }
      }
      this.hiddenWord = displaySecretWord;
      return true
    }


  }
  incrementScore(){
    this.playerScore++;
  }}



function addPlayer(name, word, playerScore) {
  players.push(new Player(name,word))
  console.log(players);
  console.log("chosen"+(players.length-1))
  document.getElementById("chosen"+(players.length-1)).innerHTML = name
  document.getElementById("draco-game-img").src = `./assets/images/game-images/draco0.jpg`;
  document.getElementById("chosen"+(players.length-1)+"").addEventListener("click",function (event){
    let name = event.currentTarget.getAttribute("id")
    let id = name.at(name.length-1)
    if(currentPlayer != id){
      for (let i = 0; i < 5; i++) {
        document.getElementById("chosen"+i+"").setAttribute("style","color:white")
      }
      document.getElementById("chosen"+id+"").setAttribute("style","color:green")
      currentOpponent = id;
      updateDisplay();
    }
  })

}



// changes opponent after every guess by incrementing currentopponent, once you have played agains everyone exept yourself it switches to the next players turn
function nextPlayer(){
  //Cant meet yourself
  let remainingPlayer = 0
  let playerName;
  players.forEach((element) => {
        if(element.active){
            remainingPlayer++
            playerName = element.name;
        }
  });
  if (remainingPlayer < 2){
    //prints out win message if only one player remaining
    document.getElementById("winner-pop-up").style.display = "inline";
    document.getElementById("winning-message").innerText = `Draco has been unleashed! Only ${playerName} survived!`
    return;
  }

  //Switch to next player
  let a = true
  while (a){
    currentOpponent++
    if(currentPlayer == currentOpponent){
    }else if(currentOpponent >= numberOfPlayers){
      console.log("CHANGING PLAYER");
      currentPlayer = (++currentPlayer%numberOfPlayers)
      currentOpponent = -1;
    }else if (!players[currentOpponent].active){
    }else if(!players[currentPlayer].active){
    }else{
      a = false
    }
  }
  //this increments currentOpponent after it has returned a value
  return currentOpponent
}
function nextPlayer2(){
  currentOpponent = -1;
  let remainingPlayer = 0
  let playerName;
  players.forEach((element) => {
    if(element.active){
      remainingPlayer++
      playerName = element.name;
    }
  });
  if (remainingPlayer < 2){
    //prints out win message if only one player remaining
    document.getElementById("winner-pop-up").style.display = "inline";
    document.getElementById("winning-message").innerText = `Draco has been unleashed! Only ${playerName} survived!`
    return;
  }
  let a = true
  while (a){
    currentPlayer = (++currentPlayer%numberOfPlayers)
    if(players[currentPlayer].active){
      a = false
    }
  }
}





async function guess() {
  opponent = players[currentOpponent]
  player = players[currentPlayer]
  let letter = document.getElementById("guess").value;

  if(currentOpponent == -1 ){
    return
  }

  if (!opponent.guessLetter(letter)){
    player.incrementScore()
    if(player.playerScore === 10) {
      player.active = false;
      console.log("we have a loser")
    }
  }
  //If opponents word is guessed -> opponent becomes inactive
  if (!opponent.hiddenWord.includes("_")) {
    opponent.active = false;
  }


  document.getElementById("guess").value = "";
  //make sure its ready for the next guess
  updateDisplay();
  nextPlayer2()
  document.getElementById("game-promt").innerHTML = players[currentPlayer].name + "'s time to guess, Choose a player";
}


function updateDisplay() {
  console.log("U ARE "+ currentPlayer + "\tUr Opponent is: "+ currentOpponent)
  //Displays currentplayers name
  document.getElementById("game-promt").innerHTML = players[currentPlayer].name + "'s time to guess, Choose a player";
  //Displays secret word
  document.getElementById("display_word").innerHTML = players[currentOpponent].hiddenWord;
  // Update incorrect guesses element
  document.getElementById("incorrect-guesses").innerText = players[currentOpponent].incorrectLetters;
  // Display the character for tne new player
  document.getElementById("draco-game-img").src = `./assets/images/game-images/draco${players[currentPlayer].playerScore}.jpg`;
}

function updatePlayerNameDisplay() {
  const currentPlayerName = document.getElementById("name").value;
  document.getElementById("current-player-name").innerText = currentPlayerName;
}

// Attach the updatePlayerNameDisplay function to the input event of the name field
document.getElementById("name").addEventListener("input", updatePlayerNameDisplay);
