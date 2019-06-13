import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import SaveIcon from '@material-ui/icons/Save';
import SettingsIcon from '@material-ui/icons/Settings';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import DoneIcon from '@material-ui/icons/Done';
import Switch from '@material-ui/core/Switch';


import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


import { connect } from 'react-redux';

import { createNewGame, updateGameSetting, saveGame, loadGame, loadListGame } from './actions/home';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: 3,
    },
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
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    paper: {
      marginRight: 15,
    },
  },
}))(InputBase);

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: red[500],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: red[500],
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: red[500],
    },
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class SubMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game_name: '',
      width: 500,
      height: 400,
      gravity: 0,
      debug: false,
      loadGameName: '',
      createOpen: false,
      settingOpen: false,
    };
    this.newGameBtn = React.createRef();
    this.settingBtn = React.createRef();
  }
  componentDidMount() {
    this.props.loadListGame();
  }

  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          overflow: 'auto',
          // margin: 10,
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            overflow: 'auto',
            // margin: 10,
          }}
        >
          <Select
            value={this.state.loadGameName}
            onChange={event => this.setState({ loadGameName: event.target.value })}
            input={<BootstrapInput name="age" id="age-customized-select" />}
          >
            {this.props.listGames.map(game => <MenuItem value={game}>{game}</MenuItem>)}game_name
          </Select>
          <Button
            onClick={() => {
              this.props.loadGame(this.state.loadGameName);
            }}
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            <CloudDownloadIcon />
          </Button>
          <Button
            onClick={() => {
              this.props.saveGame(this.state.loadGameName);
            }}
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            <SaveIcon />
          </Button>
          <Button
            onClick={() => {
              this.setState({ settingOpen: true });
              // this.props.createNewGame(this.state);
              // this.props.saveGame(this.state.game_name);
              // this.props.loadListGame();
            }}
            variant="contained"
            color="inherit"
            className={classes.button}
            ref={(node) => {
              if (node) {
                this.settingBtn = node;
              }
            }}
          >
            <SettingsIcon />
          </Button>
          <Popper open={this.state.settingOpen} anchorEl={this.settingBtn} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper id="menu-list-grow">
                  <ClickAwayListener onClickAway={() => this.setState({ settingOpen: false })} >
                    <Paper className={classes.paper} style={{ width: 200, marginLeft: -120, marginTop: 50 }} >
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          overflow: 'auto',
                          // margin: 10,
                        }}
                      >
                        {/* <TextField
                          className={classes.margin}
                          InputLabelProps={{
                            classes: {
                              root: classes.cssLabel,
                              focused: classes.cssFocused,
                            },
                          }}
                          InputProps={{
                            classes: {
                              root: classes.cssOutlinedInput,
                              focused: classes.cssFocused,
                              notchedOutline: classes.notchedOutline,
                            },
                          }}
                          label="Name"
                          variant="outlined"
                          id="custom-css-outlined-input"
                          value={this.state.game_name}
                          onChange={event => this.setState({ game_name: event.target.value })}
                        /> */}
                        <TextField
                          className={classes.margin}
                          InputLabelProps={{
                            classes: {
                              root: classes.cssLabel,
                              focused: classes.cssFocused,
                            },
                          }}
                          InputProps={{
                            classes: {
                              root: classes.cssOutlinedInput,
                              focused: classes.cssFocused,
                              notchedOutline: classes.notchedOutline,
                            },
                          }}
                          label="Width"
                          variant="outlined"
                          id="custom-css-outlined-input"
                          value={this.state.width}
                          onChange={event => this.setState({ width: event.target.value })}
                        />
                        <TextField
                          className={classes.margin}
                          InputLabelProps={{
                            classes: {
                              root: classes.cssLabel,
                              focused: classes.cssFocused,
                            },
                          }}
                          InputProps={{
                            classes: {
                              root: classes.cssOutlinedInput,
                              focused: classes.cssFocused,
                              notchedOutline: classes.notchedOutline,
                            },
                          }}
                          label="Height"
                          variant="outlined"
                          id="custom-css-outlined-input"
                          value={this.state.height}
                          onChange={event => this.setState({ height: event.target.value })}
                        />
                        <TextField
                          className={classes.margin}
                          InputLabelProps={{
                            classes: {
                              root: classes.cssLabel,
                              focused: classes.cssFocused,
                            },
                          }}
                          InputProps={{
                            classes: {
                              root: classes.cssOutlinedInput,
                              focused: classes.cssFocused,
                              notchedOutline: classes.notchedOutline,
                            },
                          }}
                          label="Gravity"
                          variant="outlined"
                          id="custom-css-outlined-input"
                          value={this.state.gravity}
                          onChange={event => this.setState({ gravity: event.target.value })}
                        />
                        Debug
                        <Switch
                          checked={this.state.debug}
                          onChange={event => this.setState({ debug: event.target.checked })}
                          value={this.state.debug}
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                        <Button
                          onClick={() => {
                            this.props.updateGameSetting(this.state);
                            // this.props.saveGame(this.state.game_name);
                            // this.props.loadListGame();
                          }}
                          variant="contained"
                          color="primary"
                          className={classes.button}
                        >
                          <DoneIcon />
                        </Button>
                      </div>
                    </Paper>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        <div>
          <Button
            onClick={() => {
              this.setState({ createOpen: true });
            }}
            variant="contained"
            color="secondary"
            className={classes.button}
            ref={(node) => {
              if (node) {
                this.newGameBtn = node;
              }
            }}
          >
            <CreateNewFolderIcon />
          </Button>
          <Popper open={this.state.createOpen} anchorEl={this.newGameBtn} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper id="menu-list-grow">
                  <ClickAwayListener onClickAway={() => this.setState({ createOpen: false })} >
                    <Paper className={classes.paper} style={{ width: 200, marginLeft: -120, marginTop: 50 }} >
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          overflow: 'auto',
                          // margin: 10,
                        }}
                      >
                        <TextField
                          className={classes.margin}
                          InputLabelProps={{
                            classes: {
                              root: classes.cssLabel,
                              focused: classes.cssFocused,
                            },
                          }}
                          InputProps={{
                            classes: {
                              root: classes.cssOutlinedInput,
                              focused: classes.cssFocused,
                              notchedOutline: classes.notchedOutline,
                            },
                          }}
                          label="Name"
                          variant="outlined"
                          id="custom-css-outlined-input"
                          value={this.state.game_name}
                          onChange={event => this.setState({ game_name: event.target.value })}
                        />
                        <TextField
                          className={classes.margin}
                          InputLabelProps={{
                            classes: {
                              root: classes.cssLabel,
                              focused: classes.cssFocused,
                            },
                          }}
                          InputProps={{
                            classes: {
                              root: classes.cssOutlinedInput,
                              focused: classes.cssFocused,
                              notchedOutline: classes.notchedOutline,
                            },
                          }}
                          label="Width"
                          variant="outlined"
                          id="custom-css-outlined-input"
                          value={this.state.width}
                          onChange={event => this.setState({ width: event.target.value })}
                        />
                        <TextField
                          className={classes.margin}
                          InputLabelProps={{
                            classes: {
                              root: classes.cssLabel,
                              focused: classes.cssFocused,
                            },
                          }}
                          InputProps={{
                            classes: {
                              root: classes.cssOutlinedInput,
                              focused: classes.cssFocused,
                              notchedOutline: classes.notchedOutline,
                            },
                          }}
                          label="Height"
                          variant="outlined"
                          id="custom-css-outlined-input"
                          value={this.state.height}
                          onChange={event => this.setState({ height: event.target.value })}
                        />
                        <Button
                          onClick={() => {
                            this.props.createNewGame(this.state);
                            // this.props.saveGame(this.state.game_name);
                            // this.props.loadListGame();
                          }}
                          variant="contained"
                          color="primary"
                          className={classes.button}
                        >
                          <DoneIcon />
                        </Button>
                      </div>
                    </Paper>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listGames: state.home.listGames,
});

const mapDispatchToProps = {
  createNewGame,
  saveGame,
  loadGame,
  loadListGame,
  updateGameSetting,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SubMenu));
