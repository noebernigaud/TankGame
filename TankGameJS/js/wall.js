
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
        ctx.fillRect(0, 0, this.sizex, this.sizey);
        ctx.restore();
    }


}