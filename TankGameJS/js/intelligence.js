import SimBullet from './SimBullet.js';

export default class Intelligence {
    constructor(charAI) {
        this.char = charAI;
        this.delayUpdateDirection = 3000;
        this.direction = 0;
        this.char.lastBulletTime = Date.now();
    }

    applyStrategy(char1) {
        this.updateAngle(char1);
        if(this.simulatedBullet.collTarget === true) {this.char.addBullet(Date.now());}
        this.updateDirection(Date.now());
        switch(this.direction){
            case 0: {
                this.char.moveL(1);
                break;
            }
            case 1 :{
                this.char.moveT(1);
                break
            }
            case 2: {
                this.char.moveR(1);
                break;
            }
            case 3 :{
                this.char.moveB(1);
                break
            }
            case 4: {
                this.char.moveT(0.7);
                this.char.moveL(0.7);
                break;
            }
            case 5 :{
                this.char.moveT(0.7);
                this.char.moveR(0.7);
                break
            }
            case 6: {
                this.char.moveB(0.7);
                this.char.moveR(0.7);
                break;
            }
            case 7 :{
                this.char.moveB(0.7);
                this.char.moveL(0.7);
                break
            }
        }
    }

    updateAngle(char1){
        //le char vise droit vers sa cible
        let dx = this.char.x - char1.x;
        let dy = this.char.y - char1.y;
        this.char.angle = Math.atan2(dy, dx);

        //vérifie qu'il n'y a pas de murs entre lui et sa cible, le cas echeant cherche un autre angle permettant de toucher sa cible
        this.simulatedBullet = new SimBullet(this.char, 1, 5, char1);
        if(this.simulatedBullet.collTarget === false){
            let foundAngle = 0;
            for(var i = -3.15; i<3.16; i += 0.60){
                this.char.angle = i;
                this.simulatedBullet = new SimBullet(this.char, 1, 5, char1);
                if(this.simulatedBullet.collTarget === true){
                    foundAngle = 1;
                    break;
                }
            }
            if (foundAngle == 0){ this.char.angle = Math.atan2(dy, dx); }
        }
    }

    updateDirection(time) {
        var tempEcoule = 0;

        if (this.lastUpdateDirection !== undefined) {
            tempEcoule = time - this.lastUpdateDirection;
        }

        if ((this.lastUpdateDirection === undefined) || (tempEcoule > this.delayUpdateDirection)) {
            // on mémorise le dernier temps.
            this.lastUpdateDirection = time;
            this.direction = Math.round(Math.random()*7);
            this.delayUpdateDirection = Math.round(Math.random()*3000) + 1000;
        }

        if((this.direction == 0 || this.direction == 4 || this.direction == 7)  && this.char.collObjL()){
            this.direction = Math.round(Math.random()*7);
        }

        if((this.direction == 1 || this.direction == 4 || this.direction == 5) && this.char.collObjT()){
            this.direction = Math.round(Math.random()*7);
        }

        if((this.direction == 2 || this.direction == 5 || this.direction == 6) && this.char.collObjR()){
            this.direction = Math.round(Math.random()*7);
        }

        if((this.direction == 3 || this.direction == 6 || this.direction == 7) && this.char.collObjB()){
            this.direction = Math.round(Math.random()*7);
        }
    }
}