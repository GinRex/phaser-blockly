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
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    order: 0,
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.variableDialogOpen && this.props.variableDialogOpen.key ?
          <Dialog
            ref={this.modalRef}
            open={Boolean(this.props.variableDialogOpen)}
            onClose={() => this.props.setVariableDialogState(null)}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            TransitionComponent={Transition}
            fullWidth
          >
            <DialogTitle id="form-dialog-title">Create Object</DialogTitle>
            <DialogContent>
              <img
                src={`assets/${this.props.variableDialogOpen.filename}`}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 20,
                }}
              />
              <DialogContentText>
                Enter object info
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                value={this.state.variableName}
                onChange={event => this.setState({ variableName: event.target.value })}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="x"
                type="number"
                fullWidth
                value={this.state.x}
                onChange={event => this.setState({ x: event.target.value })}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="y"
                type="number"
                fullWidth
                value={this.state.y}
                onChange={event => this.setState({ y: event.target.value })}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="width"
                type="number"
                fullWidth
                value={this.state.w}
                onChange={event => this.setState({ w: event.target.value })}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="height"
                type="number"
                fullWidth
                value={this.state.h}
                onChange={event => this.setState({ h: event.target.value })}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="order (to camera)"
                type="number"
                fullWidth
                value={this.state.order}
                onChange={event => this.setState({ order: event.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.props.setVariableDialogState(null)} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // console.log(this.state.variableName);
                  const promise = new Promise((resolve, reject) => {
                    resolve(this.props.addInstance({
                      variableName: this.state.variableName,
                      class: this.props.variableDialogOpen.name,
                      x: this.state.x,
                      y: this.state.y,
                      w: this.state.w,
                      h: this.state.h,
                      order: this.state.order,
                    }, this.props.slectedSceneIndex));
                  });
                  promise.then((res) => {
                    const currentScene = this.props.scenes.find(scene => scene.key === this.props.slectedSceneIndex);
                    this.props.addInstancesToScene(currentScene);
                    this.props.setVariableDialogState(null);
                  });
                }
                }
                color="secondary"
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
          :
          <Dialog
            ref={this.modalRef}
            open={Boolean(this.props.variableDialogOpen)}
            onClose={() => this.props.setVariableDialogState(null)}
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
              <Button onClick={() => this.props.setVariableDialogState(null)} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (this.props.slectedSceneIndex !== '') {
                    this.props.addVariable(this.props.slectedSceneIndex, this.state.variableName);
                  } else if (this.props.slectedSceneIndex === '') {
                    this.props.addClassVariable(this.props.slectedGameobjectIndex, this.state.variableName);
                  }
                  this.props.setVariableDialogState(null);
                }
                }
                color="secondary"
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  variableDialogOpen: state.home.variableDialogOpen,
  slectedSceneIndex: state.home.slectedSceneIndex,
  slectedGameobjectIndex: state.home.slectedGameobjectIndex,
  scenes: state.home.scenes,
});

const mapDispatchToProps = {
  setVariableDialogState,
  addVariable,
  addInstance,
  addInstancesToScene,
  addClassVariable,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(VariableDialog));
