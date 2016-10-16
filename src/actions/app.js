
import { pushState } from 'redux-router';
import constants from '../constants/ActionTypes';
import Firebase from 'firebase';

var api = new Firebase('https://hacker-news.firebaseio.com/v0')

export function update(path, lists) {
  return {
    type: constants.app.update,
    path,
    lists
  }
}

export function start(path) {
  console.log("start:"+path);
  return dispatch => {
    api.child(path).on('value', lists => {
      dispatch(update(path, lists.val()));
    });
  }
}

export function updateItem(id, item) {
  // console.log(item);
  return {
    type: constants.app.item,
    id,
    item
  }
}

export function startItem(id) {
  console.log("start:"+id);
  return dispatch => {
    api.child('item/'+id).on('value', item => {
      dispatch(updateItem(id, item.val()));
    });
  }
}

export function startScrollDetection() {
  return dispatch => {
    (function (doc) {
      function isEndOfElement(element){
        return element.offsetHeight + element.scrollTop >= element.scrollHeight;
      }
      window.onscroll = event => {
        if (isEndOfElement(doc.body)){
          console.log("END!");
          dispatch({type: constants.app.increaseCount});
        }
      };
    })(document);
  }
}

export function home() {
  return dispatch => {
    dispatch(pushState(null, '/'));
  }
}
