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

export const setSlectedGameobjectIndex = index => ({
  type: 'SET_INDEX',
  index,
});

export const updateWorkspace = gameObjects => ({
  type: 'UPDATE_WORKSPACE',
  gameObjects,
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

export const updateGame = gameObjects => (dispatch) => {
  const data = gameObjects;
  return axios.post('http://localhost:8080/api/updateCode', data, {}).then((res) => {
    console.log(res);
  });
};
