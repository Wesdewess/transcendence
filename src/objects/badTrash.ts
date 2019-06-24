export class BadTrash extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x,y,beep=0) {
        super(scene, x, y, "badTrash3")
        let b = beep
        let i = Math.random()*4
        if(i<=1){
            this.setTexture("badTrash1")
        }
        if(i>1 && i < 2){
            this.setTexture("badTrash2")
        }
        if(i >= 2 && i < 3){
            this.setTexture("badTrash3")
        }
        if(i >= 3){
            this.setTexture("badTrash3")
        }

        this.scene.physics.add.existing(this)
        this.setScale(1.4)
        this.setBounce(0)
        this.setCollideWorldBounds(false)
        this.scene.add.existing(this)
        if(b==0){
            this.setGravityY(-2900)
        }else{
            this.setGravityY(-3000)
        }
        console.log(beep + " ")
        if(beep==1){
            this.setVelocityX(-600)
            //console.log("1")
        }
        if(beep==2){
            this.setVelocityX(600)
            //console.log("2")
        }
        console.log("placed bad trash")
    }
}
