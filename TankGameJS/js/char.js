import { distance, getMousePos, collR, collL, collB, collT, coll } from './utils.js'
import Bullet from './bullet.js';
import Mine from './mine.js';
import { bullets, chars, charsAI, walls, mines, holes, char1, stopgame, tankImage } from './game.js';
import Intelligence from './intelligence.js';

export default class Char {
  constructor(x, y, angle, vitesse, tempsMinEntreTirsEnMillisecondes) {
    this.x = x;
    this.y = y;
    this.sizex = 40;
    this.sizey = 40;
    this.angle = angle;
    this.v = vitesse;
    this.delayMinBetweenBullets = tempsMinEntreTirsEnMillisecondes;
    this.delayMinBetweenMines = 5000;
    this.intelligence = new Intelligence(this);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.translate(-this.sizex / 2, -this.sizey / 2);

    ctx.fillStyle = 'rgb(65,105,225)';
    // corps
    ctx.drawImage(tankImage, 0, 0, this.sizex + 12, this.sizey);
    //ctx.fillRect(0, 0, this.sizex, this.sizey);
    // canon
    /*ctx.fillStyle = 'rgb(70,130,180)';
    ctx.fillRect(-20, 18, 20, 4);*/

    ctx.restore();

  }

  move(speedX, speedY) {
    //deplace le tank
    this.x += speedX * this.v;
    this.y += speedY * this.v;
  }

  //FONCTIONS UTILITAIRES DE VERIFICATION DES COLLISIONS AVEC AUTRES OBJETS DANS LES DIFFERENTES DIRECTIONS

  collObjL(){
    if (walls.every(wall => !collL(this.x - 20, this.y - 20, 40, 40, wall.x, wall.y, wall.sizex, wall.sizey))) {
      if (holes.every(hole => !collL(this.x - 20, this.y - 20, 40, 40, hole.x, hole.y, hole.sizex, hole.sizey))) {
        if (chars.every(char => !collL(this.x - 20, this.y - 20, 40, 40, char.x-20, char.y-20, char.sizex, char.sizey))) {
          return false;
        }
      }
    }
    return true;
  }

  collObjR(){
    if (walls.every(wall => !collR(this.x - 20, this.y - 20, 40, 40, wall.x, wall.y, wall.sizex, wall.sizey))) {
      if (holes.every(hole => !collR(this.x - 20, this.y - 20, 40, 40, hole.x, hole.y, hole.sizex, hole.sizey))) {
        if (chars.every(char => !collR(this.x - 20, this.y - 20, 40, 40, char.x-20, char.y-20, char.sizex, char.sizey))) {
          return false;
        }
      }
    }
    return true;
  }

  collObjT(){
    if (walls.every(wall => !collT(this.x - 20, this.y - 20, 40, 40, wall.x, wall.y, wall.sizex, wall.sizey))) {
      if (holes.every(hole => !collT(this.x - 20, this.y - 20, 40, 40, hole.x, hole.y, hole.sizex, hole.sizey))) {
        if (chars.every(char => !collT(this.x - 20, this.y - 20, 40, 40, char.x-20, char.y-20, char.sizex, char.sizey))) {
          return false;
        }
      }
    }
    return true;
  }

  collObjB(){
    if (walls.every(wall => !collB(this.x - 20, this.y - 20, 40, 40, wall.x, wall.y, wall.sizex, wall.sizey))) {
      if (holes.every(hole => !collB(this.x - 20, this.y - 20, 40, 40, hole.x, hole.y, hole.sizex, hole.sizey))) {
        if (chars.every(char => !collB(this.x - 20, this.y - 20, 40, 40, char.x-20, char.y-20, char.sizex, char.sizey))) {
          return false;
        }
      }
    }
    return true;
  }
  

  //DEPLACEMENT DU CHAR DANS UNE DIRECTION SI IL N'Y A PAS COLLISION

  moveL(coeff) {
    if (!this.collObjL()) {this.move(-coeff, 0);}
  }

  moveR(coeff) {
    if (!this.collObjR()) {this.move(coeff, 0);}
  }

  moveT(coeff) {
    if (!this.collObjT()) {this.move(0, -coeff);}
  }

  moveB(coeff) {
    if (!this.collObjB()) {this.move(0, coeff);}
  }


  updateAngle(mousepos) {
    // 2) On déplace la balle 
    let dx = this.x - mousepos.x;
    let dy = this.y - mousepos.y;
    this.angle = Math.atan2(dy, dx);
  }

  addBullet(time) {
    // si le temps écoulé depuis le dernier tir est > temps max alors on tire
    var tempEcoule = 0;

    if (this.lastBulletTime !== undefined) {
      tempEcoule = time - this.lastBulletTime;
    }

    if ((this.lastBulletTime === undefined) || (tempEcoule > this.delayMinBetweenBullets)) {
      bullets.push(new Bullet(this, 1, 8));
      console.log("char " + this + "fired!");
      // on mémorise le dernier temps.
      this.lastBulletTime = time;
    }
  }

  addMine(time){
    var tempEcouleMine = 0;

    if (this.lastMineTime !== undefined) {
      tempEcouleMine = time - this.lastMineTime;
    }

    if ((this.lastMineTime === undefined) || (tempEcouleMine > this.delayMinBetweenMines)) {
      mines.push(new Mine(this));
      console.log("char " + this + "created a mine!");
      // on mémorise le dernier temps.
      this.lastMineTime = time;
    }

    console.log(tempEcouleMine + " " + time + " " + this.lastMineTime)
  }

  removeChar() {
    console.log("char destroyed");
    let position = chars.indexOf(this);
    chars.splice(position, 1);
    if (this === char1) {
      stopgame();
    }
    else {
      position = charsAI.indexOf(this);
      charsAI.splice(position, 1);
    }
  }
}
