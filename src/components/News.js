import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes';
import constants from '../constants/ActionTypes';
import StoryItem from './StoryItem';

class News extends Component {
  static propTypes = {
    topstories: ImmutablePropTypes.listOf(PropTypes.number.isRequired),
    items: ImmutablePropTypes.map,
  }
  constructor() {
    super();
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.startScrollDetection();
    actions.start("topstories");
  }

  handleHome() {
    const { actions } = this.props;
    actions.home();
  }

  renderItems(stories) {
    if(!stories) {
      return null;
    }
    const { actions, items, count } = this.props;
    stories = stories.slice(0, count);
    return stories.map((id, i) => (<StoryItem key={i} id={id} actions={actions} item={items?items.get(id):null}></StoryItem>));
  }

  render() {
    const { topstories } = this.props;
    // console.log(topstories);
    if(!topstories || topstories.length == 0) {
      return (<div>Loading...</div>);
    }

    return (
      <div className={'App__content'}>
       <div className={'App__header'}>
         Hackernews with firebase and react(redux+immutable)
       </div>
       <div className={'Items'}>
         <ol className="Items__list">
           {this.renderItems(topstories)}
         </ol>
       </div>
       <div className={'App__footer'}>
         by TLightSky
       </div>
      </div>
    );
  }
}

export default News;
