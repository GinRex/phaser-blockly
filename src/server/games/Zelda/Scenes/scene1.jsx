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
(this.score) = this.add.text(100, 100, '0');
this.i = 0;

    // create end
  }



  update() {
    // update start
this.i = ((this.i) + 1);
(this.score).setText((this.i));

    // update end
  }

}

export default scene1;
