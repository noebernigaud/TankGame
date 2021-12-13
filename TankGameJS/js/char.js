import { distance } from './utils.js'
import Bullet from './bullet.js';
import { bullets } from './game.js';

export default class Char {
    constructor(x, y, angle, vitesse, tempsMinEntreTirsEnMillisecondes) {
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.v = vitesse;
      //this.bullets = [];
      // cadenceTir en millisecondes = temps min entre tirs
      this.delayMinBetweenBullets = tempsMinEntreTirsEnMillisecondes;
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
      
      //this.drawBullets(ctx);
  
    }
    
    // width et height pour donner la limite à partir desquelles les balles devront disparaitre
    /*drawBullets(ctx, width, height) {
      for(let i = 0; i < this.bullets.length; i++) {
        let b = this.bullets[i];
        b.draw(ctx);
        b.move();
        //if ((b.x < 0) || (b.y < 0) || (b.x > width) || (b.y > height))
        //      this.removeBullet(b)
        if (b.live < 0){
          this.removeBullet(b);
        }
  
      }
    }*/

    move(speedX, speedY){
      //deplace le tank
      this.x += speedX * this.v;
      this.y += speedY * this.v;
    }
    
    updateAngle(mousepos) {
          // 2) On déplace la balle 
      let dx = this.x - mousepos.x;
      let dy = this.y - mousepos.y;
      this.angle = Math.atan2(dy, dx);
    }
    
     addBullet(time) {
       // si le temps écoulé depuis le dernier tir est > temps max alors on tire
       var tempEcoule=0;
       
       if(this.lastBulletTime !== undefined) {
         tempEcoule = time - this.lastBulletTime;
         //console.log("temps écoulé = " + tempEcoule);
       }
       
       if((this.lastBulletTime === undefined) || (tempEcoule> this.delayMinBetweenBullets)) {
          bullets.push(new Bullet(this, 1, 8));
          // on mémorise le dernier temps.
          this.lastBulletTime = time;
       }
     }
  
     /*removeBullet(bullet) {
          let position = this.bullets.indexOf(bullet);
          this.bullets.splice(position, 1);
      }*/
  }
  