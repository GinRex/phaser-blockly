export const SELECT_FILE = 'SELECT_FILE';
export const BUILD_GAME = 'BUILD_GAME';

const initState = {
  selectedFile: null,
  gameObjects: [],
  gameState: 'STOP',
};

export const gameReducer = (state = initState, action) => {
  console.log('Action:', action);
  switch (action.type) {
    case SELECT_FILE:
      return { ...state, selectedFile: action.selectedFile };
    case BUILD_GAME:
      return { ...state, gameState: 'BUILD', gameObjects: action.gameObjects };
    default:
      return state;
  }
};
