class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    //hello peeps!

    preload() {
        // environment
        this.load.image('gradient', './assets/Background_2.png');
        this.load.image('space', './assets/SmallStars.png');
        this.load.image('elevator', './assets/Level_1.png');
        // UI
        this.load.image('TopBar', './assets/TopBar.png');
        this.load.image('LeftPanel', './assets/LeftPanel.png');
        this.load.image('RightPanel', './assets/RightPanel.png');
        this.load.image('LeftBottomPanel', './assets/LeftBottomPanel.png');
        this.load.image('RightBottomPanel', './assets/RightBottomPanel.png');
        
        this.load.image('levelTracker', './assets/Elevator_Indicator.png');
        this.load.image('astrohead', './assets/AstronautHead.png');
        this.load.image('heart', './assets/BlueHeart.png');
        this.load.image('transmit', './assets/IncomingTransmission.png');
        // game objects
        this.load.image('Astronaut', './assets/SmallAstronaut.png');
        this.load.image('L_Beam', './assets/L_Beam.png');
        this.load.image('H_Beam', './assets/H_Beam.png');
        this.load.image('drill', './assets/drill.png');
        this.load.image('wrench', './assets/wrench.png');
        // audio
        this.load.audio('trackOne', './assets/trackOne.mp3');
        this.load.audio('slap', './assets/wallSlap.mp3');
        this.load.audio('jetpack', './assets/jetpackOne.mp3');
    }

    create() {

        //Keep track of which stage you are on
        this.stageTracker = 1;


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

        //load the audio
        this.trackOneBGM = this.sound.add('trackOne', { 
            mute: false,
            volume: .55,
            rate: 1,
            loop: true 
        });

        if (this.stageTracker == 1) {
            this.trackOneBGM.play();
        }

        this.slapAudio = this.sound.add('slap', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: false
        });

        this.jetpackAudio = this.sound.add('jetpack', { 
            mute: false,
            volume: .3,
            rate: .3,
            loop: false
        });

        // create background
        this.space = this.add.image(480, 320, 'gradient');
        this.starfield = this.add.tileSprite(480, 320, 960, 640, 'space');
        this.elevator = this.add.tileSprite(480, 320, 0, 0, 'elevator');

                // create stage gravity (velocity value)
                this.stageGravity = 80;
        
        //import UI 
        this.UI_TopBar = this.add.image(game.config.width/2, 20, 'TopBar');
        this.UI_LeftPanel = this.add.image(115, 70, 'LeftPanel');
        this.UI_RightPanel = this.add.image(850, 70, 'RightPanel');
        this.UI_LeftBottomPanel = this.add.image(115, 580, 'LeftBottomPanel');
        this.UI_RightBottomPanel = this.add.image(850, 580, 'RightBottomPanel');
        

        //create the left wall
        this.leftWall =  this.add.group();
        for (let i = 0; i < game.config.height; i += tileSize) {
            let leftTile = this.physics.add.sprite(100, i, 'H_Beam', 0).setOrigin(0,0);
            leftTile.body.immovable = true;
            leftTile.body.allowGravity = false;
            leftTile.visible = false;
            this.leftWall.add(leftTile);
        }
        //create the right wall
        this.rightWall =  this.add.group();
        for (let i = 0; i < game.config.height; i += tileSize) {
            let rightTile = this.physics.add.sprite(800, i, 'H_Beam', 0).setOrigin(0,0);
            rightTile.body.immovable = true;
            rightTile.body.allowGravity = false;
            rightTile.visible = false;
            this.rightWall.add(rightTile);
        }

        // create stage level tracker
        this.level = 1;

        // create placeholder character
        this.player = new Astronaut(this, 480, 320, 'Astronaut', 0).setScale(0.5);
        // this.player.setVelocityY(stageGravity);

        // create fuel group
        this.fuelGroup = this.add.group ({
            runChildUpdate: true,
        });
        // add overlap between player
        this.physics.add.overlap(this.player, this.fuelGroup, (obj1, obj2) => {
            obj1.reFuel();
            obj2.destroy();
        })

        // create hazard group
        this.hazardGroup = this.add.group({
            runChildUpdate: true,
        });
        // add overlap between player
        this.physics.add.overlap(this.player, this.hazardGroup, (obj1, obj2) => {
            if (obj1.getInvincible() == false) {
                this.hazardCollision();
            }
        })

        //add colliders (IMPORTANT: make sure colliders are placed BELOW creation of sprites; it will error otherwise)
        this.physics.add.collider(this.player, this.leftWall, this.touchWall, false, this);
        this.physics.add.collider(this.player, this.rightWall, this.touchWall, false, this);
        //this.physics.add.collider(this.playerOne, this.spike01, this.touchSpike, false, this);

        this.keyIsPressed = false;

        // temporary spawn timer
        this.hazardTimer = this.time.addEvent({
            delay: 4000,
            callback: this.addHazard,
            callbackScope: this,
            loop: true,
            startAt: 0
        });

        // spike roof at level 2
        if (this.stageTracker == 2){
            this.spikeyRoof = this.physics.add.sprite(480, 20, 'H_Beam', 0).setScale(12, 0.25);
            this.spikeyRoof.body.immovable = true;
            this.hazardGroup.add(this.spikeyRoof);
        }

        this.escapePod = this.physics.add.sprite( 480, 500, 'H_Beam', 0).setScale(12,0.25);
        this.escapePod.body.immovable = true;

        this.physics.add.collider(this.player, this.escapePod,this.stageCompletion, false, this);


        // TEMP: create fuel display
        this.displayFuel = this.add.text(game.config.width - borderUISize*3 - borderPadding, borderUISize*3 + borderPadding, this.player.getFuel(), menuConfig);
        // TEMP: create health display
        this.displayHealth = this.add.text(game.config.width - borderUISize*3 - borderPadding, borderUISize*2 + borderPadding, this.player.getHealth(), menuConfig);
        // TEMP: create level descent tracker
        this.displayLevel = this.add.text(0, 50, Math.floor(this.level), menuConfig);
        
        // create global map
        this.miniMap = this.add.image(borderUISize + borderPadding, borderPadding + borderUISize, 'miniMap').setOrigin(0, 0);
        this.levelTracker = this.add.image(borderUISize + borderPadding*3.75, 0 + borderUISize*2.8 + borderPadding, 'levelTracker', 0 ,30);
        this.heart1 = this.add.image(120, 82, 'heart');
        this.heart2 = this.add.image(160, 85, 'heart');
        this.heart3 = this.add.image(200, 88, 'heart');
        this.astrohead = this.add.image(40, 65, 'astrohead');

        // this.UI_LeftPanel = this.add.image(115, 70, 'LeftPanel');


        // define keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

    }

    update() {
        // this is how the jetpack sound plays
        // if a key has not previously been pressed and it is now pressed, play a sound, but only once
        if (this.keyIsPressed == false) {
            if ((keyA.isDown || keyD.isDown || keyW.isDown|| keyS.isDown) && (this.player.fuel > 0)) {
                this.jetpackAudio.play();
                this.keyIsPressed = true;
            }
            else {
                this.keyIsPressed = false;
            }
        }
        // here is a lockout check to see if a key  is still being pressed. If no, you can reset the first loop next time an update check runs.
        if ((keyA.isDown || keyD.isDown || keyW.isDown|| keyS.isDown) && (this.player.fuel > 0)) {
            this.keyIsPressed = true;
        }
        else {
            this.keyIsPressed = false;
        }

        this.player.update();
     
        this.player.body.setDragX(this.DRAG);
        this.player.body.setDragY(this.DRAG);
        // update player
        this.player.update(this.stageGravity);

        // player/hazard collision
        this.physics.world.collide(this.player, this.hazardGroup, this.hazardCollision, null, this);

        // update displays
        this.displayFuel.text = this.player.getFuel();
        this.displayHealth.text = this.player.getHealth();
        this.displayLevel.text = Math.floor(this.level);

        // demonstrates spawning fuel into environment
        if (this.level == 1) {
            this.addFuel(300, 0);
        }

        // move environment with movement
        if(this.level < 7) {
            this.starfield.tilePositionY += 1;
            this.elevator.tilePositionY += 1.3;
        
            if (keyW.isDown && this.player.getFuel() > 0) {
                this.space.tilePositionY -= this.stageGravity/100;
                this.starfield.tilePositionY -= this.stageGravity/100;
                this.elevator.tilePositionY -= this.stageGravity/100;
                this.level -= 1/100;
            } else {
                // update background
                this.space.tilePositionY += this.stageGravity/100;
                this.starfield.tilePositionY += this.stageGravity/100;
                this.elevator.tilePositionY += this.stageGravity/100;
                this.level += 1/100;
                // update minimap
                this.levelTracker.y += 0.02;
            }
        }

        if ((this.level > 5) && (this.level < 7)) {
            console.log("bruh");
            this.escapePod.Y -= 1;
        }
    }

    // randomly spawn hazards
    addHazard() {
        let rand_obj = Phaser.Math.Between(0, 3);
        let rand_x_pos = Phaser.Math.Between(200, 700);
        let rand_rotation = Phaser.Math.Between(-100, 100);
        if(this.stageTracker == 1){
        switch (rand_obj) {
            case 0:
                let drill = new Hazard(this, rand_x_pos, 0, 'drill', 0).setScale(0.35);
                drill.setVelocityY(this.stageGravity);
                drill.body.setAngularVelocity(rand_rotation);
                this.hazardGroup.add(drill);
                break;
            case 1:
                let wrench = new Hazard(this, rand_x_pos, 0, 'wrench', 0).setScale(0.35);
                wrench.setVelocityY(this.stageGravity);
                wrench.body.setAngularVelocity(rand_rotation);
                this.hazardGroup.add(wrench);
                break;
            case 2:
                let hbeam = new Hazard(this, rand_x_pos, 0, 'H_Beam', 0).setScale(0.35);
                hbeam.setVelocityY(this.stageGravity);
                hbeam.body.setAngularVelocity(rand_rotation);
                this.hazardGroup.add(hbeam);
                break;
            case 3:
                let lbeam = new Hazard(this, rand_x_pos, 0, 'L_Beam', 0).setScale(0.35);
                lbeam.setVelocityY(this.stageGravity);
                lbeam.body.setAngularVelocity(rand_rotation);
                this.hazardGroup.add(lbeam);
                break;
            }
        }
    }

    // Pre: x position, y position to place in world
    addFuel(x, y) {
        let fuel = new Hazard(this, x, y, 'levelTracker', 0);
        fuel.setVelocityY(this.stageGravity);
        this.fuelGroup.add(fuel);
    }

    // NOTE: Need to set invulnerability timer after getting hit once
    hazardCollision() {
        if ((this.player.getHealth() > 0) && !(this.player.getInvincible())) {
            this.player.decrimentHealth();
            this.invulnTimer = this.time.delayedCall({
                delay: 5000,
                callback: this.player.toggleInvincible,
                callbackScope: this,
                loop: false,
            })
        }else {
            this.trackOneBGM.stop();
            this.jetpackAudio.stop();
            this.scene.start('gameOverScene');
            this.trackOneBGM.mute = true;
        }
    }
    
    touchWall() {
        if(keyA.isDown || keyD.isDown){
            
            //this.slapAudio
        }
        else{
            this.slapAudio.play();
        }
    }
    stageCompletion(){
        this.trackOneBGM.mute = true;
        this.scene.start('stageCompleteScene');
    }
}