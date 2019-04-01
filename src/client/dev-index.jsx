/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import toolboxCategories from './toolBox';
import ConfigFiles from './initContent/content';
import parseWorkspaceXml from './BlocklyHelper';

import ReactBlocklyComponent from './index';

import {
  selectFile,
  buildGame,
  uploadImage,
  setSlectedGameobjectIndex,
  updateWorkspace,
  updateGame,
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
  }

  // upload image
  onChangeHandler = (event) => {
    this.props.selectFile(event.target.files[0]);
  };

  workspaceDidChange = (workspace, gameObjects, slectedGameobjectIndex) => {
    console.log(workspace);
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    const currentGameobject =
      gameObjects &&
      slectedGameobjectIndex &&
      gameObjects.find(gameObject => gameObject.key === slectedGameobjectIndex);
    if (currentGameobject) {
      console.log(currentGameobject);
      currentGameobject.workspace = newXml;
      currentGameobject.jsCode = code;

      const newGameObjects = gameObjects;
      const index = newGameObjects.findIndex(gameObject => gameObject.key === slectedGameobjectIndex);
      newGameObjects[index] = currentGameobject;

      this.props.updateWorkspace(newGameObjects);
      // this.setState({ gameObjects: gameObjects })
    }
    // document.getElementById('generated-xml').innerText = newXml;

    document.getElementById('code').value = code;
    // this.props.buildGame(this.state.gameObjects);
  };

  render() {
    const { classes } = this.props;
    const currentGameobject = this.props.gameObjects.find(gameObject => gameObject.key === this.props.slectedGameobjectIndex);
    console.log(currentGameobject);
    return (
      <div style={{ height: 500 }}>
        {/* <div>{this.props.selectedFile.name}</div> */}
        <Button
          onClick={() => {
            // this.createFile();
            // this.props.dispatch({ type: BUILD_GAME, gameObjects: this.state.gameObjects });
            this.props.updateGame(this.props.gameObjects);
          }}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Build and Run
        </Button>
        <ReactBlocklyComponent.BlocklyEditor
          toolboxCategories={parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_XML).concat(toolboxCategories)}
          workspaceConfiguration={{
            grid: {
              spacing: 20,
              length: 3,
              colour: '#ccc',
              snap: true,
            },
          }}
          initialXml={
            this.props.gameObjects.length !== 0 &&
            currentGameobject &&
            currentGameobject.workspace &&
            this.props.slectedGameobjectIndex !== ''
              ? currentGameobject.workspace
              : null
          }
          wrapperDivClassName="fill-height"
          workspaceDidChange={workspace =>
            this.workspaceDidChange(
              workspace,
              this.props.gameObjects,
              this.props.slectedGameobjectIndex,
            )
          }
        />
        <input type="file" name="file" onChange={this.onChangeHandler} />
        <button
          type="button"
          className="btn btn-success btn-block"
          onClick={() => this.props.uploadImage(this.props.selectedFile)}
        >
          Upload
        </button>
        <div
          style={{
            borderWidth: 3,
            borderColor: 'black',
            width: 600,
            height: 150,
            backgroundColor: 'red',
            margin: 10,
          }}
        >
          {this.props.gameObjects.map(gameObject => (
            <img
              onClick={() => {
                this.props.setSlectedGameobjectIndex(gameObject.key);
                // this.setState({ slectedGameobjectIndex: gameObject.key })
                // console.log(this.state.slectedGameobjectIndex)

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
});

const mapDispatchToProps = {
  selectFile,
  buildGame,
  uploadImage,
  setSlectedGameobjectIndex,
  updateWorkspace,
  updateGame,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(BlocklyPart));
