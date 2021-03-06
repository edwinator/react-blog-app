import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/app';
import PostsIndex from './components/PostsIndex';

const Greeting = () => <div>Helllo</div>;

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex} />
    <Route path="greet" component={Greeting} />
  </Route>
);
