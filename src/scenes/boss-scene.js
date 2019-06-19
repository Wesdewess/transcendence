import { Player } from "../objects/player";
export class BossScene extends Phaser.Scene {
    constructor() {
        super({ key: "BossScene" });
        console.log("loading boss scene");
        this.player = new Player(this, 400, 100);
    }
    init() {
        this.physics.world.bounds.width = 1440;
        this.physics.world.bounds.height = 800;
    }
    preload() {
    }
    create() {
        // change this to a nice game over image
        this.add.image(0, 0, 'sky').setOrigin(0, 0);
        this.cameras.main.setSize(1440, 800);
        this.cameras.main.setBounds(0, 0, 1440, 800);
        this.cameras.main.startFollow(this.player);
    }
}
