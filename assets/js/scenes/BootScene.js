class BootScene extends Phaser.Scene{
    constructor(){
        super('Boot');
    }

    preload(){
        this.loadImages();
        this.loadSpriteSheets();
        this.loadAudio();
        // load tilemap
        this.loadTileMap();
    }    

    loadImages(){
        // Load images
        this.load.image('button1', 'assets/images/ui/blue_button01.png');
        this.load.image('button2', 'assets/images/ui/blue_button02.png');
        //load tileset image
        this.load.image('background', 'assets/level/background-extruded.png');
    }

    loadSpriteSheets(){
        //Load Spritesheets
        this.load.spritesheet('items', 'assets/images/items.png', { frameWidth: 32, frameHeight:32 });
        this.load.spritesheet('characters', 'assets/images/characters.png', { frameWidth: 32, frameHeight:32 });
        this.load.spritesheet('monsters', 'assets/images/monsters.png', { frameWidth: 32, frameHeight:32 });
    }

    loadAudio(){
        //Load Audio
        this.load.audio('goldSound', ['assets/audio/Pickup.wav']);
    }

    create(){
        this.scene.start('Game');
    }

    loadTileMap(){
        // map made with tiled in JSON format.
        this.load.tilemapTiledJSON('map', 'assets/level/large_level.json');
    }
}