
import React from 'react'; // eslint-disable-line no-unused-vars
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';
import app from './components';
import News from './containers/News';

export default (
  <Route >
    <Route path="/" component={News} ></Route>
  </Route>
);
