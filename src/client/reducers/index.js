import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import home from './home';

// const homePersistConfig = {
//   key: 'home',
//   storage,
//   blacklist: ['game', 'selectedFile'],
// };

const rootReducer = combineReducers({
  home,
});

export default rootReducer;
