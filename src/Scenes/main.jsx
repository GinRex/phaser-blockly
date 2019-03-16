import 'phaser';
import { store } from '../store/configureStore';
// import { connect } from "react-redux";

class MainScene extends Phaser.Scene {
    
    constructor(props) {
        super(props)
        store.subscribe(this.restartGame)
    }

    restartGame = () => {
        console.log(store.getState());
        this.scene.restart();
    }


    MainScene() {
        Phaser.Scene.call(this, { key: 'main', active: false });
    }

    preload() {
        this.load.image('picA', 'assets/Hero.gif')
        this.load.image('picB', 'assets/ghost.png')
    }

    create() {

        if (store.getState().gameObjects.length !== 0) { 
            console.log('abc')
            // console.log(store.getState())
            var gameObjects = store.getState().gameObjects;
            gameObjects.forEach(object => {
                eval(object.jsCode);
            });
            
        }

        // store.subscribe(this.injectedCode)

        this.Hero = this.add.sprite(400, 400, 'picA').setDisplaySize(100, 100).setInteractive();
        this.Ghost = this.add.sprite(300, 200, 'picB').setDisplaySize(100, 100).setInteractive();

        // Hero.on('pointerdown', () => this.tint()).on('pointerup', () => this.clearTint());

        this.input.setDraggable(this.Hero);
        this.input.setDraggable(this.Ghost);


        this.input.on('dragstart', function (pointer, gameObject) {

            gameObject.setTint(0xff0000);
            // gameObject.width = 10;
            // gameObject.height/=2;

        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        });

        this.input.on('dragend', function (pointer, gameObject) {

            gameObject.clearTint();

        });

    }

    update() {
        
    }

    //set time out
    // set theo event 

    tint() {
        alert('asdasd')
        console.log('asdasd')
    }

    clearTint() {
        this.clearTint();
    }

};

export default MainScene

// const mapStateToProps = ({ showUi }) => ({
//     showUi
//   });

// export default connect(mapStateToProps(MainScene))