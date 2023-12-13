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

    console.log("its working");
  }
  return numberOfPlayers;

});
