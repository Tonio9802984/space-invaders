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
  const x = Math.floor(Math.random() * (gameArea.clientWidth - 50));
  const y = 50;
  return { x, y };
}

function createAsteroid() {
  let asteroid = new Asteroid();
  asteroid.speed = Math.floor(Math.random() * 8) + 3;
  asteroid.x = randomPosition().x;
  asteroid.y = randomPosition().y; // subtract 1 to ensure the asteroid is completely above the game area
  asteroid.element.style.left = asteroid.x + "px";
  asteroid.element.style.top = asteroid.y + "px";
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
  for (let i = 0; i < asteroids.length; i++) {
    let asteroid = asteroids[i];
    asteroid.y += asteroid.speed;
    asteroid.element.style.top = asteroid.y + "px";
    if (asteroid.y > gameArea.clientHeight) {
      asteroid.destroy();
      asteroids.splice(i, 1);
      i--;
    } else if (isCollide(asteroid.element, spaceship.element)) {
      gameOver();
      return;
    } else if (Array.isArray(spaceship.bullets)) {
      for (let j = 0; j < spaceship.bullets.length; j++) {
        let bullet = spaceship.bullets[j];
        if (isCollide(asteroid.element, bullet.element)) {
          asteroid.destroy();
          bullet.destroy();
          asteroids.splice(i, 1);
          spaceship.bullets.splice(j, 1);
          score += 1;
          i--;
          break;
        }
      }
    } else if (asteroid.y < 0) {
      asteroid.y = -asteroid.height;
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

//responsible for moving the bullets and asteroids,
//checking for collisions, updating the score,
//and calling itself again using requestAnimationFrame() to create an animation loop.
function animate() {
  if (!gameIsOver) {
    scoreDisplay.innerText = "Score: " + score;

    // Create new asteroids
    if (asteroids.length === 0 || Math.random() > 0.95) {
      setTimeout(createAsteroid, 1000);
    }

    // Move the bullets and check for collisions
    moveBullets();
    for (let bullet of spaceship.bullets) {
      bullet.checkCollision(asteroids);
    }

    // Move the asteroids and check for collisions
    moveAsteroids();

    // call the animate function again after a short delay
    setTimeout(animate, 20);
  }
}

animate();
