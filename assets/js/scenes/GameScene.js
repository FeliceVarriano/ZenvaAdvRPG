class GameScene extends Phaser.Scene{
    constructor(){
        super('Game');
    }

    init(){
        this.scene.launch('UI');
    }

    create(){        
        this.createMap();   
        this.createAudio();
        this.createGroups();
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

    createPlayer(playerObject){
        this.player = new PlayerContainer(
            this, 
            playerObject.x * 2, 
            playerObject.y * 2, 
            'characters', 
            0,
            playerObject.health,
            playerObject.maxHealth,
            playerObject.id
        );
    }

    createGroups(){
        // Create a chest group
        this.chests = this.physics.add.group(); 
        this.monsters = this.physics.add.group(); 
    }

    spawnChest(chestObject) {
        let chest = this.chests.getFirstDead();
        if (!chest) {
          chest = new Chest(this, chestObject.x * 2, chestObject.y * 2, 'items', 0, chestObject.gold, chestObject.id);
          // add chest to chests group
          this.chests.add(chest);
        } else {
          chest.coins = chestObject.gold;  // pass the amount of gold
          chest.id = chestObject.id;       // pass the chest id
          chest.setPosition(chestObject.x * 2, chestObject.y * 2);
          chest.makeActive();
        }
    }

    spawnMonster(monsterObject){
        let monster = this.monsters.getFirstDead();
        if (!monster) {
            monster = new Monster(this, monsterObject.x * 2, monsterObject.y * 2, 
                'monsters', monsterObject.frame, monsterObject.id, monsterObject.health, monsterObject.maxHealth);
          // add monster to monsterss group
          this.monsters.add(monster);
        } else {
            monster.id = monsterObject.id;       
            monster.health = monsterObject.health;
            monster.maxHealth = monsterObject.maxHealth
            monster.setTexture('monsters', monsterObject.frame);
            monster.setPosition(monsterObject.x * 2, monsterObject.y * 2);
            monster.makeActive();
        }
    }

    addCollisions(){
        this.physics.add.collider(this.player, this.map.blockedLayer);
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
        this.physics.add.collider(this.monsters, this.map.blockedLayer);
        this.physics.add.overlap(this.player.weapon, this.monsters, this.enemyOverlap, null, this);
    }

    enemyOverlap(player, enemy){
        if(this.player.playerAttacking && !this.player.swordHit){
            this.player.swordHit = true;
            this.events.emit('monsterAttacked', enemy.id);
        }        
    }

    createInput(){
        this.cursors = this.input.keyboard.createCursorKeys();
    }


    collectChest(player, chest) {
        // play gold pickup sound
        this.goldPickupAudio.play();
        this.events.emit('pickUpChest', chest.id, player.id);     
    }
    
    createMap(){
        this.map = new Map(this, 'map', 'background', 'background', 'blocked');
    }

    createGameManager(){
        this.events.on('spawnPlayer', (playerObject) => {
            this.createPlayer(playerObject);
            this.addCollisions();
        });

        this.events.on('chestSpawned', (chest) => {
            this.spawnChest(chest);
        });

        this.events.on('monsterSpawned', (monster) => {
            this.spawnMonster(monster);
        });

        this.events.on('chestRemoved', (chestId) => {
            this.chests.getChildren().forEach((chest) =>{
                if(chest.id === chestId){
                    chest.makeInactive();
                }
            });
        });

        this.events.on('monsterRemoved', (monsterId) => {
            this.monsters.getChildren().forEach((monster) =>{
                if(monster.id === monsterId){
                    monster.makeInactive();
                }
            });
        });

        this.events.on('updateMonsterHealth', (monsterId, health) => {
            this.monsters.getChildren().forEach((monster) =>{
                if(monster.id === monsterId){
                    monster.updateHealth(health);
                    console.log('made it inactive');
                }
            });
        });
        
        this.gameManager = new GameManager(this, this.map.map.objects);
        this.gameManager.setup();
        
    }
}