# MindMaster

## Background story:

Ever since the first few weeks of actively learning JavaScript and creating a Battleship game I have wanted to return to vanilla Javascript to make another game. There is simply something satisfying in creating a game from scratch.

After diving deeper into other frameworks and languages I was inspired by students in our cohorts to create a game in the same time frame we give them at the beginning of their journey.

This Mastermind clone is the result of my attempt to create a JS game in just a few days.

## Technologies:
- javascript
- css
- html

## Screenshots:
<img src=https://i.imgur.com/rDIDcDY.png width=200>
<img src=https://i.imgur.com/XCBWI7K.png width=180 height=423>
<img src=https://i.imgur.com/7AxvNI5.png width=190 height=423>
<img src=https://i.imgur.com/uoteS2H.png width=180 height=423>

## Some challenges I faced:

Some of the most challenging parts of the code for me were achieving full functionality on the the drag and drop capabilities. I was able to quickly enable drag capabilities, however it took me a while to be able to have the drop capability fire.

Adding `e.stopPropagation()` and `e.preventDefault()` on the drag, enter, leave events solved the problem. This stopped any event bubbling and enabled each event to fire and allowed my dropEvent to run smoothly.

```JavaScript
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
```
Another part of code that took me a while to work through was the method of giving the hints. I took multiple steps to compare the users guess with the randomly selected pattern. I created the compGuessPat (Compare Guess Pattern) function to essentially look at each elements of the users guess which is passed in as an array.

```JavaScript
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
  ```
  It instantiates an object to keep track of each color and its frequency, in the guess and the selected pattern respectively. The patternTracker must be reset each time the function is called, otherwise the comparison would fail, thus instantiating it in the scope of this function made the most sense. 
  
  Both the users guess array and the computers chosen pattern array are iterated over, in order to populate the corresponding objects:

  ```JavaScript

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
  ```
Once these objects are created and populated they are run through a several comparisons. The first comparison checks each index of the users guess array with the selected patten array. If the correct color is found in the correct index the a 'red' is added to the hint array and the objects tracking the colors are decremented by 1 in the corresponding color key:value pair of both objects. 

```JavaScript
  guess.forEach((color, index) => {
    if (guess[index] === pattern[index]) {
      hints[index] = 'red'
      colorTracker[guess[index]] -= 1
      patternTracker[guess[index]] -= 1
    }
  })
  ```

Then to ensure correct hints are given the guess array is iterated over again. This time the code checks to see if the the color at the index is included anywhere in the computers selected pattern. In order for this to properly function, two conditions must be fulfilled: 
  - the pattern and the guess may not have the same color at the same index, that test has already completed.
  - the patternTracker object must have 1 or more of that color still accounted for, otherwise the user will be given hints that are incorrect.

  ```JavaScript

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
```