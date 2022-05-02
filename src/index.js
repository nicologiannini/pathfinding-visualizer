import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Poster from './components/Poster'

ReactDOM.render(
    <React.StrictMode>
        <Poster />
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
