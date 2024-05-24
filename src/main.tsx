import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import './micman.ts'

window.React = React;
window.ReactDOM = ReactDOM;

window.injectMicrofrontends(
  () => import('./app-one'),
  () => import('./app-two'),
  // uncomment when you run the 3rd microfronted
  // () => {
  //   // This is coming from an external source ( not this repo )
  //   const script = document.createElement('script');
  //   script.src = 'http://localhost:5174/src/main.tsx';
  //   script.type = 'module';
  //   document.head.appendChild(script);
  // }
);