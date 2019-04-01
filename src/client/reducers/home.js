const initState = {
  selectedFile: null,
  gameObjects: [],
  gameState: 'STOP',
  slectedGameobjectIndex: '',
  // game: null,
};

const gameReducer = (state = initState, action) => {
  console.log('Action:', action);
  console.log('current state', state);
  switch (action.type) {
    case 'SELECT_FILE':
      return { ...state, selectedFile: action.selectedFile };
    case 'BUILD_GAME':
      return { ...state, gameState: 'BUILD', gameObjects: action.gameObjects };
    case 'ADD_OBJECT': {
      const gameObjects = [...state.gameObjects, action.gameObject];
      return { ...state, gameObjects };
    }
    case 'SET_INDEX': {
      return { ...state, slectedGameobjectIndex: action.index };
    }
    case 'UPDATE_WORKSPACE': {
      return { ...state, gameObjects: action.gameObjects };
    }
    case 'SET_GAME':
      return { ...state, game: action.game };
    case 'RESTART_GAME':
      state.game.scene.scenes[0].restartGame();
      return state;
    default:
      return state;
  }
};

export default gameReducer;
