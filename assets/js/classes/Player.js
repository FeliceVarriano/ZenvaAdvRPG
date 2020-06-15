class Player extends Phaser.Physics.Arcade.Image{
    constructor(scene, x, y, key, frame){
        super(scene, x, y, key, frame);
        this.scene = scene; // the scene this container will be added to
        this.velocity = 160; // the velocity when moving our player sprite

        //enable physics
        this.scene.physics.world.enable(this);
        //set player immovable
        this.setImmovable(false);
        
        //scale our player
        this.setScale(2);
        //add the player to our existing scene
        this.setCollideWorldBounds(true);
        //add the player to our existing scene
        this.scene.add.existing(this);

        // Have the camera follow the player
        this.scene.cameras.main.startFollow(this);
    }

    update(cursors){
        this.body.setVelocity(0);
    
        if(cursors.left.isDown){
            this.body.setVelocityX(-this.velocity);
        }else if(cursors.right.isDown){
            this.body.setVelocityX(this.velocity);
        }
    
        if(cursors.up.isDown){
            this.body.setVelocityY(-this.velocity);
        }else if(cursors.down.isDown){
            this.body.setVelocityY(this.velocity);
        }
    }
    
}