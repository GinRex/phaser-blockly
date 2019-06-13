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

// load asset for flapp.png
this.load.atlas('Flapp', 'assets/flapp.png', 'assets/flapp.json');
// load asset for cat.png
this.load.image('Cat', 'assets/cat.png');
// load asset for mario-sprites.png
this.load.atlas('Mario-sprites', 'assets/mario-sprites.png', 'assets/mario-sprites.json');
// load asset for overworld.mp3
this.load.audio('Overworld', 'assets/overworld.mp3');
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
// create animation for run
this.anims.create({
        key: 'run',
        frames: [{"key":"Mario-sprites","frame":"mario/walk1"},{"key":"Mario-sprites","frame":"mario/walk2"},{"key":"Mario-sprites","frame":"mario/walk3"}], 
        frameRate: 20,
        repeat: -1,
      });
// end create animation for run
// create animation for bg
        this.anims.create({
        key: 'bg',
        frames: [{"key":"Flapp","frame":"day-bg.png"}], 
        frameRate: 30,
        repeat: -1,
      });
// end create animation for bg
// create animation for bird
        this.anims.create({
        key: 'bird',
        frames: [{"key":"Flapp","frame":"yellow-bird-1.png"},{"key":"Flapp","frame":"yellow-bird-2.png"},{"key":"Flapp","frame":"yellow-bird-3.png"}], 
        frameRate: 10,
        repeat: -1,
      });
// end create animation for bird
      // select scene
      this.scene.start('scene1');
    });
  }
  create() {
    // game create
  }
}

export default boot;
