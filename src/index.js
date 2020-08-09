import React from "react";
import ReactDOM from "react-dom";
import  { Provider  } from "react-redux";

import App from './app';
import store from './store';

let root;
function init() {
    root = ReactDOM.render(
        <Provider store={ store }><App /></Provider>,
        document.getElementById('app'),
        root
    );
}
init();

if (module.hot) module.hot.accept('./components/app', () => requestAnimationFrame(init));
