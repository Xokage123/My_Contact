import { ChangeEvent, FC, MouseEvent, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import uuid from 'react-uuid'

import { Spinner } from 'ui-kit/Spinner';

import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/material';

import { Contact, CONTACT_FIELD } from "api/type";

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchAddContact, fetchGetContacts, fetchUpdateContact, fetchDeleteContact } from 'store/slices/contactsSlice';

import { ContactComponent } from './components/Contact';

import { FormComponent } from 'ui-kit/Form';
import { InitialValues, Inputs } from 'ui-kit/Form/type';

import styles from './contacts.module.scss';
import { initialStateContact } from './const';
import contactSchema from './schema';
;

const style: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid var(--dark-blue)',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

export const ContactsPage: FC = () => {
  const { contacts, loading, error } = useAppSelector(state => state.contacts)
  const dispatch = useAppDispatch()

  const [searchContacts, setSearchContacts] = useState<Contact[]>(contacts)

  const [contact, setContact] = useState<Contact>(initialStateContact)

  const [searchText, setSearchText] = useState<string>('')

  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)

  const initialValues = useMemo<InitialValues>(() => ({
    [CONTACT_FIELD.first_name]: contact[CONTACT_FIELD.first_name],
    [CONTACT_FIELD.second_name]: contact[CONTACT_FIELD.second_name],
    [CONTACT_FIELD.last_name]: contact[CONTACT_FIELD.last_name] || '',
    [CONTACT_FIELD.phone]: contact[CONTACT_FIELD.phone],
  }), [contact])

  const inputs = useMemo<Inputs[]>(() => [
    {
      name: CONTACT_FIELD.first_name,
      title: 'Имя*',
      placeholder: 'Введите име'
    },
    {
      name: CONTACT_FIELD.second_name,
      title: 'Фамилия*',
      placeholder: 'Введите фамилию'
    },
    {
      name: CONTACT_FIELD.last_name,
      title: 'Отчество',
      placeholder: 'Введите отчество'
    },
    {
      name: CONTACT_FIELD.phone,
      title: 'Телефон',
      placeholder: 'Введите телефон',
      type: 'tel'
    },
  ], [])

  useEffect(() => {
    setSearchContacts(contacts)
  }, [contacts])

  useEffect(() => {
    const searchContacts = searchText ? contacts.filter(contact =>
      contact[CONTACT_FIELD.first_name].includes(searchText) ||
      contact[CONTACT_FIELD.second_name].includes(searchText) ||
      (contact[CONTACT_FIELD.last_name]?.includes(searchText) && contact[CONTACT_FIELD.last_name]) ||
      contact[CONTACT_FIELD.phone].includes(searchText)
    ) : contacts

    setSearchContacts(searchContacts)
  }, [searchText])

  useEffect(() => {
    dispatch(fetchGetContacts())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const getContactInformation = (values: InitialValues, uuid: string): Contact => ({
    [CONTACT_FIELD.first_name]: values[CONTACT_FIELD.first_name],
    [CONTACT_FIELD.second_name]: values[CONTACT_FIELD.second_name],
    [CONTACT_FIELD.last_name]: values[CONTACT_FIELD.last_name],
    [CONTACT_FIELD.phone]: values[CONTACT_FIELD.phone],
    [CONTACT_FIELD.id]: uuid
  })

  const handleDeleteContact = () => {
    dispatch(fetchDeleteContact(contact))

    handleCloseDeleteModal()
  }
  const handleAddContact = (values: InitialValues) => {
    const contactInformation = getContactInformation(values, uuid())

    dispatch(fetchAddContact(contactInformation))

    handleCloseAddModal()
  }
  const handleUpdateContact = (values: InitialValues) => {
    const contactInformation = getContactInformation(values, contact[CONTACT_FIELD.id])

    dispatch(fetchUpdateContact(contactInformation))

    handleCloseUpdateModal()
  }

  const handleOpenUpdateModal = (contact: Contact) => (): void => {
    setContact(contact)

    setIsOpenUpdateModal(true)
  }
  const handleCloseUpdateModal = (): void => {
    setIsOpenUpdateModal(false)
  }

  const handleOpenAddModal = (): void => {
    setContact(initialStateContact)

    setIsOpenCreateModal(true)
  }
  const handleCloseAddModal = (): void => {
    setIsOpenCreateModal(false)
  }

  const handleOpenDeleteModal = (contact: Contact) => (): void => {
    setContact(contact)

    setIsOpenDeleteModal(true)
  }
  const handleCloseDeleteModal = (): void => {
    setIsOpenDeleteModal(false)
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setSearchText(value)
  }

  if (loading) return <Spinner />

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Список контактов</h2>
      <div className={styles.containerTop}>
        <Button onClick={handleOpenAddModal} className={styles.button_Add} variant="outlined">Добавить новый контакт</Button>

        <TextField
          value={searchText}
          onChange={handleSearch}
          label="Поиск"
          type="search"
          variant="standard"
        />
      </div>
      {
        searchContacts.length ? (
          <ul className={styles.list}>
            {
              searchContacts.map(contact =>
                <ContactComponent
                  handleDelete={handleOpenDeleteModal}
                  handleUpdate={handleOpenUpdateModal}
                  key={uuid()}
                  contact={contact}
                />)
            }
          </ul>
        ) : (
          <span className={styles.text}>
            {searchText ? 'По вашему запросу мы не смогли найти ни одного контакта' : "У вас пока нет контактов. Создайте свой первый контакт"}
          </span>
        )
      }

      <Modal
        open={isOpenUpdateModal}
        onClose={handleCloseUpdateModal}
      >
        <Box sx={style}>
          <FormComponent
            title='Обновление контакта'
            initialValues={initialValues}
            onSubmit={handleUpdateContact}
            validationSchema={contactSchema}
            inputs={inputs}
          >
            <Box className={styles.buttons}>
              <Button onClick={handleCloseUpdateModal} variant="contained">Отмена</Button>
              <Button type='submit' variant="outlined">Сохранить</Button>
            </Box>
          </FormComponent>
        </Box>
      </Modal>

      <Modal
        open={isOpenCreateModal}
        onClose={handleCloseAddModal}
      >
        <Box sx={style}>
          <FormComponent
            title='Добавление контакта'
            initialValues={initialValues}
            onSubmit={handleAddContact}
            validationSchema={contactSchema}
            inputs={inputs}
          >
            <Box className={styles.buttons}>
              <Button onClick={handleCloseAddModal} variant="contained">Отмена</Button>
              <Button type='submit' variant="outlined">Создать</Button>
            </Box>
          </FormComponent>
        </Box>
      </Modal>

      <Modal
        open={isOpenDeleteModal}
        onClose={handleCloseDeleteModal}
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">Удаление контакта</Typography>
          <Typography>Вы действительно хотите удалить данный контакт?</Typography>

          <Box className={styles.buttons}>
            <Button onClick={handleCloseDeleteModal} variant="contained">Отмена</Button>
            <Button onClick={handleDeleteContact} variant="outlined">Удалить</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
