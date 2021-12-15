import Wall from './wall.js';
import { walls, bullets, chars } from './game.js';
import { collR, collL, collB, collT, coll } from './utils.js';

export default class Bullet {
    constructor(char, live, speed) {
        this.angle = char.angle;
        this.x = char.x;
        this.x -= 40 * Math.cos(this.angle);
        this.y = char.y;
        this.y -= 40 * Math.sin(this.angle);
        this.live = live;
        this.speed = speed;
    }

    draw(ctx) {

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillRect(0, 0, 10, 5);
        ctx.restore();

        this.move();

        if (this.live < 0){
            this.removeBullet(this);
          }
    }

  
    move(maxX, maxY) {

        // FONCTIONS DE COLLISION AVEC LES MURS
        // entraine le rebond de la balle et la perte d'une de ses vies
        // TODO le mur perd une vie si il est destructible.

        //si un collision à gauche
        if (walls.some(wall => collL(this.x - 5, this.y - 5, 10, 10, wall.x, wall.y, wall.sizex, wall.sizey)) && (Math.cos(this.angle) > 0)) {
            this.live--;
            this.angle = Math.atan2(Math.sin(this.angle), -Math.cos(this.angle));
            console.log("nouvel angle apres collision gauche " + this.angle + ", position " + this.x + " " + this.y);
        }
        //si un collision à droite
        if(walls.some(wall => collR(this.x - 5, this.y - 5, 10, 10, wall.x, wall.y, wall.sizex, wall.sizey)) && (Math.cos(this.angle) < 0)){
            this.live--;
            this.angle = Math.atan2(Math.sin(this.angle), -Math.cos(this.angle));
            console.log("nouvel angle apres collision droite " + this.angle + ", position " + this.x + " " + this.y);
        }
        //si un collision en haut
        if (walls.some(wall => collT(this.x - 5, this.y - 5, 10, 10, wall.x, wall.y, wall.sizex, wall.sizey)) && (Math.sin(this.angle) > 0)) {
            this.live--;
            this.angle = Math.atan2(-Math.sin(this.angle), Math.cos(this.angle));
            console.log("nouvel angle apres collision haut " + this.angle + ", position " + this.x + " " + this.y);
        }
        //si un collision en bas
        if (walls.some(wall => collB(this.x - 5, this.y - 5, 10, 10, wall.x, wall.y, wall.sizex, wall.sizey)) && (Math.sin(this.angle) < 0)) {
            this.live--;
            this.angle = Math.atan2(-Math.sin(this.angle), Math.cos(this.angle));
            console.log("nouvel angle apres collision bas " + this.angle + ", position " + this.x + " " + this.y);
        }

        //FONCTIONS DE COLLISIONS ENTRE BALLES
        bullets.forEach( bullet => {
            if (coll(this.x - 5, this.y - 5, 10, 10, bullet.x - 5, bullet.y - 5, 10, 10)){
                bullet.removeBullet();
                this.removeBullet();
            }}
        );

        //FONCTONS DE COLLISIONS AVEC UN CHAR
        chars.forEach( char => {
            if (coll(this.x - 5, this.y - 5, 10, 10, char.x - 20, char.y - 20, 40, 40)){
                char.removeChar();
                this.removeBullet();
            }}
        );
        

        // LA BALLE AVANCE DE SE VITESSE DANS SA DIRECTION DONNEE PAR L'ANGLE
        this.x -= this.speed * Math.cos(this.angle);
        this.y -= this.speed * Math.sin(this.angle);
    }

    removeBullet() {
        let position = bullets.indexOf(this);
        bullets.splice(position, 1);
    }
}
