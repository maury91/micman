import { PubSub } from './PubSub.ts';
import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

export type RouteContext = PubSub<{
  element: null,
  route: null
} | {
  element: HTMLElement,
  route: JSX.Element,
}>

export const createRouter = () => {
  const routeContext = new PubSub<{
    element: null,
    route: null
  } | {
    element: HTMLElement,
    route: JSX.Element,
  }>({
    element: null,
    route: null,
  })

  const Router = () => {
    const {element, route} = useSyncExternalStore(routeContext.subscribe, routeContext.getValue);
    if (route && element) {
      return <>{
        createPortal(route, element)
      }</>
    }
    return null;
  }

  return { routeContext, Router }
}