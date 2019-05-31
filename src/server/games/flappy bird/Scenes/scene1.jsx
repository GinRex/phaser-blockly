import 'phaser';
import * as Class from '../Classes';
import key from '../keyBoardInput';

class scene1 extends Phaser.Scene {
  constructor(props) {
    super({
      key: 'scene1',
    });
  }
  scene1() {
    Phaser.Scene.call(this, { key: 'scene1', active: false });
  }

  preload() { }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    // create instances start

    // create instances end

    // game state start
  (this.bg) = this.add.tileSprite(((this.cameras.main.width) / 2), ((this.cameras.main.height) / 2), (this.cameras.main.width), (this.cameras.main.height), 'Background');;

}
update(){
  ((this.bg).tilePositionX) = (((this.bg).tilePositionX) + 1);

    // game state end

    // update object start

    // update object end
  }
}

export default scene1;
