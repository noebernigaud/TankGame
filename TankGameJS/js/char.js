import { distance, getMousePos, collR, collL, collB, collT, coll } from './utils.js'
import Bullet from './bullet.js';
import { bullets, chars, charsAI, walls, holes, char1, stopgame } from './game.js';
import Intelligence from './intelligence.js';

export default class Char {
  constructor(x, y, angle, vitesse, tempsMinEntreTirsEnMillisecondes) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.v = vitesse;
    this.delayMinBetweenBullets = tempsMinEntreTirsEnMillisecondes;
    this.intelligence = new Intelligence(this);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.translate(-20, -20);

    ctx.fillStyle = 'rgb(65,105,225)';
    // corps
    ctx.fillRect(0, 0, 40, 40);
    // canon
    ctx.fillStyle = 'rgb(70,130,180)';
    ctx.fillRect(-20, 18, 20, 4);

    ctx.restore();

  }

  move(speedX, speedY) {
    //deplace le tank
    this.x += speedX * this.v;
    this.y += speedY * this.v;
  }

  //VERIFICATIONS QU'IL EST POSSIBLE D'ALLEZ DANS LA DIRECTION DEMANDEE

  moveL(coeff) {
    if (walls.every(wall => !collL(char1.x - 20, char1.y - 20, 40, 40, wall.x, wall.y, wall.sizex, wall.sizey))) {
      if (holes.every(hole => !collL(char1.x - 20, char1.y - 20, 40, 40, hole.x, hole.y, hole.sizex, hole.sizey))) {
        char1.move(-coeff, 0);
      }
    }
  }

  moveR(coeff) {
    if (walls.every(wall => !collR(char1.x - 20, char1.y - 20, 40, 40, wall.x, wall.y, wall.sizex, wall.sizey))) {
      if (holes.every(hole => !collR(char1.x - 20, char1.y - 20, 40, 40, hole.x, hole.y, hole.sizex, hole.sizey))) {
        char1.move(coeff, 0);
      }
    }
  }

  moveT(coeff) {
    if (walls.every(wall => !collT(char1.x - 20, char1.y - 20, 40, 40, wall.x, wall.y, wall.sizex, wall.sizey))) {
      if (holes.every(hole => !collT(char1.x - 20, char1.y - 20, 40, 40, hole.x, hole.y, hole.sizex, hole.sizey))) {
        char1.move(0, -coeff);
      }
    }
  }

  moveB(coeff) {
    if (walls.every(wall => !collB(char1.x - 20, char1.y - 20, 40, 40, wall.x, wall.y, wall.sizex, wall.sizey))) {
      if (holes.every(hole => !collB(char1.x - 20, char1.y - 20, 40, 40, hole.x, hole.y, hole.sizex, hole.sizey))) {
        char1.move(0, coeff);
      }
    }
  }

  //TODO all directions!

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
      //console.log("temps écoulé = " + tempEcoule);
    }

    if ((this.lastBulletTime === undefined) || (tempEcoule > this.delayMinBetweenBullets)) {
      bullets.push(new Bullet(this, 1, 8));
      console.log("char " + this + "fired!");
      // on mémorise le dernier temps.
      this.lastBulletTime = time;
    }
  }

  removeChar() {
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
