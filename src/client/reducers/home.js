import toolboxCategories from '../toolBox';

const initState = {
  selectedFile: {},
  gameObjects: [],
  scenes: [{
    name: 'scene1', key: 'scene1', workspace: '', jsCode: '', variables: [],
  }],
  gameState: 'STOP',
  slectedGameobjectIndex: '',
  slectedSceneIndex: 'scene1',
  toolboxCategories,
  spriteEditOpen: false,
  variableDialogOpen: false,
  objectMenuOpen: { target: null },
  animations: { example: [0, 0, 0, 0] },
  animInfo: {
    name: 'name',
    prefix: 'sprite_',
    suffix: '.png',
    start: 0,
    end: 0,
    zeroPad: 0,
    frameRate: 30,
    repeat: -1,
  },
};

const gameReducer = (state = initState, action) => {
  console.log('Action:', action);
  switch (action.type) {
    case 'SELECT_FILE':
      return { ...state, selectedFile: { file: action.selectedFile } };
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
    case 'SET_VARIABLE_DIALOG_STATE':
      return { ...state, variableDialogOpen: action.open };
    case 'SET_OBJECT_MENU_STATE':
      return { ...state, objectMenuOpen: { target: action.open } };
    case 'UPDATE_ANIMATIONS':
      return { ...state, animations: action.animations };
    case 'UPDATE_SPRITE_INFO':
      return { ...state, animInfo: action.info };
    case 'UPDATE_JSON_SPRITE': {
      const newGameObjects = state.gameObjects.map(gameObject =>
        (gameObject.key === action.data.name
          ? { ...gameObject, jsonSprite: action.data.filename }
          : gameObject));
      return { ...state, gameObjects: newGameObjects };
    }
    case 'ADD_ANIMATION': {
      const newGameObjects = state.gameObjects.map(gameObject =>
        (gameObject.key === action.className
          ? {
            ...gameObject,
            animations: gameObject.animations.filter(animation => animation.name === state.animInfo.name).length
              ? gameObject.animations.map(animation =>
                (animation.name === state.animInfo.name ? state.animInfo : animation))
              : [...gameObject.animations, state.animInfo],
          }
          : gameObject));
      return { ...state, gameObjects: newGameObjects };
    }
    case 'ADD_VARIABLE': {
      const newScenes = state.scenes.map(scene =>
        (scene.key === action.data.name
          ? { ...scene, variables: [...scene.variables, action.data.variable] }
          : scene));
      return { ...state, scenes: newScenes };
    }
    default:
      return state;
  }
};

export default gameReducer;
