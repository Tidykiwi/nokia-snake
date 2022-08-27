document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0 // First div in grid
    let appleIndex = 0 // Fist div in grid
    let currentSnake = [2,1,0] // 2 = head, 1 = body, 0 = tail
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    // Start / restart game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    // Deal with ALL the outcomes of the snake
    function moveOutcomes() {
    
        // Deal with snake hitting border or itself
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || // If snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || // If snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || // If snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || // If snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') // If snake hits itslef
        ) {
            return clearInterval(interval) // Clear interval if any of the above scenarios occur
        }

        const tail = currentSnake.pop() // Removes last item of the array and shows it
        squares[tail].classList.remove('snake') // Removes class of snake from the tail
        currentSnake.unshift(currentSnake[0] + direction) // Gives direction to the head of the array

        // Deal with snake getting apple
        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }

        squares[currentSnake[0]].classList.add('snake')
    }

    // Generate new apple once apple is eaten
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains('snake')) // Make sure apples don't appear on the snake
            squares[appleIndex].classList.add('apple')
    }

    // Assign functions to keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake')

        if(e.keyCode === 39) {
            direction = 1 // Press right arrow, snake will go right 1 
        } else if (e.keyCode === 38) {
            direction = -width // Press up arrow, snake goes back -10 (appears to go up)
        } else if (e.keyCode === 37) {
            direction = -1 // Press left arrow, snake will go left 1
        } else if (e.keyCode === 40) {
            direction = +width // Press down arrow, snake goes forward 10 (appears to go down)
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
})

