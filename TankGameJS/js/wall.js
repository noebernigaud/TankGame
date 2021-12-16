import { walls, wallTexture, wallDTexture } from './game.js';

export default class Wall {
    constructor(x, y, destructable) {
        this.x = x;
        this.y = y;
        this.sizex = 40;
        this.sizey = 40;
        this.destructable = destructable
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        if (this.destructable === true) { 
            ctx.drawImage(wallDTexture, 0, 0, this.sizex, this.sizey);
        }
        else {
            ctx.drawImage(wallTexture, 0, 0, this.sizex, this.sizey);
        }
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