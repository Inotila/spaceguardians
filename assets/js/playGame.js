let testWord = "thewordw"; //sampe word
let list = "";

let displayWord = testWord.replaceAll(/\w/g, "_ ");

document.getElementById("display_word").innerHTML = displayWord;

function geuss(){
    let letter = document.getElementById("geuss").value;
    list += letter;
    let match = new RegExp(`[^${list}]`, 'g') 
    console.log(letter);

    if(testWord.match(letter)){
        displayWord = testWord.replaceAll(match, "_ ");
        document.getElementById("display_word").innerHTML = displayWord;
        console.log(true);
    } else {
        console.log(false);
    }
    document.getElementById("geuss").value = "";
}