var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import toolboxCategories from '../toolBox';

const initState = {
  selectedFile: null,
  gameObjects: [],
  scenes: [],
  gameState: 'STOP',
  slectedGameobjectIndex: '',
  slectedSceneIndex: '',
  toolboxCategories,
  spriteEditOpen: false
};

const gameReducer = (state = initState, action) => {
  console.log('Action:', action);
  switch (action.type) {
    case 'SELECT_FILE':
      return _extends({}, state, { selectedFile: action.selectedFile });
    case 'BUILD_GAME':
      return _extends({}, state, { gameState: 'BUILD', gameObjects: action.gameObjects });
    case 'ADD_OBJECT':
      {
        const gameObjects = [...state.gameObjects, action.gameObject];
        return _extends({}, state, { gameObjects });
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
    default:
      return state;
  }
};

export default gameReducer;