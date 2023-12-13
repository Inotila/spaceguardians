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

    location.href = "playerselect.html";

    //   turn of the display of the form once the number of players selected has been submitted
    if (numberOfPlayers > 0) {
        document.getElementById("player-form").style.display = "none";
        document.getElementById("player-info-form").style.display = "block";
        // access the element of playerPromt 
        // document.getElementById("playerPromt").innerText = `Player ${currentPlayer}`;
        // location.href = "game.html";

    console.log("its working");
  }
  return numberOfPlayers;

});

//Store player name, chosen word & _ _ _ dashed lines according to length of word in array

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