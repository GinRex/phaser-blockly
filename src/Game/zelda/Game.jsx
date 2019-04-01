import Phaser from 'phaser';
import { connect } from 'react-redux';
import * as React from 'react';

import MainScene from './Scenes/Main';
import { setGame } from '../../client/actions/home';

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
          debug: false,
        },
      },
      scene: [MainScene],
    },
  };
  componentDidMount() {
    const game = new Phaser.Game(this.state.config);
    // this.props.setGame(game);
  }

  render() {
    return <div id="phaser-game" />;
  }
}

const mapStateToProps = state => ({
  game: state.home.game,
});

const mapDispatchToProps = {
  setGame,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);
