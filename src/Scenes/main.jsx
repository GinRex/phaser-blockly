import 'phaser';
import store from '../store';
// import { connect } from "react-redux";

class MainScene extends Phaser.Scene {
    constructor(props) {
        super(props)
    }

    MainScene() {
        Phaser.Scene.call(this, { key: 'main', active: false });
    }

    init(data) {
        console.log(store.getState())
    }

    preload() {
        this.load.image('picA', 'assets/Hero.gif')
        this.load.image('picB', 'assets/ghost.png')
    }



    create(data) {

        console.log(data.gameObjects)
        var Hero = this.add.sprite(400, 400, 'picA').setDisplaySize(100, 100).setInteractive();
        var Ghost = this.add.sprite(300, 200, 'picB').setDisplaySize(100, 100).setInteractive();

        // Hero.on('pointerdown', () => this.tint()).on('pointerup', () => this.clearTint());

        this.input.setDraggable(Hero);
        this.input.setDraggable(Ghost);


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