class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    //hello peeps!

    preload() {
        this.load.image('gradient', './assets/SmallBackground.png');
        this.load.image('space', './assets/SmallStars.png');
        this.load.image('elevator', './assets/SmallElevator.png');
        this.load.image('Astronaut', './assets/SmallAstronaut.png');

        this.load.image('L_Beam', './assets/L_Beam.png');
        this.load.image('H_Beam', './assets/H_Beam.png');
        this.load.image('drill', './assets/drill.png');
        this.load.image('wrench', './assets/wrench.png');
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
        this.gradient_bg = this.add.tileSprite(0, 0, 960, 640, 'gradient').setOrigin(0, 0);
        this.starfield = this.add.tileSprite(0, 0, 960, 640, 'space').setOrigin(0, 0);
        this.elevator = this.add.tileSprite(0, 0, 960, 640, 'elevator').setOrigin(0, 0);

        // create placeholder character
        this.player = new Astronaut(this, 480, 320, 'Astronaut', 0).setOrigin(0, 0);

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
        this.starfield.tilePositionY += 1;
        this.elevator.tilePositionY += 1.3;

        this.displayFuel.text = this.player.getFuel();
        this.player.body.setDragX(this.DRAG);
        this.player.body.setDragY(this.DRAG);
    }
}