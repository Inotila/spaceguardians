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

let testWord = "thewordw"; //sampe word
let matchingLetters = "";
let incorrectLetters ="";

let displayWord = testWord.replaceAll(/\w/g, "_ ");

document.getElementById("display_word").innerHTML = displayWord;

function geuss(){
    let letter = document.getElementById("geuss").value;

    console.log(letter);

    if(testWord.match(letter)){
        matchingLetters += letter;
        let checkIfMatch = new RegExp(`[^${matchingLetters}]`, 'g'); 
        displayWord = testWord.replaceAll(checkIfMatch, "_ ");
        document.getElementById("display_word").innerHTML = displayWord;
        console.log(true);
        console.log(matchingLetters);
    } else {
        incorrectLetters += letter;
        console.log(false);
        console.log(incorrectLetters);
    }
    document.getElementById("geuss").value = "";
}

