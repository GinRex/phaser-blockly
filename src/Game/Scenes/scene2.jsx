import 'phaser';
import * as Class from '../Classes';
import key from '../keyBoardInput';

class scene2 extends Phaser.Scene {
  constructor(props) {
    super({
      key: 'scene2',
    });
  }
  scene2() {
    Phaser.Scene.call(this, { key: 'scene2', active: false });
  }

  preload() { }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    // create instances start

    // create instances end

    // game state start
  }

  update() {
    // game state end

    // update object start

    // update object end
  }
}

export default scene2;
