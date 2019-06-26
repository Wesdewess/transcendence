export class Platform extends Phaser.Physics.Arcade.Sprite {

    private speed:number

    constructor(scene, x: number, y: number, texture:string, friction:number = 1, collide = false) {
        super(scene, x, y, texture)

        this.scene.physics.add.existing(this)
        
        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false)
        this.setGravity(0) 
        this.setImmovable(true)

        // friction 0 to 1 (ice has low friction) // has no effecct
        this.setFrictionX(-10)

        // if(collide==false){
        //     this.body.checkCollision.down = false
        // }else{
        //     this.body.checkCollision.down = true
        //     //this.body.width = 10000
        // }


    }

    update(){
        
    }
}
