import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


import {
  selectFile,
  addClass,
  setSlectedGameobjectIndex,
  updateWorkspace,
  updateGame,
  updateScene,
  updateSceneWorkspace,
  updateToolbox,
  setSpriteEditorState,
  setObjectMenuState,
} from './actions/home';

const styles = theme => ({
  button: {
    margin: 5,
    width: 100,
    height: 100,
    borderRadius: 20,
  },
});

const ClassHandler = (props) => {
  const [open, setOpen] = useState(false);
  const [classname, setClassname] = useState('');

  return (
    <div >
      <input
        type="file"
        ref={(node) => {
          if (node) this.inputRef = node;
        }}
        onChange={(event) => {
          if (FileReader && event.target.files[0]) {
            const fr = new FileReader();
            const file = event.target.files[0];
            fr.onloadend = () => {
              file.src = fr.result;
              props.selectFile(file);
            };
            fr.readAsDataURL(file);
          }
        }}
        style={{ display: 'none' }}
      />
      <Dialog
        // ref={this.modalRef}
        open={open}
        onClose={() => setOpen(false)}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        // TransitionComponent={Transition}
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Create Class</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Class Name"
            fullWidth
            value={classname}
            onChange={event => setClassname(event.target.value)}
          />
          <Button
            onClick={() => {
              const promise = new Promise((resolve, reject) => {
                resolve(props.addClass(classname));
              });
              promise.then((res) => {
                props.blockly.updateToolBox(props.gameObjects, props.scenes, props.slectedSceneIndex, props.slectedGameobjectIndex, props.images);
              });
            }}
            variant="contained"
            color="primary"
          // className={props.classes.button}
          >
            Create Class
          </Button>
        </DialogContent>
      </Dialog>
      <SwipeableDrawer
        anchor="bottom"
        open={props.down}
        onClose={() => props.setClassHandler(false)}
        onOpen={() => {
          props.setClassHandler(true);
        }}
        style={{ zIndex: 10 }}
      >
        <div
          style={{
            width: '100%',
            maxHeight: 300,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            overflow: 'auto',
            minHeight: 150,
          }}
        >
          {props.gameObjects.map(gameObject => (
            <div
              style={{
                width: 100,
                height: 100,
                margin: 5,
                backgroundColor:
                  gameObject.key === props.slectedGameobjectIndex
                    ? 'yellow'
                    : 'white',
                borderWidth: 3,
                borderStyle: 'solid',
                borderColor: 'black',
              }}
            >
              <PersonIcon
                style={{
                  width: 95,
                  height: 95,
                }}
                onClick={(event) => {
                  props.selectFile(event.currentTarget);
                  props.setObjectMenuState(null);
                  props.setObjectMenuState(event.currentTarget);
                  props.setSlectedGameobjectIndex(gameObject.key);
                  Blockly.mainWorkspace.clear();
                  if (gameObject.workspace[props.gameState] !== '') {
                    const xml = Blockly.Xml.textToDom(gameObject.workspace[props.gameState]);
                    Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
                  }
                }}
                alt={gameObject.name}
              />
              {gameObject.name}
            </div>
          ))}
          <PersonAddIcon
            onClick={() => {
              setOpen(true);
            }}
            variant="contained"
            color="primary"
            className={props.classes.button}
          />
        </div>
      </SwipeableDrawer>
    </div>
  );
};

const mapStateToProps = state => ({
  gameObjects: state.home.gameObjects,
  selectedFile: state.home.selectedFile,
  slectedGameobjectIndex: state.home.slectedGameobjectIndex,
  scenes: state.home.scenes,
  slectedSceneIndex: state.home.slectedSceneIndex,
  toolboxCategories: state.home.toolboxCategories,
  objectMenuOpen: state.home.objectMenuOpen.target,
  images: state.home.images,
  gameState: state.home.gameState,
});

const mapDispatchToProps = {
  selectFile,
  addClass,
  setSlectedGameobjectIndex,
  updateWorkspace,
  updateGame,
  updateScene,
  updateSceneWorkspace,
  updateToolbox,
  setSpriteEditorState,
  setObjectMenuState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ClassHandler));
