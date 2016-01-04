"use strict";

import React from 'react';
import { shallow,
  describeWithDOM,
  mount,
  spyLifecycle,
  render } from 'enzyme';
import assert from 'assert';
import Counter from '../src/containers/Counter';
import configureStore from '../src/store/configureStore';

const store = configureStore();

describe('<Counter />', () => {

  it(`should render <Counter></Counter> component`, ()=> {
    const wrapper = shallow(<Counter store={store} params={{domain: 'test'}} />);
    assert(wrapper.instance() instanceof Counter);
    assert(wrapper.length === 1);
  });

  it(`should render props`, () => {
    const wrapper = shallow(<Counter store={store} params={{domain: 'test'}} />);
    assert(wrapper.prop(`store`) === store);
    assert(wrapper.prop(`params`).domain === 'test');
  });

  it(`should render incremented and decremented count`, ()=> {
    var wrapper;
    wrapper = shallow(<Counter store={store} params={{domain: 'test'}} />);
    assert(wrapper.props().counter.get('test') === undefined);

    wrapper.props().actions.increment('test');
    wrapper = shallow(<Counter store={store} params={{domain: 'test'}} />);
    assert(wrapper.props().counter.get('test') === 1);

    wrapper.props().actions.decrement('test');
    wrapper = shallow(<Counter store={store} params={{domain: 'test'}} />);
    assert(wrapper.props().counter.get('test') === 0);
  });

  it(`should render action buttons`, ()=> {
    const wrapper = render(<Counter store={store} params={{domain: 'test'}} />);
    assert(wrapper.find('button').length === 3);
  });
});
