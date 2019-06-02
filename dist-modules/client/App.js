import _UsersMacPhaserBlocklyNode_modulesRedboxReactLibIndexJs from '/Users/mac/phaser-blockly/node_modules/redbox-react/lib/index.js';
import _UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs from '/Users/mac/phaser-blockly/node_modules/react-transform-catch-errors/lib/index.js';
import _react from 'react';
import _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs from '/Users/mac/phaser-blockly/node_modules/react-transform-hmr/lib/index.js';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const _components = {
  App: {
    displayName: 'App'
  }
};

const _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs2 = _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs({
  filename: 'src/client/App.jsx',
  components: _components,
  locals: [module],
  imports: [_react]
});

const _UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs2 = _UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs({
  filename: 'src/client/App.jsx',
  components: _components,
  locals: [],
  imports: [_react, _UsersMacPhaserBlocklyNode_modulesRedboxReactLibIndexJs]
});

function _wrapComponent(id) {
  return function (Component) {
    return _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs2(_UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Fab from '@material-ui/core/Fab';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';

import Blockly from './dev-index';
import configureStore from './store/configureStore';
import SceneManager from './SceneManager';
import SubMenu from './SubMenu';

const { store, persistor } = configureStore();

// const useStyles = makeStyles(theme => ({
//   fab: {
//     margin: theme.spacing(1),
//   },
//   extendedIcon: {
//     marginRight: theme.spacing(1),
//   },
// }));

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: _extends({
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px'
  }, theme.mixins.toolbar, {
    justifyContent: 'flex-end'
  }),
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

const App = _wrapComponent('App')(class App extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      iframeContainerW: 600,
      iframeContainerH: 400,
      scaleRatio: 1,
      iframeW: 100,
      iframeH: 100,
      openBlockly: true
    }, _temp;
  }

  componentDidMount() {}
  render() {
    const classes = useStyles();
    // const theme = useTheme();
    // const [open, setOpen] = React.useState(false);
    return React.createElement(
      Provider,
      { store: store },
      React.createElement(
        PersistGate,
        { loading: null, persistor: persistor },
        React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              AppBar,
              {
                position: 'fixed',
                className: clsx(classes.appBar, {
                  [classes.appBarShift]: this.state.openBlockly
                })
              },
              React.createElement(
                Toolbar,
                null,
                React.createElement(
                  IconButton,
                  {
                    color: 'inherit',
                    'aria-label': 'Open drawer',
                    onClick: this.setState({ openBlockly: !this.state.openBlockly }),
                    edge: 'start',
                    className: clsx(classes.menuButton, this.state.openBlockly && classes.hide)
                  },
                  React.createElement(MenuIcon, null)
                ),
                'Phaser Block'
              )
            ),
            React.createElement(
              'div',
              { className: 'col-sm-10', style: { height: 500 } },
              React.createElement(Blockly, null)
            ),
            React.createElement(
              'div',
              { className: 'col-sm-2' },
              React.createElement(SubMenu, null),
              React.createElement(
                'div',
                {
                  style: {
                    width: this.state.iframeContainerW,
                    height: this.state.iframeContainerH,
                    overflow: 'hidden'
                  }
                },
                React.createElement(
                  'div',
                  {
                    style: {
                      position: 'absolute',
                      zIndex: 10
                      // transform: 'translateX(-50%)',
                    }
                  },
                  React.createElement(
                    Fab,
                    {
                      color: 'primary',
                      'aria-label': 'Add',
                      onClick: () => {
                        const newRatio = this.state.scaleRatio + 0.1;
                        this.setState({
                          scaleRatio: newRatio,
                          iframeW: 1 / newRatio * 100,
                          iframeH: 1 / newRatio * 100
                        });
                      }
                    },
                    '+'
                  ),
                  React.createElement(
                    Fab,
                    {
                      color: 'secondary',
                      'aria-label': 'Edit',
                      onClick: () => {
                        const newRatio = this.state.scaleRatio - 0.1;
                        this.setState({
                          scaleRatio: newRatio,
                          iframeW: 1 / newRatio * 100,
                          iframeH: 1 / newRatio * 100
                        });
                      }
                    },
                    '-'
                  )
                ),
                React.createElement('iframe', {
                  width: `${this.state.iframeW}%`,
                  height: `${this.state.iframeH}%`,
                  style: {
                    WebkitTransform: `scale(${this.state.scaleRatio})`,
                    WebkitTransformOrigin: 'top left'
                  },
                  title: 'phaser-game',
                  id: 'sandboxed',
                  src: 'game_iframe.html'
                })
              ),
              React.createElement(SceneManager, null),
              React.createElement('textarea', { id: 'code', style: { height: 200, width: 400 }, value: '' })
            )
          )
        )
      )
    );
  }
});

window.addEventListener('load', () => {
  const editor = React.createElement(App);
  ReactDOM.render(editor, document.getElementById('blockly'));
});