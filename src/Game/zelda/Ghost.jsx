export default class Ghost extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.acceleration = 0;
    this.body.maxVelocity.x = 0;
    this.body.maxVelocity.y = 0;
    this.x = config.x;
    this.y = config.y;
    this.setDisplaySize(config.width, config.height);
window.alert('abc');

    // constructor here
  }
  update() {
    // update here
  }
}
