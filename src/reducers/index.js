import { combineReducers } from 'redux';
import app from './app';
import { routerStateReducer } from 'redux-router';

const rootReducer = combineReducers({
  app,
  router: routerStateReducer
});

export default rootReducer;
