import 'phaser';

class SceneName extends Phaser.Scene {
  constructor(props) {
    super(props);
  }

  restartGame = () => {
    this.scene.restart();
  };

  MainScene() {
    Phaser.Scene.call(this, { key: 'SceneName', active: false });
  }

  preload() {
    // preload image here
  }

  create() {
    // create object here
  }

  update() {
    // update here
  }
}

export default SceneName;
