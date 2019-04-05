import 'phaser';

class scene1 extends Phaser.Scene {
  constructor(props) {
    super(props);
  }

  restartGame = () => {
    this.scene.restart();
  };

  scene1() {
    Phaser.Scene.call(this, { key: 'scene1', active: false });
  }
  // game state start
create(){
  window.alert('hello');

}
update(){

}
  // game state end
}

export default scene1;
