import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PlayArrow from '@material-ui/icons/PlayArrow';
import OpenInNew from '@material-ui/icons/OpenInNew';
import ClassIcon from '@material-ui/icons/Build';
import SceneIcon from '@material-ui/icons/Tv';

import { updateGame, updateScene } from './actions/home';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

const SubHeader = props => React.createElement(
  'div',
  null,
  React.createElement(
    Button,
    {
      onClick: () => {
        if (props.slectedGameobjectIndex) {
          props.updateGame(props.gameObjects);
        }
        if (props.slectedSceneIndex) {
          props.updateScene(props.scenes);
        }
      },
      variant: 'contained',
      color: 'primary',
      className: props.classes.button
    },
    React.createElement(PlayArrow, null),
    'Build'
  ),
  React.createElement(
    Button,
    {
      onClick: () => {
        const myWindow = window.open(`${window.location.href}game_iframe.html`, 'game');
        myWindow.focus();
        // if (this.props.slectedGameobjectIndex) {
        //   this.props.updateGame(this.props.gameObjects);
        // }
        // if (this.props.slectedSceneIndex) {
        //   this.props.updateScene(this.props.scenes);
        // }
      },
      variant: 'contained',
      color: 'secondary',
      className: props.classes.button
    },
    React.createElement(OpenInNew, null)
  ),
  React.createElement(
    Button,
    {
      onClick: () => {
        props.setClassHandler(true);
      },
      variant: 'contained',
      color: 'inherit',
      className: props.classes.button
    },
    React.createElement(ClassIcon, null),
    'Class'
  ),
  React.createElement(
    Button,
    {
      onClick: () => {
        props.setSceneHandler(true);
      },
      variant: 'contained',
      color: 'inherit',
      className: props.classes.button
    },
    React.createElement(SceneIcon, null),
    'Scene'
  )
);

const mapStateToProps = state => ({
  slectedGameobjectIndex: state.home.slectedGameobjectIndex,
  slectedSceneIndex: state.home.slectedSceneIndex,
  scenes: state.home.scenes,
  gameObjects: state.home.gameObjects
});

const mapDispatchToProps = {
  updateGame,
  updateScene
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SubHeader));