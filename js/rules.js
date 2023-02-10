const instructions = document.querySelector('.instructions')
let rules = document.createElement('div')
let p1 = document.createElement('div')
let p2 = document.createElement('div')
let p3 = document.createElement('div')
let p4 = document.createElement('div')
p4.className = 'header'
let p5 = document.createElement('div')
let p6 = document.createElement('div')
let p7 = document.createElement('div')
p7.className = 'header'
let p8 = document.createElement('div')
let p9 = document.createElement('div')
let p10 = document.createElement('button')
p10.className = 'replay'
p10.innerHTML = '<b>play</b>'
p10.addEventListener('click', () => {
  window.location = './index.html'
})
let rulesTitle = document.createElement('h1')
rulesTitle.innerText = 'MindMaster'
instructions.appendChild(rulesTitle)
rules.className = 'rules'
rules.style.backgroundColor = 'white'
p1.innerHTML =
  'In MindMaster the player must guess a code by placing pegs. The goal is to arrange different colored pegs in the correct order in a row. The resulting pattern must match the hidden code at the top.<br/><br/>'
p2.innerHTML =
  'The player has up to 10 turns to crack the code. It consists of 4 colors, which have been chosen from of a selection of 7 colors. A color can be represented several times.<br/><br/>'
p3.innerText =
  'Each round, the player first places 4 selected \'pins\' in the respective row. This is done by dragging and dropping the desired color onto the code guessing area. After the fourth color is dropped in a row, the coder (in this case the game) checks if the colors are placed correctly and then gives between 0 and 4 hints. Depending on the result, either the next round begins or the game ends.'
p4.innerHTML = '<h3>Clues</h3>'
p5.innerText =
  'The four smaller circles next to the code guessing area serve as clue. Clue pegs are either red or white.'
p6.innerHTML =
  '<ul><li>A <b>red</b> clue means that there is a correct color in the correct place.</li><li>A <b>white</b> clue means that a correct color is in the wrong place.</li><li>An <b>empty</b> clue slot means that a wrong color has been placed.</li></ul>'
p7.innerHTML = '<h3>⚠︎ WARNING ⚠︎</h3>'
p8.innerHTML =
  '<p>The order of the pins in the clue area do not refer to the position of the pins in the code guessing area, rather they are completely random.</p>'
p9.innerText =
  'That means, if in the clue area e.g. the first two clues are red, not automatically the two left pins in the guessing area are correct. It means that in general, two colored pins have been set correctly. The position is not apparent from the clues.'

rules.appendChild(p1)
rules.appendChild(p2)
rules.appendChild(p3)
rules.appendChild(p4)
rules.appendChild(p5)
rules.appendChild(p6)
rules.appendChild(p7)
rules.appendChild(p8)
rules.appendChild(p9)
instructions.appendChild(rules)
instructions.appendChild(p10)
