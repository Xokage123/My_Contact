import { Route as RouteElement } from 'react-router-dom';
import uuid from 'react-uuid'

import { Route } from './type';

export const renderRoute = (route: Route) => {

  const { Element, path, routes } = route

  return (
    <RouteElement key={uuid()} path={path} element={<Element />}>
      {
        routes?.map(renderRoute)
      }
    </RouteElement>
  )
}