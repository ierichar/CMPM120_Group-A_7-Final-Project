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

        this.load.audio('gameOver', './assets/Sounds/gameOver.mp3');
    }

    create() {

        this.GameOverSong = this.sound.add('gameOver', { 
            mute: false,
            volume: .55,
            rate: 1,
            loop: false 
        });
        this.GameOverSong.play();

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

        this.gradient_bg = this.add.tileSprite(0, 0, 960, 640, 'gradient').setOrigin(0, 0);
        this.starfield = this.add.tileSprite(0, 0, 960, 640, 'space').setOrigin(0, 0);

        this.gameOverB = this.add.image(0, 0, 'gameOverBorder').setOrigin(0, 0);
        this.gameOverL = this.add.image(140, 100, 'gameOverLettering').setOrigin(0, 0);

        this.menuButton = this.add.tileSprite(675, 400, 110, 50, 'menuButton').setOrigin(0, 0);
        this.playAgainButton = this.add.tileSprite(200, 400, 110, 50, 'playAgainButton').setOrigin(0, 0);

        // temp: define keys
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.GameOverSong.mute = true;
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.GameOverSong.mute = true;
            this.scene.start('menuScene');
        }
        this.starfield.tilePositionY += 1;
    }
}