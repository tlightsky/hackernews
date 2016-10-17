"use strict";

import React from 'react';
import { shallow,
  describeWithDOM,
  mount,
  spyLifecycle,
  render } from 'enzyme';
import assert from 'assert';
import News from '../src/containers/News';
import configureStore from '../src/store/configureStore';
import Loading from 'react-loading';

const store = configureStore();

describe('<News />', () => {

  it(`should render <News></News> component`, ()=> {
    const wrapper = shallow(<News store={store} params={{domain: '/'}} />);
    assert(wrapper.instance() instanceof News);
    assert(wrapper.length === 1);
  });

  it(`should render props`, () => {
    const wrapper = shallow(<News store={store} params={{domain: '/'}} />);
    assert(wrapper.prop(`store`) === store);
    assert(wrapper.prop(`params`).domain === '/');
  });

  it(`should render Loading`, ()=> {
    var wrapper;
    wrapper = render(<News store={store} params={{domain: '/'}} />);
    assert(wrapper.find('svg').length == 1);
  });
});
