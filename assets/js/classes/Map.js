class Map{
    constructor(scene, key, tileSetName, bgLayerName, blockedLayerName){
        this.scene = scene; // scene this map belongs to
        this.key = key;
        this.tileSetName = tileSetName;
        this.bgLayerName = bgLayerName;
        this.blockedLayerName = blockedLayerName;
        this.createMap();
    }

    createMap(){
        // Create the tilemap itself
        this.map = this.scene.make.tilemap({key: this.key })
        // Add the tileset image to our map
        this.tiles = this.map.addTilesetImage(this.tileSetName, this.tileSetName, 32, 32, 1, 2);
        // Create our background layer
        this.backgroundLayer = this.map.createStaticLayer(this.bgLayerName, this.tiles, 0, 0);
        this.backgroundLayer.setScale(2);

        // Create blocked layer
        this.blockedLayer = this.map.createStaticLayer(this.blockedLayerName, this.tiles, 0, 0);
        this.blockedLayer.setScale(2);
        this.blockedLayer.setCollisionByExclusion([-1]);

        // Update the world bounds
        this.scene.physics.world.bounds.width = this.map.widthInPixels * 2;
        this.scene.physics.world.bounds.height = this.map.heightInPixels * 2;

        // Limit the camera to the size of our map
        this.scene.cameras.main.setBounds(0, 0, this.map.widthInPixels * 2, this.map.heightInPixels * 2)
    }
}