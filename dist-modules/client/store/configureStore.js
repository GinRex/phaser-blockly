import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from '../reducers';

// export const store = createStore(gameReducer);

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default ((initialState = {}) => {
  // create store and persistor per normal...

  const store = createStore(persistedReducer, initialState, applyMiddleware(thunk));

  console.log('initialStat', store.getState());

  const persistor = persistStore(store, null, () => {
    // if you want to get restoredState
    console.log('restoredState', store.getState());
  });

  if (module.hot) {
    module.hot.accept(() => {
      // This fetch the new state of the above reducers.
      console.log('fetch new state');
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
      store.persistor.persist();
    });
  }

  return { store, persistor };
});