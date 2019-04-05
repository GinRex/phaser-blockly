import 'phaser';

class SceneName extends Phaser.Scene {
  constructor(props) {
    super(props);
  }

  restartGame = () => {
    this.scene.restart();
  };

  SceneName() {
    Phaser.Scene.call(this, { key: 'SceneName', active: false });
  }
  // game state start
  preload() {}

  create() {}

  update() {}
  // game state end
}

export default SceneName;
