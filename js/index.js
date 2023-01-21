let colors = ['red', 'green', 'purple', 'white', 'black', 'orange', 'blue']
let pattern = ['', '', '', ''] // let computer generate random pattern
let guess = ['', '', '', '']

let hints = ['', '', '', ''] // randomize the hints

let score = 0
let guesses = 0

console.log(colors)
// set up game

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

const patternPicker = (arr) => {
  for (let i = 0; i < arr.length ; i++){
    arr[i] = colors[Math.floor(Math.random() * (colors.length))]
  }
}


shuffle(colors)
patternPicker(pattern)
console.log(colors)
console.log(pattern)