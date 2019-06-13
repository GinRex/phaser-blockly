import 'phaser';
import * as Class from '../Classes';
import key from '../keyBoardInput';

class scene3 extends Phaser.Scene {
  constructor(props) {
    super({
      key: 'scene3',
    });
  }
  scene3() {
    Phaser.Scene.call(this, { key: 'scene3', active: false });
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  // functions start

  // functions end


  create() {
    // create start

    // create end
  }



  update() {
    // update start

    // update end
  }

}

export default scene3;
