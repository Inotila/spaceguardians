// variables for choosing number of players
let numberOfPlayers = 0; 
let currentPlayer = 1
// add player variables
let players = [];
let addedPlayers = 0;
//game play variables
let testWord = "thewordw"; //sample word
let secretWord = "";
let matchingLetters = "";
let incorrectLetters ="";
let guessCounter = 0;
let playerScore = 0;



// Access the form and select element
const numberOfPlayersForm = document.getElementById('playerForm');
const selectNumberOfPlayersElement = document.getElementById('playerCount');

// Event listener for form submission
numberOfPlayersForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevents the default form submission behavior

  // Get the selected value from the dropdown
  numberOfPlayers = parseInt(selectNumberOfPlayersElement.value);

  // test log to see if it numberOfPlayers Updated
  console.log(`Number of players selected: ${numberOfPlayers}`);


//   turn of the display of the form once the number of players selected has been submitted
  if ( numberOfPlayers > 0) {
    document.getElementById("numbers-selected-row").style.display = "none";
    document.getElementById("nameRow").style.display = "block";
    // access the element of playerPromt 
    document.getElementById("playerPromt").innerText = `Player ${currentPlayer}`;

    console.log("its working");
}
  return numberOfPlayers

});


//Store player name, chosen word & _ _ _ dashed lines according to lenght of word in array

 document.getElementById("player-info-form").addEventListener("submit", function(event) {
     event.preventDefault();
  if (addedPlayers < numberOfPlayers){   
     let name = document.getElementById("name").value;
     let word = document.getElementById("word").value;
     addPlayer(name, word, playerScore);
     addedPlayers++;

     const playerInfoForm = document.getElementById("player-info-form");
     playerInfoForm.reset();

    //  update the currentplayer to the next one once the form is sumbitted
     currentPlayer++;

     if (currentPlayer > numberOfPlayers) {
         currentPlayer = 1; // Reset back to Player 1 after reaching the last player
     }

     document.getElementById("playerPromt").innerText = `Player ${currentPlayer}`;

   if (addedPlayers >= numberOfPlayers){
    document.getElementById("nameRow").style.display = "none";
    document.getElementById("guess-row").style.display = "block";

   }
  }
  printDashedWord();
});


 function addPlayer(name, word,playerScore){
     players.push({
         name: name,
        word: word,
         guess: "_ ".repeat(word.length),
         playerScore: playerScore
     })
    console.log(players);
    addPlayerDetails();
};

// logic for game play

function addPlayerDetails(){

  for( i = 0; i < players.length; i++){
    secretWord = players[i].word.replaceAll(/\w/g, "_ ");
  }

  console.log(`player${i} ; secret word now: ${secretWord} ; score ${playerScore}`)

}

document.getElementById("display_word").innerHTML = secretWord;

function printDashedWord(){
  let divBox = document.getElementById("abc123"); // change id
  let textbox = document.createElement("h3");

  divBox.appendChild(textbox);

  textbox.innerHTML = players[addedPlayers  - 1].guess;
  console.log("The word:",players[addedPlayers  - 1].word);
};


function guess(){
    let letter = document.getElementById("guess").value;

    console.log(letter);

    if(secretWord.match(letter)){
        matchingLetters += letter;
        let checkIfMatch = new RegExp(`[^${matchingLetters}]`, 'g'); 
        secretWord = secretWord.replaceAll(checkIfMatch, "_ ");
        document.getElementById("display_word").innerHTML = secretWord
        console.log(true);
        console.log(matchingLetters);
    } else {
        incorrectLetters += letter;
        console.log(false);
        console.log(incorrectLetters);
    }
    document.getElementById("guess").value = "";
}


