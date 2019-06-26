import { BadTrash } from "../objects/badTrash";
import { goldenBanana } from "../objects/goldenBanana";
import { bouncingTrash } from "../objects/bouncingTrash";


export class Boss extends Phaser.Physics.Arcade.Sprite {
    private interval
    private lastDirectionChange = new Date().getTime()
    private lastThrow = new Date().getTime()
    protected scene
    public maxHealth = 3
    public health = this.maxHealth
    private shakeSide = 1

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

        this.body.setSize(this.width/10*8,this.height/10*8).setOffset(this.width/10*2,this.height/10*2)
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
            let shake = setInterval( ()=>{
                if(this.shakeSide<33){
                    if(this.shakeSide%2 == 0){
                        this.setPosition(this.x+15, this.y)
                        this.shakeSide++
                    }else{
                        this.setPosition(this.x-15, this.y)
                        this.shakeSide++
                    }
                }else{
                    this.shakeSide = 0
                    clearInterval(shake)
                }
            }, 30)
        }

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
        this.scene.updateBossHealth()
        
    }

}