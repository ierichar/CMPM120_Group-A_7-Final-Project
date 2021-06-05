class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        this.load.image('borderScreen', './assets/GameOver/GameOverBorder.png');
        this.load.image('gradient', './assets/SmallBackground.png');
        this.load.image('stars_expanded', './assets/Menu/Stars_Expanded.png');
        this.load.image('creditsLettering', './assets/CreditsLettering.png');

        this.load.image('menuButton', './assets/GameOver/Menu.png');

    }

    create() {
        this.creditsLettering = this.add.image(120, 100, 'creditsLettering').setOrigin(0, 0);
        this.border_Screen= this.add.image(120, 100, 'borderScreen').setOrigin(0, 0);
        this.gradient = this.add.tileSprite(0, 0, 960, 640, 'gradient').setOrigin(0, 0);
        this.starfield = this.add.tileSprite(game.config.width/2, 520, 960, 480, 'stars_expanded').setScale(2);
        this.creditsLettering = this.add.image(120, 100, 'creditsLettering').setOrigin(0, 0);

        this.menuButton = this.add.tileSprite(420, 525, 110, 50, 'menuButton').setOrigin(0, 0);

        // temp: define key
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update() {
        this.starfield.rotation += 0.003

        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('menuScene');
        }
    }
}