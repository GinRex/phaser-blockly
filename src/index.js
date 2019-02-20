import 'phaser';

var DemoA = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function DemoA ()
    {
        Phaser.Scene.call(this, { key: 'demoA', active: true });
    },

    preload: function ()
    {
        this.load.image('picA', 'assets/Hero.gif')
        this.load.image('picB', 'assets/ghost.png')
        // this.load.image('picB', 'https://img.fortunefrenzy.co.uk/wp-content/uploads/2013/11/Small_Mario_NSMBU.png');
    },

    create: function ()
    {
        var Hero = this.add.sprite(600, 400, 'picA').setDisplaySize(150, 150).setInteractive();
        var Ghost = this.add.sprite(300, 200, 'picB').setDisplaySize(150, 150).setInteractive();

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


    },

    tint () {
        alert('asdasd')
        console.log('asdasd')
    },
    
    clearTint () {
        this.clearTint();
    }

});


var config = {
    type: Phaser.WEBGL,
    width: 1200,
    height: 800,
    parent: 'phaser-example',
    scene: [ DemoA ]
};

var game = new Phaser.Game(config);
