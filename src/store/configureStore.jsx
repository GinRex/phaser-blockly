import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import { gameReducer } from '../store/gameReducer';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, gameReducer)

// export const store = createStore(persistedReducer);
export const store = createStore(gameReducer);

export const persistor = persistStore(store);
