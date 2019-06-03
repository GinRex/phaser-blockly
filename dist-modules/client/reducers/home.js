var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import toolboxCategories from '../toolBox';

const initState = {
  listGames: [],
  selectedFile: {},
  gameObjects: [],
  scenes: [{
    name: 'scene1', key: 'scene1', workspace: ['', '', ''], jsCode: ['', '', ''], variables: [], objects: []
  }],
  gameState: 'STOP',
  slectedGameobjectIndex: '',
  slectedSceneIndex: 'scene1',
  toolboxCategories,
  spriteEditOpen: false,
  variableDialogOpen: '',
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
    repeat: -1
  },
  images: []
};

const gameReducer = (state = initState, action) => {
  console.log('Action:', action);
  switch (action.type) {
    case 'SELECT_FILE':
      return _extends({}, state, { selectedFile: { file: action.selectedFile } });
    case 'BUILD_GAME':
      return _extends({}, state, { gameState: 'BUILD', gameObjects: action.gameObjects });
    case 'ADD_OBJECT':
      {
        const gameObjects = [...state.gameObjects, action.gameObject];
        return _extends({}, state, { gameObjects });
      }
    case 'ADD_IMAGE':
      {
        const newImages = [...state.images, action.image];
        return _extends({}, state, { images: newImages });
      }
    case 'ADD_SCENE':
      {
        const scenes = [...state.scenes, action.scene];
        return _extends({}, state, { scenes });
      }
    case 'SET_INDEX':
      {
        return _extends({}, state, { slectedGameobjectIndex: action.index, slectedSceneIndex: '' });
      }
    case 'SET_SCENE_INDEX':
      {
        return _extends({}, state, { slectedSceneIndex: action.index, slectedGameobjectIndex: '' });
      }
    case 'UPDATE_WORKSPACE':
      {
        return _extends({}, state, { gameObjects: action.gameObjects });
      }
    case 'UPDATE_SCENE_WORKSPACE':
      {
        return _extends({}, state, { scenes: action.scenes });
      }
    case 'UPDATE_TOOL_BOX':
      {
        const toolboxCategories = state.toolboxCategories.map(category => category.name === 'Classes' ? _extends({}, category, { categories: action.category }) : category);
        return _extends({}, state, { toolboxCategories });
      }
    case 'SET_GAME':
      return _extends({}, state, { game: action.game });
    case 'RESTART_GAME':
      state.game.scene.scenes[0].restartGame();
      return state;
    case 'SET_SPRITE_EDIT_STATE':
      return _extends({}, state, { spriteEditOpen: action.open });
    case 'SET_VARIABLE_DIALOG_STATE':
      return _extends({}, state, { variableDialogOpen: action.open });
    case 'SET_OBJECT_MENU_STATE':
      return _extends({}, state, { objectMenuOpen: { target: action.open } });
    case 'UPDATE_ANIMATIONS':
      return _extends({}, state, { animations: action.animations });
    case 'UPDATE_SPRITE_INFO':
      return _extends({}, state, { animInfo: action.info });
    case 'UPDATE_JSON_SPRITE':
      {
        const newGameObjects = state.gameObjects.map(gameObject => gameObject.key === action.data.name ? _extends({}, gameObject, { jsonSprite: action.data.filename }) : gameObject);
        return _extends({}, state, { gameObjects: newGameObjects });
      }
    case 'ADD_ANIMATION':
      {
        const newGameObjects = state.gameObjects.map(gameObject => gameObject.key === action.className ? _extends({}, gameObject, {
          animations: gameObject.animations.filter(animation => animation.name === state.animInfo.name).length ? gameObject.animations.map(animation => animation.name === state.animInfo.name ? state.animInfo : animation) : [...gameObject.animations, state.animInfo]
        }) : gameObject);
        return _extends({}, state, { gameObjects: newGameObjects });
      }
    case 'ADD_VARIABLE':
      {
        const newScenes = state.scenes.map(scene => scene.key === action.data.name ? _extends({}, scene, { variables: [...scene.variables, action.data.variable] }) : scene);
        return _extends({}, state, { scenes: newScenes });
      }
    case 'ADD_CLASS_VARIABLE':
      {
        const newGameObjects = state.gameObjects.map(gameObject => gameObject.key === action.data.name ? _extends({}, gameObject, { variables: [...gameObject.variables, action.data.variable] }) : gameObject);
        return _extends({}, state, { gameObjects: newGameObjects });
      }
    case 'ADD_INSTANCE':
      {
        const newScenes = state.scenes.map(scene => scene.key === action.data.name ? _extends({}, scene, { objects: [...scene.objects, action.data.instance].sort((a, b) => b.order - a.order) }) : scene);
        return _extends({}, state, { scenes: newScenes });
      }
    case 'SET_LIST_GAMES':
      return _extends({}, state, { listGames: action.listGames });
    default:
      return state;
  }
};

export default gameReducer;