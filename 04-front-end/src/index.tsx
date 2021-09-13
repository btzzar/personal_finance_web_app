import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import reportWebVitals from './reportWebVitals';
import Application from './components/Application/Application';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';



ReactDOM.render(
  
  <Application />,
  
  document.getElementById('root')
);

reportWebVitals();
