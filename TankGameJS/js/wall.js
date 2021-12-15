import { walls } from './game.js';

export default class Wall {
    constructor(x, y, sizex, sizey, destructable) {
        this.x = x;
        this.y = y;
        this.sizex = sizex;
        this.sizey = sizey;
        this.destructable = destructable
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        if (this.destructable === true) { ctx.fillStyle = 'red'; }
        ctx.fillRect(0, 0, this.sizex, this.sizey);
        ctx.restore();
    }

    destroy() {
        if (this.destructable === true) {
            console.log("destroying a wall!")
            let position = walls.indexOf(this);
            walls.splice(position, 1);
        }
    }


}