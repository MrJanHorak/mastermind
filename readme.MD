# MindMaster

## Background story:


## Some challenges I faced:

Some of the most challenging parts of the code that were most challenging for me were for one the drag and drop capabilities. I was able to quickly enable drag capabilities, however it took me a while to be able to have the drop capability fire.

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
Another part of this code that took me a while to work through was the method of giving the hints. I took multiple steps to compare the users guess with the randomly selected pattern.

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
  The compGeussPat (compare guess pattern) function takes in the users guess as a parameter and creates an object to keep track of each color and its frequency, in the guess and the selected pattern. Both patterns as iterated over and populate the objects in the following code block:

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
Once these objects are created and populated they are run through a several comparisons. The first comparison checks each index of the guess array with the selected patten array. If the correct color is found in the correct index the a 'red' is added to the hint array and the objects tracking the colors are decremented by 1 in the corresponding color key:value pair. 

```JavaScript
  guess.forEach((color, index) => {
    if (guess[index] === pattern[index]) {
      hints[index] = 'red'
      colorTracker[guess[index]] -= 1
      patternTracker[guess[index]] -= 1
    }
  })
  ```

Then to ensure correct hints are given the guess array is iterated over again. This time the code checks to see if the the color at the index is included selected pattern that is to be guessed. The key here is that the current color iterated over must not be the same color at the selected index and the patternTracker must have a number larger than 0 located at the key:value pair at the color. THe order also matters, this check must occur after the first one that compares the direct indexes for equals, otherwise if a user guesses multiple of one color the hint array will add hints it should not.

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