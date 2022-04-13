import { KEY_CONTACTS } from './../../const/index';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

import { RootState } from 'store';

import { Contact } from 'api/type'
import { toast } from 'react-toastify';

export interface ContactsState {
  contacts: Contact[]
  loading: boolean,
  error: string
}

const initialState: ContactsState = {
  contacts: [],
  loading: false,
  error: ''
}

export const fetchGetContacts = createAsyncThunk<void, void, { state: RootState }>(
  'fetchGetContacts',
  async (_, { dispatch }) => {
    dispatch(setLoading(true))

    const contactsStorage = localStorage.getItem(KEY_CONTACTS)

    if (!contactsStorage) localStorage.setItem(KEY_CONTACTS, JSON.stringify([]))

    dispatch(setContacts(contactsStorage ? JSON.parse(contactsStorage) : []))

    dispatch(setLoading(false))

    toast.success('Список контактов успешно загружен!', {
      toastId: 'fetchGetContacts'
    })
  }
)

export const fetchUpdateContact = createAsyncThunk<void, Contact, { state: RootState }>(
  'fetchUpdateContact',
  async (contact, { dispatch, getState }) => {
    const { contacts: { contacts } } = getState()

    const contactsCopy = [...contacts]

    let indexPosition = 0

    contacts.find((contactStore, index) => {
      if (contactStore.id === contact.id) {
        indexPosition = index
        return true
      }
    })

    contactsCopy.splice(indexPosition, 1, contact)

    localStorage.setItem(KEY_CONTACTS, JSON.stringify(contactsCopy))

    dispatch(setContacts(contactsCopy))

    toast.success('Контакт успешно обновлен!', {
      toastId: 'fetchUpdateContact'
    })
  }
)

export const fetchAddContact = createAsyncThunk<void, Contact, { state: RootState }>(
  'fetchAddContact',
  async (contact, { dispatch, getState }) => {
    const { contacts: { contacts } } = getState()

    localStorage.setItem(KEY_CONTACTS, JSON.stringify([
      ...contacts,
      contact
    ]))

    dispatch(addContact(contact))

    toast.success('Контакт успешно добавлен!', {
      toastId: 'fetchAddContact'
    })
  }
)

export const fetchDeleteContact = createAsyncThunk<void, Contact, { state: RootState }>(
  'fetchDeleteContact',
  async (contact, { dispatch, getState }) => {
    const { contacts: { contacts } } = getState()

    const contactsCopy = [...contacts]

    let indexPosition = 0

    contacts.find((contactStore, index) => {
      if (contactStore.id === contact.id) {
        indexPosition = index
        return true
      }
    })

    contactsCopy.splice(indexPosition, 1)

    localStorage.setItem(KEY_CONTACTS, JSON.stringify(contactsCopy))

    dispatch(setContacts(contactsCopy))

    toast.success('Контакт успешно удален!', {
      toastId: 'fetchAddContact'
    })
  }
)

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts(state, { payload }: PayloadAction<Contact[]>) {
      state.contacts = payload
    },
    addContact(state, { payload }: PayloadAction<Contact>) {
      state.contacts = [
        ...state.contacts,
        payload
      ]
    },
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload
    },
    setError(state, { payload }: PayloadAction<string>) {
      state.error = payload
    }
  }
})

export const { setContacts, setLoading, setError, addContact } = contactsSlice.actions

export default contactsSlice.reducer