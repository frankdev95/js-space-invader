import {Ship} from "./ship";
import {Alien} from "./alien";
import {Bullet} from "./bullet";
import {Score} from "./score";
import {Lives} from "./lives";
import './sass/main.scss'
const gameOverEl = document.querySelector(".game-over");

const score = new Score();
const keys = {};

let aliens = [];
let aliensGrid = [];
let bullets = [];

const STARTING_ALIEN_ROWS = 5;
const STARTING_ALIEN_COLS = 10;
let wave = 1;
let isGameOver = false;

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

// COLLISION METHODS

const removeBullet = (bullet) => {
    bullets.splice(bullets.indexOf(bullet), 1);
    bullet.remove();
};

const removeAlien = (alien) => {
    aliens.splice(aliens.indexOf(alien), 1);
    alien.remove();
};

const refreshGrid = () => {

}

const getCollidedBullet = (entity) => {
    for (let bullet of bullets) {
        if (isCollision(entity, bullet)) {
            return bullet;
        }
    }
    return null;
};

const isCollision = (entity, bullet) => {
    const e = entity.el.getBoundingClientRect();
    const b = bullet.el.getBoundingClientRect();
    return !(
        e.right < b.left ||
        e.left > b.right ||
        e.bottom < b.top ||
        e.top > b.bottom
    );
};

const createShip = () => {
    return new Ship({
        getCollidedBullet,
        removeLife: () => lives.removeLives(),
        removeBullet
    });
}

let ship = createShip();

const spawnAliens = (rows, cols, xSpacing, ySpacing, xPos, yPos) => {
    for (let row = 0; row < rows; row++) {
        const aliensCol = [];
        for(let col = 0; col < cols; col++) {
            const alien = new Alien({
                x: col * xSpacing + xPos,
                y: row * ySpacing + yPos,
                getCollidedBullet,
                removeAlien,
                removeBullet,
                addToScore: (amount) => score.addToScore(amount)
            })
            aliens.push(alien);
            aliensCol.push(alien);
        }
        aliensGrid.push(aliensCol);
    }
}

const spawnWave = (wave) => {
    spawnAliens(STARTING_ALIEN_ROWS, STARTING_ALIEN_COLS, 60, 60, 650, 100);
}

const getBottomAliens = (cols, rows) => {
    const bottomAliens = [];
    for (let col = 0; col < cols; col++) {
        for (let row = rows - 1; rows >= 0; row--) {
            if (aliensGrid[row][col].el) {
                bottomAliens.push(aliensGrid[row][col]);
                break;
            }
        }
    }
    return bottomAliens;
};

const getRandomAlien = (aliens) => {
    return aliens[parseInt(Math.random() * aliens.length)];
}

const fireAlienBullet = () => {
    const randomAlien = getRandomAlien(getBottomAliens(STARTING_ALIEN_COLS, STARTING_ALIEN_ROWS));
    console.log(randomAlien);
    if(ship.isAlive) {
        createBullet({
            x: randomAlien.getX() + 15,
            y: randomAlien.getY() + 33,
            isAlien: true
        })
    }
}

let fireAlienInterval = setInterval(fireAlienBullet, 3000);

const getLeftMostAlien = () => {
    return aliens.reduce((minimumAlien, currentAlien) => {
        return currentAlien.x < minimumAlien.x ? currentAlien : minimumAlien;
    });

}

const getRightMostAlien = () => {
    return aliens.reduce((minimumAlien, currentAlien) => {
        return currentAlien.x > minimumAlien.x ? currentAlien : minimumAlien;
    });

}

const gameOver = () => {
    clearInterval(startGame);
    clearInterval(fireAlienInterval);
    setGameOver(true);
    ship.remove();
    lives.el.classList.add("hide");
    score.el.classList.add("hide");
    removeAliens();
    removeBullets();
    gameOverEl.classList.remove("hide");
}

gameOverEl.addEventListener("click", () => {
    setGameOver(false);
    spawnWave(1);
    gameOverEl.classList.add("hide");
    gameOverEl.removeEventListener("click", () => {});
    lives.el.classList.remove("hide");
    score.el.classList.remove("hide");
    lives.setLives(lives.getStartingLives());
    lives.refreshText();
    score.resetScore();
    score.refreshText();
    ship = createShip();
    startGame = setInterval(update, 20);
    fireAlienInterval = setInterval(fireAlienBullet, 3000);
});

let lives = new Lives({gameOver});

const removeAliens = () => {
    aliens.forEach(alien => {
        alien.remove();
    })
    aliens = [];
    aliensGrid = [];
}

const removeBullets = () => {
    bullets.forEach(bullet => {
        bullet.remove();
    })
    bullets = [];
}

const createBullet = ({x, y, isAlien}) => {
    bullets.push(
        new Bullet({
            x,
            y,
            isAlien
        })
    )
}

const update = () => {

    if (keys['ArrowLeft']) ship.move(-ship.getSpeed());
    if (keys['ArrowRight']) ship.move(ship.getSpeed());
    if (keys[' ']) ship.fire({createBullet});

    bullets.forEach((bullet) => {
        bullet.update();
        if (bullet.y < 0) {
            bullet.remove();
            bullets.splice(bullets.indexOf(bullet), 1);
        }
    });

    ship.update(lives);

    aliens.forEach((alien) => {
        alien.update(getGameOver());
    });

    if(!getGameOver()) {
        const leftMostAlien = getLeftMostAlien();
        if (leftMostAlien.getX() < 100) {
            aliens.forEach((alien) => {
                alien.setDirection('right');
                alien.moveDown();
            });
        }

        const rightMostAlien = getRightMostAlien();
        if (rightMostAlien.getX() > window.innerWidth - 60) {
            aliens.forEach((alien) => {
                alien.setDirection('left');
                alien.moveDown();
            });
        }
    }

}

spawnWave(getWave());

let startGame = setInterval(update, 20);

function getGameOver() {
    return isGameOver;
}

function setGameOver(gameOver) {
    isGameOver = gameOver;
}

function setWave(waveNum) {
    wave = waveNum;
}

function getWave() {
    return wave;
}
