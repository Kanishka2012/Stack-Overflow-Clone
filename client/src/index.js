import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import rootReducers from './reducers';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(rootReducers, compose(applyMiddleware(thunk)));
root.render(
  <Provider store={store}>
   <React.StrictMode>
     <App />
   </React.StrictMode>
  </Provider>
);