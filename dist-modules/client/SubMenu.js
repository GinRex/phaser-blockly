import _UsersMacPhaserBlocklyNode_modulesRedboxReactLibIndexJs from '/Users/mac/phaser-blockly/node_modules/redbox-react/lib/index.js';
import _UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs from '/Users/mac/phaser-blockly/node_modules/react-transform-catch-errors/lib/index.js';
import _react from 'react';
import _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs from '/Users/mac/phaser-blockly/node_modules/react-transform-hmr/lib/index.js';
const _components = {
  SubMenu: {
    displayName: 'SubMenu'
  }
};

const _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs2 = _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs({
  filename: 'src/client/SubMenu.jsx',
  components: _components,
  locals: [module],
  imports: [_react]
});

const _UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs2 = _UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs({
  filename: 'src/client/SubMenu.jsx',
  components: _components,
  locals: [],
  imports: [_react, _UsersMacPhaserBlocklyNode_modulesRedboxReactLibIndexJs]
});

function _wrapComponent(id) {
  return function (Component) {
    return _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs2(_UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';

import { connect } from 'react-redux';

import { createNewGame } from './actions/home';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing.unit
  },
  cssLabel: {
    '&$cssFocused': {
      color: red[500]
    }
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: red[500]
    }
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: red[500]
    }
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

const SubMenu = _wrapComponent('SubMenu')(class SubMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game_name: 'Zelda',
      width: 500,
      height: 400
    };
  }

  render() {
    const { classes } = this.props;
    return React.createElement(
      'div',
      {
        style: {
          width: 550,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          overflow: 'auto'
          // margin: 10,
        }
      },
      React.createElement(TextField, {
        className: classes.margin,
        InputLabelProps: {
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused
          }
        },
        InputProps: {
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline
          }
        },
        label: 'Name',
        variant: 'outlined',
        id: 'custom-css-outlined-input',
        value: this.state.game_name,
        onChange: event => this.setState({ game_name: event.target.value })
      }),
      React.createElement(TextField, {
        className: classes.margin,
        InputLabelProps: {
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused
          }
        },
        InputProps: {
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline
          }
        },
        label: 'Width',
        variant: 'outlined',
        id: 'custom-css-outlined-input',
        value: this.state.width,
        onChange: event => this.setState({ width: event.target.value })
      }),
      React.createElement(TextField, {
        className: classes.margin,
        InputLabelProps: {
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused
          }
        },
        InputProps: {
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline
          }
        },
        label: 'Height',
        variant: 'outlined',
        id: 'custom-css-outlined-input',
        value: this.state.height,
        onChange: event => this.setState({ height: event.target.value })
      }),
      React.createElement(
        Button,
        {
          onClick: () => {
            this.props.createNewGame(this.state);
          },
          variant: 'contained',
          color: 'primary',
          className: classes.button
        },
        'New Game'
      )
    );
  }
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  createNewGame
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SubMenu));