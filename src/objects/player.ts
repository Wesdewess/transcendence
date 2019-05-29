
export class Player extends Phaser.Physics.Arcade.Sprite {
    
    private cursors: Phaser.Input.Keyboard.CursorKeys
    charging: boolean
    charge = 0
    maxInterval = 200
    lastChargePress: integer
    gamepad: Gamepad

    constructor(scene) {
        super(scene, window.innerWidth/2, 4800, "bmo")
        this.lastChargePress = new Date().getTime()
        //debug
        this.charging = true

        this.cursors = this.scene.input.keyboard.createCursorKeys()
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.setCollideWorldBounds(true)
        this.setBounce(0.1)
        this.setDragX(6000)
        // this.createParticles()      
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
        
        if (this.cursors.left.isDown) {
            this.left()
        } else if (this.cursors.right.isDown) {
            this.right()
        } 
        // jump when the body is touching the floor 
        if (this.cursors.up.isDown) {
            this.jump()
        }
        
    }

    left(){
        this.setVelocityX(-1000)
        this.flipX = true
        console.log("left")
    }
    right(){
        this.setVelocityX(1000)
        this.flipX = false
        console.log("right")
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
            console.log("jump!")
        }
    }

    chargeJump(){ 
        let d = new Date().getTime()
        if(this.charging == true){
            if(this.lastChargePress + this.maxInterval > d && this.charge<100){
                console.log("charging")
                this.charge = this.charge + 10
            }else{
                this.charge = 10
            }
            this.lastChargePress = d
           if(this.charge==100){
                this.setVelocityY(-2000)
                console.log("WOOOOSHHHH!!!!")
                this.charge = 0
           }
        }
    }
}

