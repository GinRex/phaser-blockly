import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from '../reducers';

// export const store = createStore(gameReducer);

const persistConfig = {
  key: 'root',
  debug: true,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default (initialState = {}) => {
  // create store and persistor per normal...

  const store = createStore(persistedReducer, initialState, applyMiddleware(thunk));

  console.log('initialStat', store.getState());

  const persistor = persistStore(store, null, () => {
    // if you want to get restoredState
    console.log('restoredState', store.getState());
  });

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      // This fetch the new state of the above reducers.
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
    });
  }

  return { store, persistor };
};
