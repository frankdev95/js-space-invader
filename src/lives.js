import {Entity} from "./entity";

const STARTING_LIVES = 1;

export class Lives extends Entity {
    constructor({gameOver}) {
        super();
        this.setX(100)
        this.setY(window.innerHeight - 50);
        this.lives = STARTING_LIVES;
        this.gameOver = gameOver;
        this.refreshText();
    }

    refreshText() {
        this.el.innerText = 'Lives: ' + new Array(this.lives)
            .fill('❤')
            .join(' ');
    }

    removeLives() {
        this.setLives(this.getLives() - 1);
        this.refreshText();
        if(this.getLives() === 0) {
            this.gameOver();
        }
    }

    setLives(lives) {
        this.lives = lives;
    }

    getLives() {
        return this.lives;
    }

    getStartingLives() {
        return STARTING_LIVES;
    }
}
