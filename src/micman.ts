import createMatcher from 'feather-route-matcher'

type OnUnmount = () => void;
type RouteCallback = (parent: HTMLElement, params: object) => OnUnmount;
const globalRoutes: Record<string, RouteCallback> = {};


export const registerRoutes = (routes: Record<string, RouteCallback>) => {
  Object.entries(routes).map(([route, callback]) => {
    if (!Object.prototype.hasOwnProperty.call(routes, route)) {
      throw new Error('Route handled by two microfrontends');
    }
    globalRoutes[route] = callback;
  })
}

export const start = () => {
  const matcher = createMatcher(globalRoutes);
  const currentRoute = matcher(location.pathname);
  const root = document.getElementById('root')!;
  let onUnmount: null | OnUnmount = null;
  if (currentRoute) {
    onUnmount = currentRoute.value(root, currentRoute.params ?? {});
  }
  window.navigate = (newPathname: string) => {
    history.pushState(null, '', location.origin + newPathname);
    const newRoute = matcher(newPathname);
    console.log(newRoute)
    if (onUnmount) {
      onUnmount();
    }
    onUnmount = null;
    if (newRoute) {
      onUnmount = newRoute.value(root, newRoute.params ?? {});
    }
  }
}


window.registerRoutes = registerRoutes;
window.start = start;