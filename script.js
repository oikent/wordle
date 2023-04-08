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

let guess = [];
let count = 0;
const invalidKeys = [
    "Backspace",
    "Escape",
    "Enter",
    "Tab",
    "Shift",
    "Control",
    "Alt",
    "[",
    "]",
    "'",
    ";",
    "/",
    ".",
    ",",
    "=",
    "-",
    "0",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "1",
    "CapsLock",
    "Fn",
    " ",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "\\",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
];

const instructions = document.querySelector(".help");
const container = document.querySelector(".container");
const keyboard = document.querySelector(".keyboard");
const keys = document.querySelectorAll(".keys");

console.log(keys[0].textContent);
instructions.addEventListener("click", () => {
    instructions.style.display = "none";
    keyboard.style.display = "grid";
    container.style.display = "grid";
});

const getWords = async () => {
    const response = await fetch("./words.json");
    const words = await response.json();
    const randomWord = words[Math.floor(Math.random() * words.length)];
    let wordToString = randomWord.toString().toUpperCase();
    let letterArr = [];
    for (w of wordToString) {
        letterArr.push(w);
    }
    return letterArr;
};

getWords().then((word) => {
    function addLetter(e) {
        const cells = document.querySelectorAll(".completed");
        if (!invalidKeys.includes(e.key) && count !== 5) {
            cells[count].value = e.key.toUpperCase();
            guess.push(cells[count].value);
            count++;
        } else if (e.key === "Backspace") {
            if (count > 0) {
                count--;
                cells[count].value = "";
                guess.pop();
            }
        } else if (count % 5 === 0 && count !== 0 && e.key === "Enter") {
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    if (guess[i] === word[i]) {
                        cells[i].classList.add("correct");
                        cells[i].classList.remove("completed");
                    } else if (word.includes(guess[i])) {
                        cells[i].classList.add("present");
                        cells[i].classList.remove("completed");
                    } else {
                        cells[i].classList.add("incorrect");
                        cells[i].classList.remove("completed");
                    }
                }, 300 * i);
            }
            setTimeout(() => {
                const g = [guess.join()];
                const w = [word.join()];
                console.log(g, w);
                if (g[0] === w[0]) {
                    console.log("winner");
                }
                guess = [];
                count = 0;
            }, 300 * 6);
        }
    }
    document.addEventListener("keydown", addLetter);
});
