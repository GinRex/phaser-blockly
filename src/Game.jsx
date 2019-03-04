import Phaser from "phaser";
import MainScene from "./Scenes/main";

import * as React from "react";


export default class Game extends React.Component {
  componentDidMount() {
    const config = {
      type: Phaser.AUTO,
      pixelArt: true,
      width: 600,
      height: 600,
      parent: "phaser-game",
      scene: [MainScene]
    };
    console.log('asdasd')
    new Phaser.Game(config);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="phaser-game" />;
  }
}
