import React from 'react';
import ReactDOM1 from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import App from './components/member/router';
import * as serviceWorker from './serviceWorker';

ReactDOM1.render(
    
<App demo={4}/>, document.getElementById('root1'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
