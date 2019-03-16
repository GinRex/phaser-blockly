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
import { TOGGLE_UI, BUILD_GAME } from "./store/gameReducer";



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
        }
      ]
    })

    Blockly.Blocks['motion_foward'] = {
      init: function() {
        this.appendValueInput("DISTANCE")
            .setCheck("Number")
            .appendField("foward");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(150);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };

    Blockly.Blocks['motion_turn_right'] = {
      init: function() {
        this.appendValueInput("DEGREES")
            .setCheck("Number")
            .appendField("turn right");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(150);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };

    Blockly.Blocks['motion_turn_left'] = {
      init: function() {
        this.appendValueInput("DEGREES")
            .setCheck("Number")
            .appendField("turn left");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(150);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };

    Blockly.Blocks['motion_point_in_direction'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("point in direction (degrees)");
        this.appendValueInput("ANGLE")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldAngle(90), "A");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(150);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };

    Blockly.Blocks['motion_point_in_direction_of_target'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("point in direction of target");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(150);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };

    Blockly.Blocks['motion_point_in_direction_of_point'] = {
      init: function() {
          this.appendDummyInput()
                  .appendField("motion point in direction of point");
          this.appendValueInput("x")
                  .setCheck("Number")
                  .appendField("x");
          this.appendValueInput("y")
                  .setCheck("Number")
                  .appendField("y");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(150);
          this.setTooltip('');
          this.setHelpUrl('');
      }
  };

    Blockly.Blocks['motion_set_x_to'] = {
      init: function() {
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("set x to");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(150);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };

    Blockly.Blocks['motion_set_y_to'] = {
      init: function() {
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("set y to");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(150);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };

    window.setTimeout(() => {
      this.setState({
        toolboxCategories: this.state.toolboxCategories.concat([
          {
            name: 'Motion',
            colour: 150,
            blocks: [
              { type: 'motion_foward' },
              { type: 'motion_turn_right'},
              { type: 'motion_turn_left' },
              { type: 'motion_point_in_direction'},
              { type: 'motion_point_in_direction_of_target'},
              { type: 'motion_point_in_direction_of_point'},
              { type: 'motion_set_x_to' },
              { type: 'motion_set_y_to'},
            ],
          },
        ]),
      });

      Blockly.JavaScript['motion_foward'] = function(block) {
        var value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var argument0 = Blockly.JavaScript.valueToCode(block, 'DISTANCE',
          Blockly.JavaScript.ORDER_NONE) || '\'\'';
        var code = 'foward('+argument0+');\n';
        return code;
      };
      Blockly.JavaScript['motion_turn_right'] = function(block) {
        var value_distance = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var argument0 = Blockly.JavaScript.valueToCode(block, 'DEGREES',
          Blockly.JavaScript.ORDER_NONE) || '\'\'';
        var code = 'turn_right('+argument0+');\n';
        return code;
      };

      Blockly.JavaScript['motion_turn_left'] = function(block) {
        var value_distance = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var argument0 = Blockly.JavaScript.valueToCode(block, 'DEGREES',
          Blockly.JavaScript.ORDER_NONE) || '\'\'';
        var code = 'turn_left('+argument0+');\n';
        return code;
      };

      Blockly.JavaScript['motion_point_in_direction'] = function(block) {
        var angle_a = block.getFieldValue('A');
        var value_angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var argument0 = Blockly.JavaScript.valueToCode(block, 'ANGLE',
          Blockly.JavaScript.ORDER_NONE) || '\'\'';
        var angle_final=argument0=="''"?angle_a:argument0;
        var code = 'point_in_direction_degrees('+angle_final+');\n';
        return code;
      };

      Blockly.JavaScript['motion_point_in_direction_of_target'] = function(block) {
        // TODO: Assemble JavaScript into code variable.
        var code = 'point_spriteA_in_direction_spriteB();\n';
        return code;
      };

      Blockly.JavaScript['motion_point_in_direction_of_point'] = function(block) {
        var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
        var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = 'point_sprite_in_direction_to_point('+value_x+','+value_y+');\n';
        return code;
    };

      Blockly.JavaScript['motion_set_x_to'] = function(block) {
        var value_distance = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var argument0 = Blockly.JavaScript.valueToCode(block, 'X',
          Blockly.JavaScript.ORDER_NONE) || '\'\'';
        var code = 'set_x_to('+argument0+');\n';
        return code;
      };

      Blockly.JavaScript['motion_set_y_to'] = function(block) {
        var value_distance = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var argument0 = Blockly.JavaScript.valueToCode(block, 'Y',
          Blockly.JavaScript.ORDER_NONE) || '\'\'';
        var code = 'set_y_to('+argument0+');\n';
        return code;
      };
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
          store.dispatch({type: BUILD_GAME, gameObjects: this.state.gameObjects});
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