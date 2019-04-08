/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import ConfigFiles from './initContent/content';
import parseWorkspaceXml from './BlocklyHelper';
import ReactBlocklyComponent from './index';

import {
  selectFile,
  uploadImage,
  setSlectedGameobjectIndex,
  updateWorkspace,
  updateGame,
  updateScene,
  updateSceneWorkspace,
  updateToolbox,
} from './actions/home';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
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
    this.props.selectFile(event.target.files[0]);
  };

  updateBlocks = (gameObjects) => {
    gameObjects.map(gameObject => {
      Blockly.Blocks[`instance_${gameObject.name}`] = {
        init: function() {
          this.appendDummyInput()
              .appendField(new Blockly.FieldImage(`assets/${gameObject.filename}`, 30, 30, "*"));
          this.appendDummyInput()
              .appendField("Name")
              .appendField(new Blockly.FieldTextInput("default"), "object_name");
          this.appendValueInput("x")
              .setCheck("Number")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField("x");
          this.appendValueInput("y")
              .setCheck("Number")
              .setAlign(Blockly.ALIGN_RIGHT)
              .appendField("y");
          this.setInputsInline(false);
          this.setOutput(true, "game_object");
          this.setColour(240);
       this.setTooltip("game object");
       this.setHelpUrl("");
        }
      };
      // code
      Blockly.JavaScript[`instance_${gameObject.name}`] = function(block) {
        var text_object_name = block.getFieldValue('object_name');
        var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
        var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = '...';
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.JavaScript.ORDER_NONE];
      };
    });
  }

  updateToolBox = (gameObjects) => {
    console.log('abc');
    this.props.updateToolbox(
      gameObjects.map(gameObject => ({
        name: gameObject.name,
        blocks: [
          { type: `instance_${gameObject.name}` },
        ],
      })),
    );
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
      console.log(index);
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
        <input type="file" name="file" onChange={this.onChangeHandler} />
        <button
          type="button"
          className="btn btn-success btn-block"
          onClick={() => {
            const promise = new Promise((resolve, reject) => {
              resolve(this.props.uploadImage(this.props.selectedFile));
            });
            promise.then((res) => {
              console.log('bbc')
              this.updateToolBox(this.props.gameObjects);
            });
          }}
        >
          Upload
        </button>
        <div
          style={{
            borderWidth: 3,
            borderColor: 'black',
            width: 600,
            height: 150,
            borderRadius: 20,
            backgroundColor: 'gray',
            margin: 10,
          }}
        >
          {this.props.gameObjects.map(gameObject => (
            <img
              onClick={() => {
                this.props.setSlectedGameobjectIndex(gameObject.key);
                Blockly.mainWorkspace.clear();
                if (gameObject.workspace !== '') {
                  const xml = Blockly.Xml.textToDom(gameObject.workspace);
                  Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
                }
              }}
              src={`assets/${gameObject.filename}`}
              style={{
                width: 100,
                height: 100,
                margin: 5,
                backgroundColor:
                  gameObject.key === this.props.slectedGameobjectIndex ? 'yellow' : 'white',
                borderWidth: 3,
                borderRadius: 20,
              }}
              alt={gameObject.name}
            />
          ))}
        </div>
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(BlocklyPart));
