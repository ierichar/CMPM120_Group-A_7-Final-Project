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
        this.load.image('elevator2', './assets/Level_2/Level_2.png');
        this.load.image('elevator3', './assets/Level_3/Level3_BaseTile.png');
        this.load.image('airlock', './assets/Level_3/Airlock.png');

        // UI
        this.load.image('TopBar', './assets/HUD_UI/TopBar.png');
        this.load.image('LeftPanel', './assets/HUD_UI/LeftPanel.png');
        this.load.image('RightPanel', './assets/HUD_UI/LeftPanelEmpty.png');
        this.load.image('LeftBottomPanel', './assets/HUD_UI/LeftBottomPanel.png');
        this.load.image('RightBottomPanel', './assets/HUD_UI/RightBottomPanel.png');
        this.load.image('FuelBarOutline', './assets/HUD_UI/FuelBarOutline.png');
        this.load.image('FuelGauge', './assets/HUD_UI/FuelBar.png');
        this.load.image('elevatorUI', './assets/HUD_UI/Elevator_UI.png');
        this.load.image('levelTracker', './assets/HUD_UI/Elevator_Indicator.png');
        this.load.image('astrohead', './assets/HUD_UI/AstronautHead.png');
        this.load.image('heart', './assets/HUD_UI/BlueHeart.png');
        this.load.image('stage1text', './assets/HUD_UI/Stage1_Text.png');
        this.load.image('stage2text', './assets/HUD_UI/Stage2_Text.png');
        this.load.image('stage3text', './assets/HUD_UI/Stage3_Text.png');
        this.load.image('Transmission_Text', './assets/HUD_UI/TransmissionText.png');
        this.load.image('TextBox', './assets/HUD_UI/TextBox.png');

        // game objects
        this.load.image('Astronaut', './assets/GeneralAssets/SmallAstronaut.png');
        this.load.image('FuelCanister', './assets/FuelCanister.png');
        this.load.image('L_Beam', './assets/Level_1/L_Beam.png');
        this.load.image('H_Beam', './assets/Level_1/H_Beam.png');
        this.load.image('drill', './assets/Level_2/Drill.png');
        this.load.image('wrench', './assets/Level_2/Wrench.png');
        this.load.image('transitionLab', './assets/Level_2/ResearchLab_Hatch.png');
            // level 1
        this.load.image('calculator', './assets/Level_1/Calculator.png');
        this.load.image('magnet', './assets/Level_1/Magnet.png');
        this.load.image('microscope', './assets/Level_1/Microscope.png');
        this.load.image('telescope', './assets/Level_1/Telescope.png');
        this.load.image('vials', './assets/Level_1/Vials.png');
        this.load.image('transitionEngineer', './assets/Level_1/EngineerBay_Hatch.png');
            // level 2
        this.load.image('spikeRoof', './assets/Level_2/TopGoopWall.png');
        this.load.image('LeftPlatform', './assets/Level_2/LeftPlatform.png');
        this.load.image('RightPlatform', './assets/Level_2/RightPlatform.png');
        this.load.image('MiddlePlatform', './assets/Level_2/MiddlePlatform.png');
            // level 3
        //load goop and monster
        this.load.image('Goop1', './assets/Level_2/Goop1.png');
        this.load.image('Goop2', './assets/Level_2/Goop2.png');
        this.load.image('Goop3', './assets/Level_2/Goop3.png');
        this.load.image('Goop4', './assets/Level_2/Goop4.png');
        this.load.image('Goop5', './assets/Level_2/Goop5.png');
        this.load.image('Goop6', './assets/Level_2/Goop6.png');
        this.load.image('Goop7', './assets/Level_2/Goop7.png');
        this.load.image('monster', './assets/Level_3/Monster.png');
        this.load.image('Goop19', './assets/Level_3/Goop19.png');
        // load projectiles
        this.load.image('projectile1', './assets/GeneralLevelAssets/Boogie1.png');
        this.load.image('projectile2', './assets/GeneralLevelAssets/Boogie2.png');
        this.load.image('projectile3', './assets/GeneralLevelAssets/Boogie3.png');
        this.load.image('projectile4', './assets/GeneralLevelAssets/Boogie4.png');
        this.load.image('projectile5', './assets/GeneralLevelAssets/Boogie5.png');
        this.load.image('projectile6', './assets/GeneralLevelAssets/Boogie6.png');
        this.load.image('projectile7', './assets/GeneralLevelAssets/Boogie7.png');
        this.load.image('projectile8', './assets/GeneralLevelAssets/Boogie8.png');

        //textbox animation
        this.load.atlas('TextBoxAtlas', './assets/TextBox_Anims.png', './assets/TextBox_Anims.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        this.load.atlas('TextBoxReverseAtlas', './assets/TextBox_Anims_Reverse.png', './assets/TextBox_Anims_Reverse.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

        // audio
        this.load.audio('trackOne', './assets/Sounds/trackOne.mp3');
        this.load.audio('trackTwo', './assets/Sounds/final-game-level-2-audio.mp3');
        this.load.audio('trackThree', './assets/Sounds/final-game-level-3-part-1-audio.mp3');
        this.load.audio('slap', './assets/Sounds/wallSlap.mp3');
        this.load.audio('jetpack', './assets/Sounds/jetpackOne.mp3');
        this.load.audio('clang', './assets/Sounds/clang.mp3');
        this.load.audio('pickupNoise', './assets/Sounds/pickupNoise.mp3');
        this.load.audio('tutorialSong', './assets/Sounds/final-game-tutorial-audio.mp3');
        this.load.audio('finalBoss', './assets/Sounds/finalboss.mp3');
    }

    //========================= CREATE() ======================================
    create() {
        // Play Config
        let playConfig = {
            fontFamily: 'alarm clock',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 180
        }

        // Create animations
        // text_bos push config
        this.anims.create({
            key:'Text_Box', //key
            // repeat: -1,
            frames: this.anims.generateFrameNames('TextBoxAtlas', { //ref atlas name
                end: 24,
                start: 1
            }),
            framerate: 5,
        })

        this.anims.create({
            key:'Text_Box_Reverse', //key
            // repeat: -1,
            frames: this.anims.generateFrameNames('TextBoxReverseAtlas', { //ref atlas name
                end: 24,
                start: 1
            }),
            framerate: 5
        })

        // Predetermined level milestones -------------------------------------
        // create stage level tracker
        this.level = globalLevel;

        // Create Audio -------------------------------------------------------
        //load the audio
        this.trackOneBGM = this.sound.add('trackOne', { 
            mute: false,
            volume: .15,
            rate: 1,
            loop: true 
        });
        this.trackTwoBGM = this.sound.add('trackTwo', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        this.trackThreeBGM = this.sound.add('trackThree', { 
            mute: false,
            volume: .15,
            rate: 1,
            loop: true 
        });
        this.trackTutorial = this.sound.add('tutorialSong', { 
            mute: false,
            volume: .15,
            rate: 1,
            loop: true 
        });
        this.finalBoss = this.sound.add('finalBoss', { 
            mute: false,
            volume: .15,
            rate: 1,
            loop: true 
        });

        if (this.level > stage0Start && this.level < stage1Start) {
            this.trackOneBGM.play();
        }
        if (this.level > stage1Start && this.level < stage2Start) {
            this.trackTutorial.play();
        }
        if (this.level > stage2Start && this.level < stage3Start) {
            this.trackTwoBGM.play();
        }
        if (this.level > stage3Start && this.level < stage3End) {
            this.finalBoss.play();
        }

        this.slapAudio = this.sound.add('slap', { 
            mute: false,
            volume: .5,
            rate: 1,
            loop: false
        });
        this.clang = this.sound.add('clang', {
            mute:false,
            volume: .25,
            rate: 1,
            loop:false
        })
        this.pickupAudio = this.sound.add('pickupNoise', { 
            mute: false,
            volume: .5,
            rate: 1,
            loop: false
        });
        this.jetpackAudio = this.sound.add('jetpack', { 
            mute: false,
            volume: .05,
            rate: .3,
            loop: false
        });

        // Create Environment -------------------------------------------------        
        // create background
        this.space = this.add.image(480, 320, 'gradient');
        this.starfield = this.add.tileSprite(480, 320, 960, 640, 'space');
        this.elevator = this.add.tileSprite(480, 320, 0, 0, 'elevator');
        this.elevator2 = this.add.tileSprite(480, 320, 0, 0, 'elevator2').setAlpha(0);
        this.elevator3 = this.add.tileSprite(480, 320, 0, 0, 'elevator3').setAlpha(0);
        this.stage3airlock = this.add.image(480, 900, 'airlock').setAlpha(0);
        this.airlockIsSpawned = false;

        // create playable character
        this.player = new Astronaut(this, 480, 320, 'Astronaut', 0).setScale(0.5);
        // define movement keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyIsPressed = false;

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

        // Object and Character Creation --------------------------------------
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
            this.pickupAudio.play();
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
        this.physics.add.collider(this.player, this.platformGroup);

        // create goop group... yes, you heard me
        this.goopGroup = this.add.group({
            runChildUpdate: true,
        })

        // create projectile group
        this.projectileGroup = this.add.group({
            runChildUpdate: true,
        })

        // create transition group
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
            delay: 2000,
            callback: this.addHazard,
            callbackScope: this,
            loop: true
        });

        // stage 3 goop timer
        this.goopTimer = this.time.addEvent({
            delay: 1500,
            callback: this.addGoop,
            callbackScope: this,
            loop: true
        });
        // stage 3 projectile timer
        this.projectileTimer = this.time.addEvent({
            delay: 2500,
            callback: this.addProjectile,
            callbackScope: this,
            loop: true
        })

        this.escapePodIsSpawned = false;
        this.roofIsSpawned = false;
        this.monsterIsSpawned = false;

        // Create UI ----------------------------------------------------------
        // add UI 
        this.UI_TopBar = this.add.image(game.config.width/2, 20, 'TopBar');
        this.UI_LeftPanel = this.add.image(115, 70, 'LeftPanel');
        this.UI_RightPanel = this.add.image(850, 70, 'RightPanel');
        this.UI_LeftBottomPanel = this.add.image(115, 580, 'LeftBottomPanel');
        this.UI_RightBottomPanel = this.add.image(850, 580, 'RightBottomPanel');
        this.UI_Elevator = this.add.image(102, 325, 'elevatorUI');
        this.UI_LevelTrack = this.add.image(100, (203 + this.level), 'levelTracker');
        // create hearts and astrohead
        this.heart1 = this.add.image(120, 82, 'heart');
        this.heart2 = this.add.image(160, 85, 'heart');
        this.heart3 = this.add.image(200, 88, 'heart');
        this.astrohead = this.add.image(40, 65, 'astrohead');

        // create fuel display
        this.fuelOutline = this.add.image(484, 40, 'FuelBarOutline');
        this.fuelGauge = this.add.image(484, 40, 'FuelGauge');
        this.displayFuel = this.add.text(550, 42, this.player.getFuel(), playConfig).setOrigin(0.5);
        // create level descent tracker
        playConfig.fontSize = '28px';
        this.displayLevel = this.add.text(60, 540, Math.floor(230005 - this.level*100), playConfig);
        // create stage display
        this.stage1Display = this.add.image(858, 570, 'stage1text').setAlpha(0);
        this.stage2Display = this.add.image(858, 570, 'stage2text').setAlpha(0);
        this.stage3Display = this.add.image(858, 570, 'stage3text').setAlpha(0);
    
        // SPECIAL: prompt goes with elevatorAirLock
        this.winPrompt = this.add.text(game.config.width/2 + 20, game.config.height/2 + borderUISize*3, '(SPACEBAR)', playConfig).setOrigin(0.5).setAlpha(0);

        // setup dialogue
        this.dialogueArr = [
            // tutorial
            'Hey, we have a problem.\n'+ 
            'An unexpected meteor storm\n'+ 
            'has collided with the Global\n'+
            'Astro Research Center! If\n'+
            'you don’t remember anything\n'+
            'from your training, make \n'+ 
            'sure you use WASD to move\n'+
            'in all directions to avoid\n'+
            'hazards and collect fuel.\n'+
            'A small alien life-form has\n'+
            'escaped containment and it’s\n'+
            'headed through the elevator\n'+
            'straight to Earth! Stop the\n'+
            'alien before it\'s too late!\n',
            // stage 1
            'This is the observation deck.\n\n'+
            'Watch out for falling\n'+
            'equipment and remember...\n\n'+
            'Keep an eye on your fuel\n'+
            'as well as your health. \nWe\'re'+
            ' counting on you.', 
            // stage 2
            'You\'re one floor away\n'+
            'from that THING.\n\n'+
            'Don\'t get caught by the\n'+
            'lifting platforms or\n'+
            'you\'ll get squished.\n'+
            'You\'re almost there!', 
            // stage 3
            'If--- you--- hear--\n'+
            'me --- send it--- \n'+
            'airlock!'
        ];
        this.ActiveTransmission = true;
        if (this.ActiveTransmission == true) {
            this.TransmissionText = this.add.image(850, 70, 'Transmission_Text');
            this.Text_Box = this.add.sprite(853, 240, 'TextBox', 0);
            this.Text_Box.anims.play('Text_Box');
            var dialogueText;
            this.dialogueTimer = this.time.addEvent({
                delay: 1000,
                callback: () => {
                    playConfig.fontFamily = 'Arial';
                    playConfig.fontSize = '14px';
                    dialogueText = this.add.text(760, 125, this.dialogueArr[dialogueCounter++], playConfig);
                },
                callbackScope: this
            })
            this.textBoxTimer = this.time.addEvent({
                delay: 15000,
                callback: ()=> {
                    dialogueText.destroy();
                    this.Text_Box.anims.play('Text_Box_Reverse');
                },
                callbackScope: this,
                loop: false,
            })
            this.ActiveTransmission = false;
            // this.Text_Box.anims.play('Text_Box_Reverse');
        }

    }

    //========================= UPDATE() ======================================
    update() {
        // dialogue display update
        this.Text_Box.setDisplaySize(207, 250);

        // Game State Updates -------------------------------------------------
        if (this.gameOver == true) {
            this.trackOneBGM.stop();
            this.trackTutorial.play();
            this.trackTwoBGM.stop();
            this.trackThreeBGM.stop();
            this.finalBoss.stop();
            this.trackTutorial.stop();
            this.jetpackAudio.stop();
            this.trackOneBGM.mute = true;
            this.trackTutorial.mute = true;
            this.trackTwoBGM.mute = true;
            this.trackThreeBGM.mute = true;
            this.finalBoss.mute = true;
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
        this.displayLevel.text = Math.floor(18005 - this.level*100);
        // update dialogue
        if (globalLevel < stage0End) {
            this.dialogueText = this.dialogueArr[0];
        } else if (globalLevel < stage1End) {
            this.dialogueText = this.dialogueArr[1];
        } else if (globalLevel < stage2End) {
            this.dialogueText = this.dialogueArr[2];
        } else if (globalLevel < stage2End) {
            this.dialogueText = this.dialogueArr[3];
        } else {
            this.dialogueText = this.dialogueArr[0];
        }

        // Environment Updates ------------------------------------------------
        // move environment with movement
        if ((this.level >= stage0Start && this.level < stage0End)
            || (this.level >= stage1Start && this.level < stage1End)
            || (this.level >= stage2Start && this.level < stage2End)
            || (this.level >= stage3Start && this.level < stage3End)) {
            this.starfield.tilePositionY += 1;
            this.elevator.tilePositionY += 1.3;
            this.elevator2.tilePositionY += 1.3;
            this.elevator3.tilePositionY += 1.3;
            this.UI_LevelTrack.y += 1/25;
            
            if (keyW.isDown && this.player.getFuel() > 0) {
                // update background
                this.space.tilePositionY -= this.stageGravity/100;
                this.starfield.tilePositionY -= this.stageGravity/100;
                this.elevator.tilePositionY -= this.stageGravity/100;
                this.elevator2.tilePositionY -= this.stageGravity/100;
                this.elevator3.tilePositionY -= this.stageGravity/100;
                // update level
                this.level += 1/200;
            } else {
                // update background
                this.space.tilePositionY += this.stageGravity/100;
                this.starfield.tilePositionY += this.stageGravity/100;
                this.elevator.tilePositionY += this.stageGravity/100;
                this.elevator2.tilePositionY += this.stageGravity/100;
                this.elevator3.tilePositionY += this.stageGravity/100;
                // update level
                this.level += 1/100;
            }
        }

        // spawn transition between 0 -> 1, and 1 -> 2
        if ((this.level > stage0End - 2.5 && this.level < stage0End) ||
            (this.level > stage1End - 2.5 && this.level < stage1End) ||
            (this.level > stage2End - 2.5 && this.level < stage2End)) {
            if (this.escapePodIsSpawned == false) {
                this.addTransition();
                this.physics.add.collider(this.player, this.transitionGroup,this.stageCompletion, false, this);
                this.escapePodIsSpawned = true;
            } else {
                this.transitionGroup.incY(-1);
            }
        }
        if (this.level > stage3End - 4.5 && this.level < stage3End) {
            this.stage3airlock.setAlpha(1);
            this.stage3airlock.y -= 1.3;
        }

        // Stage start dependencies -------------------------------------------
        if (this.level > stage1Start) {
            // cycle stage display
            this.stage1Display.setAlpha(1);
        }
        if (this.level > stage2Start) {
            // change background
            this.elevator.setAlpha(0);
            this.elevator2.setAlpha(1);
            // add roof
            this.addRoof();
            // cycle stage display
            this.stage1Display.setAlpha(0);
            this.stage2Display.setAlpha(1);
        }
        if (this.level > stage3Start) {
            // add monster
            this.addMonster();
            // change background
            this.elevator2.setAlpha(0);
            this.elevator3.setAlpha(1);
            // cycle stage display
            this.stage2Display.setAlpha(0);
            this.stage3Display.setAlpha(1);
        }
        if (this.level > stage3End) {
            this.winPrompt.setAlpha(1);
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
                player.toggleInvincible();
                this.playerInvuln = this.time.addEvent({
                    delay: 1500,
                    callback: ()=>{
                        player.alpha = 1;
                        player.toggleInvincible();
                    },
                    loop: false
                })
            }
        }, null, this);
        // dangerous wall damage calculation
        this.physics.world.overlap(this.player, this.goopGroup, function(player, hazard) {
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
        // goop projectile damage calculation
        this.physics.world.overlap(this.player, this.projectileGroup, function(player, hazard) {
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

        // VICTORY!!!
        if (keySpace.isDown && this.level >= stage3End) {
            this.stageCompletion();
        }
    }
    
    //======================== EXTERNAL FUNCTIONS =============================

    // addDummy()
    // add tutorial objects to scene
    addDummy() {
        if (this.level > stage0Start && this.level < stage0End) {
            let dummy = new Hazard(this, 480, 0, 'drill', 0).setScale(.5);
            dummy.setVelocityY(globalGravity/2);
            dummy.body.setAngularVelocity(50);
            this.dummyGroup.add(dummy);
        }
    }

    // addHazard()
    // randomly spawn hazards based on level (stage)
    addHazard() {
        let rand_x_pos = Phaser.Math.Between(elevatorLeft + 100, elevatorRight - 100);
        let rand_velocity = Phaser.Math.Between(200, 400);
        let rand_rotation = Phaser.Math.Between(-100, 100);
        if (this.level > stage1Start && this.level < stage1End) {
            // hazard randomizer for level 1
            let rand_obj = Phaser.Math.Between(0, 4);
            switch(rand_obj) {
                case 0:
                    let calculator = new Hazard(this, rand_x_pos, 0, 'calculator', 0).setScale(0.5);
                    calculator.setVelocityY(rand_velocity);
                    calculator.body.setCircle(calculator.height/2);
                    calculator.setAngularVelocity(rand_rotation);
                    this.hazardGroup.add(calculator);
                    break;
                case 1:
                    let magnet = new Hazard(this, rand_x_pos, 0, 'magnet', 0).setScale(0.5);
                    magnet.setVelocityY(rand_velocity);
                    magnet.body.setCircle(magnet.height/2);
                    magnet.setAngularVelocity(rand_rotation);
                    this.hazardGroup.add(magnet);
                    break;
                case 2:
                    let microscope = new Hazard(this, rand_x_pos, 0, 'microscope', 0);
                    microscope.setVelocityY(rand_velocity);
                    microscope.body.setCircle(microscope.height/2);
                    microscope.setAngularVelocity(rand_rotation);
                    this.hazardGroup.add(microscope);
                    break;
                case 3:
                    let telescope = new Hazard(this, rand_x_pos, 0, 'telescope', 0);
                    telescope.setVelocityY(rand_velocity);
                    telescope.body.setCircle(telescope.height/2);
                    telescope.setAngularVelocity(rand_rotation);
                    this.hazardGroup.add(telescope);
                    break;
                case 4:
                    let vials = new Hazard(this, rand_x_pos, 0, 'vials', 0).setScale(0.5);
                    vials.setVelocityY(rand_velocity);
                    vials.body.setCircle(vials.height/2);
                    vials.setAngularVelocity(rand_rotation);
                    this.hazardGroup.add(vials);
                    break;
            }
        }
        if (this.level > stage2Start && this.level < stage3Start) {
            // hazard randomizer for level 2
            let rand_obj = Phaser.Math.Between(0, 3);
            switch (rand_obj) {
                case 0:
                    let drill = new Hazard(this, rand_x_pos, 0, 'drill', 0).setScale(.5).setOrigin(.5,.5);
                    drill.setVelocityY(rand_velocity);
                    drill.body.setAngularVelocity(rand_rotation);
                    drill.body.setCircle(drill.height/3);
                    drill.body.setCircle(50, 0, -25);
                    this.hazardGroup.add(drill);
                    break;
                case 1:
                    let wrench = new Hazard(this, rand_x_pos, 0, 'wrench', 0).setScale(.5);
                    wrench.setVelocityY(rand_velocity);
                    wrench.body.setAngularVelocity(rand_rotation);
                    wrench.body.setCircle(wrench.width/3);
                    wrench.body.setCircle(35,-25,-5);
                    this.hazardGroup.add(wrench);
                    
                    break;
                case 2:
                    let hbeam = new Hazard(this, rand_x_pos, 0, 'H_Beam', 0).setScale(0.35);
                    hbeam.setVelocityY(rand_velocity);
                    this.hazardGroup.add(hbeam);
                    break;
                case 3:
                    let lbeam = new Hazard(this, rand_x_pos, 0, 'L_Beam', 0).setScale(0.35);
                    lbeam.setVelocityY(rand_velocity);
                    this.hazardGroup.add(lbeam);
                    break;
            }
        }
        if (this.level > stage2Start && this.level < stage2End) {
            let rand_obj = Phaser.Math.Between(0, 3);
            // platform randomizer for level 2
            switch (rand_obj) {
                case 0:
                    let leftPlatform = new Platform(this, 330, 680, 'LeftPlatform', 0).setScale(.8, .5);
                    leftPlatform.setVelocityY(-this.stageGravity);
                    this.platformGroup.add(leftPlatform);
                    break;
                case 1:
                    let midLeftPlatform = new Platform(this, 400, 680, 'MiddlePlatform', 0).setScale(.8, .5);
                    midLeftPlatform.setVelocityY(-this.stageGravity);
                    this.platformGroup.add(midLeftPlatform);
                    break;
                case 2:
                    let rightPlatform = new Platform(this, 630, 680, 'RightPlatform', 0).setScale(.8,.5);
                    rightPlatform.setVelocityY(-this.stageGravity);
                    this.platformGroup.add(rightPlatform);
                    break;
                case 3:
                    let midRightPlatform = new Platform(this, 560, 680, 'MiddlePlatform', 0).setScale(.8,.5);
                    midRightPlatform.setVelocityY(-this.stageGravity);
                    this.platformGroup.add(midRightPlatform);
                    break;
            }
        }
    }

    // addRoof()
    // add roof on stage2Start
    addRoof() {
        if (this.roofIsSpawned == false) {
            let spikeyRoof = new Hazard(this, 480, 20, 'spikeRoof', 0);
            spikeyRoof.body.setSize(spikeyRoof.width*1, spikeyRoof.height*.5);
            this.hazardGroup.add(spikeyRoof);
            this.roofIsSpawned = true;
        }
    }

    // addGoop()
    // add various goop assets to the great groovy goop group
    addGoop(){
        let rand_obj = Phaser.Math.Between(0, 2);
        if (this.level > stage3Start) {
            switch (rand_obj) {
                case 0:
                    let goop1 = new Platform(this, 705, 900, 'Goop1', 0).setScale(.75);
                    goop1.setVelocityY(-this.stageGravity);
                    this.goopGroup.add(goop1);
                    let goop7 = new Platform(this, 255, 900, 'Goop7', 0).setScale(.75);;
                    goop7.setVelocityY(-this.stageGravity);
                    this.goopGroup.add(goop7);
                    break;
                case 1:
                    let goop4 = new Platform(this, 255, 900, 'Goop4', 0).setScale(.75);;
                    goop4.setVelocityY(-this.stageGravity);
                    this.goopGroup.add(goop4);
                    let goop3 = new Platform(this, 705, 900, 'Goop3', 0).setScale(.75);;
                    goop3.setVelocityY(-this.stageGravity);
                    this.goopGroup.add(goop3);
                    break;
                case 2:
                    let goop5 = new Platform(this, 255, 900, 'Goop5', 0).setScale(.75);;
                    goop5.setVelocityY(-this.stageGravity);
                    this.goopGroup.add(goop5);
                    let goop6 = new Platform(this, 705, 900, 'Goop6', 0).setScale(.75);;
                    goop6.setVelocityY(-this.stageGravity);
                    this.goopGroup.add(goop6);
                    break;
            }
        }
    }

    // addTransition()
    // adds the transition object into the scene
    addTransition() {
        if (this.level > stage1Start && this.level <= stage1End) {
            let escapePod = new Transition(this, 480, 850, 'transitionEngineer', 0).setScale(1,1);
            this.transitionGroup.add(escapePod);
        } else {
            let escapePod = new Transition(this, 480, 850, 'transitionLab', 0).setScale(1,1);
            this.transitionGroup.add(escapePod);
        }
    }

    // addFuel()
    // add a fuel container into the scene if not at 3000 fuel
    addFuel() {
        if (this.player.getFuel() < 2000) {
            let fuel = new Hazard(this, this.player.x, 0, 'FuelCanister', 0).setScale(.5);
            fuel.setVelocityY(globalGravity/4);
            this.fuelGroup.add(fuel);
        }
    }

    // addProjectile()
    // add projectile into scene
    addProjectile() {
        if (this.level > stage3Start) {
            let rand_x_pos = Phaser.Math.Between(elevatorLeft + 100, elevatorRight - 100);
            let x_velocity;
            if (rand_x_pos > game.config.width/2) {
                x_velocity = -50;
            } else if (rand_x_pos < game.config.width/2) {
                x_velocity = 50;
            } else {
                x_velocity = 0;
            }
            let goopProjectileArr = ['projectile1', 'projectile2', 'projectile3', 'projectile4',
                                     'projectile5', 'projectile6', 'projectile7', 'projectile8'];
            let rand_obj = Phaser.Math.Between(0, 7);
            let projectile = new Platform(this, rand_x_pos, 700, goopProjectileArr[rand_obj], 0).setOrigin(0.5);
            projectile.body.setCircle(projectile.width/2.5);
            projectile.body.setAngularVelocity(this.stageGravity);
            projectile.setVelocityY(-this.stageGravity*2);
            projectile.setVelocityX(x_velocity);
            this.projectileGroup.add(projectile);
        }
    }


    // addMonster()
    // add monster at stage3Start
    addMonster() {
        if (this.monsterIsSpawned == false) {
            let monsterBody = new Hazard(this, 480, 450, 'Goop19', 0).setOrigin(0.5, 0.5);
            let monster = new Hazard(this, 480, 590, 'monster', 0).setOrigin(0.5);
            monster.body.setSize(monster.width/2, monster.height*.7);
            this.hazardGroup.add(monster);
            this.monsterIsSpawned = true;
        }
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
        // mute audio
        this.trackOneBGM.mute = true;
        this.trackTutorial.mute = true;
        this.trackTwoBGM.mute = true;
        this.trackThreeBGM.mute = true;
        this.finalBoss.mute = true;
        // bump level +3 incase of early transition
        globalLevel = this.level + 13;
        this.scene.start('stageCompleteScene');
    }
}