function hide_current_sprite(game_object){
    //var game_object;
    //game_object=find_sprite_object_by_name(current_sprite_name);
    
    game_object.visible = false;
}

function show_current_sprite(game_object){
   // var game_object;
   // game_object=find_sprite_object_by_name(current_sprite_name);
    
    game_object.visible = true;
}	

export {
    hide_current_sprite, show_current_sprite, 
}