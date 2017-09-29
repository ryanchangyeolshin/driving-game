/* eslint-disable no-unused-vars */
class Car {
  constructor(direction, speed, location) {
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
    Object.assign($car.style, {
      left: `${newCar.location[0]}px`,
      top: `${newCar.location[1]}px`
    })
  }, 16)
  return moveCar
}

function stopCar(id) {
  clearInterval(id)
}

let newCar = null
const $createButton = document.querySelector('#create')
$createButton.addEventListener('click', function () {
  newCar = new Car('EAST', 10, [500, 500])
  const carSprite = 'images/car-sprite.png'
  const $car = renderCar(carSprite)
  document.querySelector('.game').appendChild($car)
  $createButton.setAttribute('class', 'hidden')
})

const $clearButton = document.querySelector('#clear')
$clearButton.addEventListener('click', function () {
  if (document.querySelector('.car')) {
    const $car = document.querySelector('.car')
    document.querySelector('.game').removeChild($car)
    $createButton.setAttribute('class', 'button')
  }
})

let movedCar = null
document.body.addEventListener('keypress', function (e) {
  switch (e.key) {
    case 'Enter':
      if (document.querySelector('img')) {
        const $car = document.querySelector('img')
        movedCar = moveCar(newCar, $car)
      }
      break
    case 's':
      stopCar(movedCar)
      break
  }
})
