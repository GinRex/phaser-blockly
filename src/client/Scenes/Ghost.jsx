import { foward, set_x_to, set_y_to, turn_right, turn_left, point_in_direction_degrees, point_sprite_in_direction_to_point, point_spriteA_in_direction_spriteB } from '../HandleMotion';
import { store } from '../store/configureStore';

export default class Ghost extends Phaser.GameObjects.Sprite {

    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.acceleration = 600;
        this.body.maxVelocity.x = 200;
        this.body.maxVelocity.y = 0;
        this.x = config.x;
        this.y = config.y;
        this.setDisplaySize(config.width, config.height)
         set_x_to(this, 50)
         set_y_to(this, 50)

        //  turn_right(this, 45)
        //  foward(this, 250)

        point_sprite_in_direction_to_point(this, 100, 200)
         
        
        if (store.getState().gameObjects.length !== 0) { 
            // console.log(store.getState())
            // var gameObjects = store.getState().gameObjects;
            // gameObjects.forEach(object => {
            //     eval(object.jsCode);
            // });
            
            // eval(store.getState().gameObjects[1].jsCode)
        }
    }


}