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

        this.load.audio('trackOne', './assets/trackOne.mp3');
        this.load.audio('slap', './assets/wallSlap.mp3');
        this.load.audio('jetpack', './assets/jetpackOne.mp3');
    }

    create() {

        
        //Keep track of which stage you are on
        this.stageTracker = 2;


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
        if(this.stageTracker==1){
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
        this.space = this.add.tileSprite(0, 0, 3000, 3000, 'space');
        this.starfield = this.add.tileSprite(0, 0, 3000, 3000, 'stars');
        this.elevator = this.add.tileSprite(480, 960, 0, 3000, 'elevator');

                // create stage gravity (velocity value)
                this.stageGravity = 80;

        //create the left wall
        this.leftWall =  this.add.group();
        for(let i = 0; i < game.config.height; i += tileSize) {
            let leftTile = this.physics.add.sprite(100, i, 'H_Beam', 0).setOrigin(0,0);
            leftTile.body.immovable = true;
            leftTile.body.allowGravity = false;
            leftTile.visible = false;
            this.leftWall.add(leftTile);
        }
        //create the right wall
        this.rightWall =  this.add.group();
        for(let i = 0; i < game.config.height; i += tileSize) {
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



        // create hazard group
        this.hazardGroup = this.add.group({
            runChildUpdate: true,
        });

        // create hazard group
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
        //this.physics.add.collider(this.playerOne, this.spike01, this.touchSpike, false, this);

        this.keyIsPressed = false;

        this.hazardTimer = this.time.addEvent({
            delay: 4000,
            callback: this.addHazard,
            callbackScope: this,
            loop: true,
            startAt: 0
        });

        //spike roof at level 2
        if(this.stageTracker == 2){
        this.spikeyRoof = this.physics.add.sprite(480, 20, 'H_Beam', 0).setScale(12, 0.25);
        this.spikeyRoof.body.immovable = true;
        this.hazardGroup.add(this.spikeyRoof);
        }

        this.escapePodIsSpawned = false;



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
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
    }

    update() {
        //this is how the jetpack sound plays
        //if a key has not previously been pressed and it is now pressed, play a sound, but only once
        if(this.keyIsPressed ==false){
        if((keyA.isDown || keyD.isDown || keyW.isDown|| keyS.isDown)&& (this.player.fuel > 0)){
            this.jetpackAudio.play();
            this.keyIsPressed = true;
        }
        else{
            this.keyIsPressed = false;
        }
    }
    //here is a lockout check to see if a key  is still being pressed. If no, you can reset the first loop next time an update check runs.
    if((keyA.isDown || keyD.isDown || keyW.isDown|| keyS.isDown)&& (this.player.fuel > 0)){
        this.keyIsPressed = true;
    }
    else{
        this.keyIsPressed = false;
    }

    //console.log(this.player.body.velocity);
        this.player.update();
     

        this.displayFuel.text = this.player.getFuel();
        this.player.body.setDragX(this.DRAG);
        this.player.body.setDragY(this.DRAG);
        // update player
        this.player.update(this.stageGravity);

        // player/hazard collision
        this.physics.world.collide(this.player, this.hazardGroup, this.hazardCollision, null, this);

        // player/platform collision
        this.physics.world.collide(this.player, this.platformGroup, this.platformCollision, null, this);

        // update displays
        this.displayFuel.text = this.player.getFuel();
        this.displayHealth.text = this.player.getHealth();
        this.displayLevel.text = Math.floor(this.level);

        // move environment with movement

        if(this.level < 7){
            this.starfield.tilePositionY += 1;
            this.elevator.tilePositionY += 1.3;
        
        if (keyW.isDown && this.player.getFuel() > 0) {
            this.space.tilePositionY -= this.stageGravity/100;
            this.starfield.tilePositionY -=this.stageGravity/100;
            this.elevator.tilePositionY -=this.stageGravity/100;
            this.level -= 1/100;
        } else {
            this.space.tilePositionY += this.stageGravity/100;
            this.starfield.tilePositionY += this.stageGravity/100;
            this.elevator.tilePositionY += this.stageGravity/100;
            // += this.stageGravity/100;
            this.level += 1/100;
        }
    }

    if((this.level > 5) && (this.level < 7)){
    
        if(this.escapePodIsSpawned == false){
            //this.escapePod = this.physics.add.sprite( 480, 500, 'H_Beam', 0).setScale(12,0.25);
            //this.escapePod.body.immovable = true;
            this.addTransition();
            this.physics.add.collider(this.player, this.transitionGroup,this.stageCompletion, false, this);
            this.escapePodIsSpawned = true;
        }
        else{
            //escapePod.setVelocityY(this.stageGravity *-1);
            this.transitionGroup.incY(-1);
        }
    }
}

    // randomly spawn hazards
    addHazard() {
        let rand_obj = Phaser.Math.Between(0, 3);
        let rand_x_pos = Phaser.Math.Between(200, 700);
        if(this.stageTracker == 1){
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
        if(this.stageTracker == 2){
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

    addTransition() {
        let escapePod = new Transition(this, 480, 900, 'H_Beam', 0).setScale(12,0.25);
        this.transitionGroup.add(escapePod);
        
    }

    hazardCollision() {
        if ((this.player.getHealth() > 0) && !(this.player.invincible)) {
            this.player.decrimentHealth();
        } else {
            this.trackOneBGM.stop();
            this.jetpackAudio.stop();
            this.scene.start('gameOverScene');
            this.trackOneBGM.mute = true;
        }
    }

    platformCollision(){

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