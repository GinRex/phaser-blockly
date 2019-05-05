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

this.load.image('Gems', 'assets/gems.png');
this.load.atlas('Gems-sprites', 'assets/Gems.png', 'assets/gems.json');
    // launch scene start
    // launch scene end
  }
  create() {
    // game create
  }
}

export default boot;
