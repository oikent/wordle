// Testing random api
// const h1 = document.querySelector('.word')
// const button = document.querySelector('button')
// const getWord = async (rb) =>{
//     const response = await fetch("https://random-word-api.herokuapp.com/word?length=5")
//     const reader = response.body.getReader()
//     const read = await reader.read()
//     const word = new TextDecoder().decode(read.value)
//     h1.textContent = word
//  }

const getWords = async () => {
    const response = await fetch("./words.json");
    const words = await response.json();
    const word = words[Math.floor(Math.random() * words.length)];
    return word;
};

getWords();

const attemptOneCells = document.querySelectorAll(".attempt-one-cell");
const first = document.querySelector(".first");
const second = document.querySelector(".second");
const third = document.querySelector(".third");
const fourth = document.querySelector(".fourth");
const fifth = document.querySelector(".fifth");
const cells = document.querySelectorAll(".cell");

let word = "alpha";
let guess = [];
let count = 0;
function addLetter(e) {
    if (e.key === "Backspace") {
        // guess.pop();
        if (count > 0) {
            count--;
            cells[count].value = "";
        }
    } else if (e.key !== "Backspace" && e.key !== "Enter") {
        cells[count].value = e.key;
        // guess.push(cells[count].value);
        count++;
    } else if (count % 5 === 0 && e.key === "Enter") {
        console.log(count);
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].value === word[i]) {
                cells[i].classList.add("correct");
            } else if (word.includes(cells[i].value) && cells[i].value !== "") {
                cells[i].classList.add("present");
            }
        }
    }
}

document.addEventListener("keydown", addLetter);
