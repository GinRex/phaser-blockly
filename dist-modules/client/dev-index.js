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
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import ConfigFiles from './initContent/content';
import parseWorkspaceXml from './BlocklyHelper';
import ReactBlocklyComponent from './index';
import SpriteEditor from './SpirteEditor';

import { selectFile, uploadImage, setSlectedGameobjectIndex, updateWorkspace, updateGame, updateScene, updateSceneWorkspace, updateToolbox, setSpriteEditorState } from './actions/home';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

const BlocklyPart = _wrapComponent('BlocklyPart')(class BlocklyPart extends React.Component {
  constructor(props) {
    super(props);

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

    this.updateBlocks = gameObjects => {
      gameObjects.map(gameObject => {
        Blockly.Blocks[`instance_${gameObject.name}`] = {
          init() {
            this.appendDummyInput().appendField(new Blockly.FieldImage(`assets/${gameObject.filename}`, 30, 30, '*'));
            this.appendDummyInput().appendField(new Blockly.FieldTextInput('default'), 'object_name');
            this.setInputsInline(true);
            this.setOutput(true, 'game_object');
            this.setColour(240);
            this.setTooltip('game object');
            this.setHelpUrl('');
          }
        };
        Blockly.Blocks[`init_${gameObject.name}`] = {
          init() {
            this.appendDummyInput().appendField(new Blockly.FieldImage(`assets/${gameObject.filename}`, 30, 30, '*')).appendField('init ').appendField(new Blockly.FieldTextInput('object'), 'object_name');
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(230);
            this.setTooltip('create new object from class');
            this.setHelpUrl('');
          }
        };
        Blockly.Blocks[`update_${gameObject.name}`] = {
          init() {
            this.appendDummyInput().appendField(new Blockly.FieldImage(`assets/${gameObject.filename}`, 30, 30, '*')).appendField('update ').appendField(new Blockly.FieldTextInput('object'), 'object_name');
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(230);
            this.setTooltip('update object');
            this.setHelpUrl('');
          }
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

    this.updateToolBox = gameObjects => {
      this.props.updateToolbox(gameObjects.map(gameObject => ({
        name: gameObject.name,
        blocks: [{ type: `instance_${gameObject.name}` }, { type: `init_${gameObject.name}` }, { type: `update_${gameObject.name}` }]
      })));
      this.updateBlocks(gameObjects);
    };

    this.workspaceDidChange = (workspace, gameObjects, slectedGameobjectIndex, scenes, slectedSceneIndex) => {
      const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
      const code = Blockly.JavaScript.workspaceToCode(workspace);
      const currentGameobject = gameObjects && slectedGameobjectIndex && gameObjects.find(gameObject => gameObject.key === slectedGameobjectIndex);
      if (currentGameobject) {
        currentGameobject.workspace = newXml;
        currentGameobject.jsCode = code;

        const newGameObjects = gameObjects;
        const index = newGameObjects.findIndex(gameObject => gameObject.key === slectedGameobjectIndex);
        newGameObjects[index] = currentGameobject;

        this.props.updateWorkspace(newGameObjects);
      }
      const currentScene = scenes && slectedSceneIndex && scenes.find(scene => scene.key === slectedSceneIndex);
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

    this.updateBlocks(this.props.gameObjects);
  }
  componentDidMount() {
    this.updateToolBox(this.props.gameObjects);
  }

  // upload image


  render() {
    const { classes } = this.props;
    const currentGameobject = this.props.gameObjects.find(gameObject => gameObject.key === this.props.slectedGameobjectIndex);
    const currentScene = this.props.scenes.find(scene => scene.key === this.props.slectedSceneIndex);
    return React.createElement(
      'div',
      { style: { height: 500 } },
      React.createElement(SpriteEditor, null),
      React.createElement(
        Button,
        {
          onClick: () => {
            if (this.props.slectedGameobjectIndex) {
              this.props.updateGame(this.props.gameObjects);
            }
            if (this.props.slectedSceneIndex) {
              this.props.updateScene(this.props.scenes);
            }
          },
          variant: 'contained',
          color: 'primary',
          className: classes.button
        },
        'Build and Run'
      ),
      React.createElement(
        Button,
        {
          onClick: () => {
            const myWindow = window.open(`${window.location.href}game_iframe.html`, 'game');
            myWindow.focus();
            if (this.props.slectedGameobjectIndex) {
              this.props.updateGame(this.props.gameObjects);
            }
            if (this.props.slectedSceneIndex) {
              this.props.updateScene(this.props.scenes);
            }
          },
          variant: 'contained',
          color: 'secondary',
          className: classes.button
        },
        'Open in new tab'
      ),
      React.createElement(ReactBlocklyComponent.BlocklyEditor, {
        toolboxCategories: parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_XML).concat(this.props.toolboxCategories),
        workspaceConfiguration: {
          grid: {
            spacing: 20,
            length: 3,
            colour: '#ccc',
            snap: true
          }
        },
        initialXml: this.props.gameObjects.length !== 0 && currentGameobject && currentGameobject.workspace ? currentGameobject.workspace : this.props.scenes.length !== 0 && currentScene && currentScene.workspace ? currentScene.workspace : null,
        wrapperDivClassName: 'fill-height',
        workspaceDidChange: workspace => this.workspaceDidChange(workspace, this.props.gameObjects, this.props.slectedGameobjectIndex, this.props.scenes, this.props.slectedSceneIndex)
      }),
      React.createElement('input', { type: 'file', name: 'file', onChange: this.onChangeHandler }),
      React.createElement(
        'button',
        {
          type: 'button',
          className: 'btn btn-success btn-block',
          onClick: () => {
            // const promise = new Promise((resolve, reject) => {
            //   resolve(this.props.uploadImage(this.props.selectedFile));
            // });
            // promise.then((res) => {
            //   console.log('bbc');
            //   this.updateToolBox(this.props.gameObjects);
            // });
            this.props.setSpriteEditorState(true);
          }
        },
        'Create Class'
      ),
      React.createElement(
        'div',
        {
          style: {
            borderWidth: 3,
            borderColor: 'black',
            width: 600,
            height: 150,
            borderRadius: 20,
            backgroundColor: 'gray',
            margin: 10
          }
        },
        this.props.gameObjects.map(gameObject => React.createElement('img', {
          onClick: () => {
            this.props.setSlectedGameobjectIndex(gameObject.key);
            Blockly.mainWorkspace.clear();
            if (gameObject.workspace !== '') {
              const xml = Blockly.Xml.textToDom(gameObject.workspace);
              Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
            }
          },
          src: `assets/${gameObject.filename}`,
          style: {
            width: 100,
            height: 100,
            margin: 5,
            backgroundColor: gameObject.key === this.props.slectedGameobjectIndex ? 'yellow' : 'white',
            borderWidth: 3,
            borderRadius: 20
          },
          alt: gameObject.name
        }))
      )
    );
  }
});

const mapStateToProps = state => ({
  gameObjects: state.home.gameObjects,
  selectedFile: state.home.selectedFile,
  slectedGameobjectIndex: state.home.slectedGameobjectIndex,
  scenes: state.home.scenes,
  slectedSceneIndex: state.home.slectedSceneIndex,
  toolboxCategories: state.home.toolboxCategories
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
  setSpriteEditorState
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BlocklyPart));