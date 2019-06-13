import 'phaser';
import * as Class from '../Classes';
import key from '../keyBoardInput';

class scene1 extends Phaser.Scene {
  constructor(props) {
    super({
      key: 'scene1',
    });
  }
  scene1() {
    Phaser.Scene.call(this, { key: 'scene1', active: false });
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  // functions start

  // functions end


  create() {
    // create start
    this.cat1 = new Class.Cat({
      scene: this,
      key: '',
      x: 0,
      y: 0,
      w: 200,
      h: 200,
    });
    (this.cat1).x = 200;
    (this.cat1).y = 200;
    // (this.cat1).setDisplaySize(100, 100);
    (this.cat1).play('bird');
    this.cat2 = new Class.Cat({
      scene: this,
      key: '',
      x: 0,
      y: 0,
      w: 200,
      h: 200,
    });
    (this.cat2).x = 100;
    (this.cat2).y = 350;
    // (this.cat1).setDisplaySize(100, 100);
    (this.cat2).play('bird');
    this.physics.world.enable(this.cat1, 0);
    this.physics.world.enable(this.cat2, 1);
    this.cat1.body.setSize(17, 10, false);
    this.cat2.body.updateFromGameObject();
    this.cat1.body.setGravity(0, 100);
    this.physics.world.collide(this.cat1, this.cat2);

    // create end
  }


  update() {
    // update start

    // update end
  }
}

export default scene1;
