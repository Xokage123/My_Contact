import { AuthPage } from "pages/Auth";
import { HomePage } from "pages/Home";
import { ContactsPage } from "pages/Contacts";

import { Route } from "./type";

export enum RoutePaths {
  HOME = '/',
  AUTH = '/auth',
  CONTACTS = '/contacts',
  CONTACT = ':contactId'
}

export const routeHome: Route = {
  path: RoutePaths.HOME,
  Element: HomePage
}

export const routeAuth: Route = {
  path: RoutePaths.AUTH,
  Element: AuthPage
}

export const routeContacts: Route = {
  path: RoutePaths.CONTACTS,
  Element: ContactsPage,
  routes: [
    {
      path: RoutePaths.CONTACT,
      Element: HomePage
    }
  ]
}

const appRoutes: Route[] = [routeHome, routeAuth, routeContacts]

export default appRoutes