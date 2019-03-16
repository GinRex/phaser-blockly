import { createStore } from "redux";
import { gameReducer } from "./gameReducer";
import { persistStore, persistReducer } from 'redux-persist';

export default createStore(gameReducer);