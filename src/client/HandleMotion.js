function set_x_to(game_object, X) {
  game_object.x = X;
}

function set_y_to(game_object, Y) {
  game_object.y = Y;
}

function foward(game_object, distance) {
  let angle_radians = game_object.rotation;
  angle_radians *= -1;
  const newx = game_object.x + distance * Math.cos(angle_radians);
  const newy = game_object.y - distance * Math.sin(angle_radians);
  game_object.x = newx;
  game_object.y = newy;
}

function turn_right(game_object, degrees) {
  game_object.angle += degrees;
}

function turn_left(game_object, degrees) {
  game_object.angle -= degrees;
}

function point_in_direction_degrees(game_object, angle_degrees) {
  game_object.angle = -angle_degrees;
}
function point_sprite_in_direction_to_point(game_objectA, destination_x, destination_y) {
  game_objectA.angle = point_in_direction(
    game_objectA.x,
    game_objectA.y,
    destination_x,
    destination_y,
  );
}

function point_spriteA_in_direction_spriteB(game_objectA, game_objectB) {
  game_objectA.angle = point_in_direction(
    game_objectA.x,
    game_objectA.y,
    game_objectB.x,
    game_objectB.y,
  );
}

// //////////////////////////

function point_in_direction(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = -y2 + y1;
  return RadianstoDegrees(Math.atan2(dy, dx));
}

function RadianstoDegrees(angle) {
  return angle * (180 / Math.PI);
}

function DegreestoRadians(angle) {
  return angle * (Math.PI / 180);
}

export {
  foward,
  set_x_to,
  set_y_to,
  turn_right,
  turn_left,
  point_in_direction_degrees,
  point_sprite_in_direction_to_point,
  point_spriteA_in_direction_spriteB,
};
