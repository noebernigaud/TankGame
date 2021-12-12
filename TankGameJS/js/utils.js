
export { distance, getMousePos, collR, collL, collB, collT };

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function collR(xhitbox, yhitbox, xsize, ysize, xhitbox2, yhitbox2, xsize2, ysize2) {
    if ((xhitbox + xsize + 2 > xhitbox2) && (xhitbox + xsize/2 - 3 < xhitbox2) && (yhitbox + ysize > yhitbox2) && (yhitbox < yhitbox2 + ysize2)){
        return true;
    }
}

function collL(xhitbox, yhitbox, xsize, ysize, xhitbox2, yhitbox2, xsize2, ysize2) {
    if ((xhitbox - 2 < xhitbox2 + xsize2) && (xhitbox + xsize/2 + 3 > xhitbox2 + xsize2) && (yhitbox + ysize > yhitbox2) && (yhitbox < yhitbox2 + ysize2)){
        return true;
    }
}

function collB(xhitbox, yhitbox, xsize, ysize, xhitbox2, yhitbox2, xsize2, ysize2) {
    if ((yhitbox + ysize + 2 > yhitbox2) && (yhitbox + ysize/2 - 3 < yhitbox2) && (xhitbox + xsize > xhitbox2) && (xhitbox < xhitbox2 + xsize2)){
        return true;
    }
}

function collT(xhitbox, yhitbox, xsize, ysize, xhitbox2, yhitbox2, xsize2, ysize2) {
    if ((yhitbox - 2 < yhitbox2 + ysize2) && (yhitbox + ysize/2 + 3 > yhitbox2 + ysize2) && (xhitbox + xsize > xhitbox2) && (xhitbox < xhitbox2 + xsize2)){
        return true;
    }
}
