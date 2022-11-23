import { createStore } from 'redux'
import persistedReducer from 'util/redux/index';

export const store = createStore(persistedReducer)