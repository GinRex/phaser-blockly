import axios from 'axios';

export const selectFile = selectedFile => ({
  type: 'SELECT_FILE',
  selectedFile,
});

export const buildGame = gameObjects => ({
  type: 'BUILD_GAME',
  gameObjects,
});

export const addObject = gameObject => ({
  type: 'ADD_OBJECT',
  gameObject,
});

export const addScene = scene => dispatch =>
  axios.post('http://localhost:8080/api/createScene', scene, {}).then((res) => {
    dispatch({
      type: 'ADD_SCENE',
      scene,
    });
  });

export const setSlectedGameobjectIndex = index => ({
  type: 'SET_INDEX',
  index,
});

export const setSlectedSceneIndex = index => dispatch =>
  axios.post('http://localhost:8080/api/selectScene', { index }, {}).then((res) => {
    dispatch({
      type: 'SET_SCENE_INDEX',
      index,
    });
  });

export const updateWorkspace = gameObjects => ({
  type: 'UPDATE_WORKSPACE',
  gameObjects,
});

export const updateSceneWorkspace = scenes => ({
  type: 'UPDATE_SCENE_WORKSPACE',
  scenes,
});

export const addClass = name => dispatch => axios.post('http://localhost:8080/api/addClass', { name }, {}).then((res) => {
  console.log(res.data);
  dispatch(addObject({
    name: res.data,
    workspace: ['', '', ''],
    jsCode: ['', '', ''],
    key: res.data,
    variables: [],
    instances: [],
    functions: [],
  }));
});


export const uploadImage = file => (dispatch) => {
  // console.log(file.file);
  const data = new FormData();
  data.append('file', file);
  console.log(data.file);
  return axios.post('http://localhost:8080/api/uploadImage', data, {}).then((res) => {
    dispatch({
      type: 'ADD_IMAGE',
      image: {
        name: res.data.name,
        filename: res.data.filename,
      },
    });
  });
};

export const uploadAudio = file => (dispatch) => {
  console.log(file.file);
  const data = new FormData();
  data.append('file', file.file);
  return axios.post('http://localhost:8080/api/uploadAudio', data, {}).then((res) => {
    dispatch({
      type: 'ADD_AUDIO',
      audio: {
        name: res.data.name,
        filename: res.data.filename,
      },
    });
  });
};

export const uploadJson = (file, name) => (dispatch) => {
  console.log(file);
  const data = new FormData();
  data.append('file', file);
  data.append('filename', name);
  console.log(data);
  return axios.post('http://localhost:8080/api/uploadJson', data, {}).then((res) => {
    console.log(res.data);
    dispatch({
      type: 'UPDATE_JSON_SPRITE',
      data: res.data,
    });
  });
};

export const restartGame = () => ({
  type: 'RESTART_GAME',
});

export const updateGame = gameObjects => (dispatch) => {
  const data = gameObjects;
  return axios.post('http://localhost:8080/api/updateCode', data, {}).then((res) => {
    const frame = document.getElementById('sandboxed');
    frame.contentWindow.postMessage('reload', '*');
  });
};

export const updateScene = scenes => (dispatch) => {
  const data = scenes;
  return axios.post('http://localhost:8080/api/updateSceneCode', data, {}).then((res) => {
    console.log('xxx');
    // const frame = document.getElementById('sandboxed');
    // frame.contentWindow.postMessage('reload', '*');
  });
};

export const createNewGame = game => (dispatch) => {
  localStorage.removeItem('persist:root');
  const data = game;
  return axios.post('http://localhost:8080/api/createGame', data, {}).then((res) => {
    window.location.reload();
  });
};

export const updateGameSetting = game => (dispatch) => {
  const data = game;
  return axios.post('http://localhost:8080/api/updateGameSetting', data, {}).then((res) => {
    // window.location.reload();
  });
};

export const setGame = game => ({
  type: 'SET_GAME',
  game,
});

export const updateToolbox = category => ({
  type: 'UPDATE_TOOL_BOX',
  category,
});

export const setSpriteEditorState = open => ({
  type: 'SET_SPRITE_EDIT_STATE',
  open,
});

export const setVariableDialogState = open => ({
  type: 'SET_VARIABLE_DIALOG_STATE',
  open,
});

export const setObjectMenuState = open => ({
  type: 'SET_OBJECT_MENU_STATE',
  open,
});

export const updateAnimations = animations => ({
  type: 'UPDATE_ANIMATIONS',
  animations,
});

// export const addAnimations = className => ({
//   type: 'ADD_ANIMATION',
//   className,
// });

export const addAnimations = animation => dispatch =>
  axios
    .post('http://localhost:8080/api/createAnimation', { animation }, {})
    .then((res) => {
      dispatch({
        type: 'ADD_ANIMATION',
        animation: res.data,
      });
    });

// export const updateSpriteInfo = info => ({
//   type: 'UPDATE_SPRITE_INFO',
//   info,
// });

export const addJsonSprite = gameObjects => ({
  type: 'UPDATE_SPRITE_INFO',
  gameObjects,
});

export const addVariable = (name, variable) => ({
  type: 'ADD_VARIABLE',
  data: { name, variable },
});

export const addClassVariable = (name, variable) => ({
  type: 'ADD_CLASS_VARIABLE',
  data: { name, variable },
});

export const addInstance = (instance, name) => ({
  type: 'ADD_INSTANCE',
  data: { name, instance },
});

// delete this
export const addInstancesToScene = scene => (dispatch) => {
  const data = scene;
  return axios.post('http://localhost:8080/api/initObject', data, {}).then((res) => {
    console.log('aaa');
  });
};

export const saveGame = gameName => (dispatch) => {
  const data = localStorage.getItem('persist:root');
  return axios.post('http://localhost:8080/api/saveGame', { gameName, data }, {}).then((res) => {
    console.log('aaa');
  });
};

export const loadGame = gameName => dispatch => axios.post('http://localhost:8080/api/loadGame', { gameName }, {}).then((res) => {
  localStorage.setItem('persist:root', JSON.stringify(res.data));
  window.location.reload();
});

export const loadListGame = () => dispatch => axios.post('http://localhost:8080/api/loadListGame', {}, {}).then((res) => {
  dispatch({
    type: 'SET_LIST_GAMES',
    listGames: res.data,
  });
});

export const updateFunctions = (type, name, functions) => ({
  type: 'UPDATE_FUNCTIONS',
  data: { type, name, functions },
});

export const updateGameState = gameState => ({
  type: 'SET_GAME_STATE',
  gameState,
});
