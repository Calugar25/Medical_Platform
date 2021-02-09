import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './app'
import { Router, Route, Link } from 'react-router-dom';
import login from "./login/Login"
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login/Login';
import Home from "./home/home"
import history from "./history"


ReactDOM.render(
 
      <Router history={history}>
        <App/>
      </Router>
  ,
    document.getElementById('root'),
  );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
