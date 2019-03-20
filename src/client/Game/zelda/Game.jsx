import Phaser from 'phaser';
import MainScene from './Scenes/Main';
import * as React from 'react';

export default class Game extends React.Component {
  componentDidMount() {
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
  }

  render() {
    return <div id="phaser-game" />;
  }
}
