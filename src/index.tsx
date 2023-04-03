import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './assets/css/base.css'

// http://toutiao.itheima.net/api-pc.html
// pc http://geek-pc.itheima.net/login
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
