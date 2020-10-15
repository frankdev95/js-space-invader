import alienImage from "./images/alien.png";
import {Entity} from "./entity";

const LEFT = 'left';
const DOWN_DISTANCE = 10;
const POINTS_PER_KILL = 20;

export class Alien extends Entity {
    constructor({x, y, getCollidedBullet, removeAlien, removeBullet, addToScore}) {
        super({tag : 'img', image : alienImage});
        this.speed = 1;
        this.direction = LEFT;
        this.downDistance = DOWN_DISTANCE;

        this.getCollidedBullet = getCollidedBullet;
        this.removeAlien = removeAlien;
        this.removeBullet = removeBullet;
        this.addToScore = addToScore;
        this.setX(x);
        this.setY(y);

    }

    update(isGameOver) {
        if (!isGameOver) {
            this.direction === LEFT ? this.setX(this.getX() - this.getSpeed()) : this.setX(this.getX() + this.getSpeed());

            const bullet = this.getCollidedBullet(this);
            if (bullet && !bullet.isAlien) {
                this.removeAlien(this);
                this.removeBullet(bullet);
                this.addToScore(POINTS_PER_KILL);
            }
        }
    }

    setDirection(direction) {
        this.direction = direction;
    }

    moveDown() {
        this.setY(this.getY() + this.downDistance);
    }

    getSpeed() {
        return this.speed;
    }
}
