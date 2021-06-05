class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        this.load.image('gradient', './assets/SmallBackground.png');
        this.load.image('stars_expanded', './assets/Menu/Stars_Expanded.png');
        this.load.image('creditsLettering', './assets/CreditsLettering.png');
        this.load.image('AstronautHead', './assets/HUD_UI/AstronautHead.png');

        this.load.image('menuButton', './assets/GameOver/Menu.png');

    }

    create() {
        this.gradient = this.add.tileSprite(0, 0, 960, 640, 'gradient').setOrigin(0, 0);
        this.starfield = this.add.tileSprite(game.config.width/2, 520, 960, 480, 'stars_expanded').setScale(2);
        this.creditsLettering = this.add.image(120, 100, 'creditsLettering').setOrigin(0, 0);

        this.menuButton = this.add.tileSprite(420, 525, 110, 50, 'menuButton').setOrigin(0, 0);

        this.astronaut = this.add.image(400, 600, 'AstronautHead').setScale(.8);
        this.astronaut.setVisible(false);

        this.menuButton.setInteractive();

        this.menuButton.on("pointerover", ()=> {
            this.astronaut.setVisible(true);
            this.astronaut.x = this.menuButton.x - 50
            this.astronaut.y = this.menuButton.y + 25;
        })

        this.menuButton.on("pointerout", ()=> {
            this.astronaut.setVisible(false);
        })

        this.menuButton.on("pointerup", () => {
            this.playMenuScene();
    })

    }

    update() {
        this.starfield.rotation += 0.003

    }
    playMenuScene(){
        this.scene.start('menuScene');
    }
}