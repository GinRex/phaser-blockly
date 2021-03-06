import _UsersMacPhaserBlocklyNode_modulesRedboxReactLibIndexJs from '/Users/mac/phaser-blockly/node_modules/redbox-react/lib/index.js';
import _UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs from '/Users/mac/phaser-blockly/node_modules/react-transform-catch-errors/lib/index.js';
import _react from 'react';
import _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs from '/Users/mac/phaser-blockly/node_modules/react-transform-hmr/lib/index.js';
const _components = {
  BlocklyPart: {
    displayName: 'BlocklyPart'
  }
};

const _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs2 = _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs({
  filename: 'src/client/dev-index.jsx',
  components: _components,
  locals: [module],
  imports: [_react]
});

const _UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs2 = _UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs({
  filename: 'src/client/dev-index.jsx',
  components: _components,
  locals: [],
  imports: [_react, _UsersMacPhaserBlocklyNode_modulesRedboxReactLibIndexJs]
});

function _wrapComponent(id) {
  return function (Component) {
    return _UsersMacPhaserBlocklyNode_modulesReactTransformHmrLibIndexJs2(_UsersMacPhaserBlocklyNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}

/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PublicIcon from '@material-ui/icons/Public';
import StartIcon from '@material-ui/icons/ChangeHistory';
import UpdateIcon from '@material-ui/icons/Cached';

import ConfigFiles from './initContent/content';
import parseWorkspaceXml from './BlocklyHelper';
import ReactBlocklyComponent from './index';
import SpriteEditor from './SpirteEditor';
import VariableDialog from './VariableDialog';

import { selectFile, uploadImage, uploadImageForTile, setSlectedGameobjectIndex, updateWorkspace, updateGame, updateScene, updateSceneWorkspace, updateToolbox, setSpriteEditorState, setObjectMenuState, setVariableDialogState } from './actions/home';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

const BlocklyPart = _wrapComponent('BlocklyPart')(class BlocklyPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: 0
    };

    this.resizeEditor = () => {
      if (this.editor.current) {
        this.editor.current.resize();
      }
    };

    this.onChangeHandler = event => {
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

    this.updateBlocks = (gameObjects, scenes, slectedSceneIndex, slectedGameobjectIndex, images) => {
      const currentScene = scenes && scenes.find(scene => scene.key === slectedSceneIndex);
      const currentGameobject = gameObjects && gameObjects.find(gameObject => gameObject.key === slectedGameobjectIndex);

      if (currentScene) {
        this.variableListBlockUpdate(currentScene.variables, null, gameObjects, images);
      } else if (currentGameobject) {
        this.variableListBlockUpdate(null, currentGameobject.variables, gameObjects, images);
      }

      if (currentScene) {
        gameObjects.map(gameObject => {
          Blockly.Blocks[`instance_${gameObject.name}`] = {
            init() {
              this.appendDummyInput().appendField(new Blockly.FieldImage(`assets/${gameObject.filename}`, 20, 20, '*'));
              this.appendDummyInput().appendField(new Blockly.FieldDropdown(currentScene.objects.filter(object => object.class === gameObject.name).map(object => [object.variableName, object.variableName])), 'object_list');
              this.setInputsInline(true);
              this.setOutput(true, 'game_object');
              this.setColour(240);
              this.setTooltip('game object');
              this.setHelpUrl('');
            }
          };
          if (gameObject.animations.length) {
            Blockly.Blocks[`play_animation_${gameObject.name}`] = {
              init() {
                this.appendValueInput('object_name').setCheck(null);
                this.appendDummyInput().appendField('play').appendField(new Blockly.FieldDropdown(gameObject.animations.map(animation => [animation.name, animation.name])), 'animation');
                this.setInputsInline(true);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour(230);
                this.setTooltip('');
                this.setHelpUrl('');
              }
            };
            Blockly.JavaScript[`play_animation_${gameObject.name}`] = function (block) {
              const value_object_name = Blockly.JavaScript.valueToCode(block, 'object_name', Blockly.JavaScript.ORDER_ATOMIC);
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

    this.variableListBlockUpdate = (variables, classVariables, gameObjects, images) => {
      const vars = variables || classVariables;
      Blockly.Blocks.variables = {
        init() {
          this.appendDummyInput().appendField(new Blockly.FieldDropdown(vars.map(variable => [variable, variable])), 'variable_list');
          this.setInputsInline(true);
          this.setOutput(true, null);
          this.setColour(230);
          this.setTooltip('');
          this.setHelpUrl('');
        }
      };
      Blockly.Blocks.set_var = {
        init() {
          this.appendDummyInput().appendField('set').appendField(new Blockly.FieldDropdown(vars.map(variable => [variable, variable])), 'var_list').appendField('=');
          this.appendValueInput('var_value').setCheck(null);
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);
        }
      };
      Blockly.Blocks.tile_sprite = {
        init() {
          this.appendValueInput('variable').setCheck(null);
          this.appendDummyInput().appendField('= tile sprite of').appendField(new Blockly.FieldDropdown(images.length ? images.map(image => [image.filename, image.name]) : [['option', 'option']]), 'image_list').appendField('with x=');
          this.appendValueInput('x').setCheck(null);
          this.appendDummyInput().appendField('with y=');
          this.appendValueInput('y').setCheck(null);
          this.appendDummyInput().appendField('width =');
          this.appendValueInput('w').setCheck(null);
          this.appendDummyInput().appendField('height =');
          this.appendValueInput('h').setCheck(null);
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(230);
          this.setTooltip('');
          this.setHelpUrl('');
        }
      };

      Blockly.JavaScript.tile_sprite = function (block) {
        const value_variable = Blockly.JavaScript.valueToCode(block, 'variable', Blockly.JavaScript.ORDER_ATOMIC);
        const dropdown_image_list = block.getFieldValue('image_list');
        const value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
        const value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
        const value_w = Blockly.JavaScript.valueToCode(block, 'w', Blockly.JavaScript.ORDER_ATOMIC);
        const value_h = Blockly.JavaScript.valueToCode(block, 'h', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        const code = `${value_variable} = this.add.tileSprite(${value_x}, ${value_y}, ${value_w}, ${value_h}, '${dropdown_image_list}');\n`;
        return code;
      };
      if (gameObjects.length > 0) {
        Blockly.Blocks.add_child = {
          init() {
            this.appendValueInput('parent').setCheck(null).appendField('add child to');
            this.appendDummyInput().appendField('with Class =').appendField(new Blockly.FieldDropdown(gameObjects.map(gameObject => [gameObject.key, `${gameObject.key}`])), 'type');
            this.appendValueInput('x').setCheck(null).appendField('x =');
            this.appendValueInput('y').setCheck(null).appendField('y =');
            this.appendValueInput('w').setCheck(null).appendField('width =');
            this.appendValueInput('h').setCheck(null).appendField('height =');
            // this.appendValueInput('order')
            //   .setCheck(null)
            //   .appendField('order =');
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(230);
            this.setTooltip('');
            this.setHelpUrl('');
          }
        };

        Blockly.JavaScript.add_child = function (block) {
          const value_parent = Blockly.JavaScript.valueToCode(block, 'parent', Blockly.JavaScript.ORDER_ATOMIC);
          const dropdown_type = block.getFieldValue('type');
          const value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
          const value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
          const value_w = Blockly.JavaScript.valueToCode(block, 'w', Blockly.JavaScript.ORDER_ATOMIC);
          const value_h = Blockly.JavaScript.valueToCode(block, 'h', Blockly.JavaScript.ORDER_ATOMIC);
          // const value_order = Blockly.JavaScript.valueToCode(block, 'order', Blockly.JavaScript.ORDER_ATOMIC);
          // TODO: Assemble JavaScript into code variable.
          const code = `${value_parent}.add(
          new Class.${dropdown_type} ({
            scene: this,
          key: '${dropdown_type}',
          x: ${value_x},
          y: ${value_y},
          w: ${value_w},
          h: ${value_h},
          })
        );\n`;
          return code;
        };
      }
    };

    this.updateToolBox = (gameObjects, scenes, slectedSceneIndex, slectedGameobjectIndex, images) => {
      this.props.updateToolbox(gameObjects.map(gameObject => {
        const object = {
          name: gameObject.name,
          custom: `CLASS_INSTANCE_${gameObject.name}`
        };
        if (gameObject.animations.length) {
          // object.blocks.push({ type: `play_animation_${gameObject.name}` });
        }
        return object;
      }));
      this.updateBlocks(gameObjects, scenes, slectedSceneIndex, slectedGameobjectIndex, images);
    };

    this.createVariableCallback = object => {
      this.props.setVariableDialogState(object);
    };

    this.customVariableCallback = (workspace, scenes, slectedSceneIndex, gameObjects, slectedGameobjectIndex) => {
      let xmlList = [];
      const currentScene = scenes.find(scene => scene.key === slectedSceneIndex);
      const currentObject = gameObjects.find(gameObject => gameObject.key === slectedGameobjectIndex);

      if (currentScene) {
        xmlList = [Blockly.Xml.textToDom('<xml><button text="Create Variable" callbackKey = "CREATE_VARIABLE_CALLBACK"></button></xml>').firstChild];
        for (let i = 0; i < currentScene.variables.length; i++) {
          const blockText = '<xml>' + '<block type="variables">' + `<field name="variable_list" variabletype="">${currentScene.variables[i]}</field>` + '</block>' + '</xml>';
          const setText = '<xml>' + '<block type="set_var">' + `<field name="var_list" variabletype="">${currentScene.variables[i]}</field>` + '</block>' + '</xml>';
          const block = Blockly.Xml.textToDom(blockText).firstChild;
          const setBlock = Blockly.Xml.textToDom(setText).firstChild;
          xmlList.push(block);
          xmlList.push(setBlock);
        }
      } else if (currentObject) {
        xmlList = [Blockly.Xml.textToDom('<xml><button text="Create Variable" callbackKey = "CREATE_VARIABLE_CALLBACK"></button></xml>').firstChild];
        for (let i = 0; i < currentObject.variables.length; i++) {
          const blockText = '<xml>' + '<block type="variables">' + `<field name="variable_list" variabletype="">${currentObject.variables[i]}</field>` + '</block>' + '</xml>';
          const setText = '<xml>' + '<block type="set_var">' + `<field name="var_list" variabletype="">${currentObject.variables[i]}</field>` + '</block>' + '</xml>';
          const block = Blockly.Xml.textToDom(blockText).firstChild;
          const setBlock = Blockly.Xml.textToDom(setText).firstChild;
          xmlList.push(block);
          xmlList.push(setBlock);
        }
        // generate code for variable from scenes
        scenes.map(scene => {
          xmlList.push(Blockly.Xml.textToDom('<xml>' + `<label text="From scene: ${scene.name}"></label>` + '</xml>').firstChild);
          for (let i = 0; i < scene.variables.length; i++) {
            const blockText = '<xml>' + '<block type="variables">' + `<field name="variable_list" variabletype="">${scene.variables[i]}</field>` + '</block>' + '</xml>';
            const setText = '<xml>' + '<block type="set_var">' + `<field name="var_list" variabletype="">${scene.variables[i]}</field>` + '</block>' + '</xml>';
            const block = Blockly.Xml.textToDom(blockText).firstChild;
            const setBlock = Blockly.Xml.textToDom(setText).firstChild;
            xmlList.push(block);
            xmlList.push(setBlock);
          }
          // xmlList.push(Blockly.Xml.textToDom('<xml/></sep></xml>').firstChild);
        });
      }
      return xmlList;
    };

    this.classInstanceCallback = (workspace, gameObject, scenes, slectedSceneIndex) => {
      let xmlList = [];
      const currentScene = scenes.find(scene => scene.key === slectedSceneIndex);
      if (currentScene) {
        xmlList = [Blockly.Xml.textToDom(`<xml><button text="Create Object" callbackKey = "CREATE_VARIABLE_CALLBACK_${gameObject.name}"></button></xml>`).firstChild];
        const variables = currentScene.objects.filter(object => object.class === gameObject.name);
        for (let i = 0; i < variables.length; i++) {
          const blockText = '<xml>' + `<block type="instance_${gameObject.name}">` + `<field name="object_list" variabletype="">${variables[i].variableName}</field>` + '</block>' + '</xml>';
          const block = Blockly.Xml.textToDom(blockText).firstChild;
          xmlList.push(block);
        }
        for (let i = 0; i < gameObject.animations.length; i++) {
          const aniBlockText = '<xml>' + `<block type="play_animation_${gameObject.name}">` + `<field name="animation" variabletype="">${gameObject.animations[i].name}</field>` + '</block>' + '</xml>';
          const aniBlock = Blockly.Xml.textToDom(aniBlockText).firstChild;
          xmlList.push(aniBlock);
        }
      }
      return xmlList;
    };

    this.workspaceDidChange = (workspace, gameObjects, slectedGameobjectIndex, scenes, slectedSceneIndex, images, gameState) => {
      Blockly.JavaScript.game_state = function (block) {
        const statements_event_code = Blockly.JavaScript.statementToCode(block, 'GAME_CODE');
        const dropdown_event = block.getFieldValue('GAME_STATE');
        const value_event_name = Blockly.JavaScript.valueToCode(block, 'STATE_NAME', Blockly.JavaScript.ORDER_ATOMIC);
        if (dropdown_event == 'NO_EVENT_SELECTED') {
          return "//error, you did not select an STATE in the 'when game state' block\n";
        }
        if (dropdown_event == 'create') {
          const code = `\n${statements_event_code}\n}`;
          return code;
        }
        if (dropdown_event == 'update' && slectedSceneIndex !== '') {
          const code = `${dropdown_event}(){\n${statements_event_code}\n`;
          return code;
        }
        if (dropdown_event == 'update' && slectedSceneIndex == '') {
          const code = `${dropdown_event}(scene){\n${statements_event_code}\n}`;
          return code;
        }
        const code = `${dropdown_event}(){\n${statements_event_code}\n}`;
        return code;
      };
      // code js for variables
      Blockly.JavaScript.variables = function (block) {
        const dropdown_variable_list = block.getFieldValue('variable_list');
        let code = '';
        const currentGameobject = gameObjects.find(gameObject => gameObject.key === slectedGameobjectIndex);

        if (slectedGameobjectIndex && !currentGameobject.variables.includes(dropdown_variable_list)) {
          code = `this.scene.${dropdown_variable_list}`;
        } else {
          code = `this.${dropdown_variable_list}`;
        }
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.JavaScript.ORDER_NONE];
      };

      Blockly.JavaScript.set_var = function (block) {
        const dropdown_var_list = block.getFieldValue('var_list');
        const value_var_value = Blockly.JavaScript.valueToCode(block, 'var_value', Blockly.JavaScript.ORDER_ATOMIC);

        let code = '';
        const currentGameobject = gameObjects.find(gameObject => gameObject.key === slectedGameobjectIndex);

        if (slectedGameobjectIndex && !currentGameobject.variables.includes(dropdown_var_list)) {
          code = `scene.${dropdown_var_list} = ${value_var_value};\n`;
        } else {
          code = `this.${dropdown_var_list} = ${value_var_value};\n`;
        }

        return code;
      };

      const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
      const code = Blockly.JavaScript.workspaceToCode(workspace);
      const currentGameobject = gameObjects && slectedGameobjectIndex && gameObjects.find(gameObject => gameObject.key === slectedGameobjectIndex);
      if (currentGameobject) {
        currentGameobject.workspace[gameState] = newXml;
        currentGameobject.jsCode[gameState] = code;

        const newGameObjects = gameObjects;
        const index = newGameObjects.findIndex(gameObject => gameObject.key === slectedGameobjectIndex);
        newGameObjects[index] = currentGameobject;

        this.props.updateWorkspace(newGameObjects);
      }
      const currentScene = scenes && slectedSceneIndex && scenes.find(scene => scene.key === slectedSceneIndex);
      if (currentScene) {
        currentScene.workspace[gameState] = newXml;
        currentScene.jsCode[gameState] = code;

        const newScenes = scenes;
        const index = newScenes.findIndex(scene => scene.key === slectedSceneIndex);
        newScenes[index] = currentScene;

        this.props.updateSceneWorkspace(newScenes);
      }
      document.getElementById('code').value = code;
    };

    this.editor = React.createRef();
    this.updateBlocks(this.props.gameObjects, this.props.scenes, this.props.slectedSceneIndex, this.props.slectedGameobjectIndex, this.props.images);
  }

  componentDidMount() {
    this.updateToolBox(this.props.gameObjects, this.props.scenes, this.props.slectedSceneIndex, this.props.slectedGameobjectIndex, this.props.images);
  }

  // upload image


  render() {
    const { classes } = this.props;
    const currentGameobject = this.props.gameObjects.find(gameObject => gameObject.key === this.props.slectedGameobjectIndex);
    const currentScene = this.props.scenes.find(scene => scene.key === this.props.slectedSceneIndex);
    return React.createElement(
      'div',
      { style: {
          width: '100%', height: '80%', marginTop: 10, paddingRight: 10
        }
      },
      React.createElement(
        Tabs,
        {
          value: this.state.gameState,
          onChange: (event, value) => {
            Blockly.mainWorkspace.clear();
            if (currentScene && currentScene.workspace[value] !== '') {
              const xml = Blockly.Xml.textToDom(currentScene.workspace[value]);
              Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
            }
            if (currentGameobject && currentGameobject.workspace[value] !== '') {
              const xml = Blockly.Xml.textToDom(currentGameobject.workspace[value]);
              Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
            }
            this.setState({ gameState: value });
          },
          variant: 'fullWidth',
          indicatorColor: 'secondary',
          textColor: 'secondary'
        },
        React.createElement(Tab, { icon: React.createElement(PublicIcon, null), label: 'Public' }),
        React.createElement(Tab, { icon: React.createElement(StartIcon, null), label: 'Start' }),
        React.createElement(Tab, { icon: React.createElement(UpdateIcon, null), label: 'Update' })
      ),
      React.createElement(ReactBlocklyComponent.BlocklyEditor, {
        toolboxCategories: parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_XML).concat(this.props.toolboxCategories),
        workspaceConfiguration: {
          grid: {
            spacing: 20,
            length: 3,
            colour: '#ccc',
            snap: true
          },
          zoom: {
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2
          }
        },
        initialXml: this.props.gameObjects.length !== 0 && currentGameobject && currentGameobject.workspace[this.state.gameState] !== '' ? currentGameobject.workspace[this.state.gameState] : this.props.scenes.length !== 0 && currentScene && currentScene.workspace[this.state.gameState] !== '' ? currentScene.workspace[this.state.gameState] : '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>',
        wrapperDivClassName: 'fill-width-height',
        ref: node => {
          if (node) {
            node.resize();
            this.editor = node;
            if (currentScene) {
              // this.variableListBlockUpdate(currentScene.variables);
              this.updateBlocks(this.props.gameObjects, this.props.scenes, this.props.slectedSceneIndex, this.props.slectedGameobjectIndex, this.props.images);
            }
            node.workspace.state.workspace.registerToolboxCategoryCallback('CUSTOM_VARIABLE', () => this.customVariableCallback(node.workspace, this.props.scenes, this.props.slectedSceneIndex, this.props.gameObjects, this.props.slectedGameobjectIndex));
            // node.workspace.state.workspace.registerToolboxCategoryCallback('TILE_CATEGORY', () => this.customTileCallback(node.workspace, this.props.scenes, this.props.slectedSceneIndex, this.props.gameObjects, this.props.slectedGameobjectIndex));
            this.props.gameObjects.map(object => {
              node.workspace.state.workspace.registerToolboxCategoryCallback(`CLASS_INSTANCE_${object.name}`, () => this.classInstanceCallback(node.workspace, object, this.props.scenes, this.props.slectedSceneIndex));
              node.workspace.state.workspace.registerButtonCallback(`CREATE_VARIABLE_CALLBACK_${object.name}`, () => this.createVariableCallback(object));
            });
            node.workspace.state.workspace.registerButtonCallback('CREATE_VARIABLE_CALLBACK', () => this.createVariableCallback('variable'));
            node.workspace.state.workspace.refreshToolboxSelection();
          }
        },
        workspaceDidChange: workspace => {
          this.workspaceDidChange(workspace, this.props.gameObjects, this.props.slectedGameobjectIndex, this.props.scenes, this.props.slectedSceneIndex, this.props.images, this.state.gameState);
          workspace.refreshToolboxSelection();
        }
      }),
      React.createElement('input', {
        type: 'file',
        name: 'file',
        onChange: this.onChangeHandler
      }),
      React.createElement(
        'button',
        {
          type: 'button',
          className: 'btn btn-success btn-block',
          onClick: () => {
            if (this.props.selectedFile) {
              const promise = new Promise((resolve, reject) => {
                resolve(this.props.uploadImage(this.props.selectedFile));
              });
              promise.then(res => {
                this.updateToolBox(this.props.gameObjects, this.props.scenes, this.props.slectedSceneIndex, this.props.slectedGameobjectIndex, this.props.images);
              });
            }
          }
        },
        'Create Class with Image'
      ),
      React.createElement(
        'button',
        {
          type: 'button',
          className: 'btn btn-warning btn-block',
          onClick: () => {
            if (this.props.selectedFile) {
              const promise = new Promise((resolve, reject) => {
                resolve(this.props.uploadImageForTile(this.props.selectedFile));
              });
              promise.then(res => {
                this.updateToolBox(this.props.gameObjects, this.props.scenes, this.props.slectedSceneIndex, this.props.slectedGameobjectIndex);
              });
            }
          }
        },
        'Upload Image'
      ),
      React.createElement(SpriteEditor, { updateToolBoxAnimations: () => this.updateToolBox(this.props.gameObjects, this.props.scenes, this.props.slectedSceneIndex, this.props.slectedGameobjectIndex, this.props.images) }),
      React.createElement(VariableDialog, null)
    );
  }
});

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

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(withStyles(styles)(BlocklyPart));