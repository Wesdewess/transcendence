export class BadTrash extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "badTrash3");
        let i = Math.random() * 2;
        if (i == 0) {
            this.setTexture("badTrash1");
        }
        if (i == 1) {
            this.setTexture("badTrash2");
        }
        if (i == 2) {
            this.setTexture("badTrash3");
        }
        this.scene.physics.add.existing(this);
        this.setScale(1.4);
        this.setBounce(0);
        this.setCollideWorldBounds(false);
        this.scene.add.existing(this);
        this.setGravityY(-2900);
        console.log("placed bad trash");
    }
}
