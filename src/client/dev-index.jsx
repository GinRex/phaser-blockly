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
import VariableDialog from './VariableDialog';

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
  setVariableDialogState,
} from './actions/home';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class BlocklyPart extends React.Component {
  constructor(props) {
    super(props);
    this.updateBlocks(this.props.gameObjects, this.props.scenes, this.props.slectedSceneIndex);
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

  updateBlocks = (gameObjects, scenes, slectedSceneIndex) => {
    const currentScene = scenes && scenes.find(scene => scene.key === slectedSceneIndex);
    if (currentScene) {
      this.variableListBlockUpdate(currentScene.variables);

      gameObjects.map((gameObject) => {
        Blockly.Blocks[`instance_${gameObject.name}`] = {
          init() {
            this.appendDummyInput()
              .appendField(new Blockly.FieldImage(`assets/${gameObject.filename}`, 20, 20, '*'));
            this.appendDummyInput()
              .appendField(new Blockly.FieldDropdown(currentScene.objects.filter(object =>
                (object.class === gameObject.name)).map(object => [object.variableName, object.variableName])), 'object_list');
            this.setInputsInline(true);
            this.setOutput(true, 'game_object');
            this.setColour(240);
            this.setTooltip('game object');
            this.setHelpUrl('');
          },
        };
        if (gameObject.animations.length) {
          Blockly.Blocks[`play_animation_${gameObject.name}`] = {
            init() {
              this.appendValueInput('object_name').setCheck(null);
              this.appendDummyInput()
                .appendField('play')
                .appendField(
                  new Blockly.FieldDropdown(gameObject.animations.map(animation => [animation.name, animation.name])),
                  'animation',
                );
              this.setInputsInline(true);
              this.setPreviousStatement(true, null);
              this.setNextStatement(true, null);
              this.setColour(230);
              this.setTooltip('');
              this.setHelpUrl('');
            },
          };
          Blockly.JavaScript[`play_animation_${gameObject.name}`] = function (block) {
            const value_object_name = Blockly.JavaScript.valueToCode(
              block,
              'object_name',
              Blockly.JavaScript.ORDER_ATOMIC,
            );
            const dropdown_animation = block.getFieldValue('animation');
            // TODO: Assemble JavaScript into code variable.
            const code = `${value_object_name}.play('${dropdown_animation}');\n`;
            return code;
          };
        }
        // code
        Blockly.JavaScript[`instance_${gameObject.name}`] = function (block) {
          const dropdown_variable_list = block.getFieldValue('object_list');
          // TODO: Assemble JavaScript into code variable.
          const code = `this.${dropdown_variable_list}`;
          // TODO: Change ORDER_NONE to the correct strength.
          return [code, Blockly.JavaScript.ORDER_NONE];
        };
      });
    }
  };

  variableListBlockUpdate = (variables) => {
    console.log(variables);
    Blockly.Blocks.variables = {
      init() {
        this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown(variables.map(variable => [variable, variable])), 'variable_list');
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
      },
    };
  }

  updateToolBox = (gameObjects, scenes, slectedSceneIndex) => {
    this.props.updateToolbox(gameObjects.map((gameObject) => {
      const object = {
        name: gameObject.name,
        custom: `CLASS_INSTANCE_${gameObject.name}`,
        // blocks: [
        //   { type: `instance_${gameObject.name}` },
        //   { type: `init_${gameObject.name}` },
        //   { type: `update_${gameObject.name}` },
        // ],
      };
      if (gameObject.animations.length) {
        object.blocks.push({ type: `play_animation_${gameObject.name}` });
      }
      return object;
    }));
    this.updateBlocks(gameObjects, scenes, slectedSceneIndex);
  };

  createVariableCallback = (object) => {
    this.props.setVariableDialogState(object);
  }

  customVariableCallback = (workspace, scenes, slectedSceneIndex) => {
    let xmlList = [];
    const currentScene = scenes.find(scene => scene.key === slectedSceneIndex);
    if (currentScene) {
      console.log(currentScene.variables);
      xmlList = [Blockly.Xml.textToDom('<xml><button text="Create Variable" callbackKey = "CREATE_VARIABLE_CALLBACK"></button></xml>').firstChild];
      for (let i = 0; i < currentScene.variables.length; i++) {
        const blockText = '<xml>' +
          '<block type="variables">' +
          `<field name="variable_list" variabletype="">${currentScene.variables[i]}</field>` +
          '</block>' +
          '</xml>';
        const block = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(block);
      }
    }
    return xmlList;
  };

  classInstanceCallback = (workspace, gameObject, scenes, slectedSceneIndex) => {
    let xmlList = [];
    const currentScene = scenes.find(scene => scene.key === slectedSceneIndex);
    if (currentScene) {
      xmlList = [Blockly.Xml.textToDom(`<xml><button text="Create Object" callbackKey = "CREATE_VARIABLE_CALLBACK_${gameObject.name}"></button></xml>`).firstChild];
      const variables = currentScene.objects.filter(object => (object.class === gameObject.name));
      for (let i = 0; i < variables.length; i++) {
        const blockText = '<xml>' +
          `<block type="instance_${gameObject.name}">` +
          `<field name="object_list" variabletype="">${variables[i].variableName}</field>` +
          '</block>' +
          '</xml>';
        const block = Blockly.Xml.textToDom(blockText).firstChild;
        xmlList.push(block);
      }
    }
    return xmlList;
  };

  workspaceDidChange = (
    workspace,
    gameObjects,
    slectedGameobjectIndex,
    scenes,
    slectedSceneIndex,
  ) => {
    Blockly.JavaScript.game_state = function (block) {
      const statements_event_code = Blockly.JavaScript.statementToCode(block, 'GAME_CODE');
      const dropdown_event = block.getFieldValue('GAME_STATE');
      const value_event_name = Blockly.JavaScript.valueToCode(
        block,
        'STATE_NAME',
        Blockly.JavaScript.ORDER_ATOMIC,
      );
      if (dropdown_event == 'NO_EVENT_SELECTED') {
        return "//error, you did not select an STATE in the 'when game state' block\n";
      }
      if (dropdown_event == 'create') {
        const code = `\n${statements_event_code}\n}`;
        return code;
      }
      if (dropdown_event == 'update' && slectedSceneIndex == '') {
        console.log('ppp');
        const code = `${dropdown_event}(scene){\n${statements_event_code}\n}`;
        return code;
      }
      const code = `${dropdown_event}(){\n${statements_event_code}\n}`;
      return code;
    };
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
    document.getElementById('xml').value = newXml;
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
            zoom:
            {
              controls: true,
              wheel: true,
              startScale: 1.0,
              maxScale: 3,
              minScale: 0.3,
              scaleSpeed: 1.2,
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
          ref={(node) => {
            if (node) {
              if (currentScene) {
                // this.variableListBlockUpdate(currentScene.variables);
                this.updateBlocks(this.props.gameObjects, this.props.scenes, this.props.slectedSceneIndex);
              }
              node.workspace.state.workspace.registerToolboxCategoryCallback('CUSTOM_VARIABLE', () => this.customVariableCallback(node.workspace, this.props.scenes, this.props.slectedSceneIndex));
              this.props.gameObjects.map((object) => {
                node.workspace.state.workspace.registerToolboxCategoryCallback(`CLASS_INSTANCE_${object.name}`, () => this.classInstanceCallback(node.workspace, object, this.props.scenes, this.props.slectedSceneIndex));
                node.workspace.state.workspace.registerButtonCallback(`CREATE_VARIABLE_CALLBACK_${object.name}`, () => this.createVariableCallback(object));
              });
              node.workspace.state.workspace.registerButtonCallback('CREATE_VARIABLE_CALLBACK', () => this.createVariableCallback('variable'));
              node.workspace.state.workspace.refreshToolboxSelection();
            }
          }}
          workspaceDidChange={(workspace) => {
            console.log(workspace);
            this.workspaceDidChange(
              workspace,
              this.props.gameObjects,
              this.props.slectedGameobjectIndex,
              this.props.scenes,
              this.props.slectedSceneIndex,
            );
            workspace.refreshToolboxSelection();
          }
          }
        />
        <input
          type="file"
          name="file"
          onChange={this.onChangeHandler}
        />
        <button
          type="button"
          className="btn btn-success btn-block"
          onClick={() => {
            if (this.props.selectedFile) {
              const promise = new Promise((resolve, reject) => {
                resolve(this.props.uploadImage(this.props.selectedFile));
              });
              promise.then((res) => {
                this.updateToolBox(this.props.gameObjects, this.props.scenes, this.props.slectedSceneIndex);
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
        <SpriteEditor updateToolBoxAnimations={() => this.updateToolBox(this.props.gameObjects, this.props.scenes, this.props.slectedSceneIndex)} />
        <VariableDialog />
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
  objectMenuOpen: state.home.objectMenuOpen.target,
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
  setVariableDialogState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(BlocklyPart));
