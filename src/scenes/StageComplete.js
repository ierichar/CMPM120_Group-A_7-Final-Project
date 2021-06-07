class StageComplete extends Phaser.Scene {
    constructor() {
        super("stageCompleteScene");
    }

    preload() {
        this.load.image('victory', './assets/victory.png');
        this.load.image('menuButton', './assets/GameOver/Menu.png');
        this.load.image('AstronautHead', './assets/HUD_UI/AstronautHead.png');
    }

    create() {
        let menuConfig = {
            fontFamily: 'alarm clock',
            fontSize: '48px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }


        if(globalLevel < stage3End){
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize, 'STAGE' + (dialogueCounter) + 'COMPLETE', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2 + 20, game.config.height/2 + borderUISize*2.5, '(SPACEBAR)', menuConfig).setOrigin(0.5);

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        }
        else{
            this.victoryScreen= this.add.image(0, 0, 'victory').setOrigin(0, 0);
            this.menuButton = this.add.tileSprite(430, 525, 110, 50, 'menuButton').setOrigin(0, 0);
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

    }

    update(){
        if(globalLevel < stage3End){
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('playScene');
        }
    }
    }
    playMenuScene(){
        this.scene.start('menuScene');
    }
}
