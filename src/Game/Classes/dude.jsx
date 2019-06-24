import * as Motion from '../../client/HandleMotion';
import * as Sprite from '../../client/HandleSprite';
import key from '../keyBoardInput';

export default class dude extends Phaser.GameObjects.Sprite {
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

    // create end
  }

  // functions start

  // functions end

  update() {
    // update start
if (key(this.scene.input.keyboard, 'LEFT').isDown) {
  Motion.foward( this, -5);
  (this).play('standLeft');
}

if (key(this.scene.input.keyboard, 'RIGHT').isDown) {
  Motion.foward( this, 5);
  (this).play('standRight');
}

if (((this).x) < -10) {
  Motion.set_x_to(this, this.scene.cameraWidth);
}
if (((this).x) > (this.scene.cameraWidth)) {
  Motion.set_x_to(this, -10);
}

if (((this).y) <= (this.scene.cameraHeight) / 2) {
  this.scene.score = ((this.scene.score) + 1);
  (this.scene.scoreLabel).setText((this.scene.score));
}

if (((this).y) > (this.scene.cameraHeight) + 30) {
  this.scene.gameOver = true;
}

    // update end
  }
}
