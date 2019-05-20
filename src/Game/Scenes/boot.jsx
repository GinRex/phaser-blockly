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

// load asset for Cat
this.load.atlas('Cat', 'assets/Cat.png', 'assets/cat.json');
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
// create animation for jump
        this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNames('Cat', { prefix: 'cat_', suffix: '.png', start: 0, end: 4, zeroPad: 0 }),
        frameRate: 30,
        repeat: -1,
      });
// end create animation for jump
      // select scene
      this.scene.start('scene1');
    });
  }
  create() {
    // game create
  }
}

export default boot;
