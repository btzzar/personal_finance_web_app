import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import reportWebVitals from './reportWebVitals';
import Application from './components/Application/Application';
import "../node_modules/bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
