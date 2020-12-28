import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import './index.css';
import App from './App';
import TodoStore from './stores/TodoStore';
import VideoStore from './stores/VideoStore';

ReactDOM.render(
  <React.StrictMode>
    <Provider
      TodoStore={TodoStore}
      VideoStore={VideoStore}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
