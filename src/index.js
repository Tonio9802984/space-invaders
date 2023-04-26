import { Spaceship } from "./space-ship.js";
import { Asteroid } from "./asteroid.js";
import { Bullet } from "./bullet.js";
//
export const gameArea = document.querySelector("main");
export const speed = 5;

let asteroids = [];
let spaceship = new Spaceship(asteroids);
let gameIsOver = false;
let score = 0;

function randomPosition() {
  return Math.floor(Math.random() * (gameArea.clientWidth - 50));
}

function createAsteroid() {
  let asteroid = new Asteroid();
  asteroid.x = randomPosition();
  asteroid.y = 0;
  asteroids.push(asteroid);
}

function moveBullets() {
  for (let bullet of spaceship.bullets) {
    bullet.move();
    if (bullet.y < 0) {
      bullet.destroy();
      spaceship.bullets.splice(spaceship.bullets.indexOf(bullet), 1);
    }
  }
}

function moveAsteroids() {
  for (let asteroid of asteroids) {
    asteroid.move();
    if (isCollide(asteroid.element, spaceship.element)) {
      gameOver();
      return;
    }
    if (Array.isArray(spaceship.bullets)) {
      for (let bullet of spaceship.bullets) {
        if (isCollide(asteroid.element, bullet.element)) {
          asteroid.destroy();
          bullet.destroy();
          asteroids.splice(asteroids.indexOf(asteroid), 1);
          spaceship.bullets.splice(spaceship.bullets.indexOf(bullet), 1);
          score += 1;
          break;
        }
      }
    }
  }
}

export function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();

  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function gameOver() {
  let message = document.createElement("div");
  message.innerText = "Game Over";
  message.style.fontSize = "50px";
  message.style.position = "absolute";
  message.style.top = "50%";
  message.style.left = "50%";
  message.style.transform = "translate(-50%, -50%)";
  gameArea.append(message);
  gameIsOver = true;
}

setInterval(function () {
  if (!gameIsOver) {
    if (Math.random() > 0.95) {
      createAsteroid();
    }
    moveAsteroids();
  }
}, 20);

window.addEventListener("keydown", function (e) {
  if (!gameIsOver) {
    switch (e.key) {
      case "ArrowLeft":
        spaceship.movement("left");
        break;
      case "ArrowRight":
        spaceship.movement("right");
        break;
      case "ArrowUp":
        e.preventDefault();
        spaceship.movement("up");
        break;
      case "ArrowDown":
        e.preventDefault();
        spaceship.movement("down");
        break;
      case " ":
        e.preventDefault(); // prevent default behavior of space bar
        spaceship.shoot();
        break;
    }
  }
});

let scoreDisplay = document.createElement("div");
scoreDisplay.innerText = "Score: 0";
scoreDisplay.style.position = "absolute";
scoreDisplay.style.top = "10px";
scoreDisplay.style.left = "10px";
scoreDisplay.style.fontSize = "20px";
gameArea.append(scoreDisplay);

setInterval(function () {
  if (!gameIsOver) {
    scoreDisplay.innerText = "Score: " + score;
  }
}, 100);
