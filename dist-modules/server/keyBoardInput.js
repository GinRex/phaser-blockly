import Phaser from 'phaser';

export default ((keyboard, key) => keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[key]));