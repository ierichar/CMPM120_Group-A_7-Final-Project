class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('gradient', './assets/Background_2.png');
        this.load.image('Menu', './assets/Menu_Panel.png');
        this.load.image('Title', './assets/Title.png');
        this.load.image('Play', './assets/Play.png');
        this.load.image('HowToPlay', './assets/HowToPlay.png');
        this.load.image('Credits', './assets/Credits.png');
        this.load.image('earth', './assets/Earth.png');
        this.load.image('miniElevator', './assets/MiniElevator.png');
        this.load.image('stars_expanded', './assets/Stars_Expanded.png');
    }

    create() {
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
        
        this.stars_e = this.add.image(game.config.width/2, 520, 'stars_expanded');
        this.mini_e = this.add.image(500, 850, 'miniElevator');
        this.earth = this.add.image(500, 850, 'earth');
        this.mini_e.setOrigin(2, 0.5);

        this.menu = this.add.tileSprite(0, 0, 960, 640, 'Menu').setOrigin(0, 0);

        this.title = this.add.tileSprite(85, 150, 807, 79, 'Title').setOrigin(0, 0);
        this.play = this.add.tileSprite(420, 280, 142, 65, 'Play').setOrigin(0, 0);
        this.howToplay = this.add.tileSprite(300, 350, 388, 65, 'HowToPlay').setOrigin(0, 0);
        this.credits = this.add.tileSprite(370, 420, 248, 65, 'Credits').setOrigin(0, 0);
        
        //this.starfield = this.add.tileSprite(0, 0, 960, 640, 'space').setOrigin(0, 0);


        // define keys
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.scene.start('playScene');
        }
        //this.starfield.tilePositionY += 1;
        this.earth.rotation += 0.003
        this.mini_e.rotation += 0.003
        this.stars_e.rotation += 0.003
    }
}