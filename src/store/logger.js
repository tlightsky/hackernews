import createLogger from 'redux-logger';
import { Iterable } from 'immutable';

export default createLogger({
  level: 'info',
  collapsed: true,
  stateTransformer: state => _.mapValues(state, v => Iterable.isIterable(v) ? v.toJS() : v),
  predicate: (getState, action) => {
      return true;
  },
});
