import scene3 from './Scenes/scene3';
import scene2 from './Scenes/scene2';
import scene1 from './Scenes/scene1';
import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  pixelArt: true,
  width: 500,
  height: 400,
  parent: 'phaser-game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 800,
      },
      debug: false,
    },
  },
  scene: [
scene1
    // scenes go here
  ],
};

const game = new Phaser.Game(config);
