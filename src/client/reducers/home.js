const initState = {
  selectedFile: null,
  gameObjects: [],
  scenes: [],
  gameState: 'STOP',
  slectedGameobjectIndex: '',
  slectedSceneIndex: '',
};

const gameReducer = (state = initState, action) => {
  console.log('Action:', action);
  switch (action.type) {
    case 'SELECT_FILE':
      return { ...state, selectedFile: action.selectedFile };
    case 'BUILD_GAME':
      return { ...state, gameState: 'BUILD', gameObjects: action.gameObjects };
    case 'ADD_OBJECT': {
      const gameObjects = [...state.gameObjects, action.gameObject];
      return { ...state, gameObjects };
    }
    case 'ADD_SCENE': {
      const scenes = [...state.scenes, action.scene];
      return { ...state, scenes };
    }
    case 'SET_INDEX': {
      return { ...state, slectedGameobjectIndex: action.index, slectedSceneIndex: '' };
    }
    case 'SET_SCENE_INDEX': {
      return { ...state, slectedSceneIndex: action.index, slectedGameobjectIndex: '' };
    }
    case 'UPDATE_WORKSPACE': {
      return { ...state, gameObjects: action.gameObjects };
    }
    case 'UPDATE_SCENE_WORKSPACE': {
      return { ...state, scenes: action.scenes };
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
