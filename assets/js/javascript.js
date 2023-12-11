// Default value of numbers of players
let numberOfPlayers = 0; 

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

    console.log("its working");
}
  return numberOfPlayers

});


//Store player name, chosen word & _ _ _ dashed lines according to lenght of word in array
 let players = [];

 document.getElementById("player-info-form").addEventListener("submit", function(event) {
     event.preventDefault();
    let name = document.getElementById("name").value;
     let word = document.getElementById("word").value;
    addPlayer(name, word);
});


 function addPlayer(name, word){
     players.push({
         name: name,
        word: word,
         guess: "_ ".repeat(word.length)
     })
    console.log(players);
};