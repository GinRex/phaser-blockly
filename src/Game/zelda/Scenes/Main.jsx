import 'phaser';

class MainScene extends Phaser.Scene {
  constructor(props) {
    super(props);
  }

  restartGame = () => {
    this.scene.restart();
  };

  MainScene() {
    Phaser.Scene.call(this, { key: 'main', active: false });
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

export default MainScene;
