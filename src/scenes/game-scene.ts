import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"
import { platform } from "os";
import { EventEmitter } from "events";
import {Arcade} from "../objects/arcade/arcade"
import {Joystick} from "../objects/arcade/input/joystick"
import { Bomb } from "../objects/bomb";
import { BadTrash } from "../objects/badTrash";
import { goldenBanana } from "../objects/goldenBanana";
import { all } from "q";

export class GameScene extends Phaser.Scene {
    private arcade : Arcade
    private joystickListener: EventListener
    joystick: Joystick
    private player : Player
    private platforms: Phaser.GameObjects.Group
    private badItems: Phaser.GameObjects.Group
    private chargeItems: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    dropInterval
    hasDestroyed = false

    constructor() {
        super({ key: "GameScene" })
        // create arcade cabinet with 2 joysticks (with 6 buttons)
        this.arcade = new Arcade(this)
        
        // The game must wait for de joysticks to connect
        this.joystickListener = (e: Event) => this.initJoystick(e as CustomEvent)
        document.addEventListener("joystickcreated",  this.joystickListener)
        
    }
    
    private initJoystick(e:CustomEvent) {

        let joystick = this.arcade.Joysticks[e.detail]
       
        document.addEventListener(joystick.ButtonEvents[0], () => this.player.jump())
        document.addEventListener(joystick.ButtonEvents[1], () => this.player.chargeJump())
        // alternatively you can handle single buttons
        // Handle button 0 (this is the first button, X-Button on a PS4 controller)
        
    }

    init(): void {
        
        this.physics.world.bounds.width  = 1440
        this.physics.world.bounds.height = 5000
    }

    create(): void {
        //this.add.image(0, 0, 'sky').setOrigin(0, 0)      
        
        // 11 STARS
        // this.stars = this.physics.add.group({
        //     key: 'star',
        //     repeat: 11,
        //     setXY: { x: 12, y: 30, stepX: 70 },
        // })

        // TODO add player
        this.player = new Player(this)
        
        
        this.platforms = this.add.group({ runChildUpdate: true })
        this.badItems = this.add.group({runChildUpdate: true})
        this.chargeItems = this.add.group({runChildUpdate: true})
        
        this.platforms.addMultiple([
            //stage 1 floor
            new Platform(this, 0, 4990, 'ground', 1),
            new Platform(this, 150, 4990, 'ground', 1),
            new Platform(this, 300, 4990, 'ground', 1),
            new Platform(this, 450, 4990, 'ground', 1),
            new Platform(this, 600, 4990, 'ground', 1),
            new Platform(this, 750, 4990, 'ground', 1),
            new Platform(this, 900, 4990, 'ground', 1),
            new Platform(this, 1050, 4990, 'ground', 1),
            new Platform(this, 1200, 4990, 'ground', 1),
            new Platform(this, 1350, 4990, 'ground', 1),
            
            //stage 2 floor
            new Platform(this, 0, 4390, 'ground', 1),
            new Platform(this, 150, 4390, 'ground', 1),
            new Platform(this, 300, 4390, 'ground', 1),
            new Platform(this, 450, 4390, 'ground', 1),
            new Platform(this, 600, 4390, 'ground', 1),
            new Platform(this, 750, 4390, 'ground', 1),
            new Platform(this, 900, 4390, 'ground', 1),
            new Platform(this, 1050, 4390, 'ground', 1),
            new Platform(this, 1200, 4390, 'ground', 1),
            new Platform(this, 1350, 4390, 'ground', 1)
        ], true)
        
        //define collisions for bouncing, and overlaps for pickups
        //this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        
        
        this.physics.add.overlap(this.badItems, this.player, this.hurtPlayer, null, this)
        this.physics.add.overlap(this.chargeItems, this.player, this.pickupCharge, null, this)

        this.cameras.main.setSize(1440, 800)
        this.cameras.main.setBounds(0,0,1440,5000)
        
        this.cameras.main.startFollow(this.player)
        this.cameras.main.stopFollow()
        console.log(this.cameras.main.getWorldPoint(0,0))

        this.dropTrash()

        this.dropInterval = setInterval(()=>this.dropTrash(),300)
        
    }

    

    private collectStar(player : Player , star) : void {
        this.stars.remove(star, true, true)
        this.registry.values.score++

        // TO DO check if we have all the stars, then go to the end scene
    
    }

    update(){
        
        if(this.player.charging && this.hasDestroyed == false){
            clearInterval(this.dropInterval)
            
            
            this.badItems.clear()
            this.chargeItems.clear()
            this.hasDestroyed = true
            console.log("remaining items destroyed")
        }
        this.player.update()
        for(let joystick of this.arcade.Joysticks){
            joystick.update()
            // example: read directions as true / false
            if(joystick.Left)  this.player.left()
            if(joystick.Right) this.player.right()
            if(joystick.Up)    this.player.up()
            if(joystick.Down)  this.player.down()
            
        }
    }

    dropTrash(){
        let w = Math.random()*1430
        let drop = Math.random()*100
        if(drop<75){
            this.badItems.add(new BadTrash(this,w,4190))
        }else{
            this.chargeItems.add(new goldenBanana(this,w,4190))
        }
    }
    hurtPlayer(item){
        this.player.health = this.player.health - 1
        this.badItems.remove(item, true, true)
        if(this.player.health<1){
            clearInterval(this.dropInterval)
            clearInterval(this.player.interval)
            console.log("your charge was: " + this.player.charge)
            this.scene.start("StartScene")
            console.log("u deeeeeeaaadd!!")
        }
    }
    pickupCharge(item){
        this.chargeItems.remove(item, true, true)
        this.player.pickUpCharge()

    }
}
