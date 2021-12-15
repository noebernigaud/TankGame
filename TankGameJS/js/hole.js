
export default class Hole {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sizex = 30;
        this.sizey = 30
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, this.sizex, this.sizey);
        ctx.restore();
    }


}