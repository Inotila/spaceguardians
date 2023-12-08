let testWord = "thewordw"; //sampe word

let displayWord = testWord.replaceAll(/\w/g, "_ ");

document.getElementById("display_word").innerHTML = displayWord;

function geuss(){
    let letter = document.getElementById("geuss").value;
    console.log(letter);

    if(testWord.match(letter)){
        console.log(true);
    } else {
        console.log(false)
    }
    document.getElementById("geuss").value = "";
}