import { BadTrash } from "../objects/badTrash";
import { goldenBanana } from "../objects/goldenBanana";
import { bouncingTrash } from "../objects/bouncingTrash";


export class Boss extends Phaser.Physics.Arcade.Sprite {
    private interval
    private lastDirectionChange = new Date().getTime()
    private lastThrow = new Date().getTime()
    protected scene
    public health = 3
    constructor(scene, y, x = window.innerWidth/2) {
        super(scene, x, y, "boss")
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.setCollideWorldBounds(true)
        this.setBounce(0.1)
        this.setDragX(6000)
        
        this.interval = setInterval(()=>{
            if(this.body.touching.down){
                this.scene.cameras.main.shake(200)
                clearInterval(this.interval)
                
            }
        },10)
    }

    create(){
        
    }

    update(){

        this.attack()
        this.chooseDirection()
    }

    chooseDirection(){
        let t= new Date().getTime()
        if(this.lastDirectionChange+1000 < t){
            if(Math.random() < 0.5){
                this.left()
            }else{
                this.right()
            }
            if(Math.random() < 0.2){
                this.jump()
            }

            this.lastDirectionChange = t
        }
    }

    left(){
        this.setAcceleration(-200)
    }

    right(){
        this.setAcceleration(200)
    }

    jump(){
        if (this.body.touching.down) {

            var particles = this.scene.add.particles('star');

        var emitter = particles.createEmitter({
            x: this.x,
            y: this.y+70,
            speed: 500,
            
            scale: { start: 0.5, end: 1 },
        });

        setTimeout(() => {
            particles.destroy()
        }, 1000);

        setTimeout(() => {
            let d = new Date().getTime()
            this.setVelocityY(-1300)
            this.interval = setInterval(()=>{
                let t = new Date().getTime()
                if(this.body.touching.down  && t > d+100){
                    this.scene.cameras.main.shake(200)
                    this.groundSmash()
                    clearInterval(this.interval)
                    
                }
            },10)
        }, 1000);
            
            
        }
    }

    attack(){
        let d = new Date().getTime()
        if(this.lastThrow+3000 < d){
            if(Math.random()<0.6){
                this.scene.throwTrash()
            }else{
                this.scene.throwBanana()
            }
            this.lastThrow = d
        }
    }

    groundSmash(){
        this.scene.groundSmash()
    }

    hurt(){
        this.health--
        if(this.health<1){
            this.scene.scene.start("EndScene")
        }
    }

}