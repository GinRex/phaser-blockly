import 'phaser';
import * as Class from '../Classes';
import key from '../keyBoardInput';

class SceneName extends Phaser.Scene {
  constructor(props) {
    super({
      key: 'SceneName'
    });
  }
  SceneName() {
    Phaser.Scene.call(this, { key: 'SceneName', active: false });
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

export default SceneName;