import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store.js';
import App from './containers/App.js';
import reportWebVitals from './reportWebVitals';
import { asyncPageStartFetchThunk } from './reducers/index.js';

async function startPage() {
  await store.dispatch(asyncPageStartFetchThunk)
}

startPage()

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
