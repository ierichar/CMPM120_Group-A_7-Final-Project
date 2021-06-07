class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('gradient', './assets/Menu/Background_2.png');
        this.load.image('Menu', './assets/Menu/Menu_Panel.png');
        this.load.image('Title', './assets/Menu/Title.png');
        this.load.image('Play', './assets/Menu/Play.png');
        this.load.image('howToPlayButton', './assets/Menu/HowToPlay.png');
        this.load.image('Credits', './assets/Menu/Credits.png');
        this.load.image('earth', './assets/Menu/Earth.png');
        this.load.image('miniElevator', './assets/Menu/MiniElevator.png');
        this.load.image('stars_expanded', './assets/Menu/Stars_Expanded.png');
        this.load.image('Astronaut', './assets/GeneralAssets/SmallAstronaut.png');

        this.load.audio('menuMusic', './assets/Sounds/menuMuisc.mp3')
    }

    
    create() {
        // play audio        
        this.menuAudio = this.sound.add('menuMusic', { 
            mute: false,
            volume: .25,
            rate: 1.1,
            loop: true
        });
        this.menuAudio.play();
        
        // load background and buttons
        this.gradient_bg = this.add.tileSprite(0, 0, 960, 640, 'gradient').setOrigin(0, 0);
        
        this.stars_e = this.add.image(game.config.width/2, 520, 'stars_expanded');
        this.mini_e = this.add.image(game.config.width/2, 850, 'miniElevator');
        this.earth = this.add.image(game.config.width/2, 850, 'earth');
        this.mini_e.setOrigin(2, 0.5);
        this.astronaut = this.add.image(400, 600, 'Astronaut').setScale(.3);
        this.astronaut.setVisible(false);

        this.menu = this.add.tileSprite(-20, 0, 975, 640, 'Menu').setOrigin(0, 0);

        this.title = this.add.tileSprite(65, 150, 807, 79, 'Title').setOrigin(0, 0);
        this.play = this.add.tileSprite(410, 280, 142, 65, 'Play').setOrigin(0, 0);
        this.howToplayButton = this.add.tileSprite(300, 350, 388, 65, 'howToPlayButton').setOrigin(0, 0);
        this.credits = this.add.tileSprite(360, 420, 248, 65, 'Credits').setOrigin(0, 0);
        // clickable sprites
        this.play.setInteractive();
        this.credits.setInteractive();
        this.howToplayButton.setInteractive();

        // play click events
        this.play.on("pointerover", ()=> {
            this.astronaut.setVisible(true);
            this.astronaut.x = this.play.x - 30
            this.astronaut.y = this.play.y + 30;
        })
        this.play.on("pointerout", ()=> {
            this.astronaut.setVisible(false);
        })
        this.play.on("pointerup", () => {
            this.playGameScene();
        })

        
        // how to play events
        this.howToplayButton.on("pointerover", ()=> {
            this.astronaut.setVisible(true);
            this.astronaut.x = this.howToplayButton.x - 30
            this.astronaut.y = this.howToplayButton.y + 30;
        })
        this.howToplayButton.on("pointerout", ()=> {
            this.astronaut.setVisible(false);
        })
        this.howToplayButton.on("pointerup", () => {
            this.howToGameScene();
        })

        // credits click events
        this.credits.on("pointerover", ()=> {
            this.astronaut.setVisible(true);
            this.astronaut.x = this.credits.x - 30;
            this.astronaut.y = this.credits.y + 30;
        })
        this.credits.on("pointerout", ()=> {
            this.astronaut.setVisible(false);
        })
        this.credits.on("pointerup", () => {
            this.creditsGameScene();
        })

    }

    update() {

        // update background
        this.earth.rotation += 0.003
        this.mini_e.rotation += 0.003
        this.stars_e.rotation += 0.003

    }

    // start respective scene
    playGameScene() {
        this.menuAudio.mute = true;
        globalLevel = 1;
        this.scene.start('playScene');
    }
    howToGameScene() {
        this.menuAudio.mute = true;
        this.scene.start('howToPlayScene');
    }
    creditsGameScene() {
        this.menuAudio.mute = true;
        this.scene.start('creditsScene');
    }

    howToPlayGameScene() {
        this.menuAudio.mute = true;
        this.scene.start('howToPlayScene');
    }
}