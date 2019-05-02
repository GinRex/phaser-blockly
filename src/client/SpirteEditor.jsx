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
import { Stage, Layer, Rect, Text, Image, Sprite } from 'react-konva';
import Konva from 'konva';

import { setSpriteEditorState, updateAnimations, updateSpriteInfo } from './actions/home';

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

const SquareList = (ani) => {
  const info = ani.info;
  const squares = [];
  for (let i = 0; i < info.n; i++) {
    squares.push(<Rect
      x={info.x + info.w * i}
      y={info.y}
      width={info.w}
      height={info.h}
      stroke="red"
        // fill="red"
      strokeWidth={1}
    />);
  }
  return squares;
};

class SpriteEditor extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    this.image = new window.Image();
    this.image.src =
      this.props.selectedFile && this.props.selectedFile.src ? this.props.selectedFile.src : '';
  }

  getPreviewAnimations = (info) => {
    const animations = [];
    for (let i = 0; i < info.n; i++) {
      animations.push(info.x + info.w * i);
      animations.push(info.y);
      animations.push(info.w);
      animations.push(info.h);
    }
    this.props.updateAnimations({ example: animations });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          ref={this.modalRef}
          open={this.props.spriteEditOpen}
          onClose={() => this.props.setSpriteEditorState(false)}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          TransitionComponent={Transition}
          fullWidth
          maxWidth="xl"
          keepMounted
        >
          <DialogTitle id="scroll-dialog-title">Animation</DialogTitle>
          <DialogContent>
            <div className={classes.paper}>
              <div
                style={{
                  margin: '0',
                  padding: '0',
                  overflow: 'hidden',
                  backgroundColor: '#f0f0f0',
                  width: window.innerWidth * 0.6,
                  height: window.innerHeight * 0.6,
                  overflow: 'auto',
                }}
              >
                <Stage width={2000} height={3000}>
                  <Layer>
                    <Image image={this.image} />
                    <SquareList info={this.props.animInfo} />
                  </Layer>
                </Stage>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Stage width={200} height={200}>
                  <Layer>
                    <Sprite
                      x={0}
                      y={0}
                      image={this.image}
                      animation="example"
                      animations={this.props.animations}
                      frameRate={10}
                      frameIndex={0}
                      ref={(node) => {
                        if (node && !node.isRunning()) node.start();
                      }}
                    />
                  </Layer>
                </Stage>
                <TextField
                  id="standard-name"
                  label="Animation name"
                  className={classes.textField}
                  value={this.props.animInfo.name}
                  onChange={(event) => {
                    this.props.updateSpriteInfo({
                      ...this.props.animInfo,
                      name: event.target.value,
                    });
                  }}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="x"
                  className={classes.textField}
                  type="number"
                  value={this.props.animInfo.x}
                  onChange={(event) => {
                    const newAniInfo = {
                      ...this.props.animInfo,
                      x: parseFloat(event.target.value),
                    };
                    this.props.updateSpriteInfo(newAniInfo);
                    this.getPreviewAnimations(newAniInfo);
                  }}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="y"
                  className={classes.textField}
                  type="number"
                  value={this.props.animInfo.y}
                  onChange={(event) => {
                    const newAniInfo = {
                      ...this.props.animInfo,
                      y: parseFloat(event.target.value),
                    };
                    this.props.updateSpriteInfo(newAniInfo);
                    this.getPreviewAnimations(newAniInfo);
                  }}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="width"
                  className={classes.textField}
                  type="number"
                  value={this.props.animInfo.w}
                  onChange={(event) => {
                    const newAniInfo = {
                      ...this.props.animInfo,
                      w: parseFloat(event.target.value),
                    };
                    this.props.updateSpriteInfo(newAniInfo);
                    this.getPreviewAnimations(newAniInfo);
                  }}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="height"
                  className={classes.textField}
                  type="number"
                  value={this.props.animInfo.h}
                  onChange={(event) => {
                    const newAniInfo = {
                      ...this.props.animInfo,
                      h: parseFloat(event.target.value),
                    };
                    this.props.updateSpriteInfo(newAniInfo);
                    this.getPreviewAnimations(newAniInfo);
                  }}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="number of frame"
                  className={classes.textField}
                  type="number"
                  value={this.props.animInfo.n}
                  onChange={(event) => {
                    const newAniInfo = {
                      ...this.props.animInfo,
                      n: parseFloat(event.target.value),
                    };
                    this.props.updateSpriteInfo(newAniInfo);
                    this.getPreviewAnimations(newAniInfo);
                  }}
                  margin="normal"
                />
                <Button
                  onClick={() => {
                    const animations = [];
                    const info = this.props.animInfo;
                    for (let i = 0; i < info.n; i++) {
                      animations.push(info.x + info.width * i);
                      animations.push(info.y);
                      animations.push(info.width);
                      animations.push(info.height);
                    }
                  }}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Create Animation
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spriteEditOpen: state.home.spriteEditOpen,
  selectedFile: state.home.selectedFile,
  animations: state.home.animations,
  animInfo: state.home.animInfo,
});

const mapDispatchToProps = {
  setSpriteEditorState,
  updateAnimations,
  updateSpriteInfo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SpriteEditor));
