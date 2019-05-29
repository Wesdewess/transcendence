import { callbackify } from "util";

export class StartScene extends Phaser.Scene {

    constructor() {
        super({key: "StartScene"})
    }

    init(): void {
    }

    preload(): void {
        
    }

    create(): void {
        this.add.image(0, 0, 'sky').setOrigin(0, 0)

        // add another image here
        this.add.image(100, 50, 'bomb').setOrigin(0, 0)

        // add text here
        this.add.text(400, 300, 'MY GAME TITLE', { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)

        // add code here to switch to the GameScene, after a mouse click
        this.input.once('pointerdown', ()=> {this.scene.start("GameScene")})
        
    }
    
}

function gofull() {

    if (this.scale.isFullScreen)
    {
        this.scale.stopFullScreen();
    }
    else
    {
        this.scale.startFullScreen(false);
    }

}
