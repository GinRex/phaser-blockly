import 'phaser';
import * as Class from '../Classes';

class scene3 extends Phaser.Scene {
  constructor(props) {
    super({
      key: 'scene3',
    });
  }
  scene3() {
    Phaser.Scene.call(this, { key: 'scene3', active: false });
  }
  // game state start
  preload() {}

  create() {}

  update() {}
  // game state end
}

export default scene3;
