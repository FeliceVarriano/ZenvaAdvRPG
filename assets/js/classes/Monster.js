class Monster extends Phaser.Physics.Arcade.Image{
    constructor(scene, x, y, key, frame, id, health, maxHealth){
        super(scene, x, y, key, frame);

        this.id = id;
        this.health = health;
        this.maxHealth = maxHealth;

         //enable physics
         this.scene.physics.world.enable(this);
         //set monster immovable
         this.setImmovable(false);
         
         //scale our monster
         this.setScale(2);
         //add the monster to our existing scene
         this.setCollideWorldBounds(true);
        //add the monster to our existing scene
        this.scene.add.existing(this);
    }
}