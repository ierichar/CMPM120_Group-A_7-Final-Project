class Astronaut extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.fuel = 5000;
    }

    update() {
        if (keyW.isDown && this.fuel > 0) {
            this.setAccelerationY(-500);
            this.fuel -= 1;
        } else if (keyS.isDown && this.fuel > 0) {
            this.setAccelerationY(500);
            this.fuel -= 1;
        } else {
            this.setAccelerationY(0);
        }
        if (keyA.isDown && this.fuel > 0) {
            this.setAccelerationX(-500);
            this.fuel -= 1;
        } else if (keyD.isDown && this.fuel > 0) {
            this.setAccelerationX(500);
            this.fuel -= 1;
        } else {
            this.setAccelerationX(0);
        }
    }

    getFuel() {
        return this.fuel;
    }
}