import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducer.js';
import App from './components/app/app.jsx';
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import history from './history.js';


const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);


ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <Switch>
        <Route path="/:itemGroup?/:itemId?" component={App} />
      </Switch>
    </Provider>
  </Router>,
  document.querySelector(`#root`)
);
