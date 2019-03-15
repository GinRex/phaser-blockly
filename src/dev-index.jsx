/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactBlocklyComponent from './index';
import ConfigFiles from './initContent/content';
import parseWorkspaceXml from './BlocklyHelper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Game from './Game';
import { connect } from "react-redux";
import store from './store';
import { TOGGLE_UI } from "./store/gameReducer";



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
    this.state = {
      toolboxCategories: parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_XML),
      gameObjects: [],
      slectedGameobjectIndex: 0,
    };
  }

  componentDidMount = () => {
    this.setState({
      gameObjects: [
        {
          name: "hero",
          sprite: require("../public/assets/hero.gif"),
          workspace: "",
          jsCode: "",
          key: "0"
        },
        {
          name: "ghost",
          sprite: require("../public/assets/ghost.png"),
          jsCode: "",
          workspace: "",
          key: "1"
        },
        {
          name: "hero",
          sprite: require("../public/assets/hero.gif"),
          workspace: "",
          jsCode: "",
          key: "2"
        },
        {
          name: "ghost",
          sprite: require("../public/assets/ghost.png"),
          jsCode: "",
          workspace: "",
          key: "3"
        },
        {
          name: "hero",
          sprite: require("../public/assets/hero.gif"),
          workspace: "",
          jsCode: "",
          key: "4"
        }
      ]
    })
    window.setTimeout(() => {
      this.setState({
        toolboxCategories: this.state.toolboxCategories.concat([
          {
            name: 'Text2',
            blocks: [
              { type: 'text' },
              {
                type: 'text_print',
                values: {
                  TEXT: {
                    type: 'text',
                    shadow: true,
                    fields: {
                      TEXT: 'fuck',
                    },
                  },
                },
              },
              {
                type: ''
              }
            ],
          },
        ]),
      });
    }, 20);
  }

  workspaceDidChange = (workspace) => {
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    let currentGameobject = this.state.gameObjects[this.state.slectedGameobjectIndex];
    currentGameobject.workspace = newXml;
    currentGameobject.jsCode = code;

    let gameObjects = this.state.gameObjects;
    gameObjects[this.state.slectedGameobjectIndex] = currentGameobject;

    this.setState({ gameObjects: gameObjects })
    console.log(this.state.gameObjects)
    // document.getElementById('generated-xml').innerText = newXml;


    document.getElementById('code').value = code;
  }


  render() {
    const { classes } = this.props;
    return (
      <div style={{height: 500}}>
        <Button onClick={() => {
          this.setState({ xml: this.state.object1Xml })
          store.dispatch({ type: TOGGLE_UI });
        }} 
          variant="contained" color="primary" 
          className={classes.button}>Build and Run
        </Button>
        <ReactBlocklyComponent.BlocklyEditor
          toolboxCategories={this.state.toolboxCategories}
          workspaceConfiguration={{
            grid: {
              spacing: 20,
              length: 3,
              colour: '#ccc',
              snap: true,
            },
          }}
          // initialXml={this.state.object1Xml}
          wrapperDivClassName="fill-height"
          workspaceDidChange={this.workspaceDidChange}
        />
        <div style={{ borderWidth: 3, borderColor: "black", width: 600, height: 150, backgroundColor: "red", margin: 10 }}>
          {this.state.gameObjects.map((gameObject) => {
            // const thumbnail = require('./public/assets/ghost.png');
            return (
              <img
                src={gameObject.sprite}
                onClick={() => {
                  this.setState({ slectedGameobjectIndex: gameObject.key })
                  console.log(this.state.slectedGameobjectIndex)
                  Blockly.mainWorkspace.clear();
                  if (gameObject.workspace !== '') {
                    console.log('loaded')
                    var xml = Blockly.Xml.textToDom(gameObject.workspace);
                    Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
                  }
                }}
                style={{ width: 100, height: 100, margin: 5, backgroundColor: gameObject.key == this.state.slectedGameobjectIndex ? "yellow" : "white", borderWidth: 3, borderRadius: 20 }}
                alt={gameObject.name} />
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ showUi }) => ({
    showUi
  });

export default connect(mapStateToProps)(withStyles(styles)(BlocklyPart))