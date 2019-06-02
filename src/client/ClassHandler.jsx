import React from 'react';
import Popover from '@material-ui/core/Popover';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
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
});

const ClassHandler = props => (
  <div
    style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
    }}
  >
    <SwipeableDrawer
      anchor="bottom"
      open={props.down}
      onClose={() => props.setClassHandler(false)}
      onOpen={() => props.setClassHandler(true)}
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
                if (gameObject.workspace !== '') {
                  const xml = Blockly.Xml.textToDom(gameObject.workspace);
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

const mapStateToProps = state => ({
  gameObjects: state.home.gameObjects,
  selectedFile: state.home.selectedFile,
  slectedGameobjectIndex: state.home.slectedGameobjectIndex,
  scenes: state.home.scenes,
  slectedSceneIndex: state.home.slectedSceneIndex,
  toolboxCategories: state.home.toolboxCategories,
  objectMenuOpen: state.home.objectMenuOpen.target,
  images: state.home.images,
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
