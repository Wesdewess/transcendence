import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"
import { platform } from "os";
import { EventEmitter } from "events";
import {Arcade} from "../objects/arcade/arcade"
import {Joystick} from "../objects/arcade/input/joystick"
import { Bomb } from "../objects/bomb";

export class GameScene extends Phaser.Scene {
    private arcade : Arcade
    private joystickListener: EventListener
    joystick: Joystick
    constructor() {
        super({ key: "GameScene" })
        // create arcade cabinet with 2 joysticks (with 6 buttons)
        this.arcade = new Arcade(this)
        
        // The game must wait for de joysticks to connect
        this.joystickListener = (e: Event) => this.initJoystick(e as CustomEvent)
        document.addEventListener("joystickcreated",  this.joystickListener)
        
    }
    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private badTrash: Phaser.Physics.Arcade.Group

/**
     * 
     * @param gamepadEvent 
     */
    private initJoystick(e:CustomEvent) {

        let joystick = this.arcade.Joysticks[e.detail]
       
        document.addEventListener(joystick.ButtonEvents[0], () => this.player.jump())
        document.addEventListener(joystick.ButtonEvents[1], () => this.player.chargeJump())
        // alternatively you can handle single buttons
        // Handle button 0 (this is the first button, X-Button on a PS4 controller)
        
    }

    init(): void {
        this.registry.set("score", 0)
        this.physics.world.bounds.width  = 1600
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
        this.platforms.addMultiple([
            new Platform(this, 0, 4990, 'platform', 1),
            new Platform(this, 150, 4990, 'platform', 1),
            new Platform(this, 300, 4990, 'platform', 1),
            new Platform(this, 450, 4990, 'platform', 1),
            new Platform(this, 600, 4990, 'platform', 1),
            new Platform(this, 750, 4990, 'platform', 1),
            new Platform(this, 900, 4990, 'platform', 1),
            new Platform(this, 1050, 4990, 'platform', 1),
            new Platform(this, 1200, 4990, 'platform', 1),
            new Platform(this, 1350, 4990, 'platform', 1),
            new Platform(this, 1500, 4990, 'platform', 1)           
        ], true)
        new Bomb(this, 4900, 100)
        //define collisions for bouncing, and overlaps for pickups
        //this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        
        //this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)

        this.cameras.main.setSize(window.innerWidth, window.innerHeight)
        this.cameras.main.setBounds(0,0,1600,5000)
        this.cameras.main.startFollow(this.player)
    }

    private collectStar(player : Player , star) : void {
        this.stars.remove(star, true, true)
        this.registry.values.score++

        // TO DO check if we have all the stars, then go to the end scene
    
    }

    update(){
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

    
}
