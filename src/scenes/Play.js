class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    //hello peeps!

    preload() {
        this.load.image('stars', './assets/Stars.png');
        this.load.image('space', './assets/Background.png');
        this.load.image('drill', './assets/drill.png');
        this.load.image('highBeam', './assets/H_Beam.png');
        this.load.image('lowBeam', './assets/L_Beam.png');
        this.load.image('astronaut', './assets/Astronaut.png');
        this.load.image('smolastronaut', './assets/SmallAstronaut.png');
        this.load.image('elevator', './assets/Elevator.png');
        this.load.image('wrench', './assets/wrench.png');
    }

    create() {
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
        this.space = this.add.tileSprite(0, 0, 3000, 3000, 'space');
        this.starfield = this.add.tileSprite(0, 0, 3000, 3000, 'stars');
        this.elevator = this.add.tileSprite(480, 960, 0, 3000, 'elevator');

        // create stage gravity (velocity value)
        this.stageGravity = 80;

        // create placeholder character
        this.player = new Astronaut(this, 480, 320, 'smolastronaut', 0).setScale(0.5);
        // this.player.setVelocityY(stageGravity);

        // create hazard group
        // this.hazardGroup = this.add.group();

        // let drill = this.add.tileSprite(380, 0, 'drill');
        // let wrench = this.add.tileSprite(580, 0, 'wrench');
        // let hbeam = this.add.tileSprite(120, 200, 'highBeam');
        // let lbeam = this.add.tileSprite(680, 200, 'lowBeam');
        // this.hazardGroup.add(drill);
        // this.hazardGroup.add(wrench);
        // this.hazardGroup.add(hbeam);
        // this.hazardGroup.add(lbeam);

        // create fuel display
        this.displayFuel = this.add.text(0, 0, this.player.getFuel(), menuConfig);
        // create health display
        this.displayHealth = this.add.text(100, 0, this.player.getHealth(), menuConfig);
        
        // define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        this.player.update(this.stageGravity);
        this.displayFuel.text = this.player.getFuel();
        this.displayHealth.text = this.player.getHealth();

        // move environment with movement
        if (keyW.isDown && this.player.getFuel() > 0) {
            this.space.tilePositionY -= this.stageGravity/100;
            this.starfield.tilePositionY -= this.stageGravity/100;
            this.elevator.tilePositionY -= this.stageGravity/100;
        } else {
            this.space.tilePositionY += this.stageGravity/100;
            this.starfield.tilePositionY += this.stageGravity/100;
            this.elevator.tilePositionY += this.stageGravity/100;
        }
    }
}