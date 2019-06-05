export class BootScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics

    constructor() {
        super({ key: "BootScene" })
    }

    init(){
    }

    preload(): void {
        this.load.image('sky', require('../assets/background.png'))
        this.load.image('star', require('../assets/star.png'))
        this.load.image('bomb', require('../assets/bomb.png'))
        this.load.image('bmo', require('../assets/player.png'))
        this.load.image('ice', require('../assets/platform_ice.png'))
        this.load.image('platform', require('../assets/platform_grass.png'))
        this.load.image('ground', require('../assets/Ground.png'))
        this.load.image('goldenBanana', require('../assets/Golden_banana.png'))
        this.load.image('badTrash1', require('../assets/banana.png'))
        this.load.image('badTrash2', require('../assets/apple.png'))
        this.load.image('badTrash3', require('../assets/Bleach.png'))

        this.load.on('complete', () => {
            console.log("everything is loaded")
            // add code here to switch to the start scene
            
            this.scene.start("StartScene")
        })
    }
}