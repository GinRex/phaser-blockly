import 'phaser';

class boot extends Phaser.Scene {
  constructor(props) {
    super({
      key: 'boot',
    });
  }
  preload() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 4, height / 2, width / 2, height / 12);

// load asset for spritesheet.png
this.load.atlas('Spritesheet', 'assets/spritesheet.png', 'assets/spritesheet.json');
// load asset for bg.png
this.load.image('Bg', 'assets/bg.png');
    // launch scene start
    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 4, height / 2, (width / 2) * value, height / 12);
    });
    this.load.on('fileprogress', (file) => {
      console.log(file.src);
    });
    this.load.on('complete', () => {
      // create animations
// create animation for fieldOnce
        this.anims.create({
        key: 'fieldOnce',
        frames: [{"key":"Spritesheet","frame":"field4.png"}], 
        frameRate: 1,
        repeat: -1,
      });
// end create animation for fieldOnce
// create animation for standLeft
        this.anims.create({
        key: 'standLeft',
        frames: [{"key":"Spritesheet","frame":"doo3.png"}], 
        frameRate: 1,
        repeat: -1,
      });
// end create animation for standLeft
// create animation for standRight
        this.anims.create({
        key: 'standRight',
        frames: [{"key":"Spritesheet","frame":"doo1.png"}], 
        frameRate: 1,
        repeat: -1,
      });
// end create animation for standRight
// create animation for SpringShoot
        this.anims.create({
        key: 'SpringShoot',
        frames: [{"key":"Spritesheet","frame":"spring1.png"},{"key":"Spritesheet","frame":"spring2.png"}], 
        frameRate: 10,
        repeat: 1,
      });
// end create animation for SpringShoot
// create animation for Spring
        this.anims.create({
        key: 'Spring',
        frames: [{"key":"Spritesheet","frame":"spring1.png"}], 
        frameRate: 1,
        repeat: 1,
      });
// end create animation for Spring
// create animation for jumpLeft
this.anims.create({
        key: 'jumpLeft',
        frames: [{"key":"Spritesheet","frame":"doo4.png"}], 
        frameRate: 1,
        repeat: -1,
      });
// end create animation for jumpLeft
// create animation for jumpRight
this.anims.create({
        key: 'jumpRight',
        frames: [{"key":"Spritesheet","frame":"doo2.png"}], 
        frameRate: 1,
        repeat: -1,
      });
// end create animation for jumpRight
// create animation for fieldBroken
        this.anims.create({
        key: 'fieldBroken',
        frames: [{"key":"Spritesheet","frame":"fieldbreak.png"}], 
        frameRate: 1,
        repeat: -1,
      });
// end create animation for fieldBroken
// create animation for fieldBreak
        this.anims.create({
        key: 'fieldBreak',
        frames: [{"key":"Spritesheet","frame":"field2.png"}], 
        frameRate: 1,
        repeat: -1,
      });
// end create animation for fieldBreak
// create animation for fieldMove
        this.anims.create({
        key: 'fieldMove',
        frames: [{"key":"Spritesheet","frame":"field3.png"}], 
        frameRate: 1,
        repeat: -1,
      });
// end create animation for fieldMove
// create animation for field
        this.anims.create({
        key: 'field',
        frames: [{"key":"Spritesheet","frame":"field1.png"}], 
        frameRate: 1,
        repeat: -1,
      });
// end create animation for field
      // select scene
      this.scene.start('scene1');
    });
  }
  create() {
    // game create
  }
}

export default boot;
