import {chars, mines} from './game.js';
import {coll} from './utils.js';

export default class Mine {
    constructor(char) {
        this.char = char;
        this.x = char.x;
        this.y = char.y;
        this.sizex = 20;
        this.sizey = 20
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = 'yellow';
        ctx.fillRect(0, 0, this.sizex, this.sizey);
        ctx.restore();
        this.checkCollision();
    }

    checkCollision(){
        chars.forEach(char => {
            if((char !== this.char) && (coll(this.x, this.y, this.sizex, this.sizey, char.x, char.y, char.sizex, char.sizey))){
                this.remove();
                char.removeChar();
            }
        })
    }

    remove(){
        let position = mines.indexOf(this);
        mines.splice(position, 1);
    }
}