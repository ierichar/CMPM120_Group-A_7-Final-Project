class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    //hello peeps!

    preload() {
        this.load.image('space', './assets/placeholder_starfield.png');
        this.load.image('greenAlien', './assets/GreenGuy.png');
    }

    create() {

        //physics
        this.DRAG = 100; 
        // temporary ui scheme
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // create background
        this.starfield = this.add.tileSprite(0, 0, 960, 640, 'space').setOrigin(0, 0);

        // create placeholder character
        this.player = new Astronaut(this, 480, 320, 'greenAlien', 0).setOrigin(0, 0);

        // create fuel display
        this.displayFuel = this.add.text(0, 0, this.player.getFuel(), menuConfig);
        
        // define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        this.player.update();

        this.displayFuel.text = this.player.getFuel();
        this.player.body.setDragX(this.DRAG);
        this.player.body.setDragY(this.DRAG);
    }
}