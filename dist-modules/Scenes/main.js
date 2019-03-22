import 'phaser';
import { store } from '../store/configureStore';
import Hero from './Hero';
// import { connect } from "react-redux";

class MainScene extends Phaser.Scene {

    constructor(props) {
        super(props);

        this.restartGame = () => {
            console.log(store.default.getState());
            this.scene.restart();
        };

        store.subscribe(this.restartGame);
    }

    MainScene() {
        Phaser.Scene.call(this, { key: 'main', active: false });
    }

    preload() {
        this.load.image('hero', 'assets/Hero.gif');
        this.load.image('picB', 'assets/ghost.png');
    }

    create() {

        // if (store.default.getState().gameObjects.length !== 0) { 
        //     console.log('abc')
        //     // console.log(store.default.getState())
        //     var gameObjects = store.default.getState().gameObjects;
        //     gameObjects.forEach(object => {
        //         eval(object.jsCode);
        //     });

        // }

        this.Hero = new Hero({
            scene: this,
            key: 'hero',
            x: 400,
            y: 400,
            width: 100,
            height: 100
        });
        // this.Hero = this.add.sprite(400, 400, 'picA').setDisplaySize(100, 100).setInteractive();
        // this.Ghost = this.add.sprite(300, 200, 'picB').setDisplaySize(100, 100).setInteractive();


        // this.input.setDraggable(this.Hero);
        // this.input.setDraggable(this.Ghost);


        // this.input.on('dragstart', function (pointer, gameObject) {

        //     gameObject.setTint(0xff0000);

        // });

        // this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        //     gameObject.x = dragX;
        //     gameObject.y = dragY;

        // });

        // this.input.on('dragend', function (pointer, gameObject) {

        //     gameObject.clearTint();

        // });
    }

    update() {}

    //set time out
    // set theo event 

    tint() {
        alert('asdasd');
        console.log('asdasd');
    }

    clearTint() {
        this.clearTint();
    }

};

export default MainScene;