import Char from './char.js';
import { getMousePos } from './utils.js'
import Wall from './wall.js';
export { walls };
export { bullets };

var canvas, ctx, width, height;
var char1;
var charsAI;
var chars;
var walls;
var bullets;
var mousepos = { x: 0, y: 0 };
var inputStates = {};

window.onload = init;

function init() {
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;

    // dernier param = temps min entre tirs consecutifs. Mettre à 0 pour cadence max
    // 500 = 2 tirs max par seconde, 100 = 10 tirs/seconde
    char1 = new Char(100, 100, 0, 1, 1000);
    charsAI = [];
    chars = [char1];

    bullets = new Array();

    walls = new Array(
        new Wall(0, 0, width, 30, false),
        new Wall(0, 0, 30, height, false),
        new Wall(0, height - 30, width, 30, false),
        new Wall(width - 30, 0, 30, height, false),
        new Wall(width/2, height/2, 30, 100, false)
    );

    canvas.addEventListener('mousemove', (evt) => {
        mousepos = getMousePos(canvas, evt);
    }, false);

    window.addEventListener('mousedown', (evt) => {
        inputStates.mouseclick = true;
    });

    window.addEventListener('mouseup', (evt) => {
        inputStates.mouseclick = false;
    });

    window.addEventListener('keydown', (evt) => {
        if (evt.code === "Space") {
            inputStates.SPACE = true;
        }
        if (evt.code === "KeyA") {
            inputStates.keyA = true;
        }
        if (evt.code === "KeyW") {
            inputStates.keyW = true;
        }
        if (evt.code === "KeyS") {
            inputStates.keyS = true;
        }
        if (evt.code === "KeyD") {
            inputStates.keyD = true;
        }
    });

    window.addEventListener('keyup', (evt) => {
        if (evt.code === "Space") {
            inputStates.SPACE = false;
        }
        if (evt.code === "KeyA") {
            inputStates.keyA = false;
        }
        if (evt.code === "KeyW") {
            inputStates.keyW = false;
        }
        if (evt.code === "KeyS") {
            inputStates.keyS = false;
        }
        if (evt.code === "KeyD") {
            inputStates.keyD = false;
        }
    });

    anime();
}

function anime() {
    // 1) On efface l'Ã©cran
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //On dessine les murs
    walls.forEach(wall => wall.draw(ctx));

    // 2) On dessine et on déplace le char 1
    char1.draw(ctx);
    char1.updateAngle(mousepos);

    // On dessine chaque balle
    bullets.forEach(bullet => bullet.draw(ctx));

    // On regarde si on doit tirer
    if (inputStates.SPACE) {
        char1.addBullet(Date.now(), width, height);
    }
    if (inputStates.mouseclick) {
        char1.addBullet(Date.now(), width, height);
    }

    var coeff = 1;
    if (inputStates.keyA + inputStates.keyW + inputStates.keyS + inputStates.keyD >= 2) coeff = 0.7;

    if (inputStates.keyA) {
        //on verifie qu'il n'y a pas de collision avec un mur a gauche
        if (walls.every(wall => !wall.collisionLeft(char1.x - 20, char1.y - 20, 40, 40))) {
            char1.move(-coeff, 0);
        }
    }
    if (inputStates.keyW) {
        //on verifie qu'il n'y a pas de collision avec un mur au-dessus
        if (walls.every(wall => !wall.collisionTop(char1.x - 20, char1.y - 20, 40, 40))) {
            char1.move(0, -coeff);
        }
    }
    if (inputStates.keyS) {
        //on verifie qu'il n'y a pas de collision avec un mur en-dessous
        if (walls.every(wall => !wall.collisionBottom(char1.x - 20, char1.y - 20, 40, 40))) {
            char1.move(0, coeff);
        }
    }
    if (inputStates.keyD) {
        //on verifie qu'il n'y a pas de collision avec un mur a droite
        if (walls.every(wall => !wall.collisionRight(char1.x - 20, char1.y - 20, 40, 40))) {
            char1.move(coeff, 0);
        }
    }

    // On demande une nouvelle frame d'animation
    window.requestAnimationFrame(anime);

}

function changeCadenceTir(value) {
    char1.delayMinBetweenBullets = value;
}
