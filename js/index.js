let colors = ['red', 'green', 'purple', 'white', 'black', 'orange', 'blue']
let pattern = ['', '', '', ''] // let computer generate random pattern
let guess = ['', '', '', '']
let hints = ['', '', '', ''] // randomize the hints
let score = 0
let guesses = 0
let maxGuesses = 10
let currentRow
let finished = false
let dragged
let colorPeg
let win = false

// create game field divs for DOM
const main = document.querySelector('body')
const gameContainerDiv = document.createElement('div')
const gameHeader = document.createElement('h1')
const patternDiv = document.createElement('div')
const gameBoardDiv = document.createElement('div')
const guessDiv = document.createElement('div')
const scoreDiv = document.createElement('div')
const gamePieceDiv = document.createElement('div')
const gamePieceCon = document.createElement('div')
gamePieceDiv.className = 'gamePieceDiv'
gamePieceCon.className = 'gamePieceCon'

// game functions

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

const createDropZone = () => {
  currentRow = maxGuesses - 1 - guesses
  const currentDropZone = document.querySelectorAll(`.gr${currentRow}`)
  currentDropZone.forEach((zone) => {
    zone.addEventListener('dragenter', dragEnter)
    zone.addEventListener('dragover', dragOver)
    zone.addEventListener('dragleave', dragLeave)
    zone.addEventListener('drop', dragDrop)
  })
}

const removeDropZone = () => {
  // currentRow = maxGuesses - 1 - guesses
  const currentDropZone = document.querySelectorAll(`.gr${currentRow}`)
  currentDropZone.forEach((zone) => {
    zone.removeEventListener('dragenter', dragEnter)
    zone.removeEventListener('dragover', dragOver)
    zone.removeEventListener('dragleave', dragLeave)
    zone.removeEventListener('drop', dragDrop)
  })
  hints = ['', '', '', '']
  guess = ['', '', '', '']
  guesses++
  currentRow = maxGuesses - 1 - guesses
  if (!win) {
    createDropZone()
  }
}

const revealPattern = () => {
  const toReveal = document.querySelectorAll('.toGuess')
  toReveal.forEach((ele, index) => {
    ele.style.backgroundColor = pattern[index]
  })
}

// function to give hints based upon current guess
const giveHint = () => {
  shuffle(hints)
  currentRow = maxGuesses - 1 - guesses
  for (let h = 0; h < pattern.length; h++) {
    let currentHintPeg = document.querySelector(`#hr${currentRow}hi${h}`)
    if (hints[h] !== '') {
      currentHintPeg.style.backgroundColor = hints[h]
    }
  }
  if (hints.filter((ele) => ele === 'red').length === 4) {
    console.log('win condition')
    revealPattern()
    win = true
  }
  removeDropZone()
  guessInput.appendChild(hintsDiv)
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
  giveHint()
}

// set up drag event functions
const dragStart = (e) => {
  e.target.classList.add('dragging')
  dragged = e.target.getAttribute('data-color')
}

const dragEnd = (e) => {
  e.target.classList.remove('dragging')
}

const dragOver = (e) => {
  e.stopPropagation()
  e.preventDefault()
  e.dataTransfer.dropEffect = 'move'
}

const dragEnter = (e) => {
  e.stopPropagation()
  e.preventDefault()
  e.target.classList.add('hover')
}

const dragLeave = (e) => {
  e.stopPropagation()
  // e.prevent.default()
  e.target.classList.remove('hover')
}

const dragDrop = (e) => {
  e.target.classList.remove('hover')
  const data = e.dataTransfer.getData('text')
  let dropIndex = e.target.id.split('')[2]
  e.target.style.backgroundColor = dragged
  guess[dropIndex] = dragged
  if (!guess.includes('')) {
    compGuessPat(guess)
  }
}

// fill the DOM
const render = () => {
  // update variables needed for proper game play
  currentRow = maxGuesses - guesses - 1

  // fill the div
  patternDiv.className = 'patternDiv'
  gameHeader.textContent = 'Master Mind'
  gameContainerDiv.appendChild(gameHeader)
  main.appendChild(gameContainerDiv)
  patternPicker(pattern)

  // create div to hold pattern to guess
  pattern.forEach((ele, index) => {
    colorPeg = document.createElement('div')
    colorPeg.className = 'pattern toGuess'
    colorPeg.style.backgroundColor = 'gray'
    patternDiv.appendChild(colorPeg)
    gameContainerDiv.appendChild(patternDiv)
  })

  // create div to hold all the guesses
  for (let i = 0; i < maxGuesses; i++) {
    const guessInput = document.createElement('div')
    guessInput.className = 'patternGuessDiv'
    guessInput.id = i

    const hintsDiv = document.createElement('div')
    hintsDiv.className = 'hintDiv'
    hintsDiv.id = `hintsRow${i}`

    // create empty hints holes
    for (let h = 0; h < pattern.length; h++) {
      const hintPeg = document.createElement('div')
      hintPeg.className = `hint`
      hintPeg.id = `hr${i}hi${h}`
      hintsDiv.appendChild(hintPeg)
    }
    guessInput.appendChild(hintsDiv)

    // create empty guess holes
    for (let j = 0; j < pattern.length; j++) {
      const guessPeg = document.createElement('div')
      guessPeg.className = `pattern gr${i}`
      guessPeg.id = `gc${j}`
      guessPeg.style.backgroundColor = 'gray'
      guessInput.appendChild(guessPeg)
    }
    guessDiv.appendChild(guessInput)
    guessDiv.className = 'guessDiv'
  }
  gameContainerDiv.appendChild(guessDiv)

  // create div to hold available game colors
  colors.forEach((ele, index) => {
    colorPeg = document.createElement('div')
    colorPeg.className = 'pattern gamePeg'
    colorPeg.setAttribute('data-color', ele)
    colorPeg.style.backgroundColor = ele
    colorPeg.id = index
    colorPeg.draggable = true
    colorPeg.addEventListener('dragstart', dragStart)
    colorPeg.addEventListener('dragend', dragEnd)
    gamePieceDiv.appendChild(colorPeg)
    gamePieceCon.appendChild(gamePieceDiv)
    gameContainerDiv.appendChild(gamePieceCon)
  })
  createDropZone()
}

// game play

render()
shuffle(colors)

console.log(colors)
console.log('Pattern: ', pattern)
console.log('Guess: ', guess)
console.log('Hints: ', hints)
// removeDropZone()
