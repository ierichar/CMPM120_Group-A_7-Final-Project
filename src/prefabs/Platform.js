class Platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable();
    }

    update() {
        // temporary wrap until spawns are created
        if (this.y < 0) {
            this.destroy();
        }
    }
}