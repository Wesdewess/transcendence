export class BadTrash extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x,y) {
        super(scene, x, y, "badTrash")

        this.scene.physics.add.existing(this)

        this.setBounce(0)
        this.setCollideWorldBounds(false)

        this.setVelocity(Phaser.Math.Between(-200, 200), 30);
        this.setAngularVelocity(30);
    }
}
