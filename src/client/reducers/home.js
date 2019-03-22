const initState = {
  selectedFile: null,
  gameObjects: [],
  gameState: 'STOP',
  slectedGameobjectIndex: '',
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
    case 'SET_INDEX': {
      return { ...state, slectedGameobjectIndex: action.index };
    }
    case 'UPDATE_WORKSPACE':
      return { ...state, gameObjects: action.gameObjects };
    default:
      return state;
  }
};

export default gameReducer;
