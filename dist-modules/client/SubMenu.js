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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';

import { connect } from 'react-redux';

import { createNewGame, saveGame, loadGame, loadListGame } from './actions/home';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: 3
    }
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '200px',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}))(InputBase);

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
      game_name: '',
      width: 500,
      height: 400,
      loadGameName: ''
    };
  }
  componentDidMount() {
    this.props.loadListGame();
  }

  render() {
    const { classes } = this.props;
    return React.createElement(
      'div',
      null,
      React.createElement(
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
              // this.props.saveGame(this.state.game_name);
              // this.props.loadListGame();
            },
            variant: 'contained',
            color: 'primary',
            className: classes.button
          },
          'New Game'
        ),
        React.createElement(
          Button,
          {
            onClick: () => {
              // this.props.createNewGame(this.state);
              // this.props.saveGame(this.state.game_name);
              // this.props.loadListGame();
            },
            variant: 'contained',
            color: 'primary',
            className: classes.button
          },
          'Game Setting'
        )
      ),
      React.createElement(
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
        React.createElement(
          Select,
          {
            value: this.state.loadGameName,
            onChange: event => this.setState({ loadGameName: event.target.value }),
            input: React.createElement(BootstrapInput, { name: 'age', id: 'age-customized-select' })
          },
          this.props.listGames.map(game => React.createElement(
            MenuItem,
            { value: game },
            game
          )),
          'game_name'
        ),
        React.createElement(
          Button,
          {
            onClick: () => {
              this.props.loadGame(this.state.loadGameName);
            },
            variant: 'contained',
            color: 'primary',
            className: classes.button
          },
          'Load Project'
        ),
        React.createElement(
          Button,
          {
            onClick: () => {
              this.props.saveGame(this.state.loadGameName);
            },
            variant: 'contained',
            color: 'secondary',
            className: classes.button
          },
          'Save Project'
        )
      )
    );
  }
});

const mapStateToProps = state => ({
  listGames: state.home.listGames
});

const mapDispatchToProps = {
  createNewGame,
  saveGame,
  loadGame,
  loadListGame
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SubMenu));