import Phaser from "phaser";
import MainScene from "./Scenes/main";

import * as React from "react";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    gameObjects: []
  }

  config = {
    type: Phaser.AUTO,
    pixelArt: true,
    width: 600,
    height: 600,
    parent: "phaser-game",
    physics: {
      default: 'arcade',
      arcade: {
          gravity: {
              y: 800
          },
          debug: false
      }
    },
    scene: [MainScene]
  };

  componentDidMount() {
    console.log(this.props)
    
    const game = new Phaser.Game(this.config);
  }

  render() {
    console.log(this.props)
    return <div id="phaser-game" gameObjects={this.props.gameObjects} />;
  }
}
