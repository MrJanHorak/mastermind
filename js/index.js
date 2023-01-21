let colors = ['red', 'green', 'purple', 'white', 'black', 'orange', 'blue']
let pattern = ['', '', '', ''] // let computer generate random pattern
let guess = ['red', 'green', 'green', 'blue']

let hints = ['', '', '', ''] // randomize the hints

let score = 0
let guesses = 0

console.log(colors)
// set up game

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
}

const patternPicker = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = colors[Math.floor(Math.random() * colors.length)]
  }
}

const compGuessPat = (guess) => {
  guess.forEach((ele, index) => {
    if (guess[index] === pattern[index]) {
      hints[index] = 'red'
    }
    if (pattern.includes(guess[index])) {
      if (guess[index] !== pattern[index]) {
        hints[index] = 'white'
      }
    }
  })
}
shuffle(colors)
patternPicker(pattern)
console.log(colors)
console.log("Pattern: ",pattern)
console.log("Guess: ",guess)
compGuessPat(guess)
console.log("Hints: ",hints)
