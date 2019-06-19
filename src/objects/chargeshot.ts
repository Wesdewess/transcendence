export class ChargeShot extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x,y,z) {
        super(scene, x, y, "goldenBanana")

        this.scene.physics.add.existing(this)
        this.setScale(2)
        this.setBounce(0)
        this.setCollideWorldBounds(false)
        this.scene.add.existing(this)
        this.setGravityY(-2950)
        console.log("placed golden banana")
        
    }
}
