export class throwBanana extends Phaser.Physics.Arcade.Sprite {
    private flash = 0
    constructor(scene, x,y,z = 0) {
        super(scene, x, y, "goldenBanana")

        this.scene.physics.add.existing(this)
        this.setScale(2)
        this.setBounce(0.8)
        this.setCollideWorldBounds(true)
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
        console.log("placed Throw Banana")

        setTimeout(()=>{
            let i = setInterval(()=>{
               if(this.flash%2 == 0){
                    this.setVisible(false)
               }else{
                    this.setVisible(true)
               } 
               this.flash++
               if(this.flash==20){
                   clearInterval(i)
               }
            },100)
        },3000)

        setTimeout(()=>{
            this.destroy()
        },5000)
        
    }
}
