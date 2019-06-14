import * as Motion from '../../client/HandleMotion';
import * as Sprite from '../../client/HandleSprite';
import key from '../keyBoardInput';

export default class Pipe extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    // config.scene.physics.world.enable(this, 1);
    config.scene.add.existing(this);
    // this.acceleration = 0;
    // this.body.maxVelocity.x = 0;
    // this.body.maxVelocity.y = 0;
    this.x = config.x;
    this.y = config.y;
    this.setDisplaySize(config.w, config.h);
    // create start
this.scene.physics.world.enable((this), 0);
(this).body.setAllowGravity(false);

    // create end
  }

  // functions start

  // functions end

  update() {
    // update start
(this).body.setVelocity((-150), 0);

    // update end
  }
}
