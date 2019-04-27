import _UsersMacPhaserBlocklyNode_modulesRedboxReactLibIndexJs from '/Users/mac/phaser-blockly/node_modules/redbox-react/lib/index.js';
import _UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs from '/Users/mac/phaser-blockly/node_modules/react-transform-catch-errors/lib/index.js';
import _react from 'react';
import _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs from '/Users/mac/phaser-blockly/node_modules/react-transform-hmr/lib/index.js';
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
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';

import { setSpriteEditorState } from './actions/home';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  paper: {
    position: 'absolute',
    // width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

const getModalStyle = () => {
  const top = 20;
  const left = 20;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

// const sprite = (opt) => {
//   const obj = {};
//   obj.context = opt.context;
//   obj.width = opt.width;
//   obj.height = opt.height;
//   obj.image = opt.image;

//   obj.render = () => {
//     // Draw the animation
//     obj.context.drawImage(obj.image, 0, 0, obj.width, obj.height, 0, 0, obj.width, obj.height);
//   };

//   return obj;
// };

const SpriteEditor = _wrapComponent('SpriteEditor')(class SpriteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'green'
    };

    this.handleClick = () => {
      this.setState({
        color: Konva.Util.getRandomColor()
      });
    };

    this.modalRef = React.createRef();
    this.canvasRef = React.createRef();
    this.imgRef = React.createRef();
    this.animRef = React.createRef();
  }


  componentDidUpdate() {
    console.log(this.canvasRef.current);
    if (this.canvasRef.current) {
      const ctx = this.canvasRef.current.getContext('2d');
      ctx.drawImage(this.imgRef.current, 0, 0);
    }
  }

  render() {
    const { classes } = this.props;
    return React.createElement(
      'div',
      null,
      React.createElement(
        Modal,
        {
          ref: this.modalRef,
          'aria-labelledby': 'simple-modal-title',
          'aria-describedby': 'simple-modal-description',
          open: this.props.spriteEditOpen,
          onClose: () => this.props.setSpriteEditorState(false)
          // onRendered={() => {
          //   console.log('xxx');
          //   const ctx = this.canvasRef.current.getContext('2d');
          //   ctx.drawImage(this.imgRef.current, 0, 0);
          // }}
          , keepMounted: true
        },
        React.createElement(
          'div',
          { style: getModalStyle(), className: classes.paper },
          React.createElement(
            'div',
            null,
            React.createElement(
              Stage,
              { width: window.innerWidth, height: window.innerHeight },
              React.createElement(
                Layer,
                null,
                React.createElement(Text, { text: 'Try click on rect' }),
                React.createElement(Rect, {
                  x: 40,
                  y: 40,
                  width: 150,
                  height: 150,
                  fill: 'red',
                  shadowBlur: 5
                  // onClick={this.handleClick}
                })
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
  selectedFile: state.home.selectedFile
});

const mapDispatchToProps = {
  setSpriteEditorState
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SpriteEditor));