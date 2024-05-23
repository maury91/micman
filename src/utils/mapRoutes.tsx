import React from 'react';
import { RouteContext } from './Router.tsx';

export const mapRoutes = (routeContext: RouteContext, routes: Record<string, React.ComponentType>): Record<string, (parent: HTMLElement) => () => void> => {
  return Object.fromEntries(
    Object.entries(routes).map(([route, Component]) => [route, (parent: HTMLElement) => {
      routeContext.setValue({
        element: parent,
        route: <Component/>
      })
      return () => {
        routeContext.setValue({
          element: null,
          route: null
        })
      }
    }]))
}