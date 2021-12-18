import Char from './char.js';
import Hole from './hole.js';
import { getMousePos } from './utils.js'
import Wall from './wall.js';
export { walls, holes, bullets, mines, chars, charsAI, char1, stopgame };
export { wallTexture, wallDTexture, holeImage, tankImage, bulletImage, mineImage };
export { bulletFiredSound, explosionSound, bulletBounceSound, bulletDestroyedSound, minePlacedSound };

var canvas, ctx, width, height;
var char1;
var charsAI;
var chars;
var walls;
var holes;
var mines;
var bullets;
var mousepos = { x: 0, y: 0 };
var inputStates = {};
var playing;
var level;
var speedMultUti = 1;
var reloadMultUti = 1;

var backgroundTexture = new Image();
backgroundTexture.src = './images/woodTexture.jpg';

var wallTexture = new Image();
wallTexture.src = './images/wallTexture.jpg';
var wallDTexture = new Image();
wallDTexture.src = './images/wallDTexture.jpg';

var holeImage = new Image();
holeImage.src = './images/hole.png';

var tankImage = new Image();
tankImage.src = './images/tank.png';
var tankImageRed = new Image();
tankImageRed.src = './images/tankRed.png';
var tankImageBlue = new Image();
tankImageBlue.src = './images/tankBlue.png';
var tankImageGreen = new Image();
tankImageGreen.src = './images/tankGreen.png';

let bulletFiredSound;
let explosionSound;
let bulletBounceSound;
let bulletDestroyedSound;
let minePlacedSound;
let applauseSound;


var bulletImage = new Image();
bulletImage.src = './images/bullet.png';

var mineImage = new Image();
mineImage.src = './images/minemine.png';

window.onload = init();

// INITIALISATION

function init() {

    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;

    playing = 0;

    level = -1;

    explosionSound = new Howl({
        urls: ['http://schaeffer.ludo.free.fr/worms/DATA/Wav/Effects/Explosion2.wav'],
        volume: 0.2
    });

    bulletFiredSound = new Howl({
        urls: ['https://rpg.hamsterrepublic.com/wiki-images/d/db/Crush8-Bit.ogg'],
        volume: 0.5
    });

    bulletBounceSound = new Howl({
        urls: ['https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/plop.mp3']
    });

    bulletDestroyedSound = new Howl({
        urls: ['http://commondatastorage.googleapis.com/codeskulptor-assets/Collision8-Bit.ogg']
    });

    minePlacedSound = new Howl({
        urls: ['http://www.utc.fr/si28/ProjetsUpload/P2006_si28p004/flash_puzzle/sons/rush/mineplace.wav']
    });

    applauseSound = new Howl({
        urls: ['http://sfxcontent.s3.amazonaws.com/soundfx/Human-Applause-LargeCrowd01.mp3']
    });




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

function stopgame() {
    pausebackgroundMusic();
    playing = 0;
}

//DEBUT D'UNE NOUVELLE PARTIE

function startgame(level) {

    playing = 1;

    switch (level) {

        /////////////////////////////////////// LEVEL 1
        case (0): {
            char1 = new Char(200, height / 2, 0, 1.4 * speedMultUti, 800 * reloadMultUti, tankImage);
            charsAI = [new Char(850, height / 2, 0, 0, 1500, tankImageGreen)];
            chars = charsAI.slice();
            chars.push(char1);

            walls = new Array();
            for (var i = 0; i < 6; i++) {
                if (i < 2 || i > 3) {
                    walls.push(new Wall(width / 2 + 40, height / 2 - 120 + 40 * i, false));
                    walls.push(new Wall(width / 2 - 200, height / 2 - 120 + 40 * i, false));
                }
                else walls.push(new Wall(width / 2 + 40, height / 2 - 120 + 40 * i, true));
            }

            holes = new Array();

            break;
        }
        /////////////////////////////////////// LEVEL 2
        case (1): {

            char1 = new Char(150, height - 150, 0, 1.4 * speedMultUti, 800 * reloadMultUti, tankImage);
            charsAI = [new Char(width - 150, 150, 0, 1.2, 1500, tankImageRed)];
            chars = charsAI.slice();
            chars.push(char1);

            walls = new Array();
            for (var i = 0; i < 12; i++) {
                if (i < 8) {
                    walls.push(new Wall(180 + 40 + 40 * i, 200, false));
                    walls.push(new Wall(width - 180 - 40 * i, 400, false));
                }
                else {
                    walls.push(new Wall(180 + 40 + 40 * i, 200, true));
                    walls.push(new Wall(width - 180 - 40 * i, 400, true));
                }
            }

            holes = new Array();

            break;
        }
        /////////////////////////////////////// LEVEL 3
        case (2): {

            char1 = new Char(100, height / 2, 0, 1.4 * speedMultUti, 800 * reloadMultUti, tankImage);
            charsAI = [
                new Char(250, 60, 0, 1.2, 1500, tankImageRed),
                new Char(width - 250, height - 60, 0, 1.2, 1500, tankImageRed),
                new Char(width - 100, height / 2, 0, 0, 1500, tankImageGreen)];
            chars = charsAI.slice();
            chars.push(char1);

            walls = new Array();
            for (var i = 0; i < 8; i++) {
                if (i < 2) {
                    walls.push(new Wall(140 + 40 * i, 100, false));
                    walls.push(new Wall(width - 180 - 40 * i, height - 140, false));
                }
                else {
                    walls.push(new Wall(140 + 40 * i, 100, true));
                    walls.push(new Wall(width - 180 - 40 * i, height - 140, true));
                    walls.push(new Wall(460, 20 + i * 40, false));
                    walls.push(new Wall(width - 500, height - 60 - i * 40, false));
                }
            }

            holes = new Array();

            break;
        }
        /////////////////////////////////////// LEVEL 4
        case (3): {

            char1 = new Char(150, height - 100, 0, 1.4 * speedMultUti, 800 * reloadMultUti, tankImage);
            charsAI = [
                new Char(width - 150, 100, 0, 1.2, 3000, tankImageRed),
                new Char(width / 2, height / 2, 0, 1.2, 2800, tankImageRed),
                new Char(width - 150, height / 2, 0, 0, 2500, tankImageGreen),
                new Char(width / 2, 100, 0, 0, 2400, tankImageGreen)];
            chars = charsAI.slice();
            chars.push(char1);

            walls = new Array();

            holes = new Array();
            for (var i = 0; i < (width - 80) / 30; i++) {
                if (i < 7 || i > 12) {
                    holes.push(new Hole(30 + 30 * i, height / 3));
                    holes.push(new Hole(width - 60 - 30 * i, 2 * (height / 3) - 30));
                }
            }
            for (var i = 0; i < (height - 80) / 30; i++) {
                if (i < 3 || i > 8) {
                    holes.push(new Hole(width / 3, height - 60 - 30 * i));
                    holes.push(new Hole(2 * (width / 3) - 30, 30 + 30 * i));
                }
            }

            break;
        }
        /////////////////////////////////////// LEVEL 5
        case (4): {

            char1 = new Char(150, height - 150, 0, 1.4 * speedMultUti, 800 * reloadMultUti, tankImage);
            charsAI = [
                new Char(300, 200, 0, 2, 1500, tankImageBlue),
                new Char(width - 150, 100, 0, 2, 1500, tankImageBlue),
                new Char(width - 150, height - 100, 0, 2, 1500, tankImageBlue)];
            chars = charsAI.slice();
            chars.push(char1);

            walls = new Array();
            for (var i = 1; i < 5; i++) {
                for (var j = 1; j < 5; j++){
                    walls.push(new Wall(i * (width / 5), 60 + (j * 40) + 240 * ((i+1) % 2)));
                    if(i==1) walls.push(new Wall(i * (width / 5) + j * 40, 100 + 240 * (i % 2)));
                    if(i==3) walls.push(new Wall(i * (width / 5) + j * 40, 220 + 240 * (i % 2)));
                    if(i==2) walls.push(new Wall(i * (width / 5) - j * 40, 100 + 240 * (i % 2)));
                    if(i==4) walls.push(new Wall(i * (width / 5) - j * 40, 220 + 240 * (i % 2)));
                }
            }

            holes = new Array();

            break;
        }
        /////////////////////////////////////// LAST LEVEL WON
        default: {
            playing = 2;
            pausebackgroundMusic();
            applauseSound.play();
        }
    }

    //BULLETS AND MINES INIT
    bullets = new Array();
    mines = new Array();

    //TOP, BOTTOM, RIGHT, LEFT WALLS - ALWAYS HERE NO MATTER THE LEVEL
    for (var i = -10; i < width; i += 30) {
        //top wall
        walls.push(new Wall(i, -10, false));
        //bottom wall
        walls.push(new Wall(i, height - 30, false));
    }

    for (var i = -10; i < height; i += 30) {
        //left wall
        walls.push(new Wall(-10, i, false));
        //right wall
        walls.push(new Wall(width - 30, i, false));
    }
}

//BACKGROUND MUSIC

function playBackgroundMusic() {
    let audioPlayer = document.querySelector("#audioPlayer");
    audioPlayer.loop = true;
    audioPlayer.play();
}

function pausebackgroundMusic() {
    let audioPlayer = document.querySelector("#audioPlayer");
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
}

//ANIMATION

function anime() {

    //MENU
    if (playing == 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "50px Arial";
        if (level >= 0) ctx.fillText('You reached level : ' + Math.min((level + 1), 5), 250, 200);
        ctx.fillText('Click the MOUSE or SPACE to start', 100, 350);
        if (inputStates.mouseclick || inputStates.SPACE) {
            level = 0;
            playBackgroundMusic();
            startgame(level);
            inputStates.mouseclick = false;
            inputStates.SPACE = false;
        }
    }

    //CONGRATULATIONS
    if (playing == 2) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "50px Arial";
        ctx.fillText('You have beaten level : ' + level, 240, 100);
        ctx.fillText('Congratulations, you defeated the game!', 70, 200);
        ctx.fillText('Press SPACE', 340, 400);
        ctx.fillText('to go back to main menu', 250, 500);
        if (inputStates.SPACE) {
            playing = 0;
            inputStates.SPACE = false;
        }
    }

    //IN GAME
    if (playing == 1) {
        // 1) On efface l'ecran
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //Image de fond
        ctx.drawImage(backgroundTexture, 0, 0, canvas.width, canvas.height);

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

        //DEPLACEMENTS DU CHAR
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

        //VERIFICATION TOUS CHARS ENNEMIS ELIMINES
        if (charsAI.length == 0) {
            level += 1;
            startgame(level);
        }

        ctx.font = "30px Arial";
        ctx.fillText("level: " + (level+1) + "/5", 10, 30);
    }

    // On demande une nouvelle frame d'animation
    window.requestAnimationFrame(anime);

}

var inputVitMult = document.getElementById("mutlvit")
inputVitMult.oninput = function() {changeVitesseChar(inputVitMult.value)};

function changeVitesseChar(value) {
    speedMultUti = value;
}

var inputReloadMult = document.getElementById("multReload")
inputReloadMult.oninput = function() {changeCadenceTir(inputReloadMult.value)};

function changeCadenceTir(value) {
    reloadMultUti = value;
}


