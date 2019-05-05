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
import Phaser from 'phaser';

import {
  setSpriteEditorState,
  updateAnimations,
  updateSpriteInfo,
  uploadJson,
} from './actions/home';

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

function preload(file) {
  console.log(this.load);
  this.load.atlas(
    'atlas',
    `assets/animations/${file.alt}.png`,
    `assets/animations/${file.alt}.json`,
  );
}

function create() {
  console.log('create');
  this.anims.create({
    key: 'diamond',
    frames: this.anims.generateFrameNames('atlas', {
      prefix: 'diamond_',
      end: 15,
      zeroPad: 4,
    }),
    repeat: -1,
  });

  console.log(this.anims);
  const gem = this.add
    .sprite(10, 10, 'atlas')
    .play('diamond')
    .setScale(2);
}

class SpriteEditor extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    this.image = new window.Image();
    this.image.src =
      // `assets/${this.props.gameObject.filename}`;
      this.props.selectedFile && this.props.selectedFile.src ? this.props.selectedFile.src : '';
  }

  config = {
    type: Phaser.AUTO,
    parent: 'animation-pv',
    pixelArt: true,
    width: 300,
    height: 300,
    scene: {
      // preload: () => preload(this.props.selectedFile),
      // create,
    },
  };

  onChangeHandler = (event) => {
    if (FileReader && event.target.files[0]) {
      const fr = new FileReader();
      const file = event.target.files[0];
      fr.onloadend = () => {
        file.src = fr.result;
        // this.props.selectFile(file);
        this.props.uploadJson(file);
      };
      fr.readAsDataURL(file);
    }
  };

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
    console.log(this.props);
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
                {this.props.selectedFile &&
                this.props.gameObjects.find(gameObject => gameObject.key === this.props.selectedFile.alt) &&
                this.props.gameObjects.find(gameObject => gameObject.key === this.props.selectedFile.alt).jsonSprite ? (
                  <Stage width={2000} height={3000}>
                    <Layer>
                      <Image image={this.image} />
                      <SquareList info={this.props.animInfo} />
                    </Layer>
                  </Stage>
                ) : (
                  'Please import JSON file for the sprite'
                )}
                <input type="file" name="file" onChange={this.onChangeHandler} />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <div
                  id="animation-pv"
                  ref={(node) => {
                    if (node && !this.game) this.game = new Phaser.Game(this.config);
                  }}
                />
                {/* <Stage width={200} height={200}>
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
                </Stage> */}
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
                  label="prefix"
                  className={classes.textField}
                  value={this.props.animInfo.prefix}
                  onChange={(event) => {
                    const newAniInfo = {
                      ...this.props.animInfo,
                      prefix: event.target.value,
                    };
                    this.props.updateSpriteInfo(newAniInfo);
                    // this.getPreviewAnimations(newAniInfo);
                  }}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="start"
                  className={classes.textField}
                  type="number"
                  value={this.props.animInfo.start}
                  onChange={(event) => {
                    const newAniInfo = {
                      ...this.props.animInfo,
                      start: parseFloat(event.target.value),
                    };
                    this.props.updateSpriteInfo(newAniInfo);
                    // this.getPreviewAnimations(newAniInfo);
                  }}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="end"
                  className={classes.textField}
                  type="number"
                  value={this.props.animInfo.end}
                  onChange={(event) => {
                    const newAniInfo = {
                      ...this.props.animInfo,
                      end: parseFloat(event.target.value),
                    };
                    this.props.updateSpriteInfo(newAniInfo);
                    // this.getPreviewAnimations(newAniInfo);
                  }}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="zero-pad"
                  className={classes.textField}
                  type="number"
                  value={this.props.animInfo.zeroPad}
                  onChange={(event) => {
                    const newAniInfo = {
                      ...this.props.animInfo,
                      zeroPad: parseFloat(event.target.value),
                    };
                    this.props.updateSpriteInfo(newAniInfo);
                    // this.getPreviewAnimations(newAniInfo);
                  }}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="repeat"
                  className={classes.textField}
                  type="number"
                  value={this.props.animInfo.repeat}
                  onChange={(event) => {
                    const newAniInfo = {
                      ...this.props.animInfo,
                      repeat: parseFloat(event.target.value),
                    };
                    this.props.updateSpriteInfo(newAniInfo);
                    // this.getPreviewAnimations(newAniInfo);
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
  selectedFile: state.home.selectedFile.file,
  animations: state.home.animations,
  animInfo: state.home.animInfo,
  gameObjects: state.home.gameObjects,
});

const mapDispatchToProps = {
  setSpriteEditorState,
  updateAnimations,
  updateSpriteInfo,
  uploadJson,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SpriteEditor));
