export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: "BootScene" });
    }
    init() {
    }
    preload() {
        this.load.image('sky', require('../assets/ayaya_clap.png'));
        this.load.image('star', require('../assets/star.png'));
        this.load.image('bomb', require('../assets/bomb.png'));
        this.load.image('bmo', require('../assets/player.png'));
        this.load.image('ice', require('../assets/platform_ice.png'));
        this.load.image('platform', require('../assets/platform_grass.png'));
        this.load.image('ground', require('../assets/Ground.png'));
        this.load.image('goldenBanana', require('../assets/Golden_banana.png'));
        this.load.image('badTrash1', require('../assets/banana.png'));
        this.load.image('badTrash2', require('../assets/apple.png'));
        this.load.image('badTrash3', require('../assets/Bleach.png'));
        this.load.image('spark', 'assets/star.png'); //particle
        this.load.on('complete', () => {
            console.log("everything is loaded");
            // add code here to switch to the start scene
            this.scene.start("BossScene");
        });
    }
}
