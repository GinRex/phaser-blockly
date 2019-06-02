import _UsersMacPhaserBlocklyNode_modulesRedboxReactLibIndexJs from '/Users/mac/phaser-blockly/node_modules/redbox-react/lib/index.js';
import _UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs from '/Users/mac/phaser-blockly/node_modules/react-transform-catch-errors/lib/index.js';
import _react from 'react';
import _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs from '/Users/mac/phaser-blockly/node_modules/react-transform-hmr/lib/index.js';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const _components = {
  SpriteEditor: {
    displayName: 'SpriteEditor'
  }
};

const _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs2 = _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs({
  filename: 'src/client/SpirteEditor.jsx',
  components: _components,
  locals: [module],
  imports: [_react]
});

const _UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs2 = _UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs({
  filename: 'src/client/SpirteEditor.jsx',
  components: _components,
  locals: [],
  imports: [_react, _UsersMacPhaserBlocklyNode_modulesRedboxReactLibIndexJs]
});

function _wrapComponent(id) {
  return function (Component) {
    return _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs2(_UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}

/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux';
import { Stage, Layer, Rect, Text, Image, Sprite } from 'react-konva';
import Konva from 'konva';
import Phaser from 'phaser';

import { setSpriteEditorState, updateAnimations, updateSpriteInfo, uploadJson, addAnimations } from './actions/home';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  paper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row'
    // overflow: 'scroll',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

function Transition(props) {
  return React.createElement(Slide, _extends({ direction: 'up' }, props));
}

const SquareList = ani => {
  const info = ani.info;
  const squares = [];
  for (let i = 0; i < info.n; i++) {
    squares.push(React.createElement(Rect, {
      x: info.x + info.w * i,
      y: info.y,
      width: info.w,
      height: info.h,
      stroke: 'red'
      // fill="red"
      , strokeWidth: 1
    }));
  }
  return squares;
};

function preload(file) {
  this.load.atlas('atlas', `assets/animations/${file.alt}.png`, `assets/animations/${file.alt}.json`);
}

function create() {
  this.anims.create({
    key: 'diamond',
    frames: this.anims.generateFrameNames('atlas', {
      prefix: 'diamond_',
      end: 15,
      zeroPad: 4
    }),
    repeat: -1
  });

  console.log(this.anims);
  const gem = this.add.sprite(10, 10, 'atlas').play('diamond').setScale(2);
}

const SpriteEditor = _wrapComponent('SpriteEditor')(class SpriteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.config = {
      type: Phaser.AUTO,
      parent: 'animation-pv',
      pixelArt: true,
      width: 300,
      height: 300,
      scene: {
        // preload: () => preload(this.props.selectedFile),
        // create,
      }
    };

    this.onChangeHandler = (event, name) => {
      if (FileReader && event.target.files[0]) {
        const fr = new FileReader();
        const file = event.target.files[0];
        fr.onloadend = () => {
          file.src = fr.result;
          // this.props.selectFile(file);
          this.props.uploadJson(file, name);
        };
        fr.readAsDataURL(file);
      }
    };

    this.getPreviewAnimations = info => {
      const animations = [];
      for (let i = 0; i < info.n; i++) {
        animations.push(info.x + info.w * i);
        animations.push(info.y);
        animations.push(info.w);
        animations.push(info.h);
      }
      this.props.updateAnimations({ example: animations });
    };
  }
  componentDidUpdate() {
    this.image = new window.Image();
    this.image.src =
    // `assets/${this.props.gameObject.filename}`;
    this.props.selectedFile && this.props.selectedFile.src ? this.props.selectedFile.src : '';
  }

  render() {
    const { classes } = this.props;
    return React.createElement(
      'div',
      null,
      React.createElement(
        Dialog,
        {
          ref: this.modalRef,
          open: this.props.spriteEditOpen,
          onClose: () => this.props.setSpriteEditorState(false),
          scroll: 'paper',
          'aria-labelledby': 'scroll-dialog-title',
          TransitionComponent: Transition,
          fullWidth: true,
          maxWidth: 'xl'
        },
        React.createElement(
          DialogTitle,
          { id: 'scroll-dialog-title' },
          'Animation'
        ),
        React.createElement(
          DialogContent,
          null,
          React.createElement(
            'div',
            { className: classes.paper },
            React.createElement(
              'div',
              {
                style: {
                  margin: '0',
                  padding: '0',
                  overflow: 'hidden',
                  backgroundColor: '#f0f0f0',
                  width: window.innerWidth * 0.6,
                  height: window.innerHeight * 0.6,
                  overflow: 'auto'
                }
              },
              this.props.selectedFile && this.props.gameObjects.find(gameObject => gameObject.key === this.props.selectedFile.alt) && this.props.gameObjects.find(gameObject => gameObject.key === this.props.selectedFile.alt).jsonSprite ? React.createElement(
                Stage,
                { width: 2000, height: 3000 },
                React.createElement(
                  Layer,
                  null,
                  React.createElement(Image, { image: this.image }),
                  React.createElement(SquareList, { info: this.props.animInfo })
                )
              ) : 'Please import JSON file for the sprite',
              React.createElement('input', {
                type: 'file',
                name: 'file',
                onChange: event => this.onChangeHandler(event, this.props.selectedFile.alt)
              })
            ),
            React.createElement(
              'div',
              {
                style: {
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'column'
                }
              },
              React.createElement('div', {
                id: 'animation-pv',
                ref: node => {
                  if (node && !this.game) this.game = new Phaser.Game(this.config);
                }
              }),
              React.createElement(TextField, {
                id: 'standard-name',
                label: 'Animation name',
                className: classes.textField,
                value: this.props.animInfo.name,
                onChange: event => {
                  this.props.updateSpriteInfo(_extends({}, this.props.animInfo, {
                    name: event.target.value
                  }));
                },
                margin: 'normal'
              }),
              React.createElement(TextField, {
                id: 'standard-name',
                label: 'prefix',
                className: classes.textField,
                value: this.props.animInfo.prefix,
                onChange: event => {
                  const newAniInfo = _extends({}, this.props.animInfo, {
                    prefix: event.target.value
                  });
                  this.props.updateSpriteInfo(newAniInfo);
                  // this.getPreviewAnimations(newAniInfo);
                },
                margin: 'normal'
              }),
              React.createElement(TextField, {
                id: 'standard-name',
                label: 'subffix',
                className: classes.textField,
                value: this.props.animInfo.suffix,
                onChange: event => {
                  const newAniInfo = _extends({}, this.props.animInfo, {
                    suffix: event.target.value
                  });
                  this.props.updateSpriteInfo(newAniInfo);
                  // this.getPreviewAnimations(newAniInfo);
                },
                margin: 'normal'
              }),
              React.createElement(TextField, {
                id: 'standard-name',
                label: 'start',
                className: classes.textField,
                type: 'number',
                value: this.props.animInfo.start,
                onChange: event => {
                  const newAniInfo = _extends({}, this.props.animInfo, {
                    start: parseFloat(event.target.value)
                  });
                  this.props.updateSpriteInfo(newAniInfo);
                  // this.getPreviewAnimations(newAniInfo);
                },
                margin: 'normal'
              }),
              React.createElement(TextField, {
                id: 'standard-name',
                label: 'end',
                className: classes.textField,
                type: 'number',
                value: this.props.animInfo.end,
                onChange: event => {
                  const newAniInfo = _extends({}, this.props.animInfo, {
                    end: parseFloat(event.target.value)
                  });
                  this.props.updateSpriteInfo(newAniInfo);
                  // this.getPreviewAnimations(newAniInfo);
                },
                margin: 'normal'
              }),
              React.createElement(TextField, {
                id: 'standard-name',
                label: 'zero-pad',
                className: classes.textField,
                type: 'number',
                value: this.props.animInfo.zeroPad,
                onChange: event => {
                  const newAniInfo = _extends({}, this.props.animInfo, {
                    zeroPad: parseFloat(event.target.value)
                  });
                  this.props.updateSpriteInfo(newAniInfo);
                  // this.getPreviewAnimations(newAniInfo);
                },
                margin: 'normal'
              }),
              React.createElement(TextField, {
                id: 'standard-name',
                label: 'Frame rate',
                className: classes.textField,
                type: 'number',
                value: this.props.animInfo.frameRate,
                onChange: event => {
                  const newAniInfo = _extends({}, this.props.animInfo, {
                    frameRate: parseFloat(event.target.value)
                  });
                  this.props.updateSpriteInfo(newAniInfo);
                  // this.getPreviewAnimations(newAniInfo);
                },
                margin: 'normal'
              }),
              React.createElement(TextField, {
                id: 'standard-name',
                label: 'repeat',
                className: classes.textField,
                type: 'number',
                value: this.props.animInfo.repeat,
                onChange: event => {
                  const newAniInfo = _extends({}, this.props.animInfo, {
                    repeat: parseFloat(event.target.value)
                  });
                  this.props.updateSpriteInfo(newAniInfo);
                  // this.getPreviewAnimations(newAniInfo);
                },
                margin: 'normal'
              }),
              React.createElement(
                Button,
                {
                  onClick: () => {
                    this.props.addAnimations(this.props.selectedFile.alt, this.props.animInfo);
                    this.props.updateToolBoxAnimations();
                  },
                  variant: 'contained',
                  color: 'primary',
                  className: classes.button
                },
                'Create Animation'
              )
            )
          )
        )
      )
    );
  }
});

const mapStateToProps = state => ({
  spriteEditOpen: state.home.spriteEditOpen,
  selectedFile: state.home.selectedFile.file,
  animations: state.home.animations,
  animInfo: state.home.animInfo,
  gameObjects: state.home.gameObjects
});

const mapDispatchToProps = {
  setSpriteEditorState,
  updateAnimations,
  updateSpriteInfo,
  uploadJson,
  addAnimations
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SpriteEditor));