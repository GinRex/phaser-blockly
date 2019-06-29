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
initPlatform = () => {
  this.i = 0;
  for (var count = 0; count < 8; count++) {
    this.platform1 = new Class.platform({
                scene: this,
                key: '',
                x: 0,
                y: 0,
                w: 100,
                h: 100,
              });
    (this.platform1).x = (Math.random() * ((this.cameras.main.width) - 50) + 50);
    (this.platform1).y = (((this.cameras.main.height) / 8) * (this.i));
    (this.platform1).setDisplaySize(25, 20);
    (this.platform1).play('field');
    (this.platform1).body.updateFromGameObject();
    this.i = ((this.i) + 1);
    (this.platformGroup).add((this.platform1));
  }

}

createPlatform = () => {
  this.platformType = (Math.random() * (3 - 0) + 0);
  if ((this.platformType) < 0.3) {
    this.platform4 = new Class.platformBreak({
                scene: this,
                key: '',
                x: 0,
                y: 0,
                w: 100,
                h: 100,
              });
    (this.platform4).x = (Math.random() * (((this.cameras.main.width) - 100) - 50) + 50);
    (this.platform4).y = (-20);
    (this.platform4).setDisplaySize(25, 20);
    (this.platform4).play('fieldBreak');
    (this.platform4).body.updateFromGameObject();
    (this.platformGroup).add((this.platform4));
  } else if ((this.platformType) >= 0.3 && (this.platformType) < 1.5) {
    this.platform2 = new Class.platformMove({
                scene: this,
                key: '',
                x: 0,
                y: 0,
                w: 100,
                h: 100,
              });
    (this.platform2).x = (Math.random() * (((this.cameras.main.width) - 100) - 50) + 50);
    (this.platform2).y = (-20);
    (this.platform2).setDisplaySize(25, 20);
    (this.platform2).play('fieldMove');
    (this.platform2).body.updateFromGameObject();
    (this.platformGroup).add((this.platform2));
  } else if ((this.platformType) >= 1.5 && (this.platformType) < 1.8) {
    this.platform3 = new Class.platformOnce({
                scene: this,
                key: '',
                x: 0,
                y: 0,
                w: 100,
                h: 100,
              });
    (this.platform3).x = (Math.random() * (((this.cameras.main.width) - 100) - 50) + 50);
    (this.platform3).y = (-20);
    (this.platform3).setDisplaySize(25, 20);
    (this.platform3).play('fieldOnce');
    (this.platform3).body.updateFromGameObject();
    (this.platformGroup).add((this.platform3));
  } else {
    this.platform1 = new Class.platform({
                scene: this,
                key: '',
                x: 0,
                y: 0,
                w: 100,
                h: 100,
              });
    (this.platform1).x = (Math.random() * (((this.cameras.main.width) - 100) - 50) + 50);
    (this.platform1).y = (-20);
    (this.platform1).setDisplaySize(25, 20);
    (this.platform1).play('field');
    (this.platform1).body.updateFromGameObject();
    (this.platformGroup).add((this.platform1));
  }

}

  // functions end


  create() {
    // create start
(this.bg) = this.add.tileSprite(((this.cameras.main.width) / 2), ((this.cameras.main.height) / 2), (this.cameras.main.width), (this.cameras.main.height), 'Bg');
this.score = 0;
(this.scoreLabel) = this.add.text(15, 15, (this.score));
(this.scoreLabel).setFontFamily('monospace');
(this.scoreLabel).setFontSize(60);
(this.scoreLabel).setColor('#993300');
(this.scoreLabel).setDepth(100);
this.gameOver = false;

this.player = new Class.dude({
            scene: this,
            key: '',
            x: 0,
            y: 0,
            w: 100,
            h: 100,
          });
(this.player).x = ((this.cameras.main.width) / 2);
(this.player).y = ((this.cameras.main.height) / 1.5);
(this.player).setDisplaySize(20, 20);
(this.player).body.setSize(90, 75, false);
(this.player).play('standLeft');
(this.player).body.setGravityY(500);
(this.player).body.setCollideWorldBounds(true);
(this.player).body.setBounce(1);
this.playerVar = (this.player);
this.cameraWidth = (this.cameras.main.width);
this.cameraHeight = (this.cameras.main.height);

this.platformGroup = (this.add.group({runChildUpdate: true, allowGravity: false}));
this.initPlatform();

    // create end
  }



  update() {
    // update start
this.player.update();

if (((this.platformGroup).getLength()) < 8) {
  this.createPlatform();
}

if (this.gameOver) {
  this.scene.start('scene2');
}

    // update end
  }

}

export default scene1;
