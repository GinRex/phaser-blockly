import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';

import {
  selectFile,
  uploadImage,
  uploadImageForTile,
  setSlectedGameobjectIndex,
  updateWorkspace,
  updateGame,
  updateScene,
  updateSceneWorkspace,
  updateToolbox,
  setSpriteEditorState,
  setObjectMenuState,
  setVariableDialogState,
} from './actions/home';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  speedDial: {
    position: 'absolute',
    bottom: 10,
    right: 3,
    zIndex: 100,
  },
});

const actions = [
  { icon: <CloudUploadIcon />, name: 'Upload Image for use' },
  { icon: <CreateNewFolderIcon />, name: 'Create Class from Image' },
];

const ClassHandler = (props) => {
  const [open, setOpen] = useState(false);

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
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={props.classes.speedDial}
        hidden={!props.down}
        icon={<SpeedDialIcon />}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen(!open)}
        onClose={() => setOpen(false)}
        onFocus={() => {
          if (props.down) setOpen(true);
        }}
        onMouseEnter={() => {
          if (props.down) setOpen(true);
        }}
        onMouseLeave={() => setOpen(false)}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            // onClick={() => {
            //   this.inputRef.click();
            //   console.log('aaa', this.inputRef);
            //   setOpen(!open);
            // }}
            ButtonProps={{
              onClick: e => console.log(e),
            }}
          />
        ))}
      </SpeedDial>
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
              <img
                src={`assets/${gameObject.filename}`}
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
              <Popover
                id="simple-popper"
                open={Boolean(props.objectMenuOpen)}
                anchorEl={props.objectMenuOpen}
                onClose={() => props.setObjectMenuState(null)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <div onClick={() => props.setSpriteEditorState(true)}>
                  Create Animation
                </div>
              </Popover>
            </div>
          ))}
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
  uploadImage,
  uploadImageForTile,
  setSlectedGameobjectIndex,
  updateWorkspace,
  updateGame,
  updateScene,
  updateSceneWorkspace,
  updateToolbox,
  setSpriteEditorState,
  setObjectMenuState,
  setVariableDialogState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ClassHandler));
