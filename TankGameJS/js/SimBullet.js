import { walls, chars } from './game.js';
import { collR, collL, collB, collT, coll } from './utils.js';

export default class SimBullet {
    constructor(charTireur, live, speed, target) {
        this.angle = charTireur.angle;
        this.x = charTireur.x;
        this.x -= 40 * Math.cos(this.angle);
        this.y = charTireur.y;
        this.y -= 40 * Math.sin(this.angle);
        this.live = live;
        this.speed = speed;
        this.target = target;
        this.collWall = false;
        this.collTarget = false;
        this.simulate();
    }

    simulate() {
        var i = 0;
        while(this.live >= 0 && i < 1000){
            this.move();
            i++;
        }
    }


    move() {

        // FONCTIONS DE COLLISION AVEC LES MURS
        // entraine le rebond de la balle et la perte d'une de ses vies

        walls.forEach(wall => {

            let collisionHappened = 0;

            //si un collision à gauche
            if (collL(this.x - 5, this.y - 5, 10, 10, wall.x, wall.y, wall.sizex, wall.sizey) && (Math.cos(this.angle) > 0)) {
                collisionHappened = 1;
                this.angle = Math.atan2(Math.sin(this.angle), -Math.cos(this.angle));
            }
            //si un collision à droite
            if (collR(this.x - 5, this.y - 5, 10, 10, wall.x, wall.y, wall.sizex, wall.sizey) && (Math.cos(this.angle) < 0)) {
                collisionHappened = 1;
                this.angle = Math.atan2(Math.sin(this.angle), -Math.cos(this.angle));
            }
            //si un collision en haut
            if (collT(this.x - 5, this.y - 5, 10, 10, wall.x, wall.y, wall.sizex, wall.sizey) && (Math.sin(this.angle) > 0)) {
                collisionHappened = 1;
                this.angle = Math.atan2(-Math.sin(this.angle), Math.cos(this.angle));
            }
            //si un collision en bas
            if (collB(this.x - 5, this.y - 5, 10, 10, wall.x, wall.y, wall.sizex, wall.sizey) && (Math.sin(this.angle) < 0)) {
                collisionHappened = 1;
                this.angle = Math.atan2(-Math.sin(this.angle), Math.cos(this.angle));
            }

            //si une collision a eu lieu, la balle perd une vie et on enregistre la collision
            if (collisionHappened == 1) {
                this.live--;
                this.collWall = true;
            }
        })

        //FONCTONS DE COLLISIONS AVEC UN CHAR

        chars.forEach(char => {

            if (coll(this.x - 5, this.y - 5, 10, 10, char.x - 20, char.y - 20, 40, 40)) {
                this.live = -1;
                if(char === this.target){
                    this.collTarget = true;
                }
            }
        }
        );


        // LA BALLE AVANCE DE SE VITESSE DANS SA DIRECTION DONNEE PAR L'ANGLE
        this.x -= this.speed * Math.cos(this.angle);
        this.y -= this.speed * Math.sin(this.angle);
    }
}