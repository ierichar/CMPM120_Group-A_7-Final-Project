class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    preload() {
        this.load.image('gradient', './assets/SmallBackground.png');
        this.load.image('space', './assets/SmallStars.png');

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

        // display menu text
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2, 'GAME OVER', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*3 + borderPadding*3, 'Press (P) to play again!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*4 + borderPadding*4, 'Press (M) to go to menu!', menuConfig).setOrigin(0.5);


        // define keys
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