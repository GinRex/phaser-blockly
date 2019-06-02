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
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShiftRight: {
    width: '0px',
    marginLeft: '100%',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 10,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0,
  },
  drawerShiftRight: {
    width: '100%',
    flexShrink: 0,
    zIndex: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerPaperShiftRight: {
    width: '100%',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  content: {
    flexGrow: 1,
    padding: 20,
    width: '200%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    width: '100%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  contentShiftRight: {
    width: '0%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: drawerWidth,
  },
});


class App extends Component {
  constructor(props) {
    super(props);
    this.blockly = React.createRef();
  }
  state = {
    iframeContainerW: 600,
    iframeContainerH: 600,
    scaleRatio: 1,
    iframeW: 100,
    iframeH: 100,
    openBlockly: true,
    openGame: true,
    openClassHandler: false,
    openSceneHandler: false,
  }

  componentDidMount() { }

  render() {
    const { classes } = this.props;
    // const theme = useTheme();
    // const [open, setOpen] = React.useState(false);
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: this.state.openBlockly,
              }, {
                  [classes.appBarShiftRight]: !this.state.openGame,
                })}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={() => this.setState({ openBlockly: true, openGame: true })}
                  edge="start"
                  className={clsx(classes.menuButton, this.state.openBlockly && classes.hide)}
                >
                  <CodeIcon />
                </IconButton>
                <SubMenu />
              </Toolbar>
            </AppBar>
            <Drawer
              className={clsx(classes.drawer, { [classes.drawerShiftRight]: !this.state.openGame })}
              variant="persistent"
              anchor="left"
              open={this.state.openBlockly}
              classes={{
                paper: this.state.openGame ? classes.drawerPaper : classes.drawerPaperShiftRight,
              }}
            >
              <div
                className={classes.drawerHeader}
                style={{
                  backgroundColor: 'darkorange',
                  justifyContent: 'space-between',
                  zIndex: 10,
                }}
              >
                <SubHeader 
                setClassHandler={val => this.setState({ openClassHandler: val })}
                setSceneHandler={val => this.setState({ openSceneHandler: val })}
                 />
                {this.state.openGame ?
                  (
                    <div>
                      <IconButton onClick={() => this.setState({ openBlockly: false })}>
                        <ChevronLeftIcon color="primary" />
                      </IconButton>
                      <IconButton onClick={() => {
                        this.setState({ openGame: false });
                        console.log(this.blockly.editor);
                        this.blockly.editor.resize();
                      }}
                      >
                        <ChevronRightIcon />
                      </IconButton>
                    </div>
                  )
                  : (
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      onClick={() => this.setState({ openBlockly: true, openGame: true })}
                      edge="end"
                      className={clsx(classes.menuButton)}
                    >
                      <CodeIcon />
                    </IconButton>)}
              </div>
              <Blockly innerRef={(node) => {
                if (node) {
                  this.blockly = node; console.log(this.blockly);
                }
              }}
              />
            </Drawer>
            {/* <div className="col-sm-10" style={{ height: 500 }}>
                <Blockly />
              </div> */}
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: this.state.openBlockly,
                [classes.contentShiftRight]: !this.state.openGame,
              })}
            >
              <div className={classes.drawerHeader} style={{ marginTop: 50, justifyContent: 'flex-end' }}>
                <IconButton
                  color="inherit"
                  aria-label="Zoom in"
                  onClick={() => {
                    const newRatio = this.state.scaleRatio + 0.1;
                    this.setState({
                      scaleRatio: newRatio,
                      iframeW: (1 / newRatio) * 100,
                      iframeH: (1 / newRatio) * 100,
                    });
                  }}
                  edge="end"
                  className={clsx(classes.menuButton)}
                >
                  <ZoomInIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="Zoom out"
                  onClick={() => {
                    const newRatio = this.state.scaleRatio - 0.1;
                    this.setState({
                      scaleRatio: newRatio,
                      iframeW: (1 / newRatio) * 100,
                      iframeH: (1 / newRatio) * 100,
                    });
                  }}
                  edge="end"
                  className={clsx(classes.menuButton)}
                >
                  <ZoomOutIcon />
                </IconButton>
              </div>
              <div
                style={{
                  width: '100%',
                  height: this.state.iframeContainerH,
                  overflow: 'hidden',
                }}
              >
                <iframe
                  width={`${this.state.iframeW}%`}
                  height={`${this.state.iframeH}%`}
                  style={{
                    WebkitTransform: `scale(${this.state.scaleRatio})`,
                    WebkitTransformOrigin: 'top left',
                  }}
                  title="phaser-game"
                  id="sandboxed"
                  src="game_iframe.html"
                />

              </div>
              <textarea id="code" style={{ height: 200, width: 400 }} value="" />
              {/* <textarea id="xml" style={{ height: 200, width: 400 }} value="" /> */}
            </main>
            <ClassHandler down={this.state.openClassHandler} setClassHandler={val => this.setState({ openClassHandler: val })} />
            <SceneManager down={this.state.openSceneHandler} setSceneHandler={val => this.setState({ openSceneHandler: val })} />
          </div>
        </PersistGate>
      </Provider >
    );
  }
}

window.addEventListener('load', () => {
  const editor = React.createElement(withStyles(styles)(App));
  ReactDOM.render(editor, document.getElementById('blockly'));
});
