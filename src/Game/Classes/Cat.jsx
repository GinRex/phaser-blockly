import * as Motion from '../../client/HandleMotion';
import * as Sprite from '../../client/HandleSprite';
import key from '../keyBoardInput';

export default class Cat extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    // config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    // this.acceleration = 0;
    // this.body.maxVelocity.x = 0;
    // this.body.maxVelocity.y = 0;
    this.x = config.x;
    this.y = config.y;

    // create start
    // this.body.setSize(20, 10, false);
    this.setDisplaySize(config.w, config.h);
    // this.body.setSize(17, 10, false);
    // this.body.setBounce(1, 1);
    // this.body.setCollideWorldBounds(true);

    // create end
  }

  // functions start

  // functions end

  update() {
    // update start

    // update end
  }
}
