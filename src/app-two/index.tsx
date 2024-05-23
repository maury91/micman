import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createRouter } from '../utils/Router.tsx';
import { mapRoutes } from '../utils/mapRoutes.tsx';
import { CounterContextProvider } from '../utils/CounterContext.tsx';

const { routeContext, Router } = createRouter()

ReactDOM.createRoot(document.createElement('div')).render(
  <React.StrictMode>
    <CounterContextProvider>
      <Router />
    </CounterContextProvider>
  </React.StrictMode>,
)

window.registerRoutes(mapRoutes(routeContext, {
  '/appB': App
}))