import React from 'react';
import ReactDOM from 'react-dom';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './reducer.js';
import { createApi } from './api.js';
import { fetchData } from './api-actions.js';
import App from './components/app/app.jsx';
import Maintenance from './components/maintenance/maintenance.jsx';


const api = createApi();


const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api))
  )
);


ReactDOM.render(
  <Maintenance/>,
  document.querySelector(`#root`)
);


// Promise.all([
//   store.dispatch(fetchData()),
// ])
//   .then(() => {
//     ReactDOM.render(
//       <Provider store={store}>
//         <App/>
//       </Provider>,
//       document.querySelector(`#root`)
//     );
//   });
