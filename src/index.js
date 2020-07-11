import React from "react";
import ReactDOM from "react-dom";
import App from './app';

let root;
function init() {
    root = ReactDOM.render(<App />, document.getElementById('app'), root);
}
init();

if (module.hot) module.hot.accept('./components/app', () => requestAnimationFrame(init));
