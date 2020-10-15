import {Entity} from "./entity";

export class Bullet extends Entity {
    constructor({x, y, isAlien}) {
        super({className : 'bullet'});
        this.setX(x);
        this.setY(y)
        this.isAlien = isAlien;
        this.speed = 10;
    }

    update() {
        !this.getIsAlien() ? this.setY(this.getY() - this.getSpeed()) : this.setY(this.getY() + this.getSpeed() + 5);
    }

    getSpeed() {
        return this.speed;
    }

    getIsAlien() {
        return this.isAlien;
    }
}
