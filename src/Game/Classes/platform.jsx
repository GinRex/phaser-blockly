import * as Motion from '../../client/HandleMotion';
import * as Sprite from '../../client/HandleSprite';
import key from '../keyBoardInput';

export default class platform extends Phaser.GameObjects.Sprite {
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
this.scene.physics.world.enable((this), 1);
this.standAble = false;

    // create end
  }

  // functions start
onCollide = () => {
  (this.scene.playerVar).body.setVelocity(0, (-400));
  (this.scene.playerVar).body.setCollideWorldBounds(false);
  (this.scene.playerVar).body.setBounce(0);

}

  // functions end

  update() {
    // update start
if (!(this.standAble) && ((this.scene.playerVar).y) <= ((this).y) - 20) {
  (this.collider) = this.scene.physics.add.collider(this, (this.scene.playerVar),   this.onCollide);
  this.standAble = true;
}

if (((this.scene.playerVar).y) <= (this.scene.cameraHeight) / 2) {
  Motion.set_y_to(this, ((this).y) + 3);
  (this).body.updateFromGameObject();
}

if (((this).y) > (this.scene.cameraHeight) + 20) {
  (this.scene.platformGroup).remove((this));
  (this.collider).active = false;
  (this).setVisible(false);
}

    // update end
  }
}
