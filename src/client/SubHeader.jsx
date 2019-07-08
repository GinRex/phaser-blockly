import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PlayArrow from '@material-ui/icons/PlayArrow';
import OpenInNew from '@material-ui/icons/OpenInNew';
import ClassIcon from '@material-ui/icons/Build';
import SceneIcon from '@material-ui/icons/Tv';
import ImageIcon from '@material-ui/icons/Image';


import {
  updateGame,
  updateScene,
  setSpriteEditorState,
} from './actions/home';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function makeid(length) {
  let result = '';
  const characters = '&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const SubHeader = props => (
  <div >
    <Button
      onClick={() => {
        if (props.slectedGameobjectIndex) {
          props.updateGame(props.gameObjects);
        }
        if (props.slectedSceneIndex) {
          props.updateScene(props.scenes);
        }
      }}
      variant="contained"
      color="primary"
      className={props.classes.button}
    >
      <PlayArrow />
      Build
    </Button>
    <Button
      onClick={() => {
        const id = makeid(16);
        const myWindow = window.open(`${window.location.href}game_iframe.html#${id}`, 'game');
        myWindow.focus();
        // if (this.props.slectedGameobjectIndex) {
        //   this.props.updateGame(this.props.gameObjects);
        // }
        // if (this.props.slectedSceneIndex) {
        //   this.props.updateScene(this.props.scenes);
        // }
      }}
      variant="contained"
      color="secondary"
      className={props.classes.button}
    >
      <OpenInNew />
    </Button>
    <Button
      onClick={() => {
        props.setClassHandler(true);
      }}
      variant="contained"
      color="inherit"
      className={props.classes.button}
    >
      <ClassIcon />
      {/* Class */}
    </Button>
    <Button
      onClick={() => {
        props.setSceneHandler(true);
      }}
      variant="contained"
      color="inherit"
      className={props.classes.button}
    >
      <SceneIcon />
      {/* Scene */}
    </Button>
    <Button
      onClick={() => {
        props.setSpriteEditorState(true);
      }}
      variant="contained"
      color="inherit"
      className={props.classes.button}
    >
      <ImageIcon />
      {/* Animations */}
    </Button>
  </div>
);

const mapStateToProps = state => ({
  slectedGameobjectIndex: state.home.slectedGameobjectIndex,
  slectedSceneIndex: state.home.slectedSceneIndex,
  scenes: state.home.scenes,
  gameObjects: state.home.gameObjects,
});

const mapDispatchToProps = {
  updateGame,
  updateScene,
  setSpriteEditorState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SubHeader));
