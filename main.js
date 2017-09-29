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
    this.speed = amount
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

var $createButton = document.querySelector('#create')
$createButton.addEventListener('click', function () {
  const newCar = new Car('EAST', 50, [500, 500])
  const carSprite = 'images/car-sprite.png'
  const $car = renderCar(carSprite)
  document.querySelector('.game').appendChild($car)
  $createButton.setAttribute('class', 'hidden')
})

var $clearButton = document.querySelector('#clear')
$clearButton.addEventListener('click', function () {
  if (document.querySelector('.car')) {
    const $car = document.querySelector('.car')
    document.querySelector('.game').removeChild($car)
    $createButton.setAttribute('class', 'button')
  }
})
