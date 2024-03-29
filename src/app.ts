import "phaser";
import { BootScene } from "./scenes/boot-scene"
import { StartScene } from "./scenes/start-scene"
import { GameScene } from "./scenes/game-scene"
import { EndScene } from "./scenes/end-scene"
import { BossScene } from "./scenes/boss-scene"
import { ScaleModes } from "phaser";

const config: GameConfig = {
    width: 1440,
    height: 900,
    input: {
        gamepad: true
    },
    scene: [BootScene, StartScene, GameScene, EndScene, BossScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false, 
            gravity: { y: 3000 }
        }
    },
    render: { pixelArt: true }
};

export class Game extends Phaser.Game {
    
    constructor(config: GameConfig) {
        super(config)
        
    }
}

window.addEventListener("load", () => new Game(config))

