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
dialog = ('Hi, I am Monika your best waifu. I wonder if this is your first time playing this game. Regardless, please do not hesitate and ask me anything you need. '.split('.'));

dialog2 = ('Eh. MC, you should have tell me if you\'ve already here. This is Literature Club, I think you should consider joining us since you haven\'t choossed any. Now tell me, which type of book you would like to read?'.split('.'));

  // functions end


  create() {
    // create start
(this.mg) = this.add.tileSprite(((this.cameras.main.width) / 2), ((this.cameras.main.height) / 2), (this.cameras.main.width), (this.cameras.main.height), 'Class');

this.m1 = new Class.Monika({
            scene: this,
            key: 'Monika',
            x: 0,
            y: 0,
            w: 100,
            h: 100,
          });
(this.m1).setDisplaySize(500, 500);
(this.m1).x = ((this.cameras.main.width) * 0.8);
(this.m1).y = ((this.cameras.main.height) * 0.6);

this.s1 = new Class.Sayori({
            scene: this,
            key: 'Sayori',
            x: 0,
            y: 0,
            w: 100,
            h: 100,
          });
(this.s1).setDisplaySize(0, 0);
(this.s1).x = ((this.cameras.main.width) * 0.3);
(this.s1).y = ((this.cameras.main.height) * 0.6);

this.tb1 = new Class.Textbox({
            scene: this,
            key: 'Textbox',
            x: 0,
            y: 0,
            w: 100,
            h: 100,
          });
(this.tb1).x = ((this.cameras.main.width) * 0.5);
(this.tb1).y = ((this.cameras.main.height) * 0.5);
(this.tb1).setDisplaySize((this.cameras.main.width), ((this.cameras.main.height) * 1));

(this.nameLabel) = this.add.text((((this.tb1).x) / 2.1), (((this.tb1).y) + 150), 'Monika');
(this.nameLabel).setColor('#cc33cc');

this.lineIterator = 0;
this.lineIterator = ((this.lineIterator) + 1);
this.line = ((this.dialog)[((this.lineIterator) - 1)]);

(this.textLabel) = this.add.text((((this.tb1).x) / 2.1), (((this.tb1).y) + 200), (this.line));
(this.textLabel).setColor('#330000');
(this.textLabel).setStyle({wordWrap: { width: ((this.cameras.main.width) * 0.6) }});

    // create end
  }



  update() {
    // update start
if ((this.lineIterator) < (this.dialog).length) {
  if ((key(this.input.keyboard, 'SPACE').isDown) && (this.spaceFlag)) {
    this.lineIterator = ((this.lineIterator) + 1);
    this.line = ((this.dialog)[((this.lineIterator) - 1)]);
    (this.textLabel).setText((this.line));
    this.spaceFlag = 0;
  }
}

if (key(this.input.keyboard, 'SPACE').isUp) {
  this.spaceFlag = 1;
}

if ((this.lineIterator) == (this.dialog).length && (this.initDialogFlag) != 0) {
  (this.nameLabel).setText('Sayori');
  (this.s1).setDisplaySize(500, 500);
  this.j = 0;
  this.line = ((this.dialog2)[((this.j) - 1)]);
  (this.textLabel).setText((this.line));
  this.initDialogFlag = 0;
}

if ((this.j) < (this.dialog).length) {
  if ((key(this.input.keyboard, 'SPACE').isDown) && (this.spaceFlag)) {
    this.j = ((this.j) + 1);
    this.line = ((this.dialog2)[((this.j) - 1)]);
    (this.textLabel).setText((this.line));
    this.spaceFlag = 0;
  }
}

    // update end
  }

}

export default scene1;
