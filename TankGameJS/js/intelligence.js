export default class Intelligence {
    constructor(charAI) {
        this.char = charAI;
    }

    applyStrategy(char1, walls){
        //this.char.addBullet(Date.now());
        this.char.moveL(1);
    }
}