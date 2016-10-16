import React, { Component, PropTypes } from 'react';
import constants from '../constants/ActionTypes';
import Link from 'react-router/lib/Link';

import TimeAgo from 'react-timeago';
import urlParse from 'url-parse';

var parseHost = url => {
  var hostname = (urlParse(url, true)).hostname;
  var parts = hostname.split('.').slice(-3);
  if (parts[0] === 'www') {
    parts.shift();
  }
  return parts.join('.');
}

var pluralise = (howMany, suffixes) => {
  return (suffixes || ',s').split(',')[(howMany === 1 ? 0 : 1)]
}

class StoryItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    item: PropTypes.object
  }

  constructor() {
    super();
  }

  componentWillMount() {
    const { id, actions } = this.props;
    actions.startItem(id);
  }

  renderItemMeta(item) {
    var itemDate = new Date(item.get('time') * 1000)

    if (item.get('type') === 'job') {
      return (<div className="Item__meta">
        <TimeAgo date={itemDate} className="Item__time"/>
      </div>);
    }

    return (<div className="Item__meta">
      <span className="Item__score">
        {item.get('score')} point{pluralise(item.get('score'))}
      </span>{' '}
      <span className="Item__by">
        by <Link to={`/user/${item.get('by')}`}>{item.get('by')}</Link>
      </span>{' '}
      <TimeAgo date={itemDate} className="Item__time"/>
      {' | '}
        {item.get('descendants') > 0 ? item.get('descendants') + ' comment' + pluralise(item.get('descendants')) : 'discuss'}
    </div>);
    // <Link to={`/${item.get('type')}/${item.get('id')}`}>
    // </Link>
  }

  renderItemTitle(item) {
    const hasURL = !!item.get('url');
    const title = (hasURL ? <a href={item.get('url')}>{item.get('title')}</a>
                    : <Link to={`/${item.get('type')}/${item.get('id')}`}>{item.get('title')}</Link>)
    return (<div className="Item__title" style={{fontSize: 18}}>
      {title}
      {hasURL && ' '}
      {hasURL && <span className="Item__host">({parseHost(item.get('url'))})</span>}
    </div>);
  }

  render() {
    const { id, item } = this.props;
    return (
      <li className={'ListItem'} style={{marginBottom: 16}}>
      {item ? this.renderItemTitle(item) : 'Loading'}
      {item ? this.renderItemMeta(item) : null}
      </li>
    );
  }
}

export default StoryItem;
