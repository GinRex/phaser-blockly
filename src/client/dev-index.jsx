/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { connect } from 'react-redux';

import ReactBlocklyComponent from './index';
import ConfigFiles from './initContent/content';
import parseWorkspaceXml from './BlocklyHelper';
import { selectFile, buildGame, uploadImage, setSlectedGameobjectIndex, updateWorkspace } from './actions/home';

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
    };
    this.mounted = false;
  }
  componentDidMount() {
    this.mounted = true;
    console.log(this.props)
    // if (this.props.gameObjects.length !== 0) {
    //   // console.log(store.getState());
    //   this.setState({
    //     gameObjects: this.props.gameObjects,
    //     slectedGameobjectIndex: this.props.gameObjects[0].key,
    //   });
    // }
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
    //////////EVENT
    Blockly.Blocks['events_when_event_happens'] = {
      init: function() {
        this.appendStatementInput("EVENT_CODE")
            .setCheck(null)
            .appendField("when event happens");
        this.appendValueInput("EVENT_NAME")
            .setCheck(null)
            .appendField(new Blockly.FieldDropdown([["Select an event", "NO_EVENT_SELECTED"], ["On statup", "ON_STARTUP"], ["Each frame", "EACH_FRAME"], ["Left key pressed", "LEFT_KEY_PRESSED"], ["Right key pressed", "RIGHT_KEY_PRESSED"], ["Up key pressed", "UP_KEY_PRESSED"], ["Down key pressed", "DOWN_KEY_PRESSED"]]), "EVENT");
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };

    Blockly.Blocks['sprites_destroy_current_sprite'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("Destroy current sprite");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(260);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };


    /////SPRITES
    Blockly.Blocks['sprites_create_clone_of_current_sprite'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("create clone of current sprite");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(260);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };

    Blockly.Blocks['sprites_destroy_current_sprite'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("Destroy current sprite");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(260);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };

    Blockly.Blocks['sprites_hide_current_sprite'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("Hide sprite");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(260);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };

    Blockly.Blocks['sprites_show_current_sprite'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("Show sprite");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(260);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };

    Blockly.Blocks['sprites_for_each_clone_of_current_sprite'] = {
      init: function() {
        this.appendStatementInput("STATEMENT_CODE")
            .setCheck(null)
            .appendField("for each clone of current sprite");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };

    Blockly.Blocks['sprites_is_colliding_with_target'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("Is colliding with target");
        this.setOutput(true, "Boolean");
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      //oncgange Javascript generation
      }
    };

    Blockly.Blocks['sprites_set_current_sprite'] = {
      init: function() {
        this.appendDummyInput()
          .appendField("set the current sprite");
        this.appendValueInput("SPRITE_OPTION_BOX")
        .setCheck("String")
            //.appendField(new Blockly.FieldDropdown(parent_), "sprite");
        .appendField(new Blockly.FieldDropdown(dynamicOptions), "sprite");
        //this.appendValueInput("ANGLE")
        //    .setCheck("Number")
        //    .setAlign(Blockly.ALIGN_RIGHT)
        //    .appendField(new Blockly.FieldAngle(90), "A");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(260);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };

    

    Blockly.Blocks['sprites_set_target_sprite'] = {
      init: function() {
        this.appendDummyInput()
          .appendField("set the target sprite");
        this.appendValueInput("SPRITE_OPTION_BOX")
        .setCheck("String")
            //.appendField(new Blockly.FieldDropdown(parent_), "sprite");
        .appendField(new Blockly.FieldDropdown(dynamicOptions), "sprite");
        //this.appendValueInput("ANGLE")
        //    .setCheck("Number")
        //    .setAlign(Blockly.ALIGN_RIGHT)
        //    .appendField(new Blockly.FieldAngle(90), "A");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(260);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };
   

    Blockly.Blocks['sprites_value_of_x'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("value of x");
        this.setOutput(true, "Number");
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };
   
    
    Blockly.Blocks['sprites_value_of_y'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("value of y");
        this.setOutput(true, "Number");
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      //oncgange Javascript generation
      }
    };
   

    Blockly.Blocks['sprites_nested_for_each_clone_of_current_target_sprite'] = {
      init: function() {
        this.appendStatementInput("STATEMENT_CODE")
            .setCheck(null)
            .appendField("nested for each clone of current target sprite");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };
    


    Blockly.Blocks['sprites_for_each_clone_of_current_sprite_new'] = {
      init: function() {
        this.appendStatementInput("STATEMENT_CODE")
            .setCheck(null)
            .appendField("do when clones collides");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(120);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };
   

    Blockly.Blocks['sprites_next_frame'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("next frame of current sprite");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(260);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    }
    

    Blockly.Blocks['sprites_current_sprite_send_to_back'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("current sprite send to back");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(260);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };
    

    Blockly.Blocks['sprites_current_sprite_bring_to_front'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("current sprite bring to front");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(260);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };
   

    Blockly.Blocks['sprites_set_current_sprite_to_target_sprite'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("set current sprite to target sprite");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(260);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };
    

    Blockly.Blocks['sprites_current_frame_number'] = {
      init: function() {
        this.appendDummyInput()
            .appendField("get current frame number");
        this.setOutput(true, "Number");
        this.setColour(210);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      //oncgange Javascript generation
      }
    };
    

    Blockly.Blocks['sprites_set_frame_to_frame_number'] = {
      init: function() {
        this.appendValueInput("FRAME_NUMBER")
            //.setCheck("Number")
            .appendField("set frame to frame");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(260);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
      }
    };



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
          {
            name: 'Event',
            colour: 250,
            blocks: [
              { type: 'events_when_event_happens' }
            ],
          },
          {
            name: 'Sprites',
            colour: 250,
            blocks: [
              { type: 'sprites_create_clone_of_current_sprite' },
              { type: 'sprites_destroy_current_sprite' },
              { type: 'sprites_hide_current_sprite' },
              { type: 'sprites_show_current_sprite' },
              { type: 'sprites_for_each_clone_of_current_sprite' },
              { type: 'sprites_is_colliding_with_target' },
             //{ type: 'sprites_set_current_sprite'},
              // { type: 'sprites_set_target_sprite'},
               { type: 'sprites_value_of_x'},
               { type: 'sprites_value_of_y'},
               { type: 'sprites_nested_for_each_clone_of_current_target_sprite'},
               { type: 'sprites_for_each_clone_of_current_sprite_new'},
              { type: 'sprites_next_frame'},
              { type: 'sprites_current_sprite_send_to_back'},
              { type: 'sprites_current_sprite_bring_to_front'},
              { type: 'sprites_set_current_sprite_to_target_sprite'},
              { type: 'sprites_current_frame_number'},
              { type: 'sprites_set_frame_to_frame_number'},
            ],
          },
        ]),
      });

      Blockly.JavaScript['motion_foward'] = function(block) {
        var value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var argument0 = Blockly.JavaScript.valueToCode(block, 'DISTANCE',
          Blockly.JavaScript.ORDER_NONE) || '\'\'';
        var code = 'Motion.foward(this, '+argument0+');\n';
        return code;
      };
      Blockly.JavaScript['motion_turn_right'] = function(block) {
        var value_distance = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var argument0 = Blockly.JavaScript.valueToCode(block, 'DEGREES',
          Blockly.JavaScript.ORDER_NONE) || '\'\'';
        var code = 'Motion.turn_right(this, '+argument0+');\n';
        return code;
      };

      Blockly.JavaScript['motion_turn_left'] = function(block) {
        var value_distance = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var argument0 = Blockly.JavaScript.valueToCode(block, 'DEGREES',
          Blockly.JavaScript.ORDER_NONE) || '\'\'';
        var code = 'Motion.turn_left(this, '+argument0+');\n';
        return code;
      };

      Blockly.JavaScript['motion_point_in_direction'] = function(block) {
        var angle_a = block.getFieldValue('A');
        var value_angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var argument0 = Blockly.JavaScript.valueToCode(block, 'ANGLE',
          Blockly.JavaScript.ORDER_NONE) || '\'\'';
        var angle_final=argument0=="''"?angle_a:argument0;
        var code = 'Motion.point_in_direction_degrees(this, '+angle_final+');\n';
        return code;
      };

      Blockly.JavaScript['motion_point_in_direction_of_target'] = function(block) {
        // TODO: Assemble JavaScript into code variable.
        var code = 'Motion.point_spriteA_in_direction_spriteB(this);\n';
        return code;
      };

      Blockly.JavaScript['motion_point_in_direction_of_point'] = function(block) {
        var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
        var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = 'Motion.point_sprite_in_direction_to_point(this, '+value_x+','+value_y+');\n';
        return code;
    };

      Blockly.JavaScript['Motion.motion_set_x_to'] = function(block) {
        var value_distance = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var argument0 = Blockly.JavaScript.valueToCode(block, 'X',
          Blockly.JavaScript.ORDER_NONE) || '\'\'';
        var code = 'set_x_to(this, '+argument0+');\n';
        return code;
      };

      Blockly.JavaScript['Motion.motion_set_y_to'] = function(block) {
        var value_distance = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var argument0 = Blockly.JavaScript.valueToCode(block, 'Y',
          Blockly.JavaScript.ORDER_NONE) || '\'\'';
        var code = 'set_y_to(this, '+argument0+');\n';
        return code;
      };


///////EVENT

Blockly.JavaScript['events_when_event_happens'] = function(block) {
  var statements_event_code = Blockly.JavaScript.statementToCode(block, 'EVENT_CODE');
  var dropdown_event = block.getFieldValue('EVENT');
  var value_event_name = Blockly.JavaScript.valueToCode(block, 'EVENT_NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  if(dropdown_event=="NO_EVENT_SELECTED") {
    return "//error, you did not select an event in the 'when event happens' block\n"
  }
  var code = 'function ' + dropdown_event +'(){\n'+statements_event_code+'\n}';
  return code;
};


//SPRITES
Blockly.JavaScript['sprites_create_clone_of_current_sprite'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'Sprite.clone_sprite(this);\n';
  return code;
};

Blockly.JavaScript['sprites_destroy_current_sprite'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'Sprite.destroy_current_sprite(this);\n';
  return code;
};

Blockly.JavaScript['sprites_hide_current_sprite'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'Sprite.hide_current_sprite(this);\n';
  return code;
};

Blockly.JavaScript['sprites_show_current_sprite'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'Sprite.show_current_sprite(this);\n';
  return code;
};

Blockly.JavaScript['sprites_for_each_clone_of_current_sprite'] = function(block) {
  var statements_statement_code = Blockly.JavaScript.statementToCode(block, 'STATEMENT_CODE');
  var code ='';
  // TODO: Assemble JavaScript into code variable.
  code=	'var game_object;\n';
  code+=	'game_object=find_sprite_object_by_name(current_sprite_name);\n';
  code+=	'for(var clone in game_object.clones){\n';
  code+='	debug_current_sprite_name=current_sprite_name;\n';
  code+='	current_clone=clone;\n';
  code+=statements_statement_code+'\n';
  code+='}\n';
  code+='current_clone=null;\n';
  return code;
};

Blockly.JavaScript['sprites_is_colliding_with_target'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "Sprite.is_colliding_with_target(this)";
  // TODO: Change ORDER_NONE to the correct strength.
  //return [code, Blockly.JavaScript.ORDER_NONE];
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['sprites_set_current_sprite'] = function(block) {
  var dropdown_sprite = block.getFieldValue('sprite');
  var value_sprite_option_box = Blockly.JavaScript.valueToCode(block, 'SPRITE_OPTION_BOX', Blockly.JavaScript.ORDER_ATOMIC);
  //var angle_a = block.getFieldValue('A');
  //var value_angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC);
  var sprite_name = Blockly.JavaScript.valueToCode(block, 'SPRITE_OPTION_BOX', Blockly.JavaScript.ORDER_ATOMIC);
  
  // TODO: Assemble JavaScript into code variable
  //var argument0 = Blockly.JavaScript.valueToCode(block, 'ANGLE',Blockly.JavaScript.ORDER_NONE) || '\'\'';
  //override fields if variables provided
  var sprite_name_final=value_sprite_option_box==""?dropdown_sprite:value_sprite_option_box;
  if(sprite_name_final=="OPT0") {
    //alert("You have not selected a sprite in 'set current sprite' block, please select a sprite");
    return "//error,failed to select sprite in 'set current sprite' block"
  }

  var code = 'Sprite.set_current_sprite_name("this, '+sprite_name_final+'");\n';
  return code;
};

 Blockly.JavaScript['sprites_set_target_sprite'] = function(block) {
  var dropdown_sprite = block.getFieldValue('sprite');
  var value_sprite_option_box = Blockly.JavaScript.valueToCode(block, 'SPRITE_OPTION_BOX', Blockly.JavaScript.ORDER_ATOMIC);
  //var angle_a = block.getFieldValue('A');
  //var value_angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC);
  var sprite_name = Blockly.JavaScript.valueToCode(block, 'SPRITE_OPTION_BOX', Blockly.JavaScript.ORDER_ATOMIC);
  
  // TODO: Assemble JavaScript into code variable
  //var argument0 = Blockly.JavaScript.valueToCode(block, 'ANGLE',Blockly.JavaScript.ORDER_NONE) || '\'\'';
  //override fields if variables provided
  var sprite_name_final=value_sprite_option_box==""?dropdown_sprite:value_sprite_option_box;
  if(sprite_name_final=="OPT0") {
    //alert("You have not selected a sprite in 'set current sprite' block, please select a sprite");
    return "//error,failed to select sprite in 'set current sprite' block"
  }

  var code = 'Sprite.set_target_sprite_name("this, '+sprite_name_final+'");\n';
  return code;
};

 Blockly.JavaScript['sprites_value_of_x'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "Sprite.parseInt(this, get_x_value())";;
  // TODO: Change ORDER_NONE to the correct strength.
  //return [code, Blockly.JavaScript.ORDER_NONE];
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

 Blockly.JavaScript['sprites_value_of_y'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "Sprite.parseInt(this, get_y_value())";
  // TODO: Change ORDER_NONE to the correct strength.
  //return [code, Blockly.JavaScript.ORDER_NONE];
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['sprites_nested_for_each_clone_of_current_target_sprite'] = function(block) {
  var statements_statement_code = Blockly.JavaScript.statementToCode(block, 'STATEMENT_CODE');
  // TODO: Assemble JavaScript into code variable.
  code=	'var game_object_target;\n';
  code+='game_object_target=find_target_sprite_with_clones_object_by_name(target_sprite_name);\n';
  code+='for(var clone_target in game_object_target.clones){\n';
  //code+='	debug_current_sprite_name=current_sprite_name;\n';
  code+='	current_target_clone=clone_target;\n';
  code+=statements_statement_code+'\n';
  code+='}\n';
  code+='current_target_clone=null;\n';
  return code;
};	

 Blockly.JavaScript['sprites_for_each_clone_of_current_sprite_new'] = function(block) {
  var statements_statement_code = Blockly.JavaScript.statementToCode(block, 'STATEMENT_CODE');
  
  code=	'var game_object;\n';
  code+='game_object=find_sprite_object_by_name_new(current_sprite_name);\n';
  code+='for(var clone in game_object.clones) {\n';
  code+='  current_clone=clone;\n';
  code+='  var game_object_target;\n';
  code+='  game_object_target=find_target_sprite_with_clones_object_by_name(target_sprite_name);\n';
  code+='  for(var clone_target in game_object_target.clones) {\n';
  code+='    current_target_clone=clone_target;\n';
  code+='    if(current_sprite_clones_are_colliding_with_target_sprite_clones()) {\n';
  code+='      //do when current sprite clone collides with target clone\n';
  code+= statements_statement_code+'\n';
  code+='      //end\n';
  code+='    }\n';
  code+='  }\n';
  code+='  current_target_clone=null;\n';
  code+='}\n';
  code+='current_clone=null;\n';
  return code;
};

Blockly.JavaScript['sprites_next_frame'] = function(block) {
  //Assemble JavaScript into code variable.
  var code = 'Sprite.next_fame(this);\n';
  return code;
};

Blockly.JavaScript['sprites_current_sprite_send_to_back'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  /*
  set_current_sprite_name("frog");
  game_object=find_sprite_object_by_name(current_sprite_name);

  //but this did
  game_object=find_sprite_object_by_name("frog");
  game_object.sprite.bringToTop()
  
  I am able to do game_object.sprite.bringToTop() and it works, but when I try game_object.sprite.sendToBack() I get TypeError: game_object.sprite.sendToBack is not a function , I am using Phaser v2.0.2 - Canvas - WebAudio     , any idea what could be wrong?
  
  ada answer: game.world.sendToBack(sprite)
  */
  var code = 	'var go=find_sprite_object_by_name(current_sprite_name);\n';
  code = code + 'go.sprite.sendToBack();\n';
  return code;
};

 Blockly.JavaScript['sprites_current_sprite_bring_to_front'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  /*
  set_current_sprite_name("frog");
  game_object=find_sprite_object_by_name(current_sprite_name);

  //but this did
  game_object=find_sprite_object_by_name("frog");
  game_object.sprite.bringToTop()
  */
  var code = 	'var go=find_sprite_object_by_name(current_sprite_name);\n';
  code = code + 'go.sprite.bringToTop();\n';
  return code;
};

Blockly.JavaScript['sprites_set_current_sprite_to_target_sprite'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'Sprite.set_current_sprite_to_target_sprite(this);\n';
  return code;
};

Blockly.JavaScript['sprites_current_frame_number'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = "Sprite.parseInt(this, current_frame_number())";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['sprites_set_frame_to_frame_number'] = function(block) {
  var value_FRAME_NUMBER = Blockly.JavaScript.valueToCode(block, 'FRAME_NUMBER', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var argument0 = Blockly.JavaScript.valueToCode(block, 'FRAME_NUMBER',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var code = 'Sprite.set_frame_to_frame_number(this, '+argument0+');\n';
  return code;
};




  console.log(this.state)

  }

  workspaceDidChange = (workspace, gameObjects, slectedGameobjectIndex) => {
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    let currentGameobject = gameObjects && slectedGameobjectIndex && gameObjects.find(gameObject => gameObject.key === slectedGameobjectIndex);
    if (currentGameobject) {
      console.log(currentGameobject);
      currentGameobject.workspace = newXml;
      currentGameobject.jsCode = code;

      let newGameObjects = gameObjects;
      let index = newGameObjects.findIndex(gameObject => gameObject.key === slectedGameobjectIndex);
      newGameObjects[index] = currentGameobject;

      this.props.updateWorkspace(gameObjects);
      // this.setState({ gameObjects: gameObjects })
    }
    // document.getElementById('generated-xml').innerText = newXml;


    document.getElementById('code').value = code;
    // this.props.buildGame(this.state.gameObjects);
  }


  // upload image
  onChangeHandler = (event) => {
    console.log(event.target.files[0]);
    this.props.selectFile(event.target.files[0]);
    // this.props.dispatch({type: SELECT_FILE, selectedFile: event.target.files[0]})
    console.log(this.props);
    // this.setState({
    //   selectedFile: event.target.files[0],
    //   loaded: 0,
    // })
  }

  onClickBuildGame = () => {
    console.log('updatecode');
    const data = this.state.gameObjects;
    axios.post('http://localhost:8080/api/updateCode', data, {})
      .then((res) => {
        console.log(res);
      });
  }


  render() {
    const { classes } = this.props;
    console.log(this.props.selectedFile);
    let currentGameobject = this.props.gameObjects.find(gameObject => gameObject.key === this.props.slectedGameobjectIndex);
    return (
      <div style={{ height: 500 }}>
        {/* <div>{this.props.selectedFile.name}</div> */}
        <Button
          onClick={() => {
            // this.createFile();
            // this.props.dispatch({ type: BUILD_GAME, gameObjects: this.state.gameObjects });
            // this.onClickBuildGame();
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
          initialXml={this.props.gameObjects.length!==0 && currentGameobject && currentGameobject.workspace && this.props.slectedGameobjectIndex !== '' ?
            currentGameobject.workspace :
            null
          }
          wrapperDivClassName="fill-height"
          workspaceDidChange={(workspace) => this.workspaceDidChange(workspace, this.props.gameObjects, this.props.slectedGameobjectIndex)}
        />
        <input type="file" name="file" onChange={this.onChangeHandler} />
        <button type="button" class='btn btn-success btn-block' onClick={() => this.props.uploadImage(this.props.selectedFile)}>Upload</button>
        <div style={{
          borderWidth: 3, borderColor: 'black', width: 600, height: 150, backgroundColor: 'red', margin: 10,
          }}
        >
          {this.props.gameObjects.map((gameObject) => {
              return (
                <img
                  onClick={() => {
                    this.props.setSlectedGameobjectIndex(gameObject.key)
                    // this.setState({ slectedGameobjectIndex: gameObject.key })
                    // console.log(this.state.slectedGameobjectIndex)
                    Blockly.mainWorkspace.clear();
                    if (gameObject.workspace !== '') {
                      console.log('loaded')
                      var xml = Blockly.Xml.textToDom(gameObject.workspace);
                      Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
                    }
                  }}
                  src={`assets/${gameObject.filename}`}
                  style={{
                    width: 100, height: 100, margin: 5, backgroundColor: gameObject.key === this.props.slectedGameobjectIndex ? "yellow" : "white", borderWidth: 3, borderRadius: 20,
                  }}
                  alt={gameObject.name}
                />
            );
          })}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BlocklyPart));
