import scene2 from './Scenes/scene2';
import scene1 from './Scenes/scene1';
import boot from './Scenes/boot';
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
        y: 0
      },
      debug: false
    }
  },
  scene: [boot, scene1, scene2]
};

// const game = new Phaser.Game(config);