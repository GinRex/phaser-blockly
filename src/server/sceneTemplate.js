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

export default SceneName;
