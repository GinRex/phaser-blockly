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
      object1Xml: ConfigFiles.INITIAL_XML,
      object2Xml: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="rCEP]pi#{8UX41lty{t$">a</variable></variables><block type="text" id="mOSfJXap0{c#x-*q:HkM" x="70" y="30"><field name="TEXT"></field></block><block type="controls_if" id="HSe:?8S6@G-3/*fXTKwE" x="70" y="110"><value name="IF0"><block type="variables_get" id="v(.qZU$a,.wUET$pf(W:"><field name="VAR" id="rCEP]pi#{8UX41lty{t$" variabletype="">a</field></block></value><statement name="DO0"><block type="math_change" id="n`qjCPqq12b}F2)g08EQ"><field name="VAR" id="rCEP]pi#{8UX41lty{t$" variabletype="">a</field><value name="DELTA"><shadow type="math_number" id="H@%Q}nG5DP@VlqEOCU%f"><field name="NUM">1</field></shadow></value></block></statement></block></xml>',
      xml: ConfigFiles.INITIAL_XML,
    };
  }

  componentDidMount = () => {
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
    this.setState({ object1Xml: newXml })
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
              initialXml={this.state.object1Xml}
              wrapperDivClassName="fill-height"
              workspaceDidChange={this.workspaceDidChange}
            />
            <Button onClick={() => this.setState({ xml: this.state.object1Xml })} variant="contained" color="primary" className={classes.button}>
              Ghost
          </Button>
            <Button onClick={() => {
              var xml = Blockly.Xml.textToDom(this.state.object2Xml);
              Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
            }} variant="contained" color="secondary" className={classes.button}>
              Hero
      </Button>
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
