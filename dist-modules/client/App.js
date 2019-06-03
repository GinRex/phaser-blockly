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
import CodeIcon from '@material-ui/icons/Code';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';

import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Blockly from './dev-index';
import configureStore from './store/configureStore';
import SceneManager from './SceneManager';
import SubMenu from './SubMenu';
import SubHeader from './SubHeader';
import ClassHandler from './ClassHandler';

const { store, persistor } = configureStore();

const drawerWidth = 640;

const styles = theme => ({
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
  appBarShiftRight: {
    width: '0px',
    marginLeft: '100%',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 10
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0
  },
  drawerShiftRight: {
    width: '100%',
    flexShrink: 0,
    zIndex: 0
  },
  drawerPaper: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  drawerPaperShiftRight: {
    width: '100%'
  },
  drawerHeader: _extends({
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px'
  }, theme.mixins.toolbar, {
    justifyContent: 'flex-start',
    flexDirection: 'row'
  }),
  content: {
    flexGrow: 1,
    padding: 20,
    width: '200%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    width: '100%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  contentShiftRight: {
    width: '0%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: drawerWidth
  }
});

const App = _wrapComponent('App')(class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iframeContainerW: 600,
      iframeContainerH: 600,
      scaleRatio: 1,
      iframeW: 100,
      iframeH: 100,
      openBlockly: true,
      openGame: true,
      openClassHandler: false,
      openSceneHandler: false
    };
    this.blockly = React.createRef();
  }


  componentDidMount() {}

  render() {
    const { classes } = this.props;
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
          { className: classes.root },
          React.createElement(CssBaseline, null),
          React.createElement(
            AppBar,
            {
              position: 'fixed',
              className: clsx(classes.appBar, {
                [classes.appBarShift]: this.state.openBlockly
              }, {
                [classes.appBarShiftRight]: !this.state.openGame
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
                  onClick: () => this.setState({ openBlockly: true, openGame: true }),
                  edge: 'start',
                  className: clsx(classes.menuButton, this.state.openBlockly && classes.hide)
                },
                React.createElement(CodeIcon, null)
              ),
              React.createElement(SubMenu, null)
            )
          ),
          React.createElement(
            Drawer,
            {
              className: clsx(classes.drawer, { [classes.drawerShiftRight]: !this.state.openGame }),
              variant: 'persistent',
              anchor: 'left',
              open: this.state.openBlockly,
              classes: {
                paper: this.state.openGame ? classes.drawerPaper : classes.drawerPaperShiftRight
              }
            },
            React.createElement(
              'div',
              {
                className: classes.drawerHeader,
                style: {
                  backgroundColor: 'darkorange',
                  justifyContent: 'space-between',
                  zIndex: 10
                }
              },
              React.createElement(SubHeader, {
                setClassHandler: val => this.setState({ openClassHandler: val }),
                setSceneHandler: val => this.setState({ openSceneHandler: val })
              }),
              this.state.openGame ? React.createElement(
                'div',
                null,
                React.createElement(
                  IconButton,
                  { onClick: () => this.setState({ openBlockly: false }) },
                  React.createElement(ChevronLeftIcon, { color: 'primary' })
                ),
                React.createElement(
                  IconButton,
                  { onClick: () => {
                      this.setState({ openGame: false });
                      this.blockly.editor.resize();
                    }
                  },
                  React.createElement(ChevronRightIcon, null)
                )
              ) : React.createElement(
                IconButton,
                {
                  color: 'inherit',
                  'aria-label': 'Open drawer',
                  onClick: () => this.setState({ openBlockly: true, openGame: true }),
                  edge: 'end',
                  className: clsx(classes.menuButton)
                },
                React.createElement(CodeIcon, null)
              )
            ),
            React.createElement(Blockly, { innerRef: node => {
                if (node) {
                  this.blockly = node;
                }
              }
            })
          ),
          React.createElement(
            'main',
            {
              className: clsx(classes.content, {
                [classes.contentShift]: this.state.openBlockly,
                [classes.contentShiftRight]: !this.state.openGame
              })
            },
            React.createElement(
              'div',
              { className: classes.drawerHeader, style: { marginTop: 50, justifyContent: 'flex-end' } },
              React.createElement(
                IconButton,
                {
                  color: 'inherit',
                  'aria-label': 'Zoom in',
                  onClick: () => {
                    const newRatio = this.state.scaleRatio + 0.1;
                    this.setState({
                      scaleRatio: newRatio,
                      iframeW: 1 / newRatio * 100,
                      iframeH: 1 / newRatio * 100
                    });
                  },
                  edge: 'end',
                  className: clsx(classes.menuButton)
                },
                React.createElement(ZoomInIcon, null)
              ),
              Math.floor(this.state.scaleRatio * 100),
              ' %',
              React.createElement(
                IconButton,
                {
                  color: 'inherit',
                  'aria-label': 'Zoom out',
                  onClick: () => {
                    const newRatio = this.state.scaleRatio - 0.1 > 0 ? this.state.scaleRatio - 0.1 : this.state.scaleRatio;
                    this.setState({
                      scaleRatio: newRatio,
                      iframeW: 1 / newRatio * 100,
                      iframeH: 1 / newRatio * 100
                    });
                  },
                  edge: 'end',
                  className: clsx(classes.menuButton)
                },
                React.createElement(ZoomOutIcon, null)
              )
            ),
            React.createElement(
              'div',
              {
                style: {
                  width: '100%',
                  height: this.state.iframeContainerH,
                  overflow: 'hidden'
                }
              },
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
            React.createElement('textarea', { id: 'code', style: { height: 200, width: 400 }, value: '' })
          ),
          React.createElement(ClassHandler, { down: this.state.openClassHandler, setClassHandler: val => this.setState({ openClassHandler: val }) }),
          React.createElement(SceneManager, { down: this.state.openSceneHandler, setSceneHandler: val => this.setState({ openSceneHandler: val }) })
        )
      )
    );
  }
});

window.addEventListener('load', () => {
  const editor = React.createElement(withStyles(styles)(App));
  ReactDOM.render(editor, document.getElementById('blockly'));
});