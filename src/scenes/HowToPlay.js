class HowToPlay extends Phaser.Scene {
    constructor() {
        super("howToPlayScene");
    }

    preload() {
        this.load.image('borderScreen', './assets/GameOver/GameOverBorder.png');
        this.load.image('gradient', './assets/SmallBackground.png');
        this.load.image('stars_expanded', './assets/Menu/Stars_Expanded.png');
        this.load.image('tutorialLettering', './assets/HowToPlayLettering.png');
        this.load.image('AstronautHead', './assets/HUD_UI/AstronautHead.png');

        this.load.image('menuButton', './assets/GameOver/Menu.png');
    }

    create() {
        // add background and buttons
        this.gradient = this.add.tileSprite(0, 0, 960, 640, 'gradient').setOrigin(0, 0);
        this.starfield = this.add.tileSprite(game.config.width/2, 520, 960, 480, 'stars_expanded').setScale(2);
        this.border_Screen= this.add.image(0, 0, 'borderScreen').setOrigin(0, 0);
        
        this.creditsLettering = this.add.image(100, 100, 'tutorialLettering').setOrigin(0, 0);

        this.menuButton = this.add.tileSprite(710, 525, 110, 50, 'menuButton').setOrigin(0, 0);

        this.astronaut = this.add.image(400, 600, 'AstronautHead').setScale(.8);
        this.astronaut.setVisible(false);

        this.menuButton.setInteractive();
        
        // menu click events
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
        // update background
        this.starfield.rotation += 0.003
    }

    // scene transition
    playMenuScene(){
        this.scene.start('menuScene');
    }
}