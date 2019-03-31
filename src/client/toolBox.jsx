export default [
  {
    name: 'Motion',
    colour: 150,
    blocks: [
      { type: 'motion_foward' },
      { type: 'motion_turn_right' },
      { type: 'motion_turn_left' },
      { type: 'motion_point_in_direction' },
      { type: 'motion_point_in_direction_of_target' },
      { type: 'motion_point_in_direction_of_point' },
      { type: 'motion_set_x_to' },
      { type: 'motion_set_y_to' }
    ]
  },
  {
    name: 'Event',
    colour: 250,
    blocks: [{ type: 'events_when_event_happens' }]
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
      // { type: 'sprites_set_current_sprite'},
      // { type: 'sprites_set_target_sprite'},
      { type: 'sprites_value_of_x' },
      { type: 'sprites_value_of_y' },
      { type: 'sprites_nested_for_each_clone_of_current_target_sprite' },
      { type: 'sprites_for_each_clone_of_current_sprite_new' },
      { type: 'sprites_next_frame' },
      { type: 'sprites_current_sprite_send_to_back' },
      { type: 'sprites_current_sprite_bring_to_front' },
      { type: 'sprites_set_current_sprite_to_target_sprite' },
      { type: 'sprites_current_frame_number' },
      { type: 'sprites_set_frame_to_frame_number' }
    ]
  }
]
