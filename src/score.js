import {Entity} from "./entity";

export class Score extends Entity {
    constructor() {
        super();
        this.setX(window.innerWidth / 2);
        this.setY(20);
        this.score = 0;
        this.refreshText();
    }

    addToScore(amount) {
        this.incrementScore(amount);
        this.refreshText();
    }

    refreshText() {
        this.el.innerText = `Score: ${this.getScore()}`;
    }

    getScore() {
        return this.score;
    }

    setScore(score) {
        this.score = score;
    }

    incrementScore(score) {
        this.score += score;
    }

    resetScore() {
        this.setScore(0);
    }
}
