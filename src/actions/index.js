
import { bindActionCreators } from 'redux';
import * as app from './app';

export default function actions(dispatch) {
  return bindActionCreators({...app}, dispatch);
}
