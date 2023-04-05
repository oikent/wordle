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

// button.addEventListener('click',getWord)

const getWords = async () =>{
    const response = await fetch("./words.json")
    const words = await response.json()
    const word = words[Math.floor(Math.random() *words.length)]
}

getWords()

// set cell to uppercase
