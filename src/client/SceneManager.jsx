/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MovieIcon from '@material-ui/icons/Movie';
import AddBoxIcon from '@material-ui/icons/AddBox';

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
      workspace: ['', '', ''],
      jsCode: ['', '', ''],
      key: name,
      variables: [],
      objects: [],
      functions: [],
    });
  };
  render() {
    const { classes } = this.props;
    return (
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
          open={this.props.down}
          onClose={() => this.props.setSceneHandler(false)}
          onOpen={() => this.props.setSceneHandler(true)}
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
              // margin: 10,
            }}
          >
            {this.props.scenes &&
              this.props.scenes.map(scene => (
                <MovieIcon
                  onClick={() => {
                    const promise = new Promise((resolve, reject) => {
                      resolve(this.props.setSlectedSceneIndex(scene.key));
                    });
                    promise.then((res) => {
                      Blockly.mainWorkspace.clear();
                      if (scene.workspace[this.props.gameState] !== '') {
                        const xml = Blockly.Xml.textToDom(scene.workspace[this.props.gameState]);
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
                    borderStyle: 'solid',
                    borderColor: 'black',
                  }}
                  alt={scene.name}
                />
              ))}
            <AddBoxIcon
              onClick={() => {
                this.addNewScene(this.props.scenes);
              }}
              variant="contained"
              color="primary"
              className={classes.button}
            />
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedFile: state.home.selectedFile,
  scenes: state.home.scenes,
  slectedSceneIndex: state.home.slectedSceneIndex,
  gameState: state.home.gameState,
});

const mapDispatchToProps = {
  setSlectedSceneIndex,
  addScene,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SceneManager));
