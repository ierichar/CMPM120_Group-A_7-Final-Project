class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    //========================= PRELOAD() =====================================
    preload() {
        // environment
        this.load.image('gradient', './assets/Menu/Background_2.png');
        this.load.image('space', './assets/GeneralAssets/SmallStars.png');
        this.load.image('elevator', './assets/Level_1/Level_1.png');
        // UI
        this.load.image('TopBar', './assets/HUD_UI/TopBar.png');
        this.load.image('LeftPanel', './assets/HUD_UI/LeftPanel.png');
        this.load.image('RightPanel', './assets/HUD_UI/RightPanel.png');
        this.load.image('LeftBottomPanel', './assets/HUD_UI/LeftBottomPanel.png');
        this.load.image('RightBottomPanel', './assets/HUD_UI/RightBottomPanel.png');
        this.load.image('FuelBarOutline', './assets/HUD_UI/FuelBarOutline.png');
        this.load.image('FuelGauge', './assets/HUD_UI/FuelBar.png');

        this.load.image('levelTracker', './assets/HUD_UI/Elevator_Indicator.png');
        this.load.image('astrohead', './assets/HUD_UI/AstronautHead.png');
        this.load.image('heart', './assets/HUD_UI/BlueHeart.png');
        // game objects
        this.load.image('Astronaut', './assets/GeneralAssets/SmallAstronaut.png');
        this.load.image('L_Beam', './assets/Level_1/L_Beam.png');
        this.load.image('H_Beam', './assets/Level_1/H_Beam.png');
        this.load.image('drill', './assets/Level_1/drill.png');
        this.load.image('wrench', './assets/Level_1/wrench.png');
        // audio
        this.load.audio('trackOne', './assets/Sounds/trackOne.mp3');
        this.load.audio('slap', './assets/Sounds/wallSlap.mp3');
        this.load.audio('jetpack', './assets/Sounds/jetpackOne.mp3');
        this.load.audio('clang', './assets/Sounds/clang.mp3');
    }

    //========================= CREATE() ======================================
    create() {
        // Predetermined level milestones -------------------------------------
        // create stage level tracker
        this.level = globalLevel;

        // Create Audio -------------------------------------------------------
        //load the audio
        this.trackOneBGM = this.sound.add('trackOne', { 
            mute: false,
            volume: .55,
            rate: 1,
            loop: true 
        });

        if (this.level > stage0Start && this.level < stage1Start) {
            this.trackOneBGM.play();
        }

        this.slapAudio = this.sound.add('slap', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: false
        });

        this.clang = this.sound.add('clang', {
            mute:false,
            volume: .8,
            rate: 1,
            loop:false
        })

        this.jetpackAudio = this.sound.add('jetpack', { 
            mute: false,
            volume: .3,
            rate: .3,
            loop: false
        });

        // Create Environment -------------------------------------------------
        // create background
        this.space = this.add.image(480, 320, 'gradient');
        this.starfield = this.add.tileSprite(480, 320, 960, 640, 'space');
        this.elevator = this.add.tileSprite(480, 320, 0, 0, 'elevator');

        //create the left wall
        this.leftWall =  this.add.group();
        for (let i = 0; i < game.config.height; i += tileSize) {
            let leftTile = this.physics.add.sprite(elevatorLeft, i, 'H_Beam', 0).setOrigin(0,0);
            leftTile.body.immovable = true;
            leftTile.body.allowGravity = false;
            leftTile.visible = false;
            this.leftWall.add(leftTile);
        }
        //create the right wall
        this.rightWall =  this.add.group();
        for (let i = 0; i < game.config.height; i += tileSize) {
            let rightTile = this.physics.add.sprite(elevatorRight, i, 'H_Beam', 0).setOrigin(0,0);
            rightTile.body.immovable = true;
            rightTile.body.allowGravity = false;
            rightTile.visible = false;
            this.rightWall.add(rightTile);
        }

        // Character and Object Creation --------------------------------------
        // create placeholder character
        this.player = new Astronaut(this, 480, 320, 'Astronaut', 0).setScale(0.5);
        // define movement keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

        this.keyIsPressed = false;

        // create stage gravity (velocity value)
        this.stageGravity = 80;
        // create game over state
        this.gameOver = false;

        // create fuel group
        this.fuelGroup = this.add.group ({
            runChildUpdate: true,
        });
        // add overlap between player
        this.physics.add.overlap(this.player, this.fuelGroup, (obj1, obj2) => {
            obj1.reFuel();
            obj2.destroy();
        })

        // create dummy group
        this.dummyGroup = this.add.group({
            runChildUpdate: true,
        })

        // create hazard group
        this.hazardGroup = this.add.group({
            runChildUpdate: true,
        });

        // create platform group
        this.platformGroup = this.add.group({
             runChildUpdate: true,
        });

        //create transition group
        this.transitionGroup = this.add.group({
            runChildUpdate: true,
        });

        //add colliders (IMPORTANT: make sure colliders are placed BELOW creation of sprites; it will error otherwise)
        this.physics.add.collider(this.player, this.leftWall, this.touchWall, false, this);
        this.physics.add.collider(this.player, this.rightWall, this.touchWall, false, this);

        // stage 0 practice dummies
        this.dummyTimer = this.time.addEvent({
            startAt: 2000,
            delay: 6000,
            callback: this.addDummy,
            callbackScope: this,
            loop: true
        })
        // stage 0 start fuel timer
        this.fuelTimer = this.time.addEvent({
            delay: 5000,
            callback: this.addFuel,
            callbackScope: this,
            loop: true
        })

        // stage 1 hazard timer
        this.hazardTimer = this.time.addEvent({
            delay: 4000,
            callback: this.addHazard,
            callbackScope: this,
            loop: true
        });

        this.escapePodIsSpawned = false;

        // Create UI ----------------------------------------------------------
        // import UI 
        this.UI_TopBar = this.add.image(game.config.width/2, 20, 'TopBar');
        this.UI_LeftPanel = this.add.image(115, 70, 'LeftPanel');
        this.UI_RightPanel = this.add.image(850, 70, 'RightPanel');
        this.UI_LeftBottomPanel = this.add.image(115, 580, 'LeftBottomPanel');
        this.UI_RightBottomPanel = this.add.image(850, 580, 'RightBottomPanel');
        
        // create hearts and astrohead
        this.heart1 = this.add.image(120, 82, 'heart');
        this.heart2 = this.add.image(160, 85, 'heart');
        this.heart3 = this.add.image(200, 88, 'heart');
        this.astrohead = this.add.image(40, 65, 'astrohead');

        // temporary ui scheme
        let playConfig = {
            fontFamily: 'alarm clock',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // create fuel display
        this.fuelOutline = this.add.image(485, 40, 'FuelBarOutline');
        this.fuelGauge = this.add.image(485, 40, 'FuelGauge');
        this.displayFuel = this.add.text(460, 25, this.player.getFuel(), playConfig);
        // create level descent tracker
        playConfig.fontSize = '28px';
        this.displayLevel = this.add.text(60, 540, Math.floor(100000 - this.level), playConfig);
    }

    //========================= UPDATE() ======================================
    update() {
        // Game State Updates -------------------------------------------------
        if (this.gameOver == true) {
            this.trackOneBGM.stop();
            this.jetpackAudio.stop();
            this.trackOneBGM.mute = true;
            this.scene.start('gameOverScene');
        }

        // Player Updates -----------------------------------------------------
        //console.log(this.player.body.velocity);
        this.player.update();
        this.player.body.setDragX(this.DRAG);
        this.player.body.setDragY(this.DRAG);

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
        } else {
            this.keyIsPressed = false;
        }
        // here is a lockout check to see if a key  is still being pressed. If no, you can reset the first loop next time an update check runs.
        if ((keyA.isDown || keyD.isDown || keyW.isDown|| keyS.isDown)&& (this.player.fuel > 0)){
            this.keyIsPressed = true;
        } else {
            this.keyIsPressed = false;
        }

        // UI Updates ---------------------------------------------------------
        // update displays
        this.displayFuel.text = this.player.getFuel();
        this.displayLevel.text = Math.floor(100000 - this.level);

        // Environment Updates ------------------------------------------------
        // move environment with movement
        if ((this.level >= stage0Start && this.level < stage0End)
            || (this.level >= stage1Start && this.level < stage1End)
            || (this.level >= stage2Start && this.level < stage2End)
            || (this.level >= stage3Start && this.level < stage3End)) {
            this.starfield.tilePositionY += 1;
            this.elevator.tilePositionY += 1.3;
            if (keyW.isDown && this.player.getFuel() > 0) {
                // update background
                this.space.tilePositionY -= this.stageGravity/100;
                this.starfield.tilePositionY -= this.stageGravity/100;
                this.elevator.tilePositionY -= this.stageGravity/100;
            } else {
                // update background
                this.space.tilePositionY += this.stageGravity/100;
                this.starfield.tilePositionY += this.stageGravity/100;
                this.elevator.tilePositionY += this.stageGravity/100;
                this.level += 1/100;
            }
        }

        // spawn transition between 0 -> 1, and 1 -> 2
        if ((this.level > stage0End - 2.5 && this.level < stage0End) ||
            (this.level > stage1End - 2.5 && this.level < stage2End) ||
            (this.level > stage2End - 2.5 && this.level < stage2End)) {
            if (this.escapePodIsSpawned == false) {
                //this.escapePod = this.physics.add.sprite( 480, 500, 'H_Beam', 0).setScale(12,0.25);
                //this.escapePod.body.immovable = true;
                this.addTransition();
                this.physics.add.collider(this.player, this.transitionGroup,this.stageCompletion, false, this);
                this.escapePodIsSpawned = true;
            } else {
                //escapePod.setVelocityY(this.stageGravity *-1);
                this.transitionGroup.incY(-1);
            }
        }

        // spike roof at level 2
        if (this.level == stage2Start) {
            this.spikeyRoof = this.physics.add.sprite(480, 20, 'H_Beam', 0).setScale(12, 0.25);
            this.spikeyRoof.body.immovable = true;
            this.hazardGroup.add(this.spikeyRoof);
        }

        // Physics updates ----------------------------------------------------
        // inspiration and code credit to ThePandaJam:
        // https://phaser.discourse.group/t/solved-making-a-player-invincible-for-a-brief-time/3211
        this.physics.world.overlap(this.player, this.hazardGroup, function(player, hazard) {
            if (player.getInvincible() == false) {
                this.clang.play();
                player.alpha = 0.5;
                if (this.level > stage1Start) {
                    player.decrimentHealth();
                }
                player.toggleInvincible();
                this.playerInvuln = this.time.addEvent({
                    delay: 1500,
                    callback: ()=>{
                        player.alpha = 1;
                        player.toggleInvincible();
                    },
                    loop: false
                })
                if (this.player.getHealth() == 2) {
                    this.heart3.destroy();
                } else if (this.player.getHealth() == 1) {
                    this.heart2.destroy();
                } else if (this.player.getHealth() <= 0) {
                    this.heart1.destroy();
                    this.gameOver = true;
                }
            }
        }, null, this);
        // tutorial's visual demonstration of hitbox
        this.physics.world.overlap(this.player, this.dummyGroup, function(player, hazard) {
            if (player.getInvincible() == false) {
                this.clang.play();
                player.alpha = 0.5;
                this.playerInvuln = this.time.addEvent({
                    delay: 1500,
                    callback: ()=>{
                        player.alpha = 1;
                    },
                    loop: false
                })
            }
        }, null, this);
    }
    
    //======================== EXTERNAL FUNCTIONS =============================
    // addDummy()
    // add tutorial objects to scene
    addDummy() {
        if (this.level > stage0Start && this.level < stage0End) {
            let dummy = new Hazard(this, 480, 0, 'drill', 0).setScale(0.35);
            dummy.setVelocityY(globalGravity/2);
            this.dummyGroup.add(dummy);
        }
    }

    // addHazard()
    // randomly spawn hazards
    addHazard() {
        let rand_obj = Phaser.Math.Between(0, 3);
        let rand_x_pos = Phaser.Math.Between(elevatorLeft + 100, elevatorRight - 100);
        let rand_velocity = Phaser.Math.Between(200, 400);
        // let rand_rotation = Phaser.Math.Between(-100, 100);
        if (this.level > stage1Start && this.level < stage2Start) {
            switch (rand_obj) {
                case 0:
                    let drill = new Hazard(this, rand_x_pos, 0, 'drill', 0).setScale(0.35);
                    drill.setVelocityY(rand_velocity);
                    // drill.body.setAngularVelocity(rand_rotation);
                    // drill.body.setCircle(drill.height/3);
                    this.hazardGroup.add(drill);
                    break;
                case 1:
                    let wrench = new Hazard(this, rand_x_pos, 0, 'wrench', 0).setScale(0.35);
                    wrench.setVelocityY(rand_velocity);
                    // wrench.body.setAngularVelocity(rand_rotation);
                    // wrench.body.setCircle(wrench.width/3);
                    this.hazardGroup.add(wrench);
                    break;
                case 2:
                    let hbeam = new Hazard(this, rand_x_pos, 0, 'H_Beam', 0).setScale(0.35);
                    hbeam.setVelocityY(rand_velocity);
                    // hbeam.body.setAngularVelocity(rand_rotation);
                    // hbeam.body.setCircle(hbeam.height/3);
                    this.hazardGroup.add(hbeam);
                    break;
                case 3:
                    let lbeam = new Hazard(this, rand_x_pos, 0, 'L_Beam', 0).setScale(0.35);
                    lbeam.setVelocityY(rand_velocity);
                    // lbeam.body.setAngularVelocity(rand_rotation);
                    // lbeam.body.setCircle(lbeam.height/3);
                    this.hazardGroup.add(lbeam);
                    break;
                }
        }
        if (this.level > this.stage2Start && this.level < this.stage3Start) {
            switch (rand_obj) {
                case 0:
                    let leftPlatform = new Platform(this, 200, 680, 'drill', 0).setScale(0.35);
                    leftPlatform.setVelocityY(-this.stageGravity);
                    this.platformGroup.add(leftPlatform);
                    break;
                case 1:
                    let midPlatform = new Platform(this, 480, 680, 'wrench', 0).setScale(0.35);
                    midPlatform.setVelocityY(-this.stageGravity);
                    this.platformGroup.add(midPlatform);
                    break;
                case 2:
                    let rightPlatform = new Platform(this, 700, 680, 'drill', 0).setScale(0.35);
                    rightPlatform.setVelocityY(-this.stageGravity);
                    this.platformGroup.add(rightPlatform);
                    break;
                case 3:
                    //let lbeam = new Hazard(this, rand_x_pos, 0, 'L_Beam', 0).setScale(0.35);
                    //lbeam.setVelocityY(this.stageGravity);
                    //this.hazardGroup.add(lbeam);
                    //break;
                }
        }
    }

    // addTransition()
    // adds the transition object into the scene
    addTransition() {
        let escapePod = new Transition(this, 480, 900, 'H_Beam', 0).setScale(12,0.25);
        this.transitionGroup.add(escapePod);
    }

    // addFuel()
    // add a fuel container into the scene
    addFuel() {
        let fuel = new Hazard(this, this.player.x, 0, 'levelTracker', 0);
        fuel.setVelocityY(globalGravity/2);
        this.fuelGroup.add(fuel);
    }

    platformCollision(){
        // needed?
    }

    // touchWall()
    // triggers audio when player touches wall
    touchWall() {
        if(keyA.isDown || keyD.isDown){
            // this.slapAudio
        }
        else{
            this.slapAudio.play();
        }
    }

    // stageCompletion()
    // starts new scene when triggered
    stageCompletion() {
        this.trackOneBGM.mute = true;
        globalLevel = this.level + 13;
        this.scene.start('stageCompleteScene');
    }
}