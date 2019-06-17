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
import { bouncingTrash } from "../objects/bouncingTrash";
import { all } from "q";

export class BossScene extends Phaser.Scene {
    private arcade : Arcade
    private joystickListener: EventListener
    joystick: Joystick
    private player : Player
    private platforms: Phaser.GameObjects.Group
    private badItems: Phaser.GameObjects.Group
    private chargeItems: Phaser.GameObjects.Group
    private bounceItems: Phaser.GameObjects.Group

    constructor() {
        super({key: "BossScene"})
        console.log("loading boss scene")
        this.player = new Player(this,400,100)
        
    }

    init(): void {
        this.physics.world.bounds.width  = 1440
        this.physics.world.bounds.height = 800
    }

    preload(): void {
    }

    create(): void {
        // change this to a nice game over image

        this.add.image(0, 0, 'sky').setOrigin(0, 0)

        this.cameras.main.setSize(1440, 800)
        this.cameras.main.setBounds(0,0,1440,800)
        this.cameras.main.startFollow(this.player)

    }
}
