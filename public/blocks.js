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

// / game state
Blockly.Blocks.game_state = {
  init() {
    this.appendStatementInput('GAME_CODE')
      .setCheck(null)
      .appendField('when game state');
    this.appendValueInput('STATE_NAME')
      .setCheck(null)
      .appendField(
        new Blockly.FieldDropdown([
          ['Select an event', 'NO_EVENT_SELECTED'],
          ['On PreLoad', 'preload'],
          ['On Create', 'create'],
          ['On Update', 'update'],
        ]),
        'GAME_STATE',
      );
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.screen_width = {
  init() {
    this.appendDummyInput().appendField('screen width');
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks.screen_height = {
  init() {
    this.appendDummyInput().appendField('screen height');
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

// object_position
Blockly.Blocks.set_pos = {
  init() {
    this.appendDummyInput().appendField('set position of');
    this.appendValueInput('NAME').setCheck(null);
    this.appendDummyInput().appendField('to');
    this.appendValueInput('x')
      .setCheck(null)
      .appendField('x');
    this.appendValueInput('y')
      .setCheck(null)
      .appendField('y');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

// object_size
Blockly.Blocks.set_size = {
  init() {
    this.appendDummyInput().appendField('set size of');
    this.appendValueInput('NAME').setCheck(null);
    this.appendDummyInput().appendField('to');
    this.appendValueInput('w')
      .setCheck(null)
      .appendField('w');
    this.appendValueInput('h')
      .setCheck(null)
      .appendField('h');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

// physics
Blockly.Blocks.world_bounce = {
  init() {
    this.appendDummyInput().appendField('set world bounce');
    this.appendValueInput('NAME').setCheck(null);
    this.appendDummyInput().appendField(new Blockly.FieldCheckbox('TRUE'), 'NAME');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks.set_bounce = {
  init() {
    this.appendDummyInput().appendField('set bounce speed');
    this.appendValueInput('name')
      .setCheck(null)
      .appendField('of');
    this.appendValueInput('bounce_speed')
      .setCheck(null)
      .appendField('=');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks.set_velocity = {
  init() {
    this.appendDummyInput().appendField('set velocity of');
    this.appendValueInput('name').setCheck(null);
    this.appendValueInput('vx')
      .setCheck(null)
      .appendField('x =');
    this.appendValueInput('vy')
      .setCheck(null)
      .appendField('y =');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks.add_collider = {
  init() {
    this.appendDummyInput().appendField('add collider of');
    this.appendValueInput('obj_1').setCheck(null);
    this.appendValueInput('obj_2')
      .setCheck(null)
      .appendField('and');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
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

Blockly.Blocks.sprites_set_current_sprite = {
  init() {
    this.appendDummyInput().appendField('set the current sprite');
    this.appendValueInput('SPRITE_OPTION_BOX')
      .setCheck('String')
      .appendField(new Blockly.FieldDropdown(dynamicOptions), 'sprite');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.sprites_set_target_sprite = {
  init() {
    this.appendDummyInput().appendField('set the target sprite');
    this.appendValueInput('SPRITE_OPTION_BOX')
      .setCheck('String')
      // .appendField(new Blockly.FieldDropdown(parent_), "sprite");
      .appendField(new Blockly.FieldDropdown(dynamicOptions), 'sprite');
    // this.appendValueInput("ANGLE")
    //    .setCheck("Number")
    //    .setAlign(Blockly.ALIGN_RIGHT)
    //    .appendField(new Blockly.FieldAngle(90), "A");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.sprites_value_of_x = {
  init() {
    this.appendDummyInput().appendField('value of x');
    this.setOutput(true, 'Number');
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.sprites_value_of_y = {
  init() {
    this.appendDummyInput().appendField('value of y');
    this.setOutput(true, 'Number');
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    // oncgange Javascript generation
  },
};

Blockly.Blocks.sprites_nested_for_each_clone_of_current_target_sprite = {
  init() {
    this.appendStatementInput('STATEMENT_CODE')
      .setCheck(null)
      .appendField('nested for each clone of current target sprite');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.sprites_for_each_clone_of_current_sprite_new = {
  init() {
    this.appendStatementInput('STATEMENT_CODE')
      .setCheck(null)
      .appendField('do when clones collides');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.sprites_next_frame = {
  init() {
    this.appendDummyInput().appendField('next frame of current sprite');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.sprites_current_sprite_send_to_back = {
  init() {
    this.appendDummyInput().appendField('current sprite send to back');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.sprites_current_sprite_bring_to_front = {
  init() {
    this.appendDummyInput().appendField('current sprite bring to front');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.sprites_set_current_sprite_to_target_sprite = {
  init() {
    this.appendDummyInput().appendField('set current sprite to target sprite');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

Blockly.Blocks.sprites_current_frame_number = {
  init() {
    this.appendDummyInput().appendField('get current frame number');
    this.setOutput(true, 'Number');
    this.setColour(210);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    // oncgange Javascript generation
  },
};

Blockly.Blocks.sprites_set_frame_to_frame_number = {
  init() {
    this.appendValueInput('FRAME_NUMBER')
      // .setCheck("Number")
      .appendField('set frame to frame');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
};

// /

Blockly.JavaScript.motion_foward = function (block) {
  const value_distance = Blockly.JavaScript.valueToCode(
    block,
    'DISTANCE',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
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
  const argument0 =
    Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_NONE) || "''";
  const code = `Motion.turn_right(this, ${argument0});\n`;
  return code;
};

Blockly.JavaScript.motion_turn_left = function (block) {
  const value_distance = Blockly.JavaScript.valueToCode(
    block,
    'DEGREES',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const argument0 =
    Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_NONE) || "''";
  const code = `Motion.turn_left(this, ${argument0});\n`;
  return code;
};

Blockly.JavaScript.motion_point_in_direction = function (block) {
  const angle_a = block.getFieldValue('A');
  const value_angle = Blockly.JavaScript.valueToCode(
    block,
    'ANGLE',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const argument0 =
    Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_NONE) || "''";
  const angle_final = argument0 == "''" ? angle_a : argument0;
  const code = `Motion.point_in_direction_degrees(this, ${angle_final});\n`;
  return code;
};

Blockly.JavaScript.motion_point_in_direction_of_target = function (block) {
  const code = 'Motion.point_spriteA_in_direction_spriteB(this);\n';
  return code;
};

Blockly.JavaScript.motion_point_in_direction_of_point = function (block) {
  const value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  const value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  const code = `Motion.point_sprite_in_direction_to_point(this, ${value_x},${value_y});\n`;
  return code;
};

Blockly.JavaScript.motion_set_x_to = function (block) {
  const value_distance = Blockly.JavaScript.valueToCode(
    block,
    'X',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const argument0 =
    Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_NONE) || "''";
  const code = `Motion.set_x_to(this, ${argument0});\n`;
  return code;
};

Blockly.JavaScript.motion_set_y_to = function (block) {
  const value_distance = Blockly.JavaScript.valueToCode(
    block,
    'Y',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const argument0 =
    Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_NONE) || "''";
  const code = `Motion.set_y_to(this, ${argument0});\n`;
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
  if (dropdown_event == 'NO_EVENT_SELECTED') {
    return "//error, you did not select an event in the 'when event happens' block\n";
  }
  if (dropdown_event == 'LEFT_KEY_PRESSED') {
    return `if (cursors.left.isDown) {\n${statements_event_code}\n}`;
  }

  if (dropdown_event == 'RIGHT_KEY_PRESSED') {
    return `if (cursors.right.isDown) {\n${statements_event_code}\n}`;
  }

  if (dropdown_event == 'UP_KEY_PRESSED') {
    return `if (cursors.up.isDown) {\n${statements_event_code}\n}`;
  }

  if (dropdown_event == 'DOWN_KEY_PRESSED') {
    return `if (cursors.down.isDown) {\n${statements_event_code}\n}`;
  }
  return '';
};

// /////GAME

Blockly.JavaScript.game_state = function (block) {
  const statements_event_code = Blockly.JavaScript.statementToCode(block, 'GAME_CODE');
  const dropdown_event = block.getFieldValue('GAME_STATE');
  const value_event_name = Blockly.JavaScript.valueToCode(
    block,
    'STATE_NAME',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  if (dropdown_event == 'NO_EVENT_SELECTED') {
    return "//error, you did not select an STATE in the 'when game state' block\n";
  }
  if (dropdown_event == 'create') {
    const code = `${dropdown_event}(){\nthis.cursors = this.input.keyboard.createCursorKeys();\n${statements_event_code}\n}`;
    return code;
  }
  const code = `${dropdown_event}(){\n${statements_event_code}\n}`;
  return code;
};

Blockly.JavaScript.screen_width = function (block) {
  const code = 'this.cameras.main.width';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.screen_height = function (block) {
  const code = 'this.cameras.main.height';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

// SPRITES
Blockly.JavaScript.sprites_create_clone_of_current_sprite = function (block) {
  const code = 'Sprite.clone_sprite(this);\n';
  return code;
};

Blockly.JavaScript.sprites_destroy_current_sprite = function (block) {
  const code = 'Sprite.destroy_current_sprite(this);\n';
  return code;
};

Blockly.JavaScript.sprites_hide_current_sprite = function (block) {
  const code = 'Sprite.hide_current_sprite(this);\n';
  return code;
};

Blockly.JavaScript.sprites_show_current_sprite = function (block) {
  const code = 'Sprite.show_current_sprite(this);\n';
  return code;
};

Blockly.JavaScript.sprites_for_each_clone_of_current_sprite = function (block) {
  const statements_statement_code = Blockly.JavaScript.statementToCode(block, 'STATEMENT_CODE');
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
  const code = 'Sprite.is_colliding_with_target(this)';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.sprites_set_current_sprite = function (block) {
  const dropdown_sprite = block.getFieldValue('sprite');
  const value_sprite_option_box = Blockly.JavaScript.valueToCode(
    block,
    'SPRITE_OPTION_BOX',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const sprite_name = Blockly.JavaScript.valueToCode(
    block,
    'SPRITE_OPTION_BOX',
    Blockly.JavaScript.ORDER_ATOMIC,
  );

  const sprite_name_final =
    value_sprite_option_box == '' ? dropdown_sprite : value_sprite_option_box;
  if (sprite_name_final == 'OPT0') {
    return "//error,failed to select sprite in 'set current sprite' block";
  }

  const code = `Sprite.set_current_sprite_name("this, ${sprite_name_final}");\n`;
  return code;
};

Blockly.JavaScript.sprites_set_target_sprite = function (block) {
  const dropdown_sprite = block.getFieldValue('sprite');
  const value_sprite_option_box = Blockly.JavaScript.valueToCode(
    block,
    'SPRITE_OPTION_BOX',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const sprite_name = Blockly.JavaScript.valueToCode(
    block,
    'SPRITE_OPTION_BOX',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const sprite_name_final =
    value_sprite_option_box == '' ? dropdown_sprite : value_sprite_option_box;
  if (sprite_name_final == 'OPT0') {
    return "//error,failed to select sprite in 'set current sprite' block";
  }

  const code = `Sprite.set_target_sprite_name("this, ${sprite_name_final}");\n`;
  return code;
};

Blockly.JavaScript.sprites_value_of_x = function (block) {
  const code = 'Sprite.parseInt(this, get_x_value())';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.sprites_value_of_y = function (block) {
  const code = 'Sprite.parseInt(this, get_y_value())';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.sprites_nested_for_each_clone_of_current_target_sprite = function (block) {
  const statements_statement_code = Blockly.JavaScript.statementToCode(block, 'STATEMENT_CODE');
  code = 'var game_object_target;\n';
  code += 'game_object_target=find_target_sprite_with_clones_object_by_name(target_sprite_name);\n';
  code += 'for(var clone_target in game_object_target.clones){\n';
  code += '	current_target_clone=clone_target;\n';
  code += `${statements_statement_code}\n`;
  code += '}\n';
  code += 'current_target_clone=null;\n';
  return code;
};

Blockly.JavaScript.sprites_for_each_clone_of_current_sprite_new = function (block) {
  const statements_statement_code = Blockly.JavaScript.statementToCode(block, 'STATEMENT_CODE');

  code = 'var game_object;\n';
  code += 'game_object=find_sprite_object_by_name_new(current_sprite_name);\n';
  code += 'for(var clone in game_object.clones) {\n';
  code += '  current_clone=clone;\n';
  code += '  var game_object_target;\n';
  code +=
    '  game_object_target=find_target_sprite_with_clones_object_by_name(target_sprite_name);\n';
  code += '  for(var clone_target in game_object_target.clones) {\n';
  code += '    current_target_clone=clone_target;\n';
  code += '    if(current_sprite_clones_are_colliding_with_target_sprite_clones()) {\n';
  code += '      //do when current sprite clone collides with target clone\n';
  code += `${statements_statement_code}\n`;
  code += '      //end\n';
  code += '    }\n';
  code += '  }\n';
  code += '  current_target_clone=null;\n';
  code += '}\n';
  code += 'current_clone=null;\n';
  return code;
};

Blockly.JavaScript.sprites_next_frame = function (block) {
  const code = 'Sprite.next_fame(this);\n';
  return code;
};

Blockly.JavaScript.sprites_current_sprite_send_to_back = function (block) {
  let code = 'var go=find_sprite_object_by_name(current_sprite_name);\n';
  code += 'go.sprite.sendToBack();\n';
  return code;
};

Blockly.JavaScript.sprites_current_sprite_bring_to_front = function (block) {
  let code = 'var go=find_sprite_object_by_name(current_sprite_name);\n';
  code += 'go.sprite.bringToTop();\n';
  return code;
};

Blockly.JavaScript.sprites_set_current_sprite_to_target_sprite = function (block) {
  const code = 'Sprite.set_current_sprite_to_target_sprite(this);\n';
  return code;
};

Blockly.JavaScript.sprites_current_frame_number = function (block) {
  const code = 'Sprite.parseInt(this, current_frame_number())';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.sprites_set_frame_to_frame_number = function (block) {
  const value_FRAME_NUMBER = Blockly.JavaScript.valueToCode(
    block,
    'FRAME_NUMBER',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const argument0 =
    Blockly.JavaScript.valueToCode(block, 'FRAME_NUMBER', Blockly.JavaScript.ORDER_NONE) || "''";
  const code = `Sprite.set_frame_to_frame_number(this, ${argument0});\n`;
  return code;
};

// object stat

Blockly.JavaScript.set_pos = function (block) {
  const value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  const value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  const value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_name}.x = ${value_x};\n${value_name}.y = ${value_y};\n`;
  return code;
};

Blockly.JavaScript.set_size = function (block) {
  const value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  const value_w = Blockly.JavaScript.valueToCode(block, 'w', Blockly.JavaScript.ORDER_ATOMIC);
  const value_h = Blockly.JavaScript.valueToCode(block, 'h', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_name}.setDisplaySize(${value_w}, ${value_h});\n`;
  return code;
};

// physics
Blockly.JavaScript.world_bounce = function (block) {
  const value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  const checkbox_name = block.getFieldValue('NAME') == 'TRUE';
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_name}.body.setCollideWorldBounds(${checkbox_name});\n`;
  return code;
};

Blockly.JavaScript.set_bounce = function (block) {
  const value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  const value_bounce_speed = Blockly.JavaScript.valueToCode(
    block,
    'bounce_speed',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_name}.body.setBounce(${value_bounce_speed});\n`;
  return code;
};

Blockly.JavaScript.set_velocity = function (block) {
  const value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  const value_vx = Blockly.JavaScript.valueToCode(block, 'vx', Blockly.JavaScript.ORDER_ATOMIC);
  const value_vy = Blockly.JavaScript.valueToCode(block, 'vy', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_name}.body.setVelocity(${value_vx}, ${value_vy});\n`;
  return code;
};

Blockly.JavaScript.add_collider = function (block) {
  const value_obj_1 = Blockly.JavaScript.valueToCode(
    block,
    'obj_1',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const value_obj_2 = Blockly.JavaScript.valueToCode(
    block,
    'obj_2',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  // TODO: Assemble JavaScript into code variable.
  const code = `this.physics.add.collider(${value_obj_1}, ${value_obj_2});\n`;
  return code;
};
