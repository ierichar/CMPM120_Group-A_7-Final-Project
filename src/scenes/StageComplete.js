class StageComplete extends Phaser.Scene {
    constructor() {
        super("stageCompleteScene");
    }

    preload() {

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

        this.add.text(game.config.width/2, game.config.height/2 + borderUISize, 'STAGE COMPLETE', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2 + 20, game.config.height/2 + borderUISize*2.5, '(SPACEBAR)', menuConfig).setOrigin(0.5);

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('playScene');
        }
    }
}
