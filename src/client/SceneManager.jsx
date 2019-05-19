/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { setSlectedSceneIndex, addScene } from './actions/home';

const styles = theme => ({
  button: {
    margin: 5,
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  input: {
    display: 'none',
  },
});

class SceneManager extends React.Component {
  constructor(props) {
    super(props);
  }
  addNewScene = (scenes) => {
    const nextScene = scenes.length + 1;
    const name = `scene${nextScene}`;
    this.props.addScene({
      name,
      workspace: '',
      jsCode: '',
      key: name,
      variables: [],
      objects: [],
    });
  };
  render() {
    const { classes } = this.props;
    return (
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
          // margin: 10,
        }}
      >
        {this.props.scenes &&
          this.props.scenes.map(scene => (
            <div
              onClick={() => {
                const promise = new Promise((resolve, reject) => {
                  resolve(this.props.setSlectedSceneIndex(scene.key));
                });
                promise.then((res) => {
                  Blockly.mainWorkspace.clear();
                  if (scene.workspace !== '') {
                    const xml = Blockly.Xml.textToDom(scene.workspace);
                    Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
                  }
                });
                // this.props.setSlectedSceneIndex(scene.key);
              }}
              // src={`assets/${gameObject.filename}`}
              style={{
                width: 100,
                height: 100,
                margin: 5,
                backgroundColor: scene.key === this.props.slectedSceneIndex ? 'yellow' : 'white',
                borderWidth: 3,
                borderRadius: 20,
              }}
              alt={scene.name}
            />
          ))}
        <Button
          onClick={() => {
            this.addNewScene(this.props.scenes);
          }}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          +
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedFile: state.home.selectedFile,
  scenes: state.home.scenes,
  slectedSceneIndex: state.home.slectedSceneIndex,
});

const mapDispatchToProps = {
  setSlectedSceneIndex,
  addScene,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SceneManager));
