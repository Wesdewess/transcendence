export class BadTrash extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x,y) {
        super(scene, x, y, "badTrash1")

        this.scene.physics.add.existing(this)
        this.setScale(1.5)
        this.setBounce(0)
        this.setCollideWorldBounds(false)
        this.scene.add.existing(this)
        this.setGravityY(-2900)
        console.log("placed bad trash")
    }
}
