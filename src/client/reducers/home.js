import toolboxCategories from '../toolBox';

const initState = {
  selectedFile: null,
  gameObjects: [],
  scenes: [],
  gameState: 'STOP',
  slectedGameobjectIndex: '',
  slectedSceneIndex: '',
  toolboxCategories,
  spriteEditOpen: false,
  objectMenuOpen: false,
  animations: { example: [0, 0, 0, 0] },
  animInfo: {
    name: 'name',
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    n: 1,
  },
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
    case 'UPDATE_TOOL_BOX': {
      const toolboxCategories = state.toolboxCategories.map(category =>
        (category.name === 'Classes' ? { ...category, categories: action.category } : category));
      return { ...state, toolboxCategories };
    }
    case 'SET_GAME':
      return { ...state, game: action.game };
    case 'RESTART_GAME':
      state.game.scene.scenes[0].restartGame();
      return state;
    case 'SET_SPRITE_EDIT_STATE':
      return { ...state, spriteEditOpen: action.open };
    case 'SET_OBJECT_MENU_STATE':
      return { ...state, objectMenuOpen: action.open };
    case 'UPDATE_ANIMATIONS':
      return { ...state, animations: action.animations };
    case 'UPDATE_SPRITE_INFO':
      return { ...state, animInfo: action.info };
    case 'UPDATE_JSON_SPRITE':
      return { ...state, gameObjects: action.gameObjects };
    default:
      return state;
  }
};

export default gameReducer;
