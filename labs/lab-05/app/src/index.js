import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import App from './controllers/App/App';
import registerServiceWorker from './services/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
