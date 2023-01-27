const instructions = document.querySelector('.instructions')
let rules = document.createElement('div')
let p1 = document.createElement('div')
let p2 = document.createElement('div')
let p3 = document.createElement('div')
let p4 = document.createElement('div')
let p5 = document.createElement('div')
let p6 = document.createElement('div')
let p7 = document.createElement('div')
let p8 = document.createElement('div')
let p9 = document.createElement('div')
let p10 = document.createElement('button')
p10.className = 'replay'
p10.innerHTML = '<b>play</b>'
p10.addEventListener('click', () => {
  window.location = './game.html'
  render()
  shuffle(colors)
})
let rulesTitle = document.createElement('h1')
rulesTitle.innerText = 'Mindmaster'
instructions.appendChild(rulesTitle)
rules.className = 'rules'
rules.style.backgroundColor = 'white'
p1.innerText =
  'In MindMaster the player must guess a code by placing pegs. The goal is to arrange different colored pegs in the correct order in a row. The resulting pattern must match the hidden code of the coder at the end.'
p2.innerText =
  'The player has up to 10 turns to crack the code. It consists of 4 pins, which in turn can be selected from 6 colors. A color can be represented several times.'
p3.innerText =
  'Each round, the player first arranges their pins in the respective row. This is done by dragging and placing the desired color onto the code preparation area. After the selection is confirmed, the coder (in this case the game) checks if the pins are placed correctly and then gives between 0 and 4 hints. Depending on the result, either the next round begins or the game ends.'
p4.innerHTML = '<h3>Clues</h3>'
p5.innerText =
  'The narrow row next to the code preparation area serves as clue row. Clue pegs are either black or white.'
p6.innerHTML =
  '<ul><li>A <b>black</b> clue means that there is a correct color in the correct place.</li><li>A <b>white</b> clue means that a correct color is in the wrong place.</li><li>An <b>empty</b> clue slot means that a wrong color has been placed.</li></ul>'
p8.innerHTML =
  '<h3>⚠︎ WARNING ⚠︎</h3><p>The order of the pins in the clue row does not refer to the position of the pins in the code row but is completely random.</p>'
p9.innerText =
  'That means, if in the row e.g. the first two clues are black, not automatically the two left pins in the color row are correct. In general, two colored pins have been set correctly. The position is not apparent from the clues.'
p7.appendChild(p8)
p7.appendChild(p9)
rules.appendChild(p1)
rules.appendChild(p2)
rules.appendChild(p3)
rules.appendChild(p4)
rules.appendChild(p5)
rules.appendChild(p6)
rules.appendChild(p7)
instructions.appendChild(rules)
instructions.appendChild(p10)
