import Char from './char.js';
import Hole from './hole.js';
import { getMousePos } from './utils.js'
import Wall from './wall.js';
export { walls, holes, bullets, mines, chars, charsAI, char1, stopgame };

var canvas, ctx, width, height;
var char1;
var charsAI;
var charAI;
var chars;
var walls;
var holes;
var mines;
var bullets;
var mousepos = { x: 0, y: 0 };
var inputStates = {};
var playing;

window.onload = init;

// INITIALISATION

function init() {
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;

    playing = 0;

    char1 = new Char(100, 100, 0, 1, 1000);
    charsAI = [];
    chars = [char1];

    bullets = new Array();

    walls = new Array(
        new Wall(0, 0, width, 30, false),
        new Wall(0, 0, 30, height, false),
        new Wall(0, height - 30, width, 30, false),
        new Wall(width - 30, 0, 30, height, false),
        new Wall(width / 2, height / 2, 30, 100, false)
    );

    mines = new Array();

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

//GAME OVER GO TO MENU

function stopgame(){
    playing = 0;
}

//DEBUT D'UNE NOUVELLE PARTIE

function startgame(){
    char1 = new Char(100, 100, 0, 1, 1000);
    charAI = new Char(500, 200, 0, 0.7, 2000);
    charsAI = [charAI];
    chars = [char1, charAI];

    bullets = new Array();

    mines = new Array();

    walls = new Array(
        new Wall(0, 0, width, 30, false),
        new Wall(0, 0, 30, height, false),
        new Wall(0, height - 30, width, 30, false),
        new Wall(width - 30, 0, 30, height, false),
        new Wall(width / 2, height / 2, 30, 100, false),
        new Wall(width / 2, height / 2 - 30, 30, 30, true)
    );

    holes = new Array(
        new Hole(300, 300)
    );

    playing = 1;
}

//ANIMATION

function anime() {

    //MENU
    if (playing == 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "30px Arial";
        ctx.fillText('Press Space to start', 200, 300);
        if (inputStates.SPACE) {
            startgame();
            inputStates.SPACE = false; }
    }

    //IN GAME
    if (playing == 1) {
        // 1) On efface l'Ã©cran
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //On dessine les murs, trous, mines, balles
        walls.forEach(wall => wall.draw(ctx));
        holes.forEach(hole => hole.draw(ctx));
        mines.forEach(mine => mine.draw(ctx));
        bullets.forEach(bullet => bullet.draw(ctx));

        // 2) On dessine et on déplace les char
        chars.forEach(char => char.draw(ctx));
        charsAI.forEach(char => char.intelligence.applyStrategy(char1));
        char1.updateAngle(mousepos);
        

        // On regarde si on doit poser une mine
        if (inputStates.SPACE) {
            char1.addMine(Date.now());
        }
        // On regarde si on doit tirer
        if (inputStates.mouseclick) {
            char1.addBullet(Date.now());
        }

        var coeff = 1;
        if (inputStates.keyA + inputStates.keyW + inputStates.keyS + inputStates.keyD >= 2) coeff = 0.7;

        if (inputStates.keyA) {
            char1.moveL(coeff);
        }
        if (inputStates.keyW) {
            char1.moveT(coeff);
        }
        if (inputStates.keyS) {
            char1.moveB(coeff);
        }
        if (inputStates.keyD) {
            char1.moveR(coeff);
        }
    }

    // On demande une nouvelle frame d'animation
    window.requestAnimationFrame(anime);

}

function changeCadenceTir(value) {
    char1.delayMinBetweenBullets = value;
}
