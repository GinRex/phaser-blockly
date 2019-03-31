Blockly.Blocks.motion_foward = {
  init() {
    this.appendValueInput('DISTANCE')
      .setCheck('Number')
      .appendField('foward');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(150);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.motion_turn_right = {
  init() {
    this.appendValueInput('DEGREES')
      .setCheck('Number')
      .appendField('turn right');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(150);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.motion_turn_left = {
  init() {
    this.appendValueInput('DEGREES')
      .setCheck('Number')
      .appendField('turn left');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(150);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.motion_point_in_direction = {
  init() {
    this.appendDummyInput().appendField('point in direction (degrees)');
    this.appendValueInput('ANGLE')
      .setCheck('Number')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(new Blockly.FieldAngle(90), 'A');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(150);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.motion_point_in_direction_of_target = {
  init() {
    this.appendDummyInput().appendField('point in direction of target');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(150);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.motion_point_in_direction_of_point = {
  init() {
    this.appendDummyInput().appendField('motion point in direction of point');
    this.appendValueInput('x')
      .setCheck('Number')
      .appendField('x');
    this.appendValueInput('y')
      .setCheck('Number')
      .appendField('y');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks.motion_set_x_to = {
  init() {
    this.appendValueInput('X')
      .setCheck('Number')
      .appendField('set x to');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(150);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.motion_set_y_to = {
  init() {
    this.appendValueInput('Y')
      .setCheck('Number')
      .appendField('set y to');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(150);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};
// ////////EVENT
Blockly.Blocks.events_when_event_happens = {
  init() {
    this.appendStatementInput('EVENT_CODE')
      .setCheck(null)
      .appendField('when event happens');
    this.appendValueInput('EVENT_NAME')
      .setCheck(null)
      .appendField(
        new Blockly.FieldDropdown([
          ['Select an event', 'NO_EVENT_SELECTED'],
          ['On statup', 'ON_STARTUP'],
          ['Each frame', 'EACH_FRAME'],
          ['Left key pressed', 'LEFT_KEY_PRESSED'],
          ['Right key pressed', 'RIGHT_KEY_PRESSED'],
          ['Up key pressed', 'UP_KEY_PRESSED'],
          ['Down key pressed', 'DOWN_KEY_PRESSED'],
        ]),
        'EVENT',
      );
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.sprites_destroy_current_sprite = {
  init() {
    this.appendDummyInput().appendField('Destroy current sprite');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

// ///SPRITES
Blockly.Blocks.sprites_create_clone_of_current_sprite = {
  init() {
    this.appendDummyInput().appendField('create clone of current sprite');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.sprites_destroy_current_sprite = {
  init() {
    this.appendDummyInput().appendField('Destroy current sprite');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.sprites_hide_current_sprite = {
  init() {
    this.appendDummyInput().appendField('Hide sprite');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.sprites_show_current_sprite = {
  init() {
    this.appendDummyInput().appendField('Show sprite');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.sprites_for_each_clone_of_current_sprite = {
  init() {
    this.appendStatementInput('STATEMENT_CODE')
      .setCheck(null)
      .appendField('for each clone of current sprite');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.sprites_is_colliding_with_target = {
  init() {
    this.appendDummyInput().appendField('Is colliding with target');
    this.setOutput(true, 'Boolean');
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    // oncgange Javascript generation
  },
};

Blockly.JavaScript.motion_foward = function (block) {
  const value_distance = Blockly.JavaScript.valueToCode(
    block,
    'DISTANCE',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  // TODO: Assemble JavaScript into code variable.
  const argument0 =
    Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_NONE) || "''";
  const code = `Motion.foward( this, ${argument0});\n`;
  return code;
};
Blockly.JavaScript.motion_turn_right = function (block) {
  const value_distance = Blockly.JavaScript.valueToCode(
    block,
    'DEGREES',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  // TODO: Assemble JavaScript into code variable.
  const argument0 =
    Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_NONE) || "''";
  const code = `turn_right(${argument0});\n`;
  return code;
};

Blockly.JavaScript.motion_turn_left = function (block) {
  const value_distance = Blockly.JavaScript.valueToCode(
    block,
    'DEGREES',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  // TODO: Assemble JavaScript into code variable.
  const argument0 =
    Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_NONE) || "''";
  const code = `turn_left(${argument0});\n`;
  return code;
};

Blockly.JavaScript.motion_point_in_direction = function (block) {
  const angle_a = block.getFieldValue('A');
  const value_angle = Blockly.JavaScript.valueToCode(
    block,
    'ANGLE',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  // TODO: Assemble JavaScript into code variable.
  const argument0 =
    Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_NONE) || "''";
  const angle_final = argument0 == "''" ? angle_a : argument0;
  const code = `point_in_direction_degrees(${angle_final});\n`;
  return code;
};

Blockly.JavaScript.motion_point_in_direction_of_target = function (block) {
  // TODO: Assemble JavaScript into code variable.
  const code = 'point_spriteA_in_direction_spriteB();\n';
  return code;
};

Blockly.JavaScript.motion_point_in_direction_of_point = function (block) {
  const value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  const value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `point_sprite_in_direction_to_point(${value_x},${value_y});\n`;
  return code;
};

Blockly.JavaScript.motion_set_x_to = function (block) {
  const value_distance = Blockly.JavaScript.valueToCode(
    block,
    'X',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  // TODO: Assemble JavaScript into code variable.
  const argument0 =
    Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_NONE) || "''";
  const code = `set_x_to(${argument0});\n`;
  return code;
};

Blockly.JavaScript.motion_set_y_to = function (block) {
  const value_distance = Blockly.JavaScript.valueToCode(
    block,
    'Y',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  // TODO: Assemble JavaScript into code variable.
  const argument0 =
    Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_NONE) || "''";
  const code = `set_y_to(${argument0});\n`;
  return code;
};

// /////EVENT

Blockly.JavaScript.events_when_event_happens = function (block) {
  const statements_event_code = Blockly.JavaScript.statementToCode(block, 'EVENT_CODE');
  const dropdown_event = block.getFieldValue('EVENT');
  const value_event_name = Blockly.JavaScript.valueToCode(
    block,
    'EVENT_NAME',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  // TODO: Assemble JavaScript into code variable.
  if (dropdown_event == 'NO_EVENT_SELECTED') {
    return "//error, you did not select an event in the 'when event happens' block\n";
  }
  const code = `function ${dropdown_event}(){\n${statements_event_code}\n}`;
  return code;
};

// SPRITES
Blockly.JavaScript.sprites_create_clone_of_current_sprite = function (block) {
  // TODO: Assemble JavaScript into code variable.
  const code = 'clone_sprite();\n';
  return code;
};

Blockly.JavaScript.sprites_destroy_current_sprite = function (block) {
  // TODO: Assemble JavaScript into code variable.
  const code = 'destroy_current_sprite();\n';
  return code;
};

Blockly.JavaScript.sprites_hide_current_sprite = function (block) {
  // TODO: Assemble JavaScript into code variable.
  const code = 'hide_current_sprite();\n';
  return code;
};

Blockly.JavaScript.sprites_show_current_sprite = function (block) {
  // TODO: Assemble JavaScript into code variable.
  const code = 'show_current_sprite();\n';
  return code;
};

Blockly.JavaScript.sprites_for_each_clone_of_current_sprite = function (block) {
  const statements_statement_code = Blockly.JavaScript.statementToCode(block, 'STATEMENT_CODE');
  // TODO: Assemble JavaScript into code variable.
  code = 'var game_object;\n';
  code += 'game_object=find_sprite_object_by_name(current_sprite_name);\n';
  code += 'for(var clone in game_object.clones){\n';
  code += '	debug_current_sprite_name=current_sprite_name;\n';
  code += '	current_clone=clone;\n';
  code += `${statements_statement_code}\n`;
  code += '}\n';
  code += 'current_clone=null;\n';
  return code;
};

Blockly.JavaScript.sprites_is_colliding_with_target = function (block) {
  // TODO: Assemble JavaScript into code variable.
  const code = 'is_colliding_with_target()';
  // TODO: Change ORDER_NONE to the correct strength.
  // return [code, Blockly.JavaScript.ORDER_NONE];
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
