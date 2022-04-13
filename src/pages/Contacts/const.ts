import { CONTACT_FIELD } from './../../api/type';
import { Contact } from "api/type"

export const initialStateContact: Contact = {
  [CONTACT_FIELD.first_name]: '',
  [CONTACT_FIELD.second_name]: '',
  [CONTACT_FIELD.last_name]: '',
  [CONTACT_FIELD.phone]: '',
  [CONTACT_FIELD.id]: '',
}

export const initialValuesFormik: Omit<Contact, CONTACT_FIELD.id> = {
  [CONTACT_FIELD.first_name]: '',
  [CONTACT_FIELD.second_name]: '',
  [CONTACT_FIELD.last_name]: '',
  [CONTACT_FIELD.phone]: '',
}