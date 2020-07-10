import { h, render, Component } from 'preact';
import App from './app';

let root;
function init() {
    root = render(<App />, document.body, root);
}
init();

if (module.hot) module.hot.accept('./components/app', () => requestAnimationFrame(init));
