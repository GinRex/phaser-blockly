import 'phaser';
import * as Class from '../Classes';

class scene2 extends Phaser.Scene {
  constructor(props) {
    super({
      key: 'scene2',
    });
  }
  scene2() {
    Phaser.Scene.call(this, { key: 'scene2', active: false });
  }
  // game state start

  // game state end
}

export default scene2;
