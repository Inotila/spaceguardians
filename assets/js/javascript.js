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



