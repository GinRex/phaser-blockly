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

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


class TestEditor extends React.Component {
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
      gameObjects:[
        {
          name:"hero",
          sprite: "../public/assets/hero.gif",
          workspace: "",
          key:"0"
        },
        {
          name:"ghost",
          sprite: "../public/assets/ghost.png",
          workspace: "",
          key:"1"
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
                      TEXT: 'abc',
                    },
                  },
                },
              },
            ],
          },
        ]),
      });
    }, 2000);
  }

  workspaceDidChange = (workspace) => {
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    let currentGameobject = this.state.gameObjects[this.state.slectedGameobjectIndex];
    currentGameobject.workspace = newXml;

    let gameObjects = this.state.gameObjects;
    gameObjects[this.state.slectedGameobjectIndex] = currentGameobject;

    this.setState({ gameObjects: gameObjects })
    console.log(this.state.gameObjects)
    // document.getElementById('generated-xml').innerText = newXml;

    const code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('code').value = code;
  }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={() => this.setState({ xml: this.state.object1Xml })} variant="contained" color="primary" className={classes.button}>
          Run JS
          </Button>
        <div class="row" >
          <div class="col-sm-8" style={{ height: 500 }}>
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
            <div >

            </div>
            {this.state.gameObjects.map((gameObject) => {
              return(
                <Button onClick={() => {
                  this.setState({slectedGameobjectIndex: gameObject.key })
                  console.log(this.state.slectedGameobjectIndex)
                  Blockly.mainWorkspace.clear();
                  if (gameObject.workspace !== '') {
                    console.log('loaded')
                    var xml = Blockly.Xml.textToDom(gameObject.workspace);
                    Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
                  }
                }} variant="contained" color="secondary" className={classes.button}>
                  {gameObject.name}
          </Button>
              )
            })}
          </div>
          <div class="col-sm-4"><Game /></div>
        </div>
      </div>
    )
  }
}

window.addEventListener('load', () => {
  const editor = React.createElement(withStyles(styles)(TestEditor));
  ReactDOM.render(editor, document.getElementById('blockly'));
});
