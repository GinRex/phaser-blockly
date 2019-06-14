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
// create animation for ready
        this.anims.create({
        key: 'ready',
        frames: [{"key":"Flapp","frame":"get-ready.png"}], 
        frameRate: 1,
        repeat: -1,
      });
// end create animation for ready
// create animation for gameover
        this.anims.create({
        key: 'gameover',
        frames: [{"key":"Flapp","frame":"game-over.png"}], 
        frameRate: 1,
        repeat: -1,
      });
// end create animation for gameover
// create animation for pipeBot
        this.anims.create({
        key: 'pipeBot',
        frames: [{"key":"Flapp","frame":"down-green-pipe.png"}], 
        frameRate: 1,
        repeat: -1,
      });
// end create animation for pipeBot
// create animation for pipeTop
        this.anims.create({
        key: 'pipeTop',
        frames: [{"key":"Flapp","frame":"up-green-pipe.png"}], 
        frameRate: 1,
        repeat: -1,
      });
// end create animation for pipeTop
// create animation for fly
        this.anims.create({
        key: 'fly',
        frames: [{"key":"Flapp","frame":"yellow-bird-1.png"},{"key":"Flapp","frame":"yellow-bird-2.png"},{"key":"Flapp","frame":"yellow-bird-3.png"}], 
        frameRate: 10,
        repeat: -1,
      });
// end create animation for fly
// create animation for Bg
        this.anims.create({
        key: 'Bg',
        frames: [{"key":"Flapp","frame":"day-bg.png"}], 
        frameRate: 0,
        repeat: -1,
      });
// end create animation for Bg
      // select scene
      this.scene.start('scene1');
    });
  }
  create() {
    // game create
  }
}

export default boot;
