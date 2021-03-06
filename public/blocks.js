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

// variable

Blockly.Blocks.tile_sprite = {
  init() {
    this.appendValueInput('variable')
      .setCheck(null);
    this.appendDummyInput()
      .appendField('= tile sprite of')
      .appendField(new Blockly.FieldDropdown([['option', 'option'], ['option', 'option']], 'image_list'))
      .appendField('with x=');
    this.appendValueInput('x')
      .setCheck(null);
    this.appendDummyInput()
      .appendField('with y=');
    this.appendValueInput('y')
      .setCheck(null);
    this.appendDummyInput()
      .appendField('width =');
    this.appendValueInput('w')
      .setCheck(null);
    this.appendDummyInput()
      .appendField('height =');
    this.appendValueInput('h')
      .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.tile_sprite = function (block) {
  const value_variable = Blockly.JavaScript.valueToCode(block, 'variable', Blockly.JavaScript.ORDER_ATOMIC);
  const dropdown_image_list = block.getFieldValue('image_list');
  const value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  const value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  const value_w = Blockly.JavaScript.valueToCode(block, 'w', Blockly.JavaScript.ORDER_ATOMIC);
  const value_h = Blockly.JavaScript.valueToCode(block, 'h', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_variable} = this.add.tileSprite(${value_x}, ${value_y}, ${value_w}, ${value_h}, '${dropdown_image_list}');\n${value_variable}.depth = -1000;\n`;
  return code;
};

Blockly.Blocks.tile_info = {
  init() {
    this.appendValueInput('variable')
      .setCheck(null);
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['tilePositionX', 'tilePositionX'], ['tilePositionY', 'tilePositionY'], ['tileScaleX', 'tileScaleX'], ['tileScaleY', 'tileScaleY']]), 'type');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.tile_info = function (block) {
  const value_variable = Blockly.JavaScript.valueToCode(block, 'variable', Blockly.JavaScript.ORDER_ATOMIC);
  const dropdown_type = block.getFieldValue('type');
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_variable}.${dropdown_type}`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

// groups
// Blockly.Blocks.create_group = {
//   init() {
//     this.appendDummyInput()
//       .appendField('group of')
//       .appendField(new Blockly.FieldDropdown([['option', 'OPTIONNAME'], ['option', 'OPTIONNAME'], ['option', 'OPTIONNAME']]), 'class_list')
//       .appendField('with size =');
//     this.appendValueInput('size')
//       .setCheck(null);
//     this.setInputsInline(true);
//     this.setOutput(true, null);
//     this.setColour(230);
//     this.setTooltip('');
//     this.setHelpUrl('');
//   },
// };

Blockly.Blocks.remove_child = {
  init() {
    this.appendValueInput('child')
      .setCheck(null)
      .appendField('remove');
    this.appendValueInput('group')
      .setCheck(null)
      .appendField('from');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.remove_child = function (block) {
  const value_child = Blockly.JavaScript.valueToCode(block, 'child', Blockly.JavaScript.ORDER_ATOMIC);
  const value_group = Blockly.JavaScript.valueToCode(block, 'group', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_group}.remove(${value_child});\n`;
  return code;
};

Blockly.Blocks.group_length = {
  init() {
    this.appendValueInput('group')
      .setCheck(null)
      .appendField('get length of');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.group_length = function (block) {
  const value_group = Blockly.JavaScript.valueToCode(block, 'group', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_group}.getLength()`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

// Blockly.Blocks.add_child = {
//   init() {
//     this.appendValueInput('parent')
//       .setCheck(null)
//       .appendField('add child to');
//     this.appendDummyInput()
//       .appendField('with Class =')
//       .appendField(new Blockly.FieldDropdown([['option', 'OPTIONNAME'], ['option', 'OPTIONNAME'], ['option', 'OPTIONNAME']]), 'type');
//     this.appendValueInput('x')
//       .setCheck(null)
//       .appendField('x =');
//     this.appendValueInput('y')
//       .setCheck(null)
//       .appendField('y =');
//     this.appendValueInput('w')
//       .setCheck(null)
//       .appendField('width =');
//     this.appendValueInput('h')
//       .setCheck(null)
//       .appendField('height =');
//     this.appendValueInput('order')
//       .setCheck(null)
//       .appendField('order =');
//     this.setInputsInline(true);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(230);
//     this.setTooltip('');
//     this.setHelpUrl('');
//   },
// };

Blockly.Blocks.create_group = {
  init() {
    this.appendDummyInput()
      .appendField('create group');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.create_group = function (block) {
  // TODO: Assemble JavaScript into code variable.
  const code = 'this.add.group({runChildUpdate: true, allowGravity: false})';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


// object
Blockly.Blocks.get_object_info = {
  init() {
    this.appendValueInput('object')
      .setCheck(null)
      .appendField('get')
      .appendField(new Blockly.FieldDropdown([['x', 'x'], ['y', 'y']]), 'att')
      .appendField('from');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.get_object_info = function (block) {
  const dropdown_att = block.getFieldValue('att');
  const value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_object}.${dropdown_att}`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks.set_object = {
  init() {
    this.appendValueInput('variable')
      .setCheck(null)
      .appendField('set');
    this.appendDummyInput()
      .appendField('=');
    this.appendValueInput('var_value')
      .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.set_object = function (block) {
  const value_variable = Blockly.JavaScript.valueToCode(block, 'variable', Blockly.JavaScript.ORDER_ATOMIC);
  const value_var_value = Blockly.JavaScript.valueToCode(block, 'var_value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_variable} = ${value_var_value};\n`;
  return code;
};

Blockly.JavaScript.variables = function (block) {
  const dropdown_variable_list = block.getFieldValue('variable_list');
  const code = `this.${dropdown_variable_list}`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.set_var = function (block) {
  const dropdown_var_list = block.getFieldValue('var_list');
  const value_var_value = Blockly.JavaScript.valueToCode(block, 'var_value', Blockly.JavaScript.ORDER_ATOMIC); // TODO: Assemble JavaScript into code variable.
  const code = `this.${dropdown_var_list} = ${value_var_value};\n`;
  return code;
};

Blockly.JavaScript.value_from_scene = function (block) {
  const text_variable_name = block.getFieldValue('variable_name');
  // TODO: Assemble JavaScript into code variable.
  const code = `scene.${text_variable_name}`;
  return code;
};

Blockly.Blocks.value_from_class = {
  init() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('variable_name'), 'NAME')
      .appendField('from object');
    this.appendValueInput('NAME').setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.value_from_class = function (block) {
  const text_name = block.getFieldValue('NAME');
  const value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_name}.${text_name}`;
  return code;
};

Blockly.Blocks.value_from_scene = {
  init() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('variable_name'), 'variable_name')
      .appendField('from scene');
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

// Function

Blockly.Blocks.add_function = {
  init() {
    this.appendDummyInput()
      .appendField('function')
      .appendField(new Blockly.FieldTextInput('function name'), 'function_name');
    this.appendStatementInput('func_code')
      .setCheck(null);
    this.setInputsInline(false);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
  getFuncDef() {
    return this.getFieldValue('function_name');
  },
};

Blockly.JavaScript.add_function = function (block) {
  const text_function_name = block.getFieldValue('function_name');
  const statements_func_code = Blockly.JavaScript.statementToCode(block, 'func_code');
  // TODO: Assemble JavaScript into code variable.
  const code = `${text_function_name} = () => {\n${statements_func_code}\n}\n`;
  return code;
};

// Blockly.Blocks.call_function = {
//   init() {
//     this.appendDummyInput()
//       .appendField('function_name');
//     this.setInputsInline(true);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(230);
//     this.setTooltip('');
//     this.setHelpUrl('');
//   },
// };


// Blockly.JavaScript.call_function = function (block) {
//   // TODO: Assemble JavaScript into code variable.
//   const text_function_name = block.getFieldValue('function_name');
//   const code = `this.${text_function_name}();\n`;
//   return code;
// };

Blockly.Blocks.call_function_from_scene = {
  init() {
    this.appendDummyInput()
      .appendField('call')
      .appendField(new Blockly.FieldTextInput('function name'), 'func_name')
      .appendField('from scene');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.call_function_from_scene = function (block) {
  const text_func_name = block.getFieldValue('func_name');
  // TODO: Assemble JavaScript into code variable.
  const code = `scene.${text_func_name}();\n`;
  return code;
};

// Text
Blockly.Blocks.add_label = {
  init() {
    this.appendValueInput('NAME')
      .setCheck(null)
      .appendField('add');
    this.appendValueInput('text')
      .setCheck(null)
      .appendField('=');
    this.appendValueInput('x')
      .setCheck(null)
      .appendField('at  x =');
    this.appendValueInput('y')
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


Blockly.JavaScript.add_label = function (block) {
  const value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  const value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
  const value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  const value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_name} = this.add.text(${value_x}, ${value_y}, ${value_text});\n`;
  return code;
};

Blockly.Blocks.label = {
  init() {
    this.appendValueInput('object').setCheck(null);
    this.appendDummyInput().appendField('set text to');
    this.appendValueInput('text').setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.label = function (block) {
  const value_object = Blockly.JavaScript.valueToCode(
    block,
    'object',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_object}.setText(${value_text});\n`;
  return code;
};

Blockly.Blocks.set_font_size = {
  init() {
    this.appendValueInput('label_name')
      .setCheck(null)
      .appendField('set font size')
      .appendField(new Blockly.FieldTextInput('40'), 'font_size')
      .appendField('for');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};


// Blockly.Blocks.add_child = {
//   init() {
//     this.appendValueInput('group_name')
//       .setCheck(null)
//       .appendField('add child to group');
//     this.appendValueInput('object')
//       .setCheck(null)
//       .appendField('child');
//     // this.appendValueInput('y')
//     //   .setCheck(null)
//     //   .appendField('y =');
//     // this.appendDummyInput()
//     //   .appendField('image =')
//     //   .appendField(new Blockly.FieldTextInput('Class name'), 'key');
//     this.setInputsInline(true);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(230);
//     this.setTooltip('');
//     this.setHelpUrl('');
//   },
// };

// Blockly.JavaScript.add_child = function (block) {
//   const value_group_name = Blockly.JavaScript.valueToCode(
//     block,
//     'group_name',
//     Blockly.JavaScript.ORDER_ATOMIC,
//   );
//   const value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
//   const value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
//   const text_key = block.getFieldValue('key');
//   // TODO: Assemble JavaScript into code variable.
//   const code = `${value_group_name}.create(${value_x}, ${value_y}, '${text_key}');\n`;
//   return code;
// };

Blockly.Blocks.add_child = {
  init() {
    this.appendValueInput('child')
      .setCheck(null)
      .appendField('add');
    this.appendValueInput('parent')
      .setCheck(null)
      .appendField('to');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.add_child = function (block) {
  const value_child = Blockly.JavaScript.valueToCode(block, 'child', Blockly.JavaScript.ORDER_ATOMIC);
  const value_parent = Blockly.JavaScript.valueToCode(block, 'parent', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_parent}.add(${value_child});\n`;
  return code;
};

Blockly.JavaScript.set_font_size = function (block) {
  const text_font_size = block.getFieldValue('font_size');
  const value_label_name = Blockly.JavaScript.valueToCode(
    block,
    'label_name',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_label_name}.setFontSize(${text_font_size});\n`;
  return code;
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

// Blockly.Blocks.add_collider = {
//   init() {
//     this.appendDummyInput().appendField('add collider of');
//     this.appendValueInput('obj_1').setCheck(null);
//     this.appendValueInput('obj_2')
//       .setCheck(null)
//       .appendField('and');
//     this.setInputsInline(true);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(230);
//     this.setTooltip('');
//     this.setHelpUrl('');
//   },
// };

Blockly.Blocks.add_collider = {
  init() {
    this.appendValueInput('object_collider')
      .setCheck(null);
    this.appendDummyInput()
      .appendField('add collider of');
    this.appendValueInput('obj_1')
      .setCheck(null);
    this.appendValueInput('obj_2')
      .setCheck(null)
      .appendField('and');
    this.appendStatementInput('callback')
      .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.add_collider = function (block) {
  const value_object_collider = Blockly.JavaScript.valueToCode(block, 'object_collider', Blockly.JavaScript.ORDER_ATOMIC);
  const value_obj_1 = Blockly.JavaScript.valueToCode(block, 'obj_1', Blockly.JavaScript.ORDER_ATOMIC);
  const value_obj_2 = Blockly.JavaScript.valueToCode(block, 'obj_2', Blockly.JavaScript.ORDER_ATOMIC);
  const statements_callback = Blockly.JavaScript.statementToCode(block, 'callback');

  const callback = statements_callback.slice(0, statements_callback.indexOf('('));
  // TODO: Assemble JavaScript into code variable.
  const code = statements_callback !== '' ? `${value_object_collider} = this.physics.add.collider(${value_obj_1}, ${value_obj_2}, ${callback});\n` :
    `${value_object_collider} = this.physics.add.collider(${value_obj_1}, ${value_obj_2});\n`;
  return code;
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

// /////////

Blockly.Blocks.world_bounce_this = {
  init() {
    this.appendDummyInput().appendField('set world bounce');
    this.appendDummyInput().appendField(new Blockly.FieldCheckbox('TRUE'), 'NAME');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks.set_bounce_this = {
  init() {
    this.appendDummyInput().appendField('set bounce speed');
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

Blockly.Blocks.set_velocity_this = {
  init() {
    this.appendDummyInput().appendField('set velocity');
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

Blockly.Blocks.add_collider_this = {
  init() {
    this.appendValueInput('object_collider')
      .setCheck(null);
    this.appendDummyInput().appendField('add collider');
    this.appendValueInput('obj_2')
      .setCheck(null)
      .appendField('with');
    this.appendStatementInput('callback')
      .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
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

// Blockly.JavaScript.game_state = function (block) {
//   const statements_event_code = Blockly.JavaScript.statementToCode(block, 'GAME_CODE');
//   const dropdown_event = block.getFieldValue('GAME_STATE');
//   const value_event_name = Blockly.JavaScript.valueToCode(
//     block,
//     'STATE_NAME',
//     Blockly.JavaScript.ORDER_ATOMIC,
//   );
//   if (dropdown_event == 'NO_EVENT_SELECTED') {
//     return "//error, you did not select an STATE in the 'when game state' block\n";
//   }
//   if (dropdown_event == 'create') {
//     const code = `\n${statements_event_code}\n}`;
//     return code;
//   }
//   const code = `${dropdown_event}(){\n${statements_event_code}\n}`;
//   return code;
// };

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

// Blockly.JavaScript.add_collider = function (block) {
//   const value_obj_1 = Blockly.JavaScript.valueToCode(
//     block,
//     'obj_1',
//     Blockly.JavaScript.ORDER_ATOMIC,
//   );
//   const value_obj_2 = Blockly.JavaScript.valueToCode(
//     block,
//     'obj_2',
//     Blockly.JavaScript.ORDER_ATOMIC,
//   );
//   // TODO: Assemble JavaScript into code variable.
//   const code = `this.physics.add.collider(${value_obj_1}, ${value_obj_2});\n`;
//   return code;
// };

// ///

Blockly.JavaScript.world_bounce_this = function (block) {
  const checkbox_name = block.getFieldValue('NAME') == 'TRUE';
  // TODO: Assemble JavaScript into code variable.
  const code = `this.body.setCollideWorldBounds(${checkbox_name});\n`;
  return code;
};

Blockly.JavaScript.set_bounce_this = function (block) {
  const value_bounce_speed = Blockly.JavaScript.valueToCode(
    block,
    'bounce_speed',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  // TODO: Assemble JavaScript into code variable.
  const code = `this.body.setBounce(${value_bounce_speed});\n`;
  return code;
};

Blockly.JavaScript.set_velocity_this = function (block) {
  const value_vx = Blockly.JavaScript.valueToCode(block, 'vx', Blockly.JavaScript.ORDER_ATOMIC);
  const value_vy = Blockly.JavaScript.valueToCode(block, 'vy', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `this.body.setVelocity(${value_vx}, ${value_vy});\n`;
  return code;
};

Blockly.JavaScript.add_collider_this = function (block) {
  const value_object_collider = Blockly.JavaScript.valueToCode(block, 'object_collider', Blockly.JavaScript.ORDER_ATOMIC);

  const value_obj_2 = Blockly.JavaScript.valueToCode(
    block,
    'obj_2',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const statements_callback = Blockly.JavaScript.statementToCode(block, 'callback');

  const callback = statements_callback.slice(0, statements_callback.indexOf('('));
  // TODO: Assemble JavaScript into code variable.
  const code = statements_callback !== '' ? `${value_object_collider} = this.scene.physics.add.collider(this, ${value_obj_2}, ${callback});\n` :
    `${value_object_collider} = this.scene.physics.add.collider(this, ${value_obj_2});\n`;
  // TODO: Assemble JavaScript into code variable.
  // const code = `this.scene.physics.add.collider(this, ${value_obj_2});\n`;
  return code;
};


// math
Blockly.Blocks.random_between = {
  init() {
    this.appendValueInput('min')
      .setCheck(null)
      .appendField('random from');
    this.appendValueInput('max')
      .setCheck(null)
      .appendField('to');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.random_between = function (block) {
  const value_min = Blockly.JavaScript.valueToCode(block, 'min', Blockly.JavaScript.ORDER_ATOMIC);
  const value_max = Blockly.JavaScript.valueToCode(block, 'max', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `Math.random() * (${value_max} - ${value_min}) + ${value_min}`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks.self = {
  init() {
    this.appendDummyInput()
      .appendField('self');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.self = function (block) {
  // TODO: Assemble JavaScript into code variable.
  const code = 'this';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks.key_condition = {
  init() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([...Array(26)].map((val, i) => {
        const keyCode = String.fromCharCode(i + 65);
        return [keyCode, keyCode];
      })
        .concat([...Array(10)].map(((val, i) => [i.toString(), i.toString()]))
          .concat([
            ['BACKSPACE', 'BACKSPACE'],
            ['ENTER', 'ENTER'],
            ['SPACE', 'SPACE'],
            ['LEFT', 'LEFT'],
            ['UP', 'UP'],
            ['RIGHT', 'RIGHT'],
            ['DOWN', 'DOWN']]))), 'key')
      .appendField(new Blockly.FieldDropdown([['is down', 'isDown'], ['is up', 'isUp']]), 'type');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.key_condition = function (block) {
  const dropdown_key = block.getFieldValue('key');
  const dropdown_type = block.getFieldValue('type');
  // TODO: Assemble JavaScript into code variable.
  const code = `key(this.scene.input.keyboard, '${dropdown_key}').${dropdown_type}`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks.text_color = {
  init() {
    this.appendValueInput('val')
      .setCheck(null)
      .appendField('set');
    this.appendValueInput('color')
      .setCheck(null)
      .appendField('color')
      .appendField('=');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.text_color = function (block) {
  const value_val = Blockly.JavaScript.valueToCode(block, 'val', Blockly.JavaScript.ORDER_ATOMIC);
  const value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_val}.setColor(${value_color});\n`;
  return code;
};

Blockly.Blocks.on_mouse_down = {
  init() {
    this.appendDummyInput()
      .appendField('on mouse down');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.on_mouse_down = function (block) {
  // TODO: Assemble JavaScript into code variable.
  const code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks.text_wrap = {
  init() {
    this.appendValueInput('val')
      .setCheck(null)
      .appendField('set');
    this.appendValueInput('width')
      .setCheck(null)
      .appendField('wrap width')
      .appendField('=');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.text_wrap = function (block) {
  const value_val = Blockly.JavaScript.valueToCode(block, 'val', Blockly.JavaScript.ORDER_ATOMIC);
  const value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_val}.setStyle({wordWrap: { width: ${value_width} }});\n`;
  return code;
};

Blockly.Blocks.variables = {
  init() {
    this.appendDummyInput()
      // .appendField(new Blockly.FieldDropdown(vars.map(variable => [variable, variable])), 'variable_list');
      .appendField(new Blockly.FieldTextInput(''), 'variable_list');
    this.setInputsInline(true);
    this.setEditable(false);
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};
Blockly.Blocks.variables_from = {
  init() {
    this.appendValueInput('object_name')
      .setCheck(null);
    this.appendDummyInput()
      // .appendField(new Blockly.FieldDropdown(classVariables ? classVariables.map(variable => [variable, variable]) : []), 'variable_list');
      .appendField(new Blockly.FieldTextInput(''), 'variable_list');
    this.setInputsInline(true);
    this.setEditable(false);
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};
Blockly.Blocks.set_var = {
  init() {
    this.appendDummyInput()
      .appendField('set')
      // .appendField(new Blockly.FieldDropdown(vars.map(variable => [variable, variable])), 'var_list')
      .appendField(new Blockly.FieldTextInput(''), 'var_list')
      .appendField('=');
    this.appendValueInput('var_value')
      .setCheck(null);
    this.setInputsInline(true);
    this.setEditable(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
  },
};
Blockly.Blocks.set_var_from = {
  init() {
    this.appendValueInput('object_name')
      .setCheck(null);
    this.appendDummyInput()
      .appendField('set')
      // .appendField(new Blockly.FieldDropdown(vars.map(variable => [variable, variable])), 'var_list')
      .appendField(new Blockly.FieldTextInput(''), 'var_list')
      .appendField('=');
    this.appendValueInput('var_value')
      .setCheck(null);
    this.setInputsInline(true);
    this.setEditable(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
  },
};

Blockly.JavaScript.variables_from = function (block) {
  const value_object_name = Blockly.JavaScript.valueToCode(block, 'object_name', Blockly.JavaScript.ORDER_ATOMIC);
  const dropdown_variable_list = block.getFieldValue('variable_list');
  const code = `${value_object_name}.${dropdown_variable_list}`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.set_var_from = function (block) {
  const object_name = Blockly.JavaScript.valueToCode(block, 'object_name', Blockly.JavaScript.ORDER_ATOMIC);
  const dropdown_var_list = block.getFieldValue('var_list');
  const value_var_value = Blockly.JavaScript.valueToCode(block, 'var_value', Blockly.JavaScript.ORDER_ATOMIC);

  const code = `${object_name}.${dropdown_var_list} = ${value_var_value};\n`;

  return code;
};

Blockly.Blocks.call_function = {
  init() {
    this.appendDummyInput()
      .appendField('call')
      // .appendField(new Blockly.FieldDropdown(functs.map(func => [func, func])), 'function_list');
      .appendField(new Blockly.FieldTextInput(''), 'function_list');
    this.setInputsInline(true);
    this.setEditable(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};
Blockly.JavaScript.call_function = function (block) {
  const dropdown_function_list = block.getFieldValue('function_list');
  // TODO: Assemble JavaScript into code variable.
  const code = `this.${dropdown_function_list}();\n`;
  return code;
};
Blockly.Blocks.call_scene_function = {
  init() {
    this.appendDummyInput()
      .appendField('call')
      // .appendField(new Blockly.FieldDropdown(functs.map(func => [func, func])), 'function_list');
      .appendField(new Blockly.FieldTextInput(''), 'function_list');
    this.setInputsInline(true);
    this.setEditable(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};
Blockly.JavaScript.call_scene_function = function (block) {
  const dropdown_function_list = block.getFieldValue('function_list');
  // TODO: Assemble JavaScript into code variable.
  const code = `this.scene.${dropdown_function_list}();\n`;
  return code;
};
Blockly.Blocks.call_function_from = {
  init() {
    this.appendValueInput('object_name')
      .setCheck(null);
    this.appendDummyInput()
      .appendField('call')
      // .appendField(new Blockly.FieldDropdown(functs.map(func => [func, func])), 'function_list');
      .appendField(new Blockly.FieldTextInput(''), 'function_list');
    this.setInputsInline(true);
    this.setEditable(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};
Blockly.JavaScript.call_function_from = function (block) {
  const value_object_name = Blockly.JavaScript.valueToCode(block, 'object_name', Blockly.JavaScript.ORDER_ATOMIC);
  const dropdown_function_list = block.getFieldValue('function_list');
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_object_name}.${dropdown_function_list}();\n`;
  return code;
};

Blockly.Blocks.audio = {
  init() {
    this.appendValueInput('object_name')
      .setCheck(null);
    this.appendDummyInput()
      .appendField(' = init sound')
      .appendField(new Blockly.FieldTextInput('default'), 'song_name')
      .appendField('loop')
      .appendField(new Blockly.FieldCheckbox('TRUE'), 'loop');
    this.setPreviousStatement(true, null);
    // this.setEditable(false);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.audio = function (block) {
  const value_name = Blockly.JavaScript.valueToCode(block, 'object_name', Blockly.JavaScript.ORDER_ATOMIC);
  const text_name = block.getFieldValue('song_name');
  const checkbox_loop = block.getFieldValue('loop') == 'TRUE';
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_name} = this.sound.add('${text_name}', { loop: ${checkbox_loop}});\n`;
  return code;
};


Blockly.Blocks.play_audio = {
  init() {
    this.appendValueInput('NAME')
      .setCheck(null)
      .appendField('play');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.play_audio = function (block) {
  const value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_name}.play();\n`;
  return code;
};

Blockly.Blocks.pause_audio = {
  init() {
    this.appendValueInput('NAME')
      .setCheck(null)
      .appendField('pause');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.pause_audio = function (block) {
  const value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_name}.pause();\n`;
  return code;
};

Blockly.Blocks.resume_audio = {
  init() {
    this.appendValueInput('NAME')
      .setCheck(null)
      .appendField('resume');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.resume_audio = function (block) {
  const value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_name}.resume();\n`;
  return code;
};

Blockly.Blocks.stop_audio = {
  init() {
    this.appendValueInput('NAME')
      .setCheck(null)
      .appendField('stop');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.stop_audio = function (block) {
  const value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_name}.stop();\n`;
  return code;
};


Blockly.Blocks.play_animation = {
  init() {
    this.appendValueInput('object_name').setCheck(null);
    this.appendDummyInput()
      .appendField('play')
      // .appendField(
      //   new Blockly.FieldDropdown(gameObject.animations.map(animation => [animation.name, animation.name])),
      //   'animation',
      // );
      .appendField(new Blockly.FieldTextInput(''), 'animation');
    this.setEditable(false);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};
Blockly.JavaScript.play_animation = function (block) {
  const value_object_name = Blockly.JavaScript.valueToCode(
    block,
    'object_name',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const dropdown_animation = block.getFieldValue('animation');
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_object_name}.play('${dropdown_animation}');\n`;
  return code;
};

Blockly.Blocks.set_physic_size = {
  init() {
    this.appendValueInput('object_name')
      .setCheck(null)
      .appendField('set physics size');
    this.appendValueInput('width')
      .setCheck(null)
      .appendField('width');
    this.appendValueInput('height')
      .setCheck(null)
      .appendField('height');
    this.appendDummyInput()
      .appendField('center')
      .appendField(new Blockly.FieldCheckbox('TRUE'), 'center');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(30);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.set_physic_size = function (block) {
  const value_object_name = Blockly.JavaScript.valueToCode(block, 'object_name', Blockly.JavaScript.ORDER_ATOMIC);
  const value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
  const value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
  const checkbox_center = block.getFieldValue('center') == 'TRUE';
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_object_name}.body.setSize(${value_width}, ${value_height}, ${checkbox_center});\n`;
  return code;
};

Blockly.Blocks.update_static_size = {
  init() {
    this.appendValueInput('object_name')
      .setCheck(null)
      .appendField('update static size');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(130);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.update_static_size = function (block) {
  const value_object_name = Blockly.JavaScript.valueToCode(block, 'object_name', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_object_name}.body.updateFromGameObject();\n`;
  return code;
};

Blockly.Blocks.enable_phyisic = {
  init() {
    this.appendValueInput('object_name')
      .setCheck(null)
      .appendField('enable physics for');
    this.appendDummyInput()
      .appendField('static')
      .appendField(new Blockly.FieldCheckbox('FALSE'), 'static');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.enable_phyisic = function (block) {
  const value_object_name = Blockly.JavaScript.valueToCode(block, 'object_name', Blockly.JavaScript.ORDER_ATOMIC);
  const checkbox_static = block.getFieldValue('static') == 'TRUE' ? 1 : 0;
  // TODO: Assemble JavaScript into code variable.
  const code = `this.scene.physics.world.enable(${value_object_name}, ${checkbox_static});\n`;
  return code;
};

Blockly.Blocks.set_gravity = {
  init() {
    this.appendValueInput('object_name')
      .setCheck(null)
      .appendField('set gravity');
    this.appendValueInput('gravity')
      .setCheck(null)
      .appendField('to');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.set_gravity = function (block) {
  const value_object_name = Blockly.JavaScript.valueToCode(block, 'object_name', Blockly.JavaScript.ORDER_ATOMIC);
  const value_gravity = Blockly.JavaScript.valueToCode(block, 'gravity', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_object_name}.body.setGravityY(${value_gravity});\n`;
  return code;
};

Blockly.Blocks.pause_scene = {
  init() {
    this.appendDummyInput()
      .appendField('pause scene');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.pause_scene = function (block) {
  // TODO: Assemble JavaScript into code variable.
  const code = 'this.scene.pause();\n';
  return code;
};

Blockly.Blocks.resume_scene = {
  init() {
    this.appendDummyInput()
      .appendField('resume scene');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.resume_scene = function (block) {
  // TODO: Assemble JavaScript into code variable.
  const code = 'this.scene.resume();\n';
  return code;
};

Blockly.Blocks.restart_scene = {
  init() {
    this.appendDummyInput()
      .appendField('restart scene');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.restart_scene = function (block) {
  // TODO: Assemble JavaScript into code variable.
  const code = 'this.scene.restart();\n';
  return code;
};

Blockly.Blocks.set_depth = {
  init() {
    this.appendValueInput('object')
      .setCheck(null);
    this.appendValueInput('depth')
      .setCheck(null)
      .appendField('set depth');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.set_depth = function (block) {
  const value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  const value_depth = Blockly.JavaScript.valueToCode(block, 'depth', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_object}.setDepth(${value_depth});\n`;
  return code;
};

Blockly.Blocks.set_visible = {
  init() {
    this.appendValueInput('object')
      .setCheck(null);
    this.appendValueInput('visible')
      .setCheck(null)
      .appendField('set visible');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.set_visible = function (block) {
  const value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  const value_visible = Blockly.JavaScript.valueToCode(block, 'visible', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_object}.setVisible(${value_visible});\n`;
  return code;
};


Blockly.Blocks.set_font = {
  init() {
    this.appendValueInput('label_name')
      .setCheck(null)
      .appendField('set font ')
      .appendField(new Blockly.FieldTextInput('monospace'), 'font')
      .appendField('for');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.set_font = function (block) {
  const text_font = block.getFieldValue('font');
  const value_label_name = Blockly.JavaScript.valueToCode(block, 'label_name', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  const code = `${value_label_name}.setFontFamily('${text_font}');\n`;
  return code;
};

Blockly.Blocks['active_collider'] = {
  init: function () {
    this.appendValueInput("collider_name")
      .setCheck(null)
      .appendField("set active collider")
      .appendField(new Blockly.FieldCheckbox("TRUE"), "active");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['active_collider'] = function (block) {
  var checkbox_active = block.getFieldValue('active') == 'TRUE';
  var value_collider_name = Blockly.JavaScript.valueToCode(block, 'collider_name', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = `${value_collider_name}.active = ${checkbox_active};\n`;
  return code;
};

Blockly.Blocks['start_scene'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("start scene")
      .appendField(new Blockly.FieldTextInput("scene1"), "scene_name");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['start_scene'] = function (block) {
  var text_scene_name = block.getFieldValue('scene_name');
  // TODO: Assemble JavaScript into code variable.
  var code = `this.scene.start('${text_scene_name}');\n`;
  return code;
};
