import { Player } from "../objects/player"
import { Boss } from "../objects/boss"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"
import { platform } from "os";
import { EventEmitter } from "events";
import {Arcade} from "../objects/arcade/arcade"
import {Joystick} from "../objects/arcade/input/joystick"
import { Bomb } from "../objects/bomb";
import { BadTrash } from "../objects/badTrash";
import { throwBanana } from "../objects/throwBanana";
import { bouncingTrash } from "../objects/bouncingTrash";
import { all } from "q";

export class BossScene extends Phaser.Scene {
    private arcade : Arcade
    private joystickListener: EventListener
    joystick: Joystick
    private player : Player
    private Boss : Boss
    private platforms: Phaser.GameObjects.Group
    private badItems: Phaser.GameObjects.Group
    private chargeItems: Phaser.GameObjects.Group
    public bounceItems: Phaser.GameObjects.Group
    scoreText
    healthText

    constructor() {
        super({key: "BossScene"})
        console.log("loading boss scene")
        
        
    }

    init(): void {
        this.physics.world.bounds.width  = 1440
        this.physics.world.bounds.height = 800
    }

    preload(): void {
    }

    create(): void {
        this.scoreText = this.add.group();
        this.healthText = this.add.group();
        this.add.image(0, 0, 'bosslvl').setOrigin(0, 0)
        
        this.player = new Player(this,400,100)
        this.player.setScale(1.5)
        this.Boss = new Boss(this, 100,1000)
        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            //stage 1 floor
            new Platform(this, 0, 790, 'ground', 1),
            new Platform(this, 150, 790, 'ground', 1),
            new Platform(this, 300, 790, 'ground', 1),
            new Platform(this, 450, 790, 'ground', 1),
            new Platform(this, 600, 790, 'ground', 1),
            new Platform(this, 750, 790, 'ground', 1),
            new Platform(this, 900, 790, 'ground', 1),
            new Platform(this, 1050, 790, 'ground', 1),
            new Platform(this, 1200, 790, 'ground', 1),
            new Platform(this, 1350, 790, 'ground', 1),
            
        ], true)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.Boss, this.platforms)
        this.chargeItems = this.add.group({runChildUpdate: true})
        this.badItems = this.add.group({runChildUpdate: true})
        this.bounceItems = this.add.group({runChildUpdate: true})
        this.physics.add.collider(this.bounceItems, this.player)
        this.physics.add.collider(this.bounceItems, this.platforms)
        this.physics.add.overlap(this.badItems, this.player, this.hurtPlayer, null, this)
        this.physics.add.overlap(this.bounceItems, this.player, this.hurtPlayer, null, this)
        this.physics.add.overlap(this.chargeItems, this.player, this.pickupCharge, null, this)

        this.cameras.main.setSize(1440, 800)
        this.cameras.main.setBounds(0,0,1440,800)
        this.cameras.main.startFollow(this.player)
        //this.cameras.main.shake(100)

        this.updateHealth()
        this.updateScore()
    }

    update(){
        this.player.update()
        this.Boss.update()
        
    }

    hurtPlayer(item){
        this.cameras.main.flash(300, 255,0,0)
        this.player.health--
        this.badItems.remove(item, true, true)
        this.bounceItems.remove(item, true, true)
        this.updateHealth()
        if(this.player.health<1){
            //clearInterval(this.dropInterval)
            clearInterval(this.player.interval)
            console.log("your charge was: " + this.player.charge)
            location.reload()
            //this.scene.start("StartScene")
            console.log("u deeeeeeaaadd!!")
        }
    }
    pickupCharge(item){
        this.chargeItems.remove(item, true, true)
        this.player.chargeShot()
        this.updateScore()

        var particles = this.add.particles('star');

        var emitter = particles.createEmitter({
            x: item.x,
            y: item.y,
            speed: 500,
            
            scale: { start: 0.5, end: 1 },
        });

        setTimeout(() => {
            particles.destroy()
        }, 1000);
    }

    updateScore(){
        try{
            
            this.scoreText.clear(true)
            
        }catch(e){

        }
        for(let i = 0; i < this.player.maxShotcharge; i+=10){
            this.scoreText.create(1200+i*4, 100,'greyBanana').setScale(2)
        }
        for(let i = 0; i < this.player.shotCharge; i+=10){
            this.scoreText.create(1200+i*4, 100,'goldenBanana').setScale(2)
        }
        
        //this.scoreText = this.add.text(1300, this.currentHeight-640, ''+this.player.charge + '/'+ this.player.maxCharge, { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)
    }
    updateHealth(){
        try{
                
            this.healthText.clear(true)
            
        }catch(e){

        }
        for(let i = 0; i < this.player.maxHealth; i++){
            this.healthText.create(100+i*80, 100,'HP_empty').setScale(0.7)
        }
        for(let i = 0; i < this.player.health; i++){
            this.healthText.create(100+i*80, 100,'HP').setScale(0.7)
        }
    }

    public groundSmash(){
        this.badItems.add(new BadTrash(this, this.Boss.x, this.Boss.y+90, 1))
        this.badItems.add(new BadTrash(this, this.Boss.x, this.Boss.y+90, 2))
        console.log("boem!")
    }

    public throwTrash(){
        let i
        if(Math.random() <0.5){
            i = 1
        }else{
            i = 2
        }
        this.bounceItems.add(new bouncingTrash(this, this.Boss.x, this.Boss.y, i))
    }

    throwBanana(){
        let i
        if(Math.random() <0.5){
            i = 1
        }else{
            i = 2
        }
        this.chargeItems.add(new throwBanana(this, this.Boss.x, this.Boss.y, i))
    }

    playerShoot(){
        this.Boss.hurt()
        this.updateScore()
    }
}

