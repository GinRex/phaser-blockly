/*
Define the move_right function without js interpreter. 
*/
Blockly.JavaScript['move_right'] = function(block) {
  // get the shouldJump boolean for character to jump or not
  var shouldJump = Blockly.JavaScript.valueToCode(block, 'shouldJump', Blockly.JavaScript.ORDER_ATOMIC);
  // turn it to a boolean or the block doesn't work right
  x = Boolean(shouldJump);
  // call the function defined for the interpreter initInterpreterGoRight()
  var code = 'goRightBlock(' + x + ');\n'; // make sure to keep the \n or it will not work correctly
  return code;
};


function initInterpreterGoRight(interpreter, scope) {
  // Ensure function name does not conflict with variable names.

  // uses to time outs, terminates the upward motion before termination moving right
  Blockly.JavaScript.addReservedWords('goRightBlock');
  var wrapper = interpreter.createAsyncFunction(
    function(x, callback) {
      goToTheRight = true;
      goJump = x;
      if (goJump == true){
        setTimeout(function(){ 
          goJump = false;  // kill the upward motion first
          setTimeout(function(){ 
            // next stop moving to the right
            goToTheRight = false; 
            callback(); },  300);
        },  900);
      }
      else {
        setTimeout(function(){ goToTheRight = false; callback(); },  300);
      }

    });
  interpreter.setProperty(scope, 'goRightBlock', wrapper);
}

Blockly.JavaScript['move_left'] = function(block) {
  // get the shouldJump boolean for character to jump or not
  var shouldJump = Blockly.JavaScript.valueToCode(block, 'shouldJump', Blockly.JavaScript.ORDER_ATOMIC);
  // turn it to a boolean or the block doesn't work right
  x = Boolean(shouldJump);
  // call the function defined for the interpreter initInterpreterGoRight()
  var code = 'goLeftBlock(' + x + ');\n'; // make sure to keep the \n or it will not work correctly
  return code;
};


function initInterpreterGoLeft(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  // uses to time outs, terminates the upward motion before termination moving right
  Blockly.JavaScript.addReservedWords('goLeftBlock');
  var wrapper = interpreter.createAsyncFunction(
    function(x, callback) {
      goToTheLeft = true;
      goJump = x;
      if (goJump == true){
        setTimeout(function(){ 
          goJump = false;  // kill the upward motion first
          setTimeout(function(){ 
            // next stop moving to the left
            goToTheLeft = false; 
            callback(); },  300);
        },  900);
      }
      else {
        setTimeout(function(){ goToTheLeft = false; callback(); },  300);
      }

    });
  interpreter.setProperty(scope, 'goLeftBlock', wrapper);
}


/* function does not do anything, but blockly complained without it. */
Blockly.JavaScript['jump'] = function(block) {
  var code = true;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['display_text'] = function(block) {
  //var seconds = Number(block.getFieldValue('SECONDS'));
  var string = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  string = string ? string.toString() : '';
  x = String(string);
  var code = 'displayText(' + x + ');\n'; // defined as sync function
  return code;
};

function initInterpreterDisplayText(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  Blockly.JavaScript.addReservedWords('displayText');

  var wrapper = interpreter.createAsyncFunction(
    function(x, callback) {
      displayText.setText(x );
      setTimeout(callback,  10);
    });
  interpreter.setProperty(scope, 'displayText', wrapper);
}


function goRight() {
  player.setVelocityX(100);
  player.anims.play('right', true);

}

function goLeft() {
  player.setVelocityX(-100);
  player.anims.play('left', true);
}

/* added this function for easy testing */
function myClick(el) {
  player.animations.add('run');
  player.animations.play('run', 15, true);

}