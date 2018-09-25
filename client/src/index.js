import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';//***********Change if using AppContainer.js ************** */
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import store from "./store";

const oldFetch = window.fetch; //This is to get the token from localStorage
window.fetch = (url, settings = {}) => {
  return oldFetch(url, 
    {...settings,
      headers: {...settings.headers, authorization: localStorage.getItem("token")}
    }
  );
};

ReactDOM.render(  <Provider store={ store }><App /></Provider>,
  document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
