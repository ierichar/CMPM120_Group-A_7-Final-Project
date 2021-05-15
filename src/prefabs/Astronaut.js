class Astronaut extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.fuel = 5000;
        this.health = 3;
        this.invincible = false;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setImmovable();
        this.setMaxVelocity(500);
        
        // drag physics
        this.DRAG = 100;
    }

    update(gravity) {
        // keep player drag updated
        this.body.setDragX(this.DRAG);
        this.body.setDragY(this.DRAG);

        if (keyW.isDown && this.fuel > 0) {
            this.setAccelerationY(-500);
            this.fuel -= 1;
        } else if (keyS.isDown && this.fuel > 0) {
            this.setAccelerationY(500);
            this.fuel -= 1;
        } else {
            this.setAccelerationY(gravity);
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

    getHealth() {
        return this.health;
    }

    decrimentHealth() {
        this.health--;
    }

    toggleInvincible() {
        this.invincible = !(this.invincible);
    }
}