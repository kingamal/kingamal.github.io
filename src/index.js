import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Calendar from './Calendar';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Calendar />
  </React.StrictMode>
);

console.log('API Key:', process.env.REACT_APP_API_KEY);
console.log('Auth Domain:', process.env.REACT_APP_AUTH_DOMAIN);
console.log('Project ID:', process.env.REACT_APP_PROJECT_ID);
console.log('Storage Bucket:', process.env.REACT_APP_STORAGE_BUCKET);
console.log('Messaging Sender ID:', process.env.REACT_APP_MESSAGING_SENDER_ID);
console.log('App ID:', process.env.REACT_APP_APP_ID);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
