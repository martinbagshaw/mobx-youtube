import * as React from 'react';
import { hot } from 'react-hot-loader';
declare const module: any;

import Todo from './components/Todo';
import Videos from './components/Videos';

class App extends React.Component {

  render() {

    return (
      <div className="App">
        <Todo />
        <Videos />
      </div>
    );
  }
}

export default hot(module)(App);
