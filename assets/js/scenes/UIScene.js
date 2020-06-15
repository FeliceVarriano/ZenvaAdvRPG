class UIScene extends Phaser.Scene{
    constructor(){
        super('UI');
    }

    init(){
        //grab a reference to the game scene
        this.gameScene = this.scene.get('Game');
    }

    create(){
        this.setupUIElements();
        this.setupEvents();
    }

    setupUIElements(){
        // create the score text game object
        this.scoreText = this.add.text(35, 8, 'Coins: 0', 0, { fontSize: '16px', fill: '#fff'});
        
        //create coin icon
        this.coinIcon = this.add.image(15, 15, 'items', 3);
    }

    setupEvents(){
        //listen for the updateScore event from the Game scene.
        this.gameScene.events.on('updateScore', (score) => {
            this.scoreText.setText(`Coins: ${score}`);
        })
    }
}