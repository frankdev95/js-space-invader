import shipImage from "./images/ship.png";
import {Entity} from "./entity";

const SHIP_IMAGE_WIDTH = 50;

export class Ship extends Entity {
    constructor({getCollidedBullet, removeLife, removeBullet}) {
        super({tag : 'img', image : shipImage});
        this.speed = 5;
        this.isFire = true;
        this.getCollidedBullet = getCollidedBullet;
        this.removeLife = removeLife;
        this.removeBullet = removeBullet;
        this.isAlive = true;
        this.setX(window.innerWidth / 2);
        this.setY(window.innerHeight - 80);
    }

    move(direction) {
        this.setX(this.getX() + direction);
    }

    update(lives) {
        const bullet = this.getCollidedBullet(this);
        if(bullet && bullet.isAlien && this.isAlive) {
            this.removeBullet(bullet);
            this.removeLife();
            if(lives.getLives() >= 1) {
                this.kill();
            }

        }
    }

    fire({createBullet}) {
        if(this.getIsFire() && this.isAlive) {
            this.setIsFire(!this.getIsFire());
            createBullet({
                x: this.x + SHIP_IMAGE_WIDTH / 2,
                y: this.y,
                isAlien : false
            });
            setTimeout(() => {
                this.setIsFire(!this.getIsFire());
            }, 1000)
        }
    }

    kill() {
        this.setIsAlive(!this.getIsAlive());
        this.el.style.opacity = '0';

        setTimeout(() => {
            this.setIsAlive(!this.getIsAlive());
            this.el.style.opacity = '1';
            this.setX(window.innerWidth / 2);
        }, 1000)
    }

    getIsAlive() {
        return this.isAlive;
    }

    setIsAlive(isAlive) {
        this.isAlive = isAlive;
    }

    getSpeed() {
        return this.speed;
    }

    getIsFire() {
        return this.isFire;
    }

    setIsFire(isFire) {
        this.isFire = isFire;
    }
}
