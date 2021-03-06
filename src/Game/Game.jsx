import boot from './Scenes/boot';
import Phaser from 'phaser';
import scene1 from './Scenes/scene1';

const config = {
  type: Phaser.AUTO,
  pixelArt: true,
  // game width and height start
width: 500,
        height: 800,
  // game width and height end
  parent: 'phaser-game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        // game gravity start
y: 600
        // game gravity end
      },
      // game debug start
debug: false,
      // game debug end
    },
  },
  scene: [
    boot,
    scene1,
    // scenes go here
  ],
};

const game = new Phaser.Game(config);
