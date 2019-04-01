import Phaser from 'phaser';
import { connect } from 'react-redux';
import * as React from 'react';

import MainScene from '../Game/zelda/Scenes/Main';
import { createGame } from '../Game/zelda/Game';
import { setGame } from './actions/home';

class Game extends React.Component {
  state = {
    config: {
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
          debug: true,
        },
      },
      scene: [MainScene],
    },
  };
  componentDidMount() {
    createGame(this.state.config);
    // const game = new Phaser.Game(this.state.config);
    // this.props.setGame(game);
  }

  render() {
    return <div id="phaser-game" onClick={() => createGame(this.state.config)} />;
  }
}

const mapStateToProps = state => ({
  // game: state.home.game,
});

const mapDispatchToProps = {
  setGame,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);
