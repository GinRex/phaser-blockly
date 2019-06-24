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

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  // functions start
collideCallback = () => {
  this.gameOver = 1;
  (this.center).x = ((this.cameras.main.width) / 2);
  (this.center).y = ((this.cameras.main.height) / 2);
  (this.centerVar).setVisible(true);
  (this.center).play('gameover');
  (this.hitSound).play();

}

initPipeGroup = () => {
  this.pt1 = new Class.Pipe({
              scene: this,
              key: '',
              x: 0,
              y: 0,
              w: 100,
              h: 100,
            });
  (this.pt1).x = ((this.cameras.main.width) + 100);
  (this.pt1).y = (Math.random() * (200 - 0) + 0);
  (this.pt1).play('pipeTop');
  (this.pt1).body.setSize(25, 160, false);
  this.pb1 = new Class.Pipe({
              scene: this,
              key: '',
              x: 0,
              y: 0,
              w: 100,
              h: 100,
            });
  (this.pb1).x = ((this.cameras.main.width) + 100);
  (this.pb1).y = (((this.pt1).y) + 600);
  (this.pb1).play('pipeBot');
  (this.pb1).body.setSize(25, 160, false);
  (this.pipeGroup).add((this.pt1));
  (this.pipeGroup).add((this.pb1));

}

restart = () => {
  this.scene.restart();

}

  // functions end


  create() {
    // create start
(this.wingFlapSound) = this.sound.add('wing.wav', { loop: false});
(this.pointSound) = this.sound.add('point.wav', { loop: false});
(this.hitSound) = this.sound.add('hit.wav', { loop: false});
(this.dieSound) = this.sound.add('die.wav', { loop: false});

this.gameOver = 0;
this.gamestart = 1;
this.Bg1 = new Class.Background({
            scene: this,
            key: '',
            x: 0,
            y: 0,
            w: 100,
            h: 100,
          });
(this.Bg1).setDisplaySize(250, 200);
(this.Bg1).play('Bg');
this.center = new Class.Label({
            scene: this,
            key: '',
            x: 0,
            y: 0,
            w: 100,
            h: 100,
          });
(this.center).x = ((this.cameras.main.width) / 2);
(this.center).y = ((this.cameras.main.height) / 3);
(this.center).play('ready');
this.s = 0;
(this.center).setDepth(100);
(this.scoreLabel) = this.add.text(((this.cameras.main.width) / 2 - 40), ((this.cameras.main.height) / 6), (this.s));
(this.scoreLabel).setFontFamily('monospace');
(this.scoreLabel).setFontSize(110);
(this.scoreLabel).setDepth(99);
this.centerVar = (this.center);
(this.scoreLabel).setColor('#666666');

this.Player = new Class.Bird({
            scene: this,
            key: '',
            x: 0,
            y: 0,
            w: 100,
            h: 100,
          });
(this.Player).x = ((this.cameras.main.width) / 2);
(this.Player).y = ((this.cameras.main.height) / 2);
(this.Player).play('fly');
(this.Player).body.setSize(17, 12, false);
(this.Player).body.setBounce(3);
this.initPos = ((this.Player).x);
this.pipeGroup = (this.add.group({runChildUpdate: true, allowGravity: false}));
this.initPipeGroup();

(this.collider1) = this.physics.add.collider((this.Player), (this.pipeGroup),   this.collideCallback);
(this.collider2) = this.physics.add.collider((this.Player), (this.pipeGroup),   this.collideCallback);

    // create end
  }


  update() {
    // update start
this.Player.update();

if (!(this.gameOver)) {
  if (((this.Player).x) > ((this.pt1).x) + 100) {
    this.initPipeGroup();
  }
  if (((this.Player).x) == ((this.pt1).x) + 30) {
    this.s = ((this.s) + 1);
    (this.scoreLabel).setText((this.s));
    (this.pointSound).play();
  }
}

if (((this.Player).y) > (this.cameras.main.height) + 150) {
  (this.dieSound).play();
  this.gameOver = 1;
}

    // update end
  }
}

export default scene1;
