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
import { BootScene } from "../scenes/boot-scene"

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
    bossHealthText
    emitter
    bootscene
    

    constructor() {
        super({key: "BossScene"})
        console.log("loading boss scene")
        
        
        this.bootscene = new BootScene
        this.bootscene.arcade = new Arcade(this)
        
        // The game must wait for de joysticks to connect
        this.bootscene.joystickListener = (e: Event) => this.initJoystick(e as CustomEvent)
        document.addEventListener("joystickcreated",  this.bootscene.joystickListener)
        
    }
    
    private initJoystick(e:CustomEvent) {

        let joystick = this.bootscene.arcade.Joysticks[e.detail]
       
        document.addEventListener(joystick.ButtonEvents[0], () => this.player.jump())
        document.addEventListener(joystick.ButtonEvents[1], () => this.player.chargeJump())
        // alternatively you can handle single buttons
        // Handle button 0 (this is the first button, X-Button on a PS4 controller)
        
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
        this.bossHealthText = this.add.group();
        this.add.image(0, 0, 'bosslvl').setOrigin(0, 0)
        
        this.player = new Player(this,400,100)
        this.player.setScale(1.5)
        this.player.maxHealth = this.player.health = 5
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
        //this.physics.add.collider(this.bounceItems, this.player)
        //this.physics.add.collider(this.bounceItems, this.platforms)
        this.physics.add.overlap(this.badItems, this.player, this.hurtPlayer, null, this)
        this.physics.add.overlap(this.Boss, this.player, this.hurtPlayer, null, this)
        this.physics.add.overlap(this.bounceItems, this.player, this.hurtPlayer, null, this)
        this.physics.add.overlap(this.chargeItems, this.player, this.pickupCharge, null, this)

        this.cameras.main.setSize(1440, 800)
        this.cameras.main.setBounds(0,0,1440,800)
        this.cameras.main.startFollow(this.player)
        //this.cameras.main.shake(100)

        

        this.updateHealth()
        this.updateScore()
        this.updateBossHealth()
    }

    update(){
        this.player.update()
        this.Boss.update()

        for(let joystick of this.bootscene.arcade.Joysticks){
            joystick.update()
            // example: read directions as true / false
            if(joystick.Left)  this.player.left()
            if(joystick.Right) this.player.right()
            if(joystick.Up)    this.player.up()
            if (joystick.Down) {
                this.player.down()
                this.player.setTexture('playerHidden')
                this.player.body.setSize(67,90).setOffset(0,47)
                
            }else{
                this.player.body.setSize(67,137)//.setOffset(0,0)
                this.player.setTexture('bmo')//.setOffset(0,0).setCrop(0,0,this.width,this.height)
            }
            
        }
        
    }

    hurtPlayer(item){

        if(this.player.lastHurt+3000<new Date().getTime()){
            this.player.lastHurt = new Date().getTime()
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

            
            let i = setInterval(()=>{
                if(this.player.flash%2 == 0){
                    this.player.setVisible(false)
                }else{
                    this.player.setVisible(true)
                } 
                this.player.flash++
                if(this.player.flash==20){
                    this.player.flash=0
                    clearInterval(i)
                }
            },100)
           
        }
    }
    pickupCharge(item){
        this.chargeItems.remove(item, true, true)
        this.player.chargeShot()
        this.updateScore()
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
            if(i == this.player.shotCharge-10){
                var particles = this.add.particles('star');

                var emitter = particles.createEmitter({
                    x: 1200+i*4,
                    y: 100,
                    speed: 500,
                    
                    scale: { start: 0.5, end: 1 },
                });

                setTimeout(() => {
                    particles.destroy()
                }, 1000);
            }
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
            this.healthText.create(100+i*80, 100,'HP_empty').setScale(2.6)
        }
        for(let i = 0; i < this.player.health; i++){
            this.healthText.create(100+i*80, 100,'HP').setScale(2.6)
        }
    }

    updateBossHealth(){
        try{
                
            this.bossHealthText.clear(true)
            
        }catch(e){

        }
        if(this.Boss.health == this.Boss.maxHealth){
            this.bossHealthText.create(720, 100,'bh0')
        }else{
            var particles = this.add.particles('heart');

                var emitter = particles.createEmitter({
                    x: 720,
                    y: 100,
                    speed: 200,
                    maxParticles: 10,
                    
                    scale: { start: 0.5, end: 0.6 },
                });

                setTimeout(() => {
                    particles.destroy()
                }, 1000);
        }
        if(this.Boss.health == this.Boss.maxHealth-1){
            this.bossHealthText.create(720, 100,'bh1')
        }
        if(this.Boss.health == this.Boss.maxHealth-2){
            this.bossHealthText.create(720, 100,'bh2')
        }
        if(this.Boss.health == this.Boss.maxHealth-3){
            this.bossHealthText.create(720, 100,'bh3')
        }
        if(this.Boss.health == this.Boss.maxHealth-4){
            this.bossHealthText.create(720, 100,'bh4')
        }
        
        
    }

    public groundSmash(){
        this.badItems.add(new BadTrash(this, this.Boss.x, this.Boss.y+55, 1))
        this.badItems.add(new BadTrash(this, this.Boss.x, this.Boss.y+55, 2))
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

