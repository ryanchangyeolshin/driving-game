/* eslint-disable no-unused-vars */
class Car {
  constructor(id, direction, speed, location) {
    this.id = id
    this.direction = direction
    this.speed = speed
    this.location = location
  }

  turn(direction) {
    this.direction = direction
  }

  accelerate(amount) {
    this.speed += amount
  }

  move() {
    switch (this.direction) {
      case 'SOUTH':
        this.location[1] -= this.speed
        break
      case 'NORTH':
        this.location[1] += this.speed
        break
      case 'WEST':
        this.location[0] -= this.speed
        break
      case 'EAST':
        this.location[0] += this.speed
        break
    }
  }
}

function renderCar(carSprite) {
  const $car = document.createElement('img')
  $car.setAttribute('src', carSprite)
  $car.setAttribute('class', 'car')
  return $car
}

function moveCar(newCar, $car) {
  const moveCar = setInterval(function () {
    newCar.move()
    if (newCar.location[0] >= 900 || newCar.location[1] >= 900 || newCar.location[0] <= 0 || newCar.location[1] <= 0) {
      const $seconds = document.querySelector('.seconds')
      gameOver($car, newCar.id, timer, $seconds)
    }
    Object.assign($car.style, {
      left: `${newCar.location[0]}px`,
      bottom: `${newCar.location[1]}px`
    })
  }, 16)
  return moveCar
}

function startTimer(newCar, timer, $seconds) {
  if (!timer.id) {
    timer.id = setInterval(function () {
      timer.seconds++
      $seconds.textContent = timer.seconds
      checkTimer(newCar, timer)
    }, 1000)
    return timer.id
  }
}

function clearTimer(timer, $seconds) {
  clearInterval(timer.id)
  timer.id = null
  timer.seconds = 0
  $seconds.textContent = timer.seconds
}

function gameOver($car, id, timer, $seconds) {
  stopCar(id)
  newCar = null
  document.querySelector('.game').removeChild($car)
  const $gameover = renderGameOver()
  document.querySelector('.container').setAttribute('class', 'hidden')
  document.body.appendChild($gameover)
  clearTimer(timer, $seconds)
}

function stopCar(id) {
  clearInterval(id)
}

function turnLeft($car, car) {
  $car.setAttribute('class', 'car left')
  car.turn('WEST')
}

function turnUp($car, car) {
  $car.setAttribute('class', 'car up')
  car.turn('NORTH')
}

function turnDown($car, car) {
  $car.setAttribute('class', 'car down')
  car.turn('SOUTH')
}

function turnRight($car, car) {
  $car.setAttribute('class', 'car')
  car.turn('EAST')
}

function checkTimer(car, timer) {
  if (timer.seconds % 10 === 0) {
    car.accelerate(car.speed)
  }
}

function renderGameOver() {
  const $gameover = document.createElement('div')
  $gameover.setAttribute('class', 'gameover-screen')

  const $gameoverHeader = document.createElement('h1')
  $gameoverHeader.setAttribute('class', 'gameover-header')
  $gameoverHeader.textContent = 'GAME OVER'
  $gameover.appendChild($gameoverHeader)

  const $result = document.createElement('p')
  $result.setAttribute('class', 'result')
  $result.textContent = `Your time was ${timer.seconds} second(s).`
  $gameover.appendChild($result)

  Object.assign(document.body.style, {
    'background-color': 'black'
  })

  const $continue = renderContinueButton()
  $gameover.appendChild($continue)

  return $gameover
}

function renderContinueButton() {
  const $continue = document.createElement('button')
  $continue.setAttribute('class', 'button')
  $continue.setAttribute('id', 'continue')
  $continue.textContent = 'CONTINUE?'

  return $continue
}

let newCar = null
const $createButton = document.querySelector('#create')
$createButton.addEventListener('click', function () {
  newCar = new Car(null, 'EAST', 2, [500, 500])
  const carSprite = 'images/car-sprite.png'
  const $car = renderCar(carSprite)
  document.querySelector('.game').appendChild($car)
  $createButton.setAttribute('class', 'hidden')
})

const $clearButton = document.querySelector('#clear')
$clearButton.addEventListener('click', function () {
  if (document.querySelector('.car')) {
    const $car = document.querySelector('.car')
    let newCar = null
    document.querySelector('.game').removeChild($car)
  }
  let newCar = null
  $createButton.setAttribute('class', 'button')
})

document.body.addEventListener('click', function (e) {
  if (e.target.getAttribute('id') === 'continue') {
    const $gameover = document.querySelector('.gameover-screen')
    $gameover.setAttribute('class', 'hidden')

    Object.assign(document.body.style, {
      'background-color': '#f4f5f4'
    })

    const $container = document.querySelector('.hidden')
    $container.setAttribute('class', 'container')
  }
})

let timer = {
  id: null,
  seconds: 0
}
document.body.addEventListener('keypress', function (e) {
  const $car = document.querySelector('.car')
  switch (e.key) {
    case 'Enter':
      if (document.querySelector('.car')) {
        const $car = document.querySelector('.car')
        if (!newCar.id) {
          newCar.id = moveCar(newCar, $car)
          timer.id = startTimer(newCar, timer, document.querySelector('.seconds'))
        }
      }
      break
    case 'b':
      if ($car) {
        stopCar(newCar.id)
        clearInterval(timer.id)
        newCar.id = null
        timer.id = null
      }
      break
    case 'w':
      if ($car) {
        turnUp($car, newCar)
      }
      break
    case 'a':
      if ($car) {
        turnLeft($car, newCar)
      }
      break
    case 's':
      if ($car) {
        turnDown($car, newCar)
      }
      break
    case 'd':
      if ($car) {
        turnRight($car, newCar)
      }
  }
})
