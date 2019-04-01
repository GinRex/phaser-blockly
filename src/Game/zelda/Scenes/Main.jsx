import 'phaser';
import Why from '../Why';
import Zelda from '../Zelda';
import Ghost from '../Ghost';

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
this.load.image('Ghost', 'assets/ghost.png');
this.load.image('Zelda', 'assets/zelda.jpg');
this.load.image('Why', 'assets/why.jpg');
    // preload image here
  }

  create() {
this.Ghost = new Ghost({
          scene: this,
          key: 'Ghost',
          x: 200,
          y: 200,
          width: 100,
          height: 100,
        });
this.Zelda = new Zelda({
          scene: this,
          key: 'Zelda',
          x: 200,
          y: 200,
          width: 100,
          height: 100,
        });
this.Why = new Why({
          scene: this,
          key: 'Why',
          x: 200,
          y: 200,
          width: 100,
          height: 100,
        });
    // create object here
  }

  update() {
this.Ghost.update();
this.Zelda.update();
this.Why.update();
    // update here
  }
}

export default MainScene;
