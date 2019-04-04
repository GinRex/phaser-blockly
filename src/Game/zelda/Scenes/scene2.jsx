import 'phaser';

class scene2 extends Phaser.Scene {
  constructor(props) {
    super(props);
  }

  restartGame = () => {
    this.scene.restart();
  };

  MainScene() {
    Phaser.Scene.call(this, { key: 'scene2', active: false });
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

export default scene2;
