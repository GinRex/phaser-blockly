import 'phaser';
import * as Class from '../Classes';
import key from '../keyBoardInput';

class scene2 extends Phaser.Scene {
  constructor(props) {
    super({
      key: 'scene2',
    });
  }
  scene2() {
    Phaser.Scene.call(this, { key: 'scene2', active: false });
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  // functions start

  // functions end


  create() {
    // create start
(this.bg) = this.add.tileSprite(((this.cameras.main.width) / 2), ((this.cameras.main.height) / 2), (this.cameras.main.width), (this.cameras.main.height), 'Bg');
this.startButton = new Class.platform({
            scene: this,
            key: '',
            x: 0,
            y: 0,
            w: 100,
            h: 100,
          });
(this.startButton).x = ((this.cameras.main.width) / 2);
(this.startButton).y = ((this.cameras.main.height) / 1.5);
(this.startButton).play('field');
(this.startLabbel) = this.add.text(((this.cameras.main.width) / 3), ((this.cameras.main.height) / 1.6), 'RESTART');
(this.startLabbel).setFontFamily('monospace');
(this.startLabbel).setFontSize(50);

    // create end
  }



  update() {
    // update start
if (key(this.input.keyboard, 'A').isDown) {
  this.scene.start('scene1');
}

    // update end
  }

}

export default scene2;
