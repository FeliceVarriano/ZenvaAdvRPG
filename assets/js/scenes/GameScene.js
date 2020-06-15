class GameScene extends Phaser.Scene{
    constructor(){
        super('Game');

    }

    init(){
        this.scene.launch('UI');
        this.score = 0;
    }

    create(){        
        this.createMap();   
        this.createAudio();
        this.createChests();
        this.createInput(); 

        this.createGameManager();
    }

    update(){
        if(this.player){
            this.player.update(this.cursors);
        }
    }

    createAudio(){
        this.goldPickupAudio = this.sound.add('goldSound', {loop: false});
    }

    createPlayer(location){
        this.player = new Player(this, location[0] * 2, location[1] * 2, 'characters', 0);

    }

    createChests(){
        // Create a chest group
        this.chests = this.physics.add.group();  

        // possible chest locations
        this.chestPositions = [[100, 100], [200, 200], [300, 300], [400, 400], [500, 500]];

        //specify the max number of possible chests
        this.maxNumberOfChests = 3;
        for(let i = 0; i < this.maxNumberOfChests; i++){
            //spawn chest
            this.spawnChest();
        }
    }

    spawnChest(){
        const location = this.chestPositions[Math.floor(Math.random() * this.chestPositions.length)];

        let chest = this.chests.getFirstDead();
        if(!chest){
            const chest = new Chest(this, location[0], location[1], 'items', 0); 
                //Add chest to chest group
            this.chests.add(chest);
        }else{
            chest.setPosition(location[0], location[1]);
            chest.makeActive();
        }

    }

    addCollisions(){
        this.physics.add.collider(this.player, this.map.blockedLayer);
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);

    }

    createInput(){
        this.cursors = this.input.keyboard.createCursorKeys();
    }


    collectChest(player, chest){
        //Play gold pickup sound
        this.goldPickupAudio.play();
        //update our score
        this.score += chest.coins;
        // Update score in the UI
        this.events.emit('updateScore', this.score);
        //Destroy the Chest Game object.
        chest.makeInactive();
        //Spawn a new chest
        this.time.delayedCall(1000, this.spawnChest, [], this);
    }    
    
    createMap(){
        this.map = new Map(this, 'map', 'background', 'background', 'blocked');
    }

    createGameManager(){
        this.events.on('spawnPlayer', (location) => {
            this.createPlayer(location);
            this.addCollisions();
        });
        this.gameManager = new GameManager(this, this.map.map.objects);
        this.gameManager.setup();
        
    }
}