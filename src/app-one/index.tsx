import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createRouter } from '../utils/Router.tsx';
import { mapRoutes } from '../utils/mapRoutes.tsx';
import { CounterContextProvider } from '../utils/CounterContext.tsx';

const {routeContext, Router} = createRouter()
const {routeContext: sectionContext, Router: Sections} = createRouter()


ReactDOM.createRoot(document.createElement('div')).render(
  <CounterContextProvider>
    <Router/>
    <Sections />
  </CounterContextProvider>
)


const AppOneLogo = () => {
  return <span>App one logo</span>
}

window.registerMicrofrontend({
  routes: mapRoutes(routeContext, {
    '/appA': App
  }),
  sections: mapRoutes(sectionContext, {
    'AdditionalLogo': AppOneLogo
  })
})