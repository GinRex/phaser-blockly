export default [{
  name: 'Motion',
  colour: 150,
  blocks: [{ type: 'motion_foward' }, { type: 'motion_turn_right' }, { type: 'motion_turn_left' }, { type: 'motion_point_in_direction' }, { type: 'motion_point_in_direction_of_target' }, { type: 'motion_point_in_direction_of_point' }, { type: 'motion_set_x_to' }, { type: 'motion_set_y_to' }]
}, {
  name: 'Event',
  colour: 250,
  blocks: [{ type: 'key_condition' }]
}, {
  name: 'Game',
  colour: 50,
  blocks: [{ type: 'game_state' }, { type: 'screen_width' }, { type: 'screen_height' }]
}, {
  name: 'Tile',
  colour: 150,
  blocks: [{ type: 'tile_sprite' }, { type: 'tile_info' }, { type: 'set_object' }]
},
// {
//   name: 'Sprites',
//   colour: 250,
//   blocks: [
//     { type: 'sprites_create_clone_of_current_sprite' },
//     { type: 'sprites_destroy_current_sprite' },
//     { type: 'sprites_hide_current_sprite' },
//     { type: 'sprites_show_current_sprite' },
//     { type: 'sprites_for_each_clone_of_current_sprite' },
//     { type: 'sprites_is_colliding_with_target' },
//     // { type: 'sprites_set_current_sprite'},
//     // { type: 'sprites_set_target_sprite'},
//     { type: 'sprites_value_of_x' },
//     { type: 'sprites_value_of_y' },
//     { type: 'sprites_nested_for_each_clone_of_current_target_sprite' },
//     { type: 'sprites_for_each_clone_of_current_sprite_new' },
//     { type: 'sprites_next_frame' },
//     { type: 'sprites_current_sprite_send_to_back' },
//     { type: 'sprites_current_sprite_bring_to_front' },
//     { type: 'sprites_set_current_sprite_to_target_sprite' },
//     { type: 'sprites_current_frame_number' },
//     { type: 'sprites_set_frame_to_frame_number' },
//   ],
// },
{
  name: 'Variable',
  colour: 250,
  custom: 'CUSTOM_VARIABLE',
  blocks: [{ type: 'variables' }, { type: 'set_var' }, { type: 'value_from_scene' }, { type: 'value_from_class' }]
}, {
  name: 'Function',
  colour: 150,
  blocks: [{ type: 'add_function' }, { type: 'call_function_from_class' }, { type: 'call_function_from_scene' }]
}, {
  name: 'Text',
  colour: 250,
  blocks: [{ type: 'add_label' }, { type: 'label' }, { type: 'set_font_size' }]
}, {
  name: 'Group Object',
  colour: '100',
  blocks: [{ type: 'create_group' }, { type: 'add_child' }, { type: 'group_length' }, { type: 'random_between' }, { type: 'remove_child' }]
}, {
  name: 'Object',
  colour: 250,
  blocks: [{ type: 'set_pos' }, { type: 'set_size' }, { type: 'self' }, { type: 'get_object_info' }]
}, {
  name: 'Physic',
  colour: 50,
  blocks: [{ type: 'world_bounce' }, { type: 'set_bounce' }, { type: 'set_velocity' }, { type: 'add_collider' }, { type: 'world_bounce_this' }, { type: 'set_bounce_this' }, { type: 'set_velocity_this' }, { type: 'add_collider_this' }]
}, {
  name: 'Classes',
  colour: 50,
  categories: []
}];