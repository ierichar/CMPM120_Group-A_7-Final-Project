class Astronaut extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.fuel = 5000;
        this.health = 3;
        this.invincible = false;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setMaxVelocity(globalGravity);
        
        // drag physics
        this.DRAG = 100;
    }

    update() {
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
            this.setAccelerationY(1);
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

        if (this.y > game.config.height) {
            this.setAccelerationY(0);
        }
    }

    // Access Functions -------------------------------------------------------
    getFuel() {
        return this.fuel;
    }

    getHealth() {
        return this.health;
    }

    getInvincible() {
        return this.invincible;
    }

    // Manipulation Procedures ------------------------------------------------
    reFuel() {
        this.fuel += 500;
    }

    decrimentHealth() {
        if (!this.invincible) {
            this.health--;
        }
    }

    toggleInvincible() {
        console.log('toggleInvincible() called');
        this.invincible = !(this.invincible);
    }
}