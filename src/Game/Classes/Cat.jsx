import * as Motion from '../../client/HandleMotion';
import * as Sprite from '../../client/HandleSprite';

export default class Cat extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    const scene = config.scene;
    // this.acceleration = 0;
    // this.body.maxVelocity.x = 0;
    // this.body.maxVelocity.y = 0;
    this.x = config.x;
    this.y = config.y;
    this.setDisplaySize(config.w, config.h);
    // create start

    // create end

    // code start
  }
  update(scene) {
  }
  // code end
}
