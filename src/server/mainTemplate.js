import 'phaser';
import { store } from '../../../store/configureStore';

class MainScene extends Phaser.Scene {
  constructor(props) {
    super(props);
    store.subscribe(this.restartGame);
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
