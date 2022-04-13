export interface User {
  login: string
  password: string
}

export enum CONTACT_FIELD {
  first_name = 'first_name',
  second_name = 'second_name',
  last_name = 'last_name',
  phone = 'phone',
  id = 'id'
}

export enum AUTH_FIELD {
  login = 'login',
  password = 'password'
}

export interface Contact {
  [CONTACT_FIELD.first_name]: string
  [CONTACT_FIELD.second_name]: string
  [CONTACT_FIELD.last_name]?: string
  [CONTACT_FIELD.phone]: string
  [CONTACT_FIELD.id]: string
}