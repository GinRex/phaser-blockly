import _UsersMacPhaserBlocklyNode_modulesRedboxReactLibIndexJs from '/Users/mac/phaser-blockly/node_modules/redbox-react/lib/index.js';
import _UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs from '/Users/mac/phaser-blockly/node_modules/react-transform-catch-errors/lib/index.js';
import _react from 'react';
import _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs from '/Users/mac/phaser-blockly/node_modules/react-transform-hmr/lib/index.js';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const _components = {
  VariableDialog: {
    displayName: 'VariableDialog'
  }
};

const _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs2 = _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs({
  filename: 'src/client/VariableDialog.jsx',
  components: _components,
  locals: [module],
  imports: [_react]
});

const _UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs2 = _UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs({
  filename: 'src/client/VariableDialog.jsx',
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

import { setVariableDialogState, addVariable, addInstance, addInstancesToScene, addClassVariable } from './actions/home';

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

const VariableDialog = _wrapComponent('VariableDialog')(class VariableDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      variableName: '',
      x: 0,
      y: 0,
      w: 100,
      h: 100,
      order: 0
    };
  }


  render() {
    const { classes } = this.props;
    return React.createElement(
      'div',
      null,
      this.props.variableDialogOpen && this.props.variableDialogOpen.key ? React.createElement(
        Dialog,
        {
          ref: this.modalRef,
          open: Boolean(this.props.variableDialogOpen),
          onClose: () => this.props.setVariableDialogState(null),
          scroll: 'paper',
          'aria-labelledby': 'scroll-dialog-title',
          TransitionComponent: Transition,
          fullWidth: true
        },
        React.createElement(
          DialogTitle,
          { id: 'form-dialog-title' },
          'Create Object'
        ),
        React.createElement(
          DialogContent,
          null,
          React.createElement('img', {
            src: `assets/${this.props.variableDialogOpen.filename}`,
            style: {
              width: 100,
              height: 100,
              borderRadius: 20
            }
          }),
          React.createElement(
            DialogContentText,
            null,
            'Enter object info'
          ),
          React.createElement(TextField, {
            autoFocus: true,
            margin: 'dense',
            id: 'name',
            label: 'Name',
            type: 'text',
            fullWidth: true,
            value: this.state.variableName,
            onChange: event => this.setState({ variableName: event.target.value })
          })
        ),
        React.createElement(
          DialogActions,
          null,
          React.createElement(
            Button,
            { onClick: () => this.props.setVariableDialogState(null), color: 'primary' },
            'Cancel'
          ),
          React.createElement(
            Button,
            {
              onClick: () => {
                // console.log(this.state.variableName);
                const promise = new Promise((resolve, reject) => {
                  resolve(this.props.addInstance({
                    variableName: this.state.variableName,
                    class: this.props.variableDialogOpen.name
                    // x: this.state.x,
                    // y: this.state.y,
                    // w: this.state.w,
                    // h: this.state.h,
                    // order: this.state.order,
                  }, this.props.slectedSceneIndex));
                });
                promise.then(res => {
                  // const currentScene = this.props.scenes.find(scene => scene.key === this.props.slectedSceneIndex);
                  // this.props.addInstancesToScene(currentScene);
                  this.props.setVariableDialogState(null);
                });
              },
              color: 'secondary'
            },
            'Create'
          )
        )
      ) : React.createElement(
        Dialog,
        {
          ref: this.modalRef,
          open: Boolean(this.props.variableDialogOpen),
          onClose: () => this.props.setVariableDialogState(null),
          scroll: 'paper',
          'aria-labelledby': 'scroll-dialog-title',
          TransitionComponent: Transition,
          fullWidth: true
        },
        React.createElement(
          DialogTitle,
          { id: 'form-dialog-title' },
          'Create Variable'
        ),
        React.createElement(
          DialogContent,
          null,
          React.createElement(
            DialogContentText,
            null,
            'Enter variable name'
          ),
          React.createElement(TextField, {
            autoFocus: true,
            margin: 'dense',
            id: 'name',
            label: 'Variable name',
            type: 'text',
            fullWidth: true,
            value: this.state.variableName,
            onChange: event => this.setState({ variableName: event.target.value })
          })
        ),
        React.createElement(
          DialogActions,
          null,
          React.createElement(
            Button,
            { onClick: () => this.props.setVariableDialogState(null), color: 'primary' },
            'Cancel'
          ),
          React.createElement(
            Button,
            {
              onClick: () => {
                if (this.props.slectedSceneIndex !== '') {
                  this.props.addVariable(this.props.slectedSceneIndex, this.state.variableName);
                } else if (this.props.slectedSceneIndex === '') {
                  this.props.addClassVariable(this.props.slectedGameobjectIndex, this.state.variableName);
                }
                this.props.setVariableDialogState(null);
              },
              color: 'secondary'
            },
            'Create'
          )
        )
      )
    );
  }
});

const mapStateToProps = state => ({
  variableDialogOpen: state.home.variableDialogOpen,
  slectedSceneIndex: state.home.slectedSceneIndex,
  slectedGameobjectIndex: state.home.slectedGameobjectIndex,
  scenes: state.home.scenes
});

const mapDispatchToProps = {
  setVariableDialogState,
  addVariable,
  addInstance,
  addInstancesToScene,
  addClassVariable
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VariableDialog));