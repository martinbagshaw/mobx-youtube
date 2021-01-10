import * as React from 'react';
import { hot } from 'react-hot-loader';
declare const module: any;

import Todo from './components/Todo';
import TodoStore from './stores/TodoStore';
import Videos from './components/Videos';
import VideoStore from './stores/VideoStore';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Todo TodoStore={TodoStore} />
        <Videos VideoStore={VideoStore} />
      </div>
    );
  }
}

export default hot(module)(App);
