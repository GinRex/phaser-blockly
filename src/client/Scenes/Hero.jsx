import { foward, set_x_to, point_in_direction_degrees } from '../HandleMotion';
import store from '../store/configureStore';

export default class Hero extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.acceleration = 600;
    this.body.maxVelocity.x = 200;
    this.body.maxVelocity.y = 0;
    this.x = config.x;
    this.y = config.y;
    this.setDisplaySize(config.width, config.height);
    // set_x_to(this, 0)
    point_in_direction_degrees(this, -90);
    foward(this, 100);

    // if (store.default.getState().gameObjects.length !== 0) {
    //     console.log('abc')
    //     // console.log(store.default.getState())
    //     // var gameObjects = store.default.getState().gameObjects;
    //     // gameObjects.forEach(object => {
    //     //     eval(object.jsCode);
    //     // });

    //     // eval(store.default.getState().gameObjects[0].jsCode)
    // }
  }
}
