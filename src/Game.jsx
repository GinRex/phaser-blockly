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
    scene: [MainScene]
  };

  componentDidMount() {
    console.log(this.props)
    
    const game = new Phaser.Game(this.config);
    
    
    // game.scene.start('main', {gameObjects: this.props.gameObjects, new: '2'})
    console.log('asdasd')
    // this.runGame();
  }

  runGame() {
    // const game = new Phaser.Game(this.config);
    game.scene.start('main', {gameObjects: this.props.gameObjects, new: '2'})
    // this.scene.launch('main', this.props.gameObjects)
  }
  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    console.log(this.props)
    return <div id="phaser-game" gameObjects={this.props.gameObjects} />;
  }
}
