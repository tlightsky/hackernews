import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import News from '../components/News';
import actions from '../actions';
import constants from '../constants/ActionTypes';

function mapStateToProps(state) {
  return {
    topstories: state.app.get('topstories'),
    items: state.app.get('items'),
    count: state.app.get('count')
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: actions(dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(News);
