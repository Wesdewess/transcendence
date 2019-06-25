
export class BootScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics

    constructor() {
        super({ key: "BootScene" })
    }

    init(){
    }

    preload(): void {
        this.load.image('sky', require('../assets/ayaya_clap.png'))
        this.load.image('star', require('../assets/star.png'))
        this.load.image('bomb', require('../assets/bomb.png'))
        this.load.image('bmo', require('../assets/player.png'))
        this.load.image('playerHidden', require('../assets/playerhidden.png'))
        this.load.image('ice', require('../assets/platform_ice.png'))
        this.load.image('platform', require('../assets/platform_grass.png'))
        this.load.image('ground', require('../assets/Ground.png'))
        this.load.image('goldenBanana', require('../assets/Golden_banana.png'))
        this.load.image('greyBanana', require('../assets/grey_banana.png'))
        this.load.image('badTrash1', require('../assets/banana.png'))
        this.load.image('badTrash2', require('../assets/apple.png'))
        this.load.image('badTrash3', require('../assets/Bleach.png'))
        this.load.image('HP', require('../assets/hp.png'))
        this.load.image('HP_empty', require('../assets/hp_leeg.png'))
        this.load.image('vuilniszak2', require('../assets/Vuilniszak2.png'))
        this.load.image('bh0', require('../assets/bh0.png'))
        this.load.image('bh1', require('../assets/bh1.png'))
        this.load.image('bh2', require('../assets/bh2.png'))
        this.load.image('bh3', require('../assets/bh3.png'))
        this.load.image('bh4', require('../assets/bh4.png'))
        this.load.image('boss', require('../assets/Gemene_man.png'))
        this.load.image('heart', require('../assets/Vuilniszak.png'))
        this.load.image('bosslvl', require('../assets/Boss_lvl.png'))
        this.load.image('spark', 'assets/star.png');//particle

        this.load.on('complete', () => {
            console.log("everything is loaded")
            // add code here to switch to the start scene
            
            this.scene.start("StartScene")
        })
    }
}