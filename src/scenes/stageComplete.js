class stageComplete extends Phaser.Scene {
    constructor() {
        super("stageCompleteScene");
    }

    preload() {

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

        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2, 'Stage Complete', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*3 + borderPadding*3, 'Press (P) to continue!', menuConfig).setOrigin(0.5);

        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            // // update globalLevel to start new level in play
            // if (globalLevel >= stage0Start && globalLevel <= stage0End) {
            //     globalLevel = 20;
            // } else if (globalLevel >= stage1Start && globalLevel <= stage1End) {
            //     globalLevel = stage2Start;
            // } else if (globalLevel >= stage2Start && globalLevel <= stage2End) {
            //     globalLevel = stage3Start;
            // }
            this.scene.start('playScene');
        }
    }
}