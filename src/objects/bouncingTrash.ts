import { Platform } from "./platform"
import { platform } from "os";
export class bouncingTrash extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x,y,z = 0) {
        super(scene, x, y, "badTrash3")
        
        let i = Math.random()*3
        if(i<1){
            this.setTexture("badTrash1")
        }
        if(i>=1 && i<2){
            this.setTexture("badTrash2")
        }
        if(i>=2){
            this.setTexture("badTrash3")
        }

        this.scene.physics.add.existing(this)
        this.setScale(1.4)
        this.setBounce(0.8)
        this.setCollideWorldBounds(false)
        this.scene.add.existing(this)
        this.setGravityY(-2600)
        if(z==0){
            if(x<750){
                this.setGravityX(150)
            }else{
                this.setGravityX(-150)
            }
        }else{
            this.setVelocityY(-600)
        }
        if(z==1){
            this.setVelocityX(200)
        }
        if(z==2){
            this.setVelocityX(-200)
        }
        console.log("placed bouncing trash")
        
    }
}
