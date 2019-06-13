import toolboxCategories from '../toolBox';

const initState = {
  listGames: [],
  selectedFile: {},
  gameObjects: [],
  scenes: [{
    name: 'scene1', key: 'scene1', workspace: ['', '', ''], jsCode: ['', '', ''], variables: [], objects: [], functions: [],
  }],
  gameState: 0,
  slectedGameobjectIndex: '',
  slectedSceneIndex: 'scene1',
  toolboxCategories,
  spriteEditOpen: false,
  variableDialogOpen: '',
  objectMenuOpen: { target: null },
  animations: [],
  images: [],
  audios: [],
};

const gameReducer = (state = initState, action) => {
  console.log('Action:', action);
  switch (action.type) {
    case 'SELECT_FILE':
      return { ...state, selectedFile: { file: action.selectedFile } };
    case 'SET_GAME_STATE':
      return { ...state, gameState: action.gameState };
    case 'BUILD_GAME':
      return { ...state, gameObjects: action.gameObjects };
    case 'ADD_OBJECT': {
      const gameObjects = [...state.gameObjects, action.gameObject];
      return { ...state, gameObjects };
    }
    case 'ADD_IMAGE': {
      const newImages = [...state.images, action.image];
      return { ...state, images: newImages };
    }
    case 'ADD_AUDIO': {
      const newAudios = [...state.audios, action.audio];
      return { ...state, audios: newAudios };
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
    // case 'UPDATE_SPRITE_INFO':
    //   return { ...state, animInfo: action.info };
    case 'UPDATE_JSON_SPRITE': {
      const newImages = state.images.map(image =>
        (image.name === action.data.name
          ? { ...image, jsonSprite: action.data.data }
          : image));
      return { ...state, images: newImages };
    }
    case 'ADD_ANIMATION': {
      const newAnimations = state.animations.findIndex(animation => animation.key === action.animation.key) === -1 ?
        [...state.animations, action.animation] :
        state.animations.map(animation =>
          (animation.key === action.animation.key
            ? action.animation
            : animation
          ));
      return { ...state, animations: newAnimations };
    }
    case 'ADD_VARIABLE': {
      const newScenes = state.scenes.map(scene =>
        (scene.key === action.data.name
          ? { ...scene, variables: [...scene.variables, action.data.variable] }
          : scene));
      return { ...state, scenes: newScenes };
    }
    case 'ADD_CLASS_VARIABLE': {
      const newGameObjects = state.gameObjects.map(gameObject =>
        (gameObject.key === action.data.name
          ? { ...gameObject, variables: [...gameObject.variables, action.data.variable] }
          : gameObject));
      return { ...state, gameObjects: newGameObjects };
    }
    case 'ADD_INSTANCE': {
      const newScenes = state.scenes.map(scene =>
        (scene.key === action.data.name
          ? { ...scene, objects: [...scene.objects, action.data.instance].sort((a, b) => b.order - a.order) }
          : scene));
      return { ...state, scenes: newScenes };
    }
    case 'SET_LIST_GAMES':
      return { ...state, listGames: action.listGames };
    case 'UPDATE_FUNCTIONS': {
      return action.data.type === 'scene' ?
        {
          ...state,
          scenes: state.scenes.map(scene =>
            (scene.key === action.data.name
              ? { ...scene, functions: action.data.functions }
              : scene)),
        } :
        {
          ...state,
          gameObjects: state.gameObjects.map(gameObject =>
            (gameObject.key === action.data.name
              ? { ...gameObject, functions: action.data.functions }
              : gameObject)),
        };
    }
    default:
      return state;
  }
};

export default gameReducer;
