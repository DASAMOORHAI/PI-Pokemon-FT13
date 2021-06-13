import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/index.js';
import thunkMiddleware from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunkMiddleware)))
  
export default store;