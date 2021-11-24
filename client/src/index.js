import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

import App from './App';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

ReactDOM.render(<App/>, document.getElementById('root'));
