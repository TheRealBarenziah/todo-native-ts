import { createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import LocalStorage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import allReducer from './reducers';

const persistConfig = {
  key: 'trb-todo-v1.0',
  storage: LocalStorage
}

const persistedReducer = persistReducer(persistConfig, allReducer)

const store = __DEV__
  ?
  createStore(
    persistedReducer,
    applyMiddleware(thunk, logger))
  :
  createStore(
    persistedReducer,
    applyMiddleware(thunk))

export default store;
