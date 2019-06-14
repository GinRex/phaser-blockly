import * as Motion from '../../client/HandleMotion';
import * as Sprite from '../../client/HandleSprite';
import key from '../keyBoardInput';

export default class Bird extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    // config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    // this.acceleration = 0;
    // this.body.maxVelocity.x = 0;
    // this.body.maxVelocity.y = 0;
    this.x = config.x;
    this.y = config.y;
    this.setDisplaySize(config.w, config.h);
    // create start
this.scene.physics.world.enable((this), 0);
if ((this.scene.gamestart) == 0) {
  (this).body.setAllowGravity(false);
}

    // create end
  }

  // functions start

  // functions end

  update() {
    // console.log(this.scene.gameOver);
    // update start
if (!(this.scene.gameOver) && (key(this.scene.input.keyboard, 'SPACE').isDown)) {
  this.body.setVelocity(0, (-205));
  (this.scene.centerVar).setVisible(false);
}
if ((this.scene.gameOver) && (key(this.scene.input.keyboard, 'SPACE').isDown)) {
  this.scene.restart();
}
if (this.scene.gameOver) {
  Motion.point_in_direction_degrees(this, 135);
}

    // update end
  }
}
