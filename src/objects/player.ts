import { delay } from "q";

export class Player extends Phaser.Physics.Arcade.Sprite {
    
    private cursors: Phaser.Input.Keyboard.CursorKeys
    charging: boolean
    charge = 90
    maxInterval = 200
    lastChargePress: integer
    gamepad: Gamepad
    spacebar
    d: number
    interval
    health=3
    chargeText
    healthText

    constructor(scene) {
        super(scene, window.innerWidth/2, 4800, "bmo")
        this.lastChargePress = new Date().getTime()
        //debug
        this.charging = false

        this.cursors = this.scene.input.keyboard.createCursorKeys()
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.setCollideWorldBounds(true)
        this.setBounce(0.1)
        this.setDragX(6000)
        // this.createParticles()  
        this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);    
        this.scene.registry.set("health", 10)
        this.scene.registry.set("charge", 0)

        setInterval(()=> this.updateHealth(),100)
    }
private createParticles(){
    var particles = this.scene.add.particles('star');

        let emitter = particles.createEmitter({
        
            x: 0,
            y: 0,
            lifespan: 2000,
            speed: { min: 400, max: 600 },
            angle: 0,
            gravityY: -400,
            scale: { start: 2, end: 0 },
            quantity: 10,
            blendMode: 0
            
        });
        emitter.startFollow(this)
}
    public update(): void {

        

        if(this.charge >= 100){
            console.log("charge has reached 100")
            this.chargeText = this.scene.add.text(700, 4700, 'Start charging!', { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)
            this.charging = true
            this.charge = 0
        }
        
        if (this.cursors.left.isDown) {
            this.left()
        } else if (this.cursors.right.isDown) {
            this.right()
        } 
        // jump when the body is touching the floor 
        if (this.cursors.up.isDown) {
            this.jump()
        }
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.chargeJump()
        }
        
    }

    updateHealth(){
        try{
            this.healthText.destroy()
            }catch(e){
    
            }
            this.healthText = this.scene.add.text(150, 4300, ''+this.health, { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)
    }

    left(){
        this.setVelocityX(-1000)
        this.flipX = true
        
    }
    right(){
        this.setVelocityX(1000)
        this.flipX = false
        
    }
    up(){
        console.log("up")
        
    }
    down(){
        console.log("down")
       
    }
    jump(){
        if (this.body.touching.down) {
            this.setVelocityY(-1200)
            
        }
    }

    pickUpCharge(){
        this.charge = this.charge+10
        console.log("picked up a charge, you now have: " + this.charge)
    }

    chargeJump(){ 
        this.d = new Date().getTime()
        if(this.charging == true){
            
            if(this.lastChargePress + this.maxInterval > this.d && this.charge<100){
                console.log("charging")
                this.charge = this.charge + 10
            }else{
                this.charge = 10
            }
            this.lastChargePress = this.d
           if(this.charge==100){
                this.scene.cameras.main.startFollow(this)
                this.scene.cameras.main.setFollowOffset(0,200)
                this.setVelocityY(-2000)
                console.log("WOOOOSHHHH!!!!")
                this.chargeText.destroy()
                this.charging = false
                this.charge = 0
                this.interval = setInterval(()=>{
                    let t = new Date().getTime()
                    if(this.body.touching.down && t > this.d+100){
                        this.scene.cameras.main.stopFollow()
                        clearInterval(this.interval)
                    }
                },10)
                
               
           }
           
        }
    }

   
}

