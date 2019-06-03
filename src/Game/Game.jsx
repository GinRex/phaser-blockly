import boot from './Scenes/boot';
import Phaser from 'phaser';
import scene1 from './Scenes/scene1';

const config = {
  type: Phaser.AUTO,
  pixelArt: true,
  // game width and height start
width: 800,
        height: 400,
  // game width and height end
  parent: 'phaser-game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0,
      },
      debug: false,
    },
  },
  scene: [
    boot,
    scene1,
    // scenes go here
  ],
};

const game = new Phaser.Game(config);
