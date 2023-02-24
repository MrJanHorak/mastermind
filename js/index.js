let colors = ['red', 'green', 'purple', 'white', 'black', 'orange', 'blue']
let pattern = ['', '', '', '']
let guess = ['', '', '', '']
let hints = ['', '', '', '']
let guesses = 0
let maxGuesses = 10
let totalGuesses = 0
let currentRow
let score = 0
let finished = false
let dragged
let colorPeg
let win = false
let element, bbox, startX, startY;

// create game field divs for DOM
const game = document.querySelector('.game')
const gameContainerDiv = document.createElement('div')
gameContainerDiv.className = 'mainContainer'
const gameHeader = document.createElement('h1')
const patternDiv = document.createElement('div')
const gameBoardDiv = document.createElement('div')
const guessDiv = document.createElement('div')
const scoreDiv = document.createElement('div')
const gamePieceDiv = document.createElement('div')
gamePieceDiv.className = 'gamePieceDiv'
const gamePieceCon = document.createElement('div')
gamePieceCon.className = 'gamePieceCon'
const buttonContainer = document.createElement('div')
const replayButton = document.createElement('button')
replayButton.className = 'replay'
const rulesButton = document.createElement('button')
rulesButton.className = 'replay'
const scoreContainer = document.createElement('div')

// function to reset game play on replay
const init = () => {
  pattern = ['', '', '', '']
  guess = ['', '', '', '']
  hints = ['', '', '', '']
  guesses = 0
  currentRow = maxGuesses - guesses - 1
  finished = false
  win = false

  for (let r = 0; r < maxGuesses; r++) {
    for (let h = 0; h < pattern.length; h++) {
      let currentHintPeg = document.querySelector(`#hr${r}hi${h}`)
      currentHintPeg.style.backgroundColor = 'black'
    }
  }

  for (let r = 0; r < maxGuesses; r++) {
    for (let j = 0; j < pattern.length; j++) {
      const guessPeg = document.getElementById(`gr${r}gc${j}`)
      guessPeg.style.backgroundColor = 'gray'
      guessPeg.innerHTML = ``
      guessPeg.style.opacity = '1'
    }
  }
  hidePattern()
  shuffle(colors)
  patternPicker(pattern)
  removeDropZone()
}

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
  guesses++
}

const removeDropZone = () => {
  // currentRow = maxGuesses - 1 - guesses
  const currentDropZone = document.querySelectorAll(`.pattern`)
  currentDropZone.forEach((zone) => {
    zone.removeEventListener('dragenter', dragEnter)
    zone.removeEventListener('dragover', dragOver)
    zone.removeEventListener('dragleave', dragLeave)
    zone.removeEventListener('drop', dragDrop)
  })
  hints = ['', '', '', '']
  guess = ['', '', '', '']
  currentRow = maxGuesses - 1 - guesses
  if (!win) {
    createDropZone()
  }
}

const animateWinningGuess = () => {
  currentRow = maxGuesses - guesses
  const winningGuess = document.querySelectorAll(`.gr${currentRow}`)
  winningGuess.forEach((peg) => {
    peg.classList.add('animate__heartBeat')
    peg.style.setProperty('--animate-duration', '2s')
  })
}

const animateLosing = () => {
  for (let i = 0; i < maxGuesses; i++) {
    let guessPeg = document.querySelectorAll(`.gr${i}`)
    guessPeg.forEach((peg) => {
      peg.classList.add('animate__flash')
      peg.style.setProperty('--animate-duration', '2s')
      peg.style.opacity = '0.5'
    })
  }
  let messageRow = Math.floor(maxGuesses / 2)
  console.log(messageRow)
  let row = document.querySelectorAll(`.gr${messageRow}`)
  let message = ['l', 'o', 's', 't']
  row.forEach((ele, index) => {
    console.log(index)
    ele.innerHTML = `<b><h3>${message[index]}</h3></b>`
    ele.style.color = 'yellow'
    ele.style.opacity = '1'
    ele.classList.add('animate__heartBeat')
  })
}

const revealPattern = () => {
  const toReveal = document.querySelectorAll('.toGuess')
  toReveal.forEach((ele, index) => {
    ele.style.backgroundColor = pattern[index]
    ele.style.setProperty('--animate-duration', '2s')
    ele.classList.add('animate__heartBeat')
  })
}

const hidePattern = () => {
  const toHide = document.querySelectorAll('.toGuess')
  toHide.forEach((ele, index) => {
    ele.style.backgroundColor = 'grey'
    ele.classList.remove('animate__heartBeat')
  })
}

// function to give hints based upon current guess
const giveHint = () => {
  shuffle(hints)
  currentRow = maxGuesses - guesses
  let scoreBoard = document.querySelector('.scoreBoard')
  for (let h = 0; h < pattern.length; h++) {
    let currentHintPeg = document.querySelector(`#hr${currentRow}hi${h}`)
    if (hints[h] !== '') {
      currentHintPeg.style.setProperty('--animate-duration', '2s')
      currentHintPeg.classList.add('animate__heartBeat')
      currentHintPeg.style.backgroundColor = hints[h]
    }
  }

  if (hints.filter((ele) => ele === 'red').length === 4) {
    score += 100 * maxGuesses - 100 * guesses
    totalGuesses += guesses
    console.log('SCORE: ', score)
    console.log('TOTAL GUESSES: ', totalGuesses)
    scoreBoard.innerHTML = `<b>Score: ${score}   Total guesses: ${totalGuesses}</b>`
    animateWinningGuess()
    revealPattern()
    win = true
  } else if (guesses === maxGuesses) {
    score += 100 * maxGuesses - 100 * guesses
    totalGuesses += guesses
    console.log('SCORE: ', score)
    console.log('TOTAL GUESSES: ', totalGuesses)
    scoreBoard.innerHTML = `<b>Score: ${score}   Total guesses: ${totalGuesses}</b>`
    animateLosing()
    revealPattern()
  }
  removeDropZone()
}

// function to compare guess with chosen pattern
const compGuessPat = (guess) => {
  let colorTracker = {}
  let patternTracker = {
    red: 0,
    green: 0,
    purple: 0,
    white: 0,
    black: 0,
    orange: 0,
    blue: 0
  }

  guess.forEach((color) => {
    color in colorTracker
      ? (colorTracker[color] += 1)
      : (colorTracker[color] = 1)
  })

  pattern.forEach((color) => {
    color in patternTracker
      ? (patternTracker[color] += 1)
      : (patternTracker[color] = 1)
  })

  guess.forEach((color, index) => {
    if (guess[index] === pattern[index]) {
      hints[index] = 'red'
      colorTracker[guess[index]] -= 1
      patternTracker[guess[index]] -= 1
    }
  })

  guess.forEach((color, index) => {
    if (pattern.includes(guess[index])) {
      if (guess[index] !== pattern[index] && patternTracker[guess[index]] > 0) {
        hints[index] = 'white'
        colorTracker[guess[index]] -= 1
        patternTracker[guess[index]] -= 1
      }
    }
  })
  giveHint()
}

// set up drag event functions

const dragStart = (e) => {
  e.target.classList.add('dragging')
  dragged = e.target.getAttribute('data-color')
  let deltaX = e.clientX - startX;
  let deltaY = e.clientY - startY;
  e.style.left = bbox.left + deltaX + "px";
  e.style.top = bbox.top + deltaY + "px";
}

const dragEnd = (e) => {
  e.target.classList.remove('dragging')
}
const dragReleased = (e) => {
  e.target.classList.remove('dragging')
  e.target.removeEventListener('pointermove', dragStart)
  e.target.removeEventListener('pointerup', dragEnd)
  e.target.removeEventListener('pointercancel', dragReleased)
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
  e.target.classList.remove('hover')
}

const dragDrop = (e) => {
  e.target.classList.remove('hover')
  const data = e.dataTransfer.getData('text')
  let dropIndex = e.target.id.split('')[5]
  e.target.style.backgroundColor = dragged
  e.target.style.opacity = '1'
  guess[dropIndex] = dragged
  if (!guess.includes('')) {
    compGuessPat(guess)
  }
}

const pointerDown = (e) => {
  e.target.classList.add('dragging')
  e.target.addEventListener('pointermove', dragStart, { passive: true })
  e.target.addEventListener('pointerup', dragEnd, { passive: true })
  e.target.addEventListener('pointercancel', dragReleased, { passive: true })
  dragged = e.target.getAttribute('data-color')
}

// fill the DOM
const render = () => {
  // const game = document.querySelector('.game')
  // const gameContainerDiv = document.createElement('div')
  // gameContainerDiv.className = 'mainContainer'
  // const gameHeader = document.createElement('h1')
  // const patternDiv = document.createElement('div')
  // const gameBoardDiv = document.createElement('div')
  // const guessDiv = document.createElement('div')
  // const scoreDiv = document.createElement('div')
  // const gamePieceDiv = document.createElement('div')
  // gamePieceDiv.className = 'gamePieceDiv'
  // const gamePieceCon = document.createElement('div')
  // gamePieceCon.className = 'gamePieceCon'
  // const buttonContainer = document.createElement('div')
  // const replayButton = document.createElement('button')
  // replayButton.className = 'replay'
  // const rulesButton = document.createElement('button')
  // rulesButton.className = 'replay'
  // const scoreContainer = document.createElement('div')
  // update variables needed for proper game play
  currentRow = maxGuesses - guesses - 1

  // fill the div
  patternDiv.className = 'patternDiv'
  gameHeader.textContent = 'MindMaster'
  gameContainerDiv.appendChild(gameHeader)
  game.appendChild(gameContainerDiv)
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
      guessPeg.id = `gr${i}gc${j}`
      guessPeg.style.backgroundColor = 'gray'
      guessInput.appendChild(guessPeg)
    }
    guessDiv.appendChild(guessInput)
    guessDiv.className = 'guessDiv'
  }
  gameContainerDiv.appendChild(guessDiv)

  // create div to hold available game colors
  colors.forEach((color, index) => {
    colorPeg = document.createElement('div')
    colorPeg.className = 'pattern gamePeg'
    colorPeg.setAttribute('data-color', color)
    colorPeg.style.backgroundColor = color
    colorPeg.id = index
    colorPeg.draggable = true
    colorPeg.addEventListener('pointerdown', pointerDown)
    // colorPeg.addEventListener('pointermove', dragStart)
    // colorPeg.addEventListener('pointerup', dragEnd)
    // colorPeg.addEventListener('pointercancel', dragReleased)
    gamePieceDiv.appendChild(colorPeg)
    gamePieceCon.appendChild(gamePieceDiv)
    gameContainerDiv.appendChild(gamePieceCon)
  })

  createDropZone()

  scoreContainer.innerHTML = `<b>Score: ${score} Total guesses: ${totalGuesses}</b>`
  scoreContainer.className = 'scoreBoard'
  gameContainerDiv.appendChild(scoreContainer)
  replayButton.innerHTML = '<b>again</b>'
  replayButton.addEventListener('click', init)
  rulesButton.innerHTML = '<b>rules</b>'
  rulesButton.addEventListener(
    'click',
    () => (window.location = './rules.html')
  )
  buttonContainer.appendChild(replayButton)
  buttonContainer.appendChild(rulesButton)
  gameContainerDiv.appendChild(buttonContainer)
}

// game play
render()
shuffle(colors)
