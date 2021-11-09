import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

//import emailjs from 'emailjs-com';
//emailjs.send('service_644bvxp','template_hibfrhg', {}, 'user_jEdjNVBkvDKKXV9RWVWKq')
//	.then((response) => {
//	   console.log('SUCCESS!', response.status, response.text);
//	}, (err) => {
//	   console.log('FAILED...', err);
//	});

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
