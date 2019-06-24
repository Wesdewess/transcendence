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
        this.add.image(0, -500, 'sky').setOrigin(0, 0)

        // add text here
        this.add.text(720, 200, 'Trash Raccoons', { fontFamily: 'Arial Black', fontSize: 130, color: '#89801b' }).setOrigin(0.5).setStroke('#bece12', 10)
        
        //tutorial images
        this.add.text(200, 340, 'Good', { fontFamily: 'Arial Black', fontSize: 60, color: '#0fff2b' }).setOrigin(0.5)
        this.add.image(200, 450, 'goldenBanana').setScale(3)
        this.add.text(200, 640, 'Bad', { fontFamily: 'Arial Black', fontSize: 60, color: '#ff0a37' }).setOrigin(0.5)
        this.add.image(100, 770, 'badTrash1').setScale(3)
        this.add.image(200, 770, 'badTrash2').setScale(3)
        this.add.image(300, 770, 'badTrash3').setScale(3)
        this.add.image(400, 770, 'vuilniszak2').setScale(0.9)

        this.add.text(720, 400, 'Click to start', { fontFamily: 'Arial Black', fontSize: 80, color: '#89801b' }).setOrigin(0.5).setStroke('#bece12', 10)

        // add code here to switch to the GameScene, after a mouse click
        this.input.once('pointerdown', ()=> {this.scene.start("GameScene")})
        
    }
    
}
