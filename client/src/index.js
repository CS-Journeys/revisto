import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import App from './App';
import './index.css';

// Load backend into axios
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || '/api';

// Load React App
ReactDOM.render(
    <App/>, 
    document.getElementById('root')
);