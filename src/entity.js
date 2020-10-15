export class Entity {
    constructor({tag= 'div', className = ' ', image} = {}) {
        this.el = document.createElement(tag);
        if(tag === 'img') {
            this.el.src = image;
        }
        this.el.className = 'entity ' + className;
        document.body.appendChild(this.el);
    }

    remove() {
        this.el.remove();
        this.el = null;
        delete this.el;
    }

    setX(x) {
        this.x = x;
        this.el.style.left = `${this.x}px`;
    }

    setY(y) {
        this.y = y;
        this.el.style.top = `${this.y}px`;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}
