import 'phaser';

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
  window.alert('abc');

}
  // game state end
}

export default scene1;
