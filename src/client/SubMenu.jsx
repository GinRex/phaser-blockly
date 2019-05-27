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
      loadGameName: '',
    };
  }
  componentDidMount() {
    this.props.loadListGame();
  }

  render() {
    const { classes } = this.props;
    return (
      <div >
        <div
          style={{
            width: 550,
            display: 'flex',
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
            New Game
          </Button>
        </div>
        <div
          style={{
            width: 550,
            display: 'flex',
            justifyContent: 'space-between',
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
            color="primary"
            className={classes.button}
          >
            Load Project
          </Button>
          <Button
            onClick={() => {
              this.props.saveGame(this.state.loadGameName);
            }}
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Save Project
          </Button>
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SubMenu));
