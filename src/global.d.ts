type OnUnmount = () => void;
type RouteCallback = (parent: HTMLElement, params: object) => OnUnmount;
interface RegisterMFArgs {
  routes?: Record<string, RouteCallback>;
  sections?: Record<string, RouteCallback>;
}

interface OnRenderSectionArgs {
  name: string;
  node: HTMLElement;
  props?: object;
}

declare global {
  interface Window {
    navigate: (newPathname: string) => void;
    injectMicrofrontends: (...microfrontends: (() => void)[]) => void;
    registerMicrofrontend: (arg: RegisterMFArgs) => void;
    onRenderSection: (arg: OnRenderSectionArgs) => OnUnmount;
  }
}

export {};