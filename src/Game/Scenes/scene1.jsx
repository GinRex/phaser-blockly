import 'phaser';
import * as Class from '../Classes';

class scene1 extends Phaser.Scene {
  constructor(props) {
    super({
      key: 'scene1',
    });
  }
  scene1() {
    Phaser.Scene.call(this, { key: 'scene1', active: false });
  }
  // game state start
create(){
this.cursors = this.input.keyboard.createCursorKeys();
  this.object = new Class.Gems({
            scene: this,
            key: 'Gems',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
          });
  (this.object).play('idle');

}
  // game state end
}

export default scene1;
