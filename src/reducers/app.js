import Immutable from 'immutable';
import constants from '../constants/ActionTypes';
import createReducer from '../lib/createReducer';

const initialState = Immutable.fromJS({count: 20});

export default createReducer(initialState, {
  [constants.app.update]: (state, { type, path, lists }) => {
    return state.set(path, Immutable.fromJS(lists));
  },
  [constants.app.item]: (state, { type, id, item }) => {
    if(!state.get('items')) {
      state = state.set('items', initialState)
    }
    return state.update('items', items => items.set(id, Immutable.fromJS(item)));
  },
  [constants.app.increaseCount]: (state, { type, path, lists }) => {
    return state.update('count', count => count+20);
  }
});
