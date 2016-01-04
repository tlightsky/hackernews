import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory, createMemoryHistory } from 'history';
import { reduxReactRouter } from 'redux-router';
import { batchedUpdatesMiddleware } from './batchedUpdatesMiddleware';
import _ from 'lodash';
import reducer from '../reducers'
import logger from './logger';

var history; // for testing
var middlewares = [thunk,batchedUpdatesMiddleware];
if (typeof(window) !== 'undefined'){
    history = _.partial(createHashHistory, { queryKey: false });
    middlewares.push(logger);
}
else {
    history = createMemoryHistory; //This kind of history is needed for server-side rendering.
}

middlewares = applyMiddleware.apply(null, middlewares);

const createStoreWithMiddleware = compose(
  middlewares,
  reduxReactRouter({ createHistory: history })
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
