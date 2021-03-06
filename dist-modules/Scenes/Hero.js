import { foward, set_x_to } from '../HandleMotion';

export default class Hero extends Phaser.GameObjects.Sprite {

    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.acceleration = 600;
        this.body.maxVelocity.x = 200;
        this.body.maxVelocity.y = 500;
        this.x = config.x;
        this.y = config.y;
        this.setDisplaySize(config.width, config.height);
        // set_x_to(this, 0)
    }
}