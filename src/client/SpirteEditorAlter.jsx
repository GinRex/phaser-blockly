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
import { Stage, Layer, Rect, Text, Image, Sprite, Label } from 'react-konva';
import Konva from 'konva';
import Phaser from 'phaser';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';

import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';


import {
  setSpriteEditorState,
  updateAnimations,
  uploadJson,
  addAnimations,
  uploadImage,
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

// maybe consider change this to draw sprite instead of json

// const SquareList = (ani) => {
//   const info = ani.info;
//   const squares = [];
//   for (let i = 0; i < info.n; i++) {
//     squares.push(<Rect
//       x={info.x + info.w * i}
//       y={info.y}
//       width={info.w}
//       height={info.h}
//       stroke="red"
//       // fill="red"
//       strokeWidth={1}
//     />);
//   }
//   return squares;
// };

// const SquareList = (ani) => {
//   const info = ani.info;
//   console.log(info);

//   const squares = [];
//   info.map((square) => {
//     squares.push(<Rect
//       x={square.frame.x}
//       y={square.frame.y}
//       width={square.frame.w}
//       height={square.frame.h}
//       stroke="red"
//       // fill="red"
//       strokeWidth={1}
//     // onClick={()}
//     />);
//   });
// for (let i = 0; i < info.length; i++) {
//   squares.push(<Rect
//     x={10}
//     y={20}
//     width={200}
//     height={200}
//     stroke="red"
//     // fill="red"
//     strokeWidth={1}
//   />);
// }
//   return squares;
// };

class SpriteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.stage = React.createRef();
    this.inputRef = React.createRef();
  }
  state = {
    selectedImageKey: '',
    frameKey: '',
    imageFile: null,
    animInfo: {
      key: '',
      frames: [],
      frameRate: 30,
      repeat: -1,
    },
    animationPV: { example: [] },
  }

  onChangeHandler = (event, name) => {
    if (FileReader && event.target.files[0]) {
      const fr = new FileReader();
      const file = event.target.files[0];
      fr.onloadend = () => {
        file.src = fr.result;
        // this.props.selectFile(file);
        this.props.uploadJson(file, name);
      };
      fr.readAsDataURL(file);
    }
  };

  getPreviewAnimations = (animInfo, jsonSprite) => {
    const animations = [];
    animInfo.frames.map((frame) => {
      jsonSprite.filter(sprite => sprite.filename === frame.frame).map((sprite) => {
        animations.push(sprite.frame.x);
        animations.push(sprite.frame.y);
        animations.push(sprite.frame.w);
        animations.push(sprite.frame.h);
      });
    });
    console.log(animations, animInfo.frames);

    // const info = animInfo.frames;
    // for (let i = 0; i < info.length; i++) {
    //   animations.push(info.x + info.w * i);
    //   animations.push(info.y);
    //   animations.push(info.w);
    //   animations.push(info.h);
    // }
    return animations;
  };

  render() {
    const { classes } = this.props;
    const currentImage = this.props.images.find(image => image.filename === this.state.selectedImageKey);
    return (
      <div>
        <input
          ref={(node) => {
            if (node) this.inputRef = node;
          }}
          type="file"
          name="file"
          onChange={(event) => {
            if (FileReader && event.target.files[0]) {
              const fr = new FileReader();
              const file = event.target.files[0];
              fr.onloadend = () => {
                file.src = fr.result;
                // this.props.selectFile(file);
                // this.props.uploadJson(file, name);
                this.props.uploadImage(file);
              };
              fr.readAsDataURL(file);
            }
          }}
          style={{ display: 'none' }}
        />
        <Dialog
          // ref={this.modalRef}
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
              <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                  {this.props.images.map(image => (
                    <ListItem
                      button
                      key={image.name}
                      style={{ flexDirection: 'column' }}
                      selected={this.state.selectedImageKey === image.filename}
                      onClick={(event) => {
                        // console.log(event.currentTarget.getAttribute('key'));
                        const imageFile = new window.Image();
                        imageFile.src = event.target.src;
                        this.setState({ selectedImageKey: event.target.alt, imageFile, frameKey: image.name });
                        console.log(this.state);
                      }
                      }
                    >
                      <img
                        src={`assets/${image.filename}`}
                        style={{
                          width: 95,
                          height: 95,
                        }}
                        alt={image.filename}
                      />
                      <ListItemText primary={image.filename} />
                    </ListItem >
                  ))}
                  <Button
                    onClick={() => {
                      this.inputRef.click();
                    }}
                    variant="contained"
                    color="inherit"
                  // className={props.classes.button}
                  >
                    <AddPhotoAlternateIcon
                      // style={{
                      //   width: 95,
                      //   height: 95,

                      // }}
                      variant="contained"
                      color="primary"
                    />
                    Upload
                  </Button>

                </List>
              </div>
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
                {this.state.selectedImageKey !== '' &&
                  currentImage &&
                  currentImage.jsonSprite ? (
                    <Stage
                      width={window.innerWidth}
                      height={window.innerHeight}
                      // scaleX={1}
                      // scaleY={1}
                      ref={(node) => {
                        if (node) {
                          this.stage = node;
                          node.draggable(true);
                        }
                      }}
                      onWheel={(e) => {
                        const scaleBy = 1.01;
                        e.evt.preventDefault();
                        const oldScale = this.stage.scaleX();

                        const mousePointTo = {
                          x: this.stage.getPointerPosition().x / oldScale - this.stage.x() / oldScale,
                          y: this.stage.getPointerPosition().y / oldScale - this.stage.y() / oldScale,
                        };

                        const newScale =
                          e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
                        this.stage.scale({ x: newScale, y: newScale });

                        const newPos = {
                          x:
                            -(mousePointTo.x - this.stage.getPointerPosition().x / newScale) *
                            newScale,
                          y:
                            -(mousePointTo.y - this.stage.getPointerPosition().y / newScale) *
                            newScale,
                        };
                        this.stage.position(newPos);
                        this.stage.batchDraw();
                      }}
                    >
                      <Layer>
                        <Image image={this.state.imageFile} />
                        {currentImage.jsonSprite.map(square =>
                          (<Rect
                            x={square.frame.x}
                            y={square.frame.y}
                            width={square.frame.w}
                            height={square.frame.h}
                            stroke="red"
                            // fill="red"
                            strokeWidth={1}
                            onClick={() => {
                              const frames = [...this.state.animInfo.frames];
                              const selectedFrame = frames.find(frame => frame.frame === square.filename);
                              if (selectedFrame) {
                                this.setState({ animInfo: { ...this.state.animInfo, frames: frames.filter(frame => frame.frame !== selectedFrame.frame) } });
                              } else {
                                this.setState({ animInfo: { ...this.state.animInfo, frames: [...frames, { key: this.state.frameKey, frame: square.filename }] } });
                              }
                              this.setState({ animationPV: { example: this.getPreviewAnimations(this.state.animInfo, currentImage.jsonSprite) } });
                            }}
                          />))}
                        {/* <SquareList info={this.props.images.find(image => image.filename === this.state.selectedImageKey).jsonSprite} /> */}
                      </Layer>
                    </Stage>
                  ) : (
                    this.state.selectedImageKey ? 'Please import JSON file for the sprite' : 'Select sprite to create animations'
                  )}
                {this.state.selectedImageKey ?
                  <input
                    type="file"
                    name="file"
                    onChange={event => this.onChangeHandler(event, this.state.selectedImageKey)}
                  /> : null}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                {/* <div
                  id="animation-pv"
                  ref={(node) => {
                    if (node && !this.game) this.game = new Phaser.Game(this.config);
                  }}
                /> */}
                <Stage width={200} height={200}>
                  <Layer>
                    <Sprite
                      x={0}
                      y={0}
                      image={this.state.imageFile}
                      animation="example"
                      animations={this.state.animationPV}
                      frameRate={this.state.animInfo.frameRate}
                      frameIndex={0}
                      ref={(node) => {
                        if (node && !node.isRunning()) node.start();
                      }}
                    />
                  </Layer>
                </Stage>
                {this.state.animInfo.frames.map(frame => (
                  <Chip
                    key={frame.frame}
                    // icon={icon}
                    label={frame.frame}
                    onDelete={() => {
                      this.setState(
                        { animInfo: { ...this.state.animInfo, frames: this.state.animInfo.frames.filter(fm => fm.frame !== frame.frame) } },
                        () => {
                          this.setState({ animationPV: { example: this.getPreviewAnimations(this.state.animInfo, currentImage.jsonSprite) } });
                        },
                      );
                    }}
                  // className={classes.chip}
                  />
                ))

                }
                <TextField
                  id="standard-name"
                  label="Animation key"
                  className={classes.textField}
                  value={this.state.animInfo.key}
                  onChange={(event) => {
                    this.setState({
                      animInfo: {
                        ...this.state.animInfo,
                        key: event.target.value,
                      },
                    });
                  }}
                  margin="normal"
                />

                <TextField
                  id="standard-name"
                  label="Frame rate"
                  className={classes.textField}
                  type="number"
                  value={this.state.animInfo.frameRate}
                  onChange={(event) => {
                    this.setState({
                      animInfo: {
                        ...this.state.animInfo,
                        frameRate: parseFloat(event.target.value),
                      },
                    });
                    // this.setState({ animationPV: { example: this.getPreviewAnimations(this.state.animInfo, currentImage.jsonSprite) } });
                  }}
                  margin="normal"
                />
                <TextField
                  id="standard-name"
                  label="repeat"
                  className={classes.textField}
                  type="number"
                  value={this.state.animInfo.repeat}
                  onChange={(event) => {
                    this.setState({
                      animInfo: {
                        ...this.state.animInfo,
                        repeat: parseFloat(event.target.value),
                      },
                    });
                    // this.getPreviewAnimations(newAniInfo);
                  }}
                  margin="normal"
                />
                <Button
                  onClick={() => {
                    this.props.addAnimations(this.state.animInfo);
                    // this.props.updateToolBoxAnimations();
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
  images: state.home.images,
});

const mapDispatchToProps = {
  setSpriteEditorState,
  updateAnimations,
  uploadJson,
  addAnimations,
  uploadImage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SpriteEditor));
