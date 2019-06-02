import boot from './Scenes/boot';
import Phaser from 'phaser';
import scene1 from './Scenes/scene1';

const config = {
  type: Phaser.AUTO,
  pixelArt: true,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
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
  scene: [boot, scene1]
};

const game = new Phaser.Game(config);