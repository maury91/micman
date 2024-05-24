import createMatcher from 'feather-route-matcher'

type OnUnmount = () => void;
type RouteCallback = (parent: HTMLElement, params: object) => OnUnmount;
const micmanRoutes: Record<string, RouteCallback> = {};
const micmanSections: Record<string, RouteCallback[]> = {};

let microfrontendsToLoad = 0;

interface RegisterMFArgs {
  routes?: Record<string, RouteCallback>;
  sections?: Record<string, RouteCallback>;
}

interface OnRenderSectionArgs {
  name: string;
  node: HTMLElement;
  props?: object;
}

export const registerRoutes = (routes: Record<string, RouteCallback>) => {
  Object.entries(routes).map(([route, callback]) => {
    if (Object.prototype.hasOwnProperty.call(micmanRoutes, route)) {
      throw new Error('Route handled by two microfrontends');
    }
    micmanRoutes[route] = callback;
  })
}

export const registerSections = (sections: Record<string, RouteCallback>) => {
  Object.entries(sections).map(([section, callback]) => {
    if (!Object.prototype.hasOwnProperty.call(micmanSections, section)) {
      micmanSections[section] = [];
    }
    micmanSections[section].push(callback);
  })
}

export const start = () => {
  const matcher = createMatcher(micmanRoutes);
  const root = document.getElementById('root')!;
  let onUnmount: null | OnUnmount = null;
  const executeNavigation = (pathname: string) => {
    const newRoute = matcher(pathname);
    if (onUnmount) {
      onUnmount();
    }
    onUnmount = null;
    if (newRoute) {
      onUnmount = newRoute.value(root, newRoute.params ?? {});
    }

  }
  executeNavigation(location.pathname);
  window.addEventListener('popstate', () => {
    executeNavigation(location.pathname);
  })
  window.navigate = (newPathname: string) => {
    history.pushState(null, '', location.origin + newPathname);
    executeNavigation(newPathname);
  }
}

window.registerMicrofrontend = ({ routes, sections }: RegisterMFArgs) => {
  if (routes) {
    registerRoutes(routes);
  }
  if (sections) {
    registerSections(sections);
  }
  microfrontendsToLoad--;
  if (microfrontendsToLoad === 0) {
    start();
  }
};

window.onRenderSection = ({ name, node, props }: OnRenderSectionArgs) => {
  const section = micmanSections[name] as RouteCallback[] | undefined;
  const onUnmount: OnUnmount[] = [];
  if (section) {
    section.forEach(renderSection => {
      onUnmount.push(renderSection(node, props ?? {}))
    })
  }
  return () => {
      onUnmount.forEach(onUnmountSection => onUnmountSection());
  }
}

window.injectMicrofrontends = (...microfrontends: (() => void)[]) => {
  microfrontendsToLoad = microfrontends.length;
  microfrontends.forEach(injectMicrofrontend => injectMicrofrontend());
};