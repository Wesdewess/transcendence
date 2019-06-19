import { Player } from "../objects/player";
import { Platform } from "../objects/platform";
import { Arcade } from "../objects/arcade/arcade";
import { BadTrash } from "../objects/badTrash";
import { goldenBanana } from "../objects/goldenBanana";
import { bouncingTrash } from "../objects/bouncingTrash";
export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
        this.levels = [4990, 4420, 3780, 3120];
        this.currentLevel = 0;
        this.currentHeight = this.levels[0];
        this.hasDestroyed = false;
        // create arcade cabinet with 2 joysticks (with 6 buttons)
        this.arcade = new Arcade(this);
        // The game must wait for de joysticks to connect
        this.joystickListener = (e) => this.initJoystick(e);
        document.addEventListener("joystickcreated", this.joystickListener);
    }
    initJoystick(e) {
        let joystick = this.arcade.Joysticks[e.detail];
        document.addEventListener(joystick.ButtonEvents[0], () => this.player.jump());
        document.addEventListener(joystick.ButtonEvents[1], () => this.player.chargeJump());
        // alternatively you can handle single buttons
        // Handle button 0 (this is the first button, X-Button on a PS4 controller)
    }
    init() {
        this.physics.world.bounds.width = 1440;
        this.physics.world.bounds.height = 5000;
    }
    create() {
        this.platforms = this.add.group({ runChildUpdate: true });
        this.badItems = this.add.group({ runChildUpdate: true });
        this.chargeItems = this.add.group({ runChildUpdate: true });
        this.bounceItems = this.add.group({ runChildUpdate: true });
        this.platforms.addMultiple([
            //stage 4 floor
            new Platform(this, 0, this.levels[3], 'ground', 1),
            new Platform(this, 150, this.levels[3], 'ground', 1),
            new Platform(this, 300, this.levels[3], 'ground', 1),
            new Platform(this, 450, this.levels[3], 'ground', 1),
            new Platform(this, 600, this.levels[3], 'ground', 1),
            new Platform(this, 750, this.levels[3], 'ground', 1),
            new Platform(this, 900, this.levels[3], 'ground', 1),
            new Platform(this, 1050, this.levels[3], 'ground', 1),
            new Platform(this, 1200, this.levels[3], 'ground', 1),
            new Platform(this, 1350, this.levels[3], 'ground', 1),
            //stage 3 floor
            new Platform(this, 0, this.levels[2], 'ground', 1),
            new Platform(this, 150, this.levels[2], 'ground', 1),
            new Platform(this, 300, this.levels[2], 'ground', 1),
            new Platform(this, 450, this.levels[2], 'ground', 1),
            new Platform(this, 600, this.levels[2], 'ground', 1),
            new Platform(this, 750, this.levels[2], 'ground', 1),
            new Platform(this, 900, this.levels[2], 'ground', 1),
            new Platform(this, 1050, this.levels[2], 'ground', 1),
            new Platform(this, 1200, this.levels[2], 'ground', 1),
            new Platform(this, 1350, this.levels[2], 'ground', 1),
            //stage 2 floor
            new Platform(this, 0, this.levels[1], 'ground', 1),
            new Platform(this, 150, this.levels[1], 'ground', 1),
            new Platform(this, 300, this.levels[1], 'ground', 1),
            new Platform(this, 450, this.levels[1], 'ground', 1),
            new Platform(this, 600, this.levels[1], 'ground', 1),
            new Platform(this, 750, this.levels[1], 'ground', 1),
            new Platform(this, 900, this.levels[1], 'ground', 1),
            new Platform(this, 1050, this.levels[1], 'ground', 1),
            new Platform(this, 1200, this.levels[1], 'ground', 1),
            new Platform(this, 1350, this.levels[1], 'ground', 1)
        ], true);
        this.add.image(0, 2000, 'sky').setOrigin(0, 0);
        this.player = new Player(this, 4800);
        this.player.setScale(1.5);
        this.platforms.addMultiple([
            //stage 1 floor
            new Platform(this, 0, this.levels[0], 'ground', 1),
            new Platform(this, 150, this.levels[0], 'ground', 1),
            new Platform(this, 300, this.levels[0], 'ground', 1),
            new Platform(this, 450, this.levels[0], 'ground', 1),
            new Platform(this, 600, this.levels[0], 'ground', 1),
            new Platform(this, 750, this.levels[0], 'ground', 1),
            new Platform(this, 900, this.levels[0], 'ground', 1),
            new Platform(this, 1050, this.levels[0], 'ground', 1),
            new Platform(this, 1200, this.levels[0], 'ground', 1),
            new Platform(this, 1350, this.levels[0], 'ground', 1),
        ], true);
        //define collisions for bouncing, and overlaps for pickups
        //this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.bounceItems, this.platforms);
        this.physics.add.overlap(this.badItems, this.player, this.hurtPlayer, null, this);
        this.physics.add.overlap(this.bounceItems, this.player, this.hurtPlayer, null, this);
        this.physics.add.overlap(this.chargeItems, this.player, this.pickupCharge, null, this);
        this.cameras.main.setSize(1440, 800);
        this.cameras.main.setBounds(0, 0, 1440, 5000);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.stopFollow();
        console.log(this.cameras.main.getWorldPoint(0, 0));
        this.countdown();
        this.updateScore();
        this.updateHealth();
    }
    countdown() {
        let text = this.add.text(700, 4700, 'Get ready!', { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16);
        setTimeout(() => {
            text.destroy();
            text = this.add.text(700, 4700, '3', { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16);
        }, 1000);
        setTimeout(() => {
            text.destroy();
            text = this.add.text(700, 4700, '2', { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16);
        }, 2000);
        setTimeout(() => {
            text.destroy();
            text = this.add.text(700, 4700, '1', { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16);
        }, 3000);
        setTimeout(() => {
            text.destroy();
            this.dropInterval = setInterval(() => this.dropTrash(), 1000);
        }, 4000);
    }
    collectStar(player, star) {
        this.stars.remove(star, true, true);
        this.registry.values.score++;
        // TO DO check if we have all the stars, then go to the end scene
    }
    update() {
        if (this.player.charging && this.hasDestroyed == false) {
            clearInterval(this.dropInterval);
            this.badItems.clear();
            this.chargeItems.clear();
            this.bounceItems.clear();
            this.hasDestroyed = true;
            console.log("remaining items destroyed");
            this.currentLevel++;
            this.currentHeight = this.levels[this.currentLevel];
            this.updateHealth();
            this.updateScore();
            this.dropInterval = setInterval(() => { this.checkForJump(); }, 100);
        }
        this.player.update();
        for (let joystick of this.arcade.Joysticks) {
            joystick.update();
            // example: read directions as true / false
            if (joystick.Left)
                this.player.left();
            if (joystick.Right)
                this.player.right();
            if (joystick.Up)
                this.player.up();
            if (joystick.Down)
                this.player.down();
        }
        if (this.player.y < this.levels[this.levels.length - 1]) {
            clearInterval(this.player.interval);
            clearInterval(this.dropInterval);
            //this.scene.stop("GameScene")
            console.log("1");
            this.scene.start("BossScene");
            console.log("2");
        }
    }
    checkForJump() {
        if (this.player.y < this.currentHeight) {
            clearInterval(this.dropInterval);
            this.dropInterval = setInterval(() => this.dropTrash(), 1000);
            this.hasDestroyed = false;
        }
    }
    updateScore() {
        try {
            this.scoreText.destroy();
        }
        catch (e) {
        }
        this.scoreText = this.add.text(1300, this.currentHeight - 640, '' + this.player.charge + '/' + this.player.maxCharge, { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16);
    }
    updateHealth() {
        try {
            this.healthText.destroy();
        }
        catch (e) {
        }
        this.healthText = this.add.text(150, this.currentHeight - 640, '' + this.player.health, { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16);
    }
    dropTrash() {
        let w = Math.random() * 1430;
        let drop = Math.random() * 100;
        if (drop < 65) {
            if (Math.random() < 0.5) {
                this.badItems.add(new BadTrash(this, w, this.currentHeight - 800));
            }
            else {
                this.bounceItems.add(new bouncingTrash(this, Math.random() < 0.5 ? -50 : 1500, Math.random() * (this.currentHeight - 90 - this.currentHeight - 300) + this.currentHeight - 300));
            }
        }
        else {
            this.chargeItems.add(new goldenBanana(this, w, this.currentHeight - 890));
        }
    }
    hurtPlayer(item) {
        this.cameras.main.flash(300, 255, 0, 0);
        this.player.health--;
        this.badItems.remove(item, true, true);
        this.bounceItems.remove(item, true, true);
        this.updateHealth();
        if (this.player.health < 1) {
            clearInterval(this.dropInterval);
            clearInterval(this.player.interval);
            console.log("your charge was: " + this.player.charge);
            location.reload();
            //this.scene.start("StartScene")
            console.log("u deeeeeeaaadd!!");
        }
    }
    pickupCharge(item) {
        this.chargeItems.remove(item, true, true);
        this.player.pickUpCharge();
        this.updateScore();
        var particles = this.add.particles('star');
        var emitter = particles.createEmitter({
            x: item.x,
            y: item.y,
            speed: 500,
            scale: { start: 0.5, end: 1 },
        });
        setTimeout(() => {
            particles.destroy();
        }, 1000);
    }
}
