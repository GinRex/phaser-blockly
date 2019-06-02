const config = {
  type: Phaser.AUTO,
  parent: 'anmiation-pv',
  pixelArt: true,
  width: 800,
  height: 600,
  scene: {
    preload,
    create
  }
};

console.log('zzz');

const game = new Phaser.Game(config);

function preload() {
  this.load.atlas('gems', 'assets/animations/diamond.png', 'assets/animations/diamond.json');
}

function create() {
  this.anims.create({
    key: 'diamond',
    frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }),
    repeat: -1
  });

  const gem = this.add.sprite(400, 600, 'gems').play('diamond').setScale(4);

  console.log(Phaser.Utils.Array.FindClosestInSorted(0.82, gem.anims.currentAnim.frames, 'progress'));

  // console.log(gem.anims.currentAnim.frames);
}