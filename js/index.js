let colors = ['red', 'green', 'purple', 'white', 'black', 'orange', 'blue']
let pattern = ['', '', '', ''] // let computer generate random pattern
let guess = ['red', 'green', 'green', 'blue']
let hints = ['', '', '', ''] // randomize the hints
let score = 0
let guesses = 0
let maxGuesses = 10

// create game field divs for DOM
const main = document.querySelector('body')
const gameContainerDiv = document.createElement('div')
const gameHeader = document.createElement('h1')
const patternDiv = document.createElement('div')
const gameBoardDiv = document.createElement('div')
const guessDiv = document.createElement('div')
const scoreDiv = document.createElement('div')
const gamePieceDiv = document.createElement('div')
gamePieceDiv.className = 'gamePieceDiv'

// set up game

// simple function to shuffle the arrays
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
}

// function to have computer pic a random pattern
const patternPicker = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = colors[Math.floor(Math.random() * colors.length)]
  }
}

// function to compare guess with chosen pattern
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

// game play

shuffle(colors)
patternPicker(pattern)
console.log(colors)
console.log('Pattern: ', pattern)
console.log('Guess: ', guess)
compGuessPat(guess)
console.log('Hints: ', hints)

// fill the div
patternDiv.className = 'patternDiv'
gameHeader.textContent = 'Master Mind'
gameContainerDiv.appendChild(gameHeader)
main.appendChild(gameContainerDiv)

// create div to hold pattern to guess
pattern.forEach((ele, index) => {
  let colorPeg = document.createElement('div')
  colorPeg.className = 'pattern'
  colorPeg.style.backgroundColor = ele
  patternDiv.appendChild(colorPeg)
  gameContainerDiv.appendChild(patternDiv)
})

// create div to hold all the guesses
for (let i = 0; i < maxGuesses; i++) {
  const guessInput = document.createElement('div')
  guessInput.className = 'patternGuessDiv'

  const hintsDiv = document.createElement('div')
  hintsDiv.className = 'hintDiv'
  hintsDiv.id = `hintsRow${i}`

  // create empty hints holes
  for (let h = 0; h < pattern.length; h++) {
    const hintPeg = document.createElement('div')
    hintPeg.className = 'hint'
    hintPeg.id = `hr${i}hi${h}`
    hintsDiv.appendChild(hintPeg)
  }
  guessInput.appendChild(hintsDiv)

  // create empty guess holes
  for (let j = 0; j < pattern.length; j++) {
    const guessPeg = document.createElement('div')
    guessPeg.className = 'pattern'
    guessPeg.id = `gr${i}gc${j}`
    guessPeg.style.backgroundColor = 'black'
    guessInput.appendChild(guessPeg)
  }
  guessDiv.appendChild(guessInput)
  guessDiv.className = 'guessDiv'
}
gameContainerDiv.appendChild(guessDiv)

// function to give hints based upon current guess
const giveHint = () => {
  shuffle(hints)
  let currentRow = maxGuesses - 1 - guesses
  console.log('currentRow', currentRow)
  for (let h = 0; h < pattern.length; h++) {
    let currentHintPeg = document.querySelector(`#hr${currentRow}hi${h}`)
    if (hints[h] !== '') {
      currentHintPeg.style.backgroundColor = hints[h]
    } else {
      console.log('hello', currentHintPeg)
    }
  }
  guessInput.appendChild(hintsDiv)
}

// create div to hold available game colors
colors.forEach((ele, index) => {
  let colorPeg = document.createElement('div')
  colorPeg.className = 'pattern'
  colorPeg.style.backgroundColor = ele
  gamePieceDiv.appendChild(colorPeg)
  gameContainerDiv.appendChild(gamePieceDiv)
})

giveHint()
