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

import { selectFile, uploadImage, uploadImageForTile, setSlectedGameobjectIndex, updateWorkspace, updateGame, updateScene, updateSceneWorkspace, updateToolbox, setSpriteEditorState, setObjectMenuState, setVariableDialogState } from './actions/home';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  speedDial: {
    position: 'absolute',
    bottom: 5,
    right: 3
  }
});

const actions = [{ icon: React.createElement(CloudUploadIcon, null), name: 'Upload Image for use' }, { icon: React.createElement(CreateNewFolderIcon, null), name: 'Create Class from Image' }];

const ClassHandler = props => {
  const [open, setOpen] = useState(false);
  const [hidden, setHide] = useState(false);
  return React.createElement(
    'div',
    {
      style: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },
    React.createElement(
      SwipeableDrawer,
      {
        anchor: 'bottom',
        open: props.down,
        onClose: () => props.setClassHandler(false),
        onOpen: () => props.setClassHandler(true),
        style: { zIndex: 10 }
      },
      React.createElement(
        'div',
        {
          style: {
            width: '100%',
            maxHeight: 300,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            overflow: 'auto',
            minHeight: 150
          }
        },
        props.gameObjects.map(gameObject => React.createElement(
          'div',
          {
            style: {
              width: 100,
              height: 100,
              margin: 5,
              backgroundColor: gameObject.key === props.slectedGameobjectIndex ? 'yellow' : 'white',
              borderWidth: 3,
              borderStyle: 'solid',
              borderColor: 'black'
            }
          },
          React.createElement('img', {
            src: `assets/${gameObject.filename}`,
            style: {
              width: 95,
              height: 95
            },
            onClick: event => {
              props.selectFile(event.currentTarget);
              props.setObjectMenuState(null);
              props.setObjectMenuState(event.currentTarget);
              props.setSlectedGameobjectIndex(gameObject.key);
              Blockly.mainWorkspace.clear();
              if (gameObject.workspace !== '') {
                const xml = Blockly.Xml.textToDom(gameObject.workspace);
                Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
              }
            },
            alt: gameObject.name
          }),
          React.createElement(
            Popover,
            {
              id: 'simple-popper',
              open: Boolean(props.objectMenuOpen),
              anchorEl: props.objectMenuOpen,
              onClose: () => props.setObjectMenuState(null),
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center'
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'center'
              }
            },
            React.createElement(
              'div',
              { onClick: () => props.setSpriteEditorState(true) },
              'Create Animation'
            )
          )
        ))
      )
    )
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
  images: state.home.images
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
  setVariableDialogState
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ClassHandler));