
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

    collisionRight(xhitbox, yhitbox, xsize, ysize) {
        if ((xhitbox + xsize + 2 > this.x) && (xhitbox + xsize/2 - 3 < this.x) && (yhitbox + ysize > this.y) && (yhitbox < this.y + this.sizey)){
            return true;
        }
    }

    collisionLeft(xhitbox, yhitbox, xsize, ysize) {
        if ((xhitbox - 2 < this.x + this.sizex) && (xhitbox + xsize/2 + 3 > this.x + this.sizex) && (yhitbox + ysize > this.y) && (yhitbox < this.y + this.sizey)){
            return true;
        }
    }

    collisionBottom(xhitbox, yhitbox, xsize, ysize) {
        if ((yhitbox + ysize + 2 > this.y) && (yhitbox + ysize/2 - 3 < this.y) && (xhitbox + xsize > this.x) && (xhitbox < this.x + this.sizex)){
            return true;
        }
    }

    collisionTop(xhitbox, yhitbox, xsize, ysize) {
        if ((yhitbox - 2 < this.y + this.sizey) && (yhitbox + ysize/2 + 3 > this.y + this.sizey) && (xhitbox + xsize > this.x) && (xhitbox < this.x + this.sizex)){
            return true;
        }
    }


}