import { callbackify } from "util";
import { BootScene } from "../scenes/boot-scene"
import {Arcade} from "../objects/arcade/arcade"
import {Joystick} from "../objects/arcade/input/joystick"

export class StartScene extends Phaser.Scene {
    bootscene
    private cursors: Phaser.Input.Keyboard.CursorKeys
    private arcade : Arcade
    private joystickListener: EventListener
    joystick: Joystick

    constructor() {
        super({key: "StartScene"})
        this.cursors = this.scene.input.keyboard.createCursorKeys()
        this.bootscene = new BootScene
        this.bootscene.arcade = new Arcade(this)
        // The game must wait for de joysticks to connect
        this.bootscene.joystickListener = (e: Event) => this.initJoystick(e as CustomEvent)
        document.addEventListener("joystickcreated",  this.bootscene.joystickListener)
        
    }
    
    private initJoystick(e:CustomEvent) {

        let joystick = this.bootscene.arcade.Joysticks[e.detail]
       
        document.addEventListener(joystick.ButtonEvents[0], () => this.scene.start("GameScene"))
        document.addEventListener(joystick.ButtonEvents[1], () => this.scene.start("GameScene"))
        document.addEventListener(joystick.ButtonEvents[2], () => this.scene.start("GameScene"))
        document.addEventListener(joystick.ButtonEvents[3], () => this.scene.start("GameScene"))
        document.addEventListener(joystick.ButtonEvents[4], () => this.scene.start("GameScene"))
        document.addEventListener(joystick.ButtonEvents[5], () => this.scene.start("GameScene"))
        // alternatively you can handle single buttons
        // Handle button 0 (this is the first button, X-Button on a PS4 controller)
        
    }

    init(): void {
    }

    preload(): void {
        
    }

    create(): void {
        this.add.image(0, -500, 'sky').setOrigin(0, 0)

        // add text here
        this.add.text(720, 200, 'Trash Raccoons', { fontFamily: 'Arial Black', fontSize: 130, color: '#89801b' }).setOrigin(0.5).setStroke('#bece12', 10)
        
        //tutorial images
        this.add.text(200, 340, 'Good', { fontFamily: 'Arial Black', fontSize: 60, color: '#0fff2b' }).setOrigin(0.5)
        this.add.image(200, 450, 'goldenBanana').setScale(3)
        this.add.text(200, 640, 'Bad', { fontFamily: 'Arial Black', fontSize: 60, color: '#ff0a37' }).setOrigin(0.5)
        this.add.image(100, 770, 'badTrash1').setScale(3)
        this.add.image(200, 770, 'badTrash2').setScale(3)
        this.add.image(300, 770, 'badTrash3').setScale(3)
        this.add.image(400, 770, 'vuilniszak2').setScale(0.9)

        this.add.text(720, 400, 'Click to start', { fontFamily: 'Arial Black', fontSize: 80, color: '#89801b' }).setOrigin(0.5).setStroke('#bece12', 10)

        // add code here to switch to the GameScene, after a mouse click
        this.input.once('pointerdown', ()=> {this.scene.start("GameScene")})
        let interval = setInterval(()=>{
            if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))) {
                clearInterval(interval)
                this.scene.start("GameScene")
            }
        },20)
        
    }

    update(){
        
}
    
}
