export class Game extends Phaser.Game {
  constructor(conf: GameConfig) {
    super(conf);
    console.log('asd');
  }
}

let game: Game;
export function createGame(config) {
  if (game) {
    game.destroy(true);
  }
  game = null;
  game = new Game(config);
  console.log(game);
}

export function getGame(): Game {
  return game;
}
