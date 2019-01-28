/* Generate blocks with https://blockly-demo.appspot.com/static/demos/blockfactory/index.html */

Blockly.Blocks['move_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("move right");
    this.appendValueInput("shouldJump")
        .setCheck("Boolean")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("jump?");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['move_left'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("move left");
      this.appendValueInput("shouldJump")
          .setCheck("Boolean")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("jump?");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };


Blockly.Blocks['jump'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("jump");
      this.setOutput(true, "Boolean");
      this.setColour(330);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };


  Blockly.Blocks['display_text'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("display text ");
      this.appendValueInput("NAME")
          .setCheck(null);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };