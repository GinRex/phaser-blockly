import Phaser from 'phaser';
import MainScene from './Scenes/Main';

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
  scene: [MainScene],
};

const game = new Phaser.Game(config);
