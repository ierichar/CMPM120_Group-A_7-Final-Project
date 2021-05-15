class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    //hello peeps!

    preload() {
        this.load.image('gradient', './assets/SmallBackground.png');
        this.load.image('space', './assets/SmallStars.png');
        this.load.image('smallelevator', './assets/SmallElevator.png');
        this.load.image('Astronaut', './assets/SmallAstronaut.png');

        this.load.image('L_Beam', './assets/L_Beam.png');
        this.load.image('H_Beam', './assets/H_Beam.png');
        this.load.image('drill', './assets/drill.png');
        this.load.image('stars', './assets/Stars.png');
        this.load.image('space', './assets/Background.png');
        this.load.image('astronaut', './assets/Astronaut.png');
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

        // create stage level tracker
        this.level = 0;

        // create placeholder character
        this.player = new Astronaut(this, 480, 320, 'Astronaut', 0).setScale(0.5);
        // this.player.setVelocityY(stageGravity);

        // create hazard group
        this.hazardGroup = this.add.group({
            runChildUpdate: true,
        });

        this.hazardTimer = this.time.addEvent({
            delay: 4000,
            callback: this.addHazard,
            callbackScope: this,
            loop: true,
            startAt: 0
        });

        // create fuel display
        this.displayFuel = this.add.text(0, 0, this.player.getFuel(), menuConfig);
        // create health display
        this.displayHealth = this.add.text(100, 0, this.player.getHealth(), menuConfig);
        // create level descent tracker
        this.displayLevel = this.add.text(0, 50, Math.floor(this.level), menuConfig);
        
        // define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        // update player
        this.player.update(this.stageGravity);

        // player/hazard collision
        this.physics.world.collide(this.player, this.hazardGroup, this.hazardCollision, null, this);

        // update displays
        this.displayFuel.text = this.player.getFuel();
        this.displayHealth.text = this.player.getHealth();
        this.displayLevel.text = Math.floor(this.level);

        // move environment with movement
        if (keyW.isDown && this.player.getFuel() > 0) {
            this.space.tilePositionY -= this.stageGravity/100;
            this.starfield.tilePositionY -= this.stageGravity/100;
            this.elevator.tilePositionY -= this.stageGravity/100;
            this.level -= 1/100;
        } else {
            this.space.tilePositionY += this.stageGravity/100;
            this.starfield.tilePositionY += this.stageGravity/100;
            this.elevator.tilePositionY += this.stageGravity/100;
            this.level += 1/100;
        }
    }

    // randomly spawn hazards
    addHazard() {
        let rand_obj = Phaser.Math.Between(0, 3);
        let rand_x_pos = Phaser.Math.Between(200, 700);
        switch (rand_obj) {
            case 0:
                let drill = new Hazard(this, rand_x_pos, 0, 'drill', 0).setScale(0.35);
                drill.setVelocityY(this.stageGravity);
                this.hazardGroup.add(drill);
                break;
            case 1:
                let wrench = new Hazard(this, rand_x_pos, 0, 'wrench', 0).setScale(0.35);
                wrench.setVelocityY(this.stageGravity);
                this.hazardGroup.add(wrench);
                break;
            case 2:
                let hbeam = new Hazard(this, rand_x_pos, 0, 'H_Beam', 0).setScale(0.35);
                hbeam.setVelocityY(this.stageGravity);
                this.hazardGroup.add(hbeam);
                break;
            case 3:
                let lbeam = new Hazard(this, rand_x_pos, 0, 'L_Beam', 0).setScale(0.35);
                lbeam.setVelocityY(this.stageGravity);
                this.hazardGroup.add(lbeam);
                break;
        }
    }

    hazardCollision() {
        if ((this.player.getHealth() > 0) && !(this.player.invincible)) {
            this.player.decrimentHealth();
        } else {
            this.scene.start('gameOverScene');
        }
    }
}