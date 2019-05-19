import 'phaser';
import * as Class from '../Classes';

class SceneName extends Phaser.Scene {
  constructor(props) {
    super({
      key: 'SceneName',
    });
  }
  SceneName() {
    Phaser.Scene.call(this, { key: 'SceneName', active: false });
  }
  // game state start
  preload() { }

  create() {
    // create instances start

    // create instances end
  }

  update() { }
  // game state end
}

export default SceneName;
