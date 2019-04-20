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
  this.player = new Class.Ghost({
            scene: this,
            key: 'Ghost',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
          });
  (this.player).x = ((this.cameras.main.width) / 2);
  (this.player).y = 100;
  (this.player).body.setCollideWorldBounds(true);
  (this.player).body.setVelocity(100, 100);
  (this.player).body.setBounce(1);
  this.goalEnemy = new Class.Square({
            scene: this,
            key: 'Square',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
          });
  (this.goalEnemy).x = ((this.cameras.main.width) / 2);
  (this.goalEnemy).y = 0;
  (this.goalEnemy).setDisplaySize(400, 50);
  (this.goalEnemy).body.setCollideWorldBounds(true);
  this.goalPlayer = new Class.Square({
            scene: this,
            key: 'Square',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
          });
  (this.goalPlayer).x = ((this.cameras.main.width) / 2);
  (this.goalPlayer).y = (this.cameras.main.height);
  (this.goalPlayer).setDisplaySize(400, 50);
  (this.goalPlayer).body.setCollideWorldBounds(true);
  this.line = new Class.Square({
            scene: this,
            key: 'Square',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
          });
  (this.line).x = ((this.cameras.main.width) / 2);
  (this.line).y = ((this.cameras.main.height) / 2);
  (this.line).setDisplaySize((this.cameras.main.width), 10);
  (this.line).body.setBounce(0);
  this.physics.add.collider((this.player), (this.line));
  this.ball = new Class.Ball({
            scene: this,
            key: 'Ball',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
          });
  (this.ball).x = ((this.cameras.main.width) / 2);
  (this.ball).y = ((this.cameras.main.height) / 2);
  (this.ball).setDisplaySize(50, 50);
  (this.ball).body.setCollideWorldBounds(true);
  (this.ball).body.setBounce(1.5);
  (this.ball).body.setVelocity(100, 100);
  this.physics.add.collider((this.ball), (this.player));
  this.p = new Class.Enemy({
            scene: this,
            key: 'Enemy',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
          });
  (this.p).x = ((this.cameras.main.width) / 2);
  (this.p).y = ((this.cameras.main.height) - 50);
  (this.p).body.setCollideWorldBounds(true);
  (this.p).body.setBounce(1);
  this.physics.add.collider((this.p), (this.ball));

}
update(){
  this.p.update(this.cursors);

}
  // game state end
}

export default scene1;
