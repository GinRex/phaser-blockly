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

export const uploadImage = file => (dispatch) => {
  console.log(file);
  const data = new FormData();
  data.append('file', file);
  return axios.post('http://localhost:8080/api/uploadImage', data, {}).then((res) => {
    dispatch(addObject({
      name: res.data.name,
      filename: res.data.filename,
      workspace: '',
      jsCode: '',
      key: res.data.name,
    }));
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
    const frame = document.getElementById('sandboxed');
    frame.contentWindow.postMessage('reload', '*');
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
