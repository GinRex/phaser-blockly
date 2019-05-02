/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import { connect } from 'react-redux';
import ConfigFiles from './initContent/content';
import parseWorkspaceXml from './BlocklyHelper';
import ReactBlocklyComponent from './index';
import SpriteEditor from './SpirteEditor';

import {
  selectFile,
  uploadImage,
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
    margin: theme.spacing.unit,
  },
});

class BlocklyPart extends React.Component {
  constructor(props) {
    super(props);
    this.updateBlocks(this.props.gameObjects);
  }
  componentDidMount() {
    this.updateToolBox(this.props.gameObjects);
  }

  // upload image
  onChangeHandler = (event) => {
    if (FileReader && event.target.files[0]) {
      const fr = new FileReader();
      const file = event.target.files[0];
      fr.onloadend = () => {
        file.src = fr.result;
        this.props.selectFile(file);
      };
      fr.readAsDataURL(file);
    }
  };

  updateBlocks = (gameObjects) => {
    gameObjects.map((gameObject) => {
      Blockly.Blocks[`instance_${gameObject.name}`] = {
        init() {
          this.appendDummyInput().appendField(new Blockly.FieldImage(`assets/${gameObject.filename}`, 30, 30, '*'));
          this.appendDummyInput().appendField(new Blockly.FieldTextInput('default'), 'object_name');
          this.setInputsInline(true);
          this.setOutput(true, 'game_object');
          this.setColour(240);
          this.setTooltip('game object');
          this.setHelpUrl('');
        },
      };
      Blockly.Blocks[`init_${gameObject.name}`] = {
        init() {
          this.appendDummyInput()
            .appendField(new Blockly.FieldImage(`assets/${gameObject.filename}`, 30, 30, '*'))
            .appendField('init ')
            .appendField(new Blockly.FieldTextInput('object'), 'object_name');
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);
          this.setTooltip('create new object from class');
          this.setHelpUrl('');
        },
      };
      Blockly.Blocks[`update_${gameObject.name}`] = {
        init() {
          this.appendDummyInput()
            .appendField(new Blockly.FieldImage(`assets/${gameObject.filename}`, 30, 30, '*'))
            .appendField('update ')
            .appendField(new Blockly.FieldTextInput('object'), 'object_name');
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);
          this.setTooltip('update object');
          this.setHelpUrl('');
        },
      };
      // code
      Blockly.JavaScript[`instance_${gameObject.name}`] = function (block) {
        const text_object_name = block.getFieldValue('object_name');
        // TODO: Assemble JavaScript into code variable.
        const code = `this.${text_object_name}`;
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.JavaScript.ORDER_NONE];
      };
      Blockly.JavaScript[`init_${gameObject.name}`] = function (block) {
        const text_object_name = block.getFieldValue('object_name');
        // TODO: Assemble JavaScript into code variable.
        const code = `this.${text_object_name} = new Class.${gameObject.name}({
          scene: this,
          key: '${gameObject.name}',
          x: 0,
          y: 0,
          width: 100,
          height: 100,
        });\n`;
        return code;
      };
      Blockly.JavaScript[`update_${gameObject.name}`] = function (block) {
        const text_object_name = block.getFieldValue('object_name');
        // TODO: Assemble JavaScript into code variable.
        const code = `this.${text_object_name}.update(this.cursors);\n`;
        return code;
      };
    });
  };

  updateToolBox = (gameObjects) => {
    this.props.updateToolbox(gameObjects.map(gameObject => ({
      name: gameObject.name,
      blocks: [
        { type: `instance_${gameObject.name}` },
        { type: `init_${gameObject.name}` },
        { type: `update_${gameObject.name}` },
      ],
    })));
    this.updateBlocks(gameObjects);
  };

  workspaceDidChange = (
    workspace,
    gameObjects,
    slectedGameobjectIndex,
    scenes,
    slectedSceneIndex,
  ) => {
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    const currentGameobject =
      gameObjects &&
      slectedGameobjectIndex &&
      gameObjects.find(gameObject => gameObject.key === slectedGameobjectIndex);
    if (currentGameobject) {
      currentGameobject.workspace = newXml;
      currentGameobject.jsCode = code;

      const newGameObjects = gameObjects;
      const index = newGameObjects.findIndex(gameObject => gameObject.key === slectedGameobjectIndex);
      newGameObjects[index] = currentGameobject;

      this.props.updateWorkspace(newGameObjects);
    }
    const currentScene =
      scenes && slectedSceneIndex && scenes.find(scene => scene.key === slectedSceneIndex);
    if (currentScene) {
      currentScene.workspace = newXml;
      currentScene.jsCode = code;

      const newScenes = scenes;
      const index = newScenes.findIndex(scene => scene.key === slectedSceneIndex);
      newScenes[index] = currentScene;

      this.props.updateSceneWorkspace(newScenes);
    }
    document.getElementById('code').value = code;
  };

  render() {
    const { classes } = this.props;
    const currentGameobject = this.props.gameObjects.find(gameObject => gameObject.key === this.props.slectedGameobjectIndex);
    const currentScene = this.props.scenes.find(scene => scene.key === this.props.slectedSceneIndex);
    return (
      <div style={{ height: 500 }}>
        <Button
          onClick={() => {
            if (this.props.slectedGameobjectIndex) {
              this.props.updateGame(this.props.gameObjects);
            }
            if (this.props.slectedSceneIndex) {
              this.props.updateScene(this.props.scenes);
            }
          }}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Build and Run
        </Button>
        <Button
          onClick={() => {
            const myWindow = window.open(`${window.location.href}game_iframe.html`, 'game');
            myWindow.focus();
            if (this.props.slectedGameobjectIndex) {
              this.props.updateGame(this.props.gameObjects);
            }
            if (this.props.slectedSceneIndex) {
              this.props.updateScene(this.props.scenes);
            }
          }}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Open in new tab
        </Button>
        <ReactBlocklyComponent.BlocklyEditor
          toolboxCategories={parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_XML).concat(this.props.toolboxCategories)}
          workspaceConfiguration={{
            grid: {
              spacing: 20,
              length: 3,
              colour: '#ccc',
              snap: true,
            },
          }}
          initialXml={
            this.props.gameObjects.length !== 0 && currentGameobject && currentGameobject.workspace
              ? currentGameobject.workspace
              : this.props.scenes.length !== 0 && currentScene && currentScene.workspace
              ? currentScene.workspace
              : null
          }
          wrapperDivClassName="fill-height"
          workspaceDidChange={workspace =>
            this.workspaceDidChange(
              workspace,
              this.props.gameObjects,
              this.props.slectedGameobjectIndex,
              this.props.scenes,
              this.props.slectedSceneIndex,
            )
          }
        />
        <input
          type="file"
          name="file"
          onClick={() => this.props.selectFile(null)}
          onChange={this.onChangeHandler}
        />
        <button
          type="button"
          className="btn btn-success btn-block"
          onClick={() => {
            if (this.props.selectFile) {
              const promise = new Promise((resolve, reject) => {
                resolve(this.props.uploadImage(this.props.selectedFile));
              });
              promise.then((res) => {
                this.updateToolBox(this.props.gameObjects);
              });
            }
          }}
        >
          Create Class
        </button>
        <div
          style={{
            borderWidth: 3,
            borderColor: 'black',
            borderRadius: 20,
            width: 550,
            maxHeight: 300,
            backgroundColor: 'grey',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            overflow: 'auto',
            minHeight: 150,
          }}
        >
          {this.props.gameObjects.map(gameObject => (
            <div
              style={{
                width: 100,
                height: 100,
                margin: 5,
                backgroundColor:
                  gameObject.key === this.props.slectedGameobjectIndex ? 'yellow' : 'white',
                borderWidth: 3,
                borderRadius: 20,
              }}
            >
              <img
                src={`assets/${gameObject.filename}`}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 20,
                }}
                onClick={(event) => {
                  this.props.selectFile(event.currentTarget);
                  this.props.setObjectMenuState(null);
                  this.props.setObjectMenuState(event.currentTarget);
                  this.props.setSlectedGameobjectIndex(gameObject.key);
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
                open={Boolean(this.props.objectMenuOpen)}
                anchorEl={this.props.objectMenuOpen}
                onClose={() => this.props.setObjectMenuState(null)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <div onClick={() => this.props.setSpriteEditorState(true)}>Create Animation</div>
                <div onClick={() => this.props.setSpriteEditorState(true)}>Import JSON sprite</div>
              </Popover>
            </div>
          ))}
        </div>
        <SpriteEditor />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameObjects: state.home.gameObjects,
  selectedFile: state.home.selectedFile,
  slectedGameobjectIndex: state.home.slectedGameobjectIndex,
  scenes: state.home.scenes,
  slectedSceneIndex: state.home.slectedSceneIndex,
  toolboxCategories: state.home.toolboxCategories,
  objectMenuOpen: state.home.objectMenuOpen,
});

const mapDispatchToProps = {
  selectFile,
  uploadImage,
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
)(withStyles(styles)(BlocklyPart));
