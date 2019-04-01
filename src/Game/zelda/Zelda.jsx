import * as Motion from '../../client/HandleMotion';
import * as Sprite from '../../client/HandleSprite';

export default class Zelda extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.acceleration = 0;
    this.body.maxVelocity.x = 0;
    this.body.maxVelocity.y = 0;
    this.x = config.x;
    this.y = config.y;
    this.setDisplaySize(config.width, config.height);
    // constructor here
  }
  update() {
Motion.foward( this, 5);

    // update here
  }
}
