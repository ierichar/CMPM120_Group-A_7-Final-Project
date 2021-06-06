class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    preload() {
        this.load.image('gradient', './assets/SmallBackground.png');
        this.load.image('space', './assets/SmallStars.png');
        this.load.image('gameOverBorder', './assets/GameOver/GameOverBorder.png');
        this.load.image('gameOverLettering', './assets/GameOver/GameOverLettering.png');
        this.load.image('menuButton', './assets/GameOver/Menu.png');
        this.load.image('playAgainButton', './assets/GameOver/PlayAgain.png');
        this.load.image('heart', './assets/HUD_UI/BlueHeart.png');
        this.load.image('Goop4', './assets/Level_2/Goop4.png');

        this.load.audio('gameOver', './assets/Sounds/gameOver.mp3');
        this.load.audio('gameOverMetal', './assets/Sounds/final-game-game-over-stage-3.mp3');
    }

    create() {

        this.GameOverSong = this.sound.add('gameOver', { 
            mute: false,
            volume: .55,
            rate: 1,
            loop: false 
        });

        this.GameOverMetal = this.sound.add('gameOverMetal', { 
            mute: false,
            volume: .75,
            rate: 1,
            loop: false 
        });
        if(this.level > stage3Start){
        this.GameOverMetal.play();
        }
        else{
        this.GameOverSong.play();
        }

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

        //assets
        this.gradient_bg = this.add.tileSprite(0, 0, 960, 640, 'gradient').setOrigin(0, 0);
        this.starfield = this.add.tileSprite(0, 0, 960, 640, 'space').setOrigin(0, 0);

        this.gameOverB = this.add.image(0, 0, 'gameOverBorder').setOrigin(0, 0);
        this.gameOverL = this.add.image(140, 100, 'gameOverLettering').setOrigin(0, 0);

        this.menuButton = this.add.tileSprite(675, 400, 110, 50, 'menuButton').setOrigin(0, 0);
        this.playAgainButton = this.add.tileSprite(200, 400, 110, 50, 'playAgainButton').setOrigin(0, 0);

        this.heart = this.add.image(400, 600, 'heart').setScale(.8);
        this.heart.setVisible(false);

        this.goop = this.add.image(400,600, 'Goop4').setScale(.5);
        

        //menu buttons
        this.menuButton.setInteractive();
        this.playAgainButton.setInteractive();

        this.menuButton.on("pointerover", ()=> {
            this.goop.setVisible(true);
            this.goop.x = this.menuButton.x + 130
            this.goop.y = this.menuButton.y + 30;
        })

        this.menuButton.on("pointerout", ()=> {
            this.goop.setVisible(false);
        })

        this.menuButton.on("pointerup", () => {
            this.playMenuScene();
    })

        this.playAgainButton.on("pointerover", ()=> {
            this.heart.setVisible(true);
            this.heart.x = this.playAgainButton.x - 30
            this.heart.y = this.playAgainButton.y + 30;
        })

        this.playAgainButton.on("pointerout", ()=> {
            this.heart.setVisible(false);
        })

        this.playAgainButton.on("pointerup", () => {
            this.playGameScene();
        })
    }

    update() {

        this.starfield.tilePositionY += 1;

    }

    playGameScene(){
        this.GameOverSong.mute = true;
        this.GameOverMetal.mute = true;
        // // update globalLevel to start at previous in play
        // if (globalLevel >= stage0Start && globalLevel <= stage0End) {
        //     globalLevel = stage1Start;
        // } else if (globalLevel >= stage1Start && globalLevel <= stage1End) {
        //     globalLevel = stage2Start;
        // } else if (globalLevel >= stage2Start && globalLevel <= stage2End) {
        //     globalLevel = stage3Start;
        // }
        this.scene.start('playScene');
    }
    playMenuScene(){
        this.GameOverSong.mute = true;
        this.GameOverMetal.mute = true;
        this.scene.start('menuScene');
    }
}