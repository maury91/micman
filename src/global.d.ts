declare global {
  type OnUnmount = () => void;
  type RouteCallback = (parent: HTMLElement, params: object) => OnUnmount;

  interface Window {
    navigate: (newPathname: string) => void;
    start: () => void;
    registerRoutes: (routes: Record<string, RouteCallback>) => void;
  }
}

export {};