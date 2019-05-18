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

import { setVariableDialogState, addVariable } from './actions/home';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  paper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    // overflow: 'scroll',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class VariableDialog extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    variableName: '',
  }

  render() {
    const { classes } = this.props;
    console.log(this.props);
    return (
      <div>
        <Dialog
          ref={this.modalRef}
          open={this.props.variableDialogOpen}
          onClose={() => this.props.setVariableDialogState(false)}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          TransitionComponent={Transition}
          fullWidth
        >
          <DialogTitle id="form-dialog-title">Create Variable</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter variable name
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Variable name"
              type="text"
              fullWidth
              value={this.state.variableName}
              onChange={event => this.setState({ variableName: event.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.setVariableDialogState(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                // console.log(this.state.variableName);
                this.props.addVariable(this.props.slectedSceneIndex, this.state.variableName);
                this.props.setVariableDialogState(false);
              }
              }
              color="secondary"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  variableDialogOpen: state.home.variableDialogOpen,
  slectedSceneIndex: state.home.slectedSceneIndex,
});

const mapDispatchToProps = {
  setVariableDialogState,
  addVariable,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(VariableDialog));
