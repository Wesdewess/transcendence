import "phaser";
import { BootScene } from "./scenes/boot-scene";
import { StartScene } from "./scenes/start-scene";
import { GameScene } from "./scenes/game-scene";
import { EndScene } from "./scenes/end-scene";
const config = {
    width: 1600,
    height: window.innerHeight,
    input: {
        gamepad: true
    },
    scene: [BootScene, StartScene, GameScene, EndScene],
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
    constructor(config) {
        super(config);
    }
}
window.addEventListener("load", () => new Game(config));
