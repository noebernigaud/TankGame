import { walls, bullets, chars, bulletImage, bulletBounceSound, bulletDestroyedSound } from './game.js';
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
        ctx.drawImage(bulletImage, 0, 0, 20, 10);
        ctx.restore();

        this.move();

        if (this.live < 0) {
            this.removeBullet(this);
        }
    }


    move(maxX, maxY) {

        // FONCTIONS DE COLLISION AVEC LES MURS
        // entraine le rebond de la balle et la perte d'une de ses vies
        // TODO le mur perd une vie si il est destructible.

        for (let wall of walls) {

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

            //si une collision a eu lieu, la balle perd une vie et le mur se destruit (si il est destructible)
            if (collisionHappened == 1) {
                this.live--;
                if (this.live >= 0) { bulletBounceSound.play(); }
                wall.destroy();
                break;
            }
        }

        //FONCTIONS DE COLLISIONS ENTRE BALLES
        bullets.forEach(bullet => {
            if (coll(this.x - 5, this.y - 5, 10, 10, bullet.x - 5, bullet.y - 5, 10, 10)) {
                bullet.removeBullet();
                this.removeBullet();
            }
        }
        );

        //FONCTONS DE COLLISIONS AVEC UN CHAR
        chars.forEach(char => {
            if (coll(this.x - 5, this.y - 5, 10, 10, char.x - 20, char.y - 20, 40, 40)) {
                char.removeChar();
                this.removeBullet();
            }
        }
        );


        // LA BALLE AVANCE DE SE VITESSE DANS SA DIRECTION DONNEE PAR L'ANGLE
        this.x -= this.speed * Math.cos(this.angle);
        this.y -= this.speed * Math.sin(this.angle);
    }

    removeBullet() {
        bulletDestroyedSound.play();
        let position = bullets.indexOf(this);
        bullets.splice(position, 1);
    }
}
