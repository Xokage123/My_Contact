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
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false)

  const initialValues = useMemo<InitialValues>(() => ({
    [CONTACT_FIELD.first_name]: contact[CONTACT_FIELD.first_name],
    [CONTACT_FIELD.second_name]: contact[CONTACT_FIELD.second_name],
    [CONTACT_FIELD.last_name]: contact[CONTACT_FIELD.last_name] || '',
    [CONTACT_FIELD.phone]: contact[CONTACT_FIELD.phone],
  }), [contact])

  const inputs = useMemo<Inputs[]>(() => [
    {
      name: CONTACT_FIELD.first_name,
      title: '??????*',
      placeholder: '?????????????? ??????'
    },
    {
      name: CONTACT_FIELD.second_name,
      title: '??????????????*',
      placeholder: '?????????????? ??????????????'
    },
    {
      name: CONTACT_FIELD.last_name,
      title: '????????????????',
      placeholder: '?????????????? ????????????????'
    },
    {
      name: CONTACT_FIELD.phone,
      title: '??????????????',
      placeholder: '?????????????? ??????????????',
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

    setIsOpenAddModal(true)
  }
  const handleCloseAddModal = (): void => {
    setIsOpenAddModal(false)
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
    <Box className={styles.container}>
      <Typography variant='h4' className={styles.title}>???????????? ??????????????????</Typography>

      <Box className={styles.containerTop}>
        <Button onClick={handleOpenAddModal} className={styles.button_Add} variant="outlined">???????????????? ?????????? ??????????????</Button>

        <TextField
          value={searchText}
          onChange={handleSearch}
          label="??????????"
          type="search"
          variant="standard"
        />
      </Box>
      
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
          <Typography className={styles.text}>
            {searchText ? '???? ???????????? ?????????????? ???? ???? ???????????? ?????????? ???? ???????????? ????????????????' : "?? ?????? ???????? ?????? ??????????????????. ???????????????? ???????? ???????????? ??????????????"}
          </Typography>
        )
      }

      <Modal
        open={isOpenUpdateModal}
        onClose={handleCloseUpdateModal}
      >
        <Box sx={style}>
          <FormComponent
            title='???????????????????? ????????????????'
            initialValues={initialValues}
            onSubmit={handleUpdateContact}
            validationSchema={contactSchema}
            inputs={inputs}
          >
            <Box className={styles.buttons}>
              <Button onClick={handleCloseUpdateModal} variant="contained">????????????</Button>
              <Button type='submit' variant="outlined">??????????????????</Button>
            </Box>
          </FormComponent>
        </Box>
      </Modal>

      <Modal
        open={isOpenAddModal}
        onClose={handleCloseAddModal}
      >
        <Box sx={style}>
          <FormComponent
            title='???????????????????? ????????????????'
            initialValues={initialValues}
            onSubmit={handleAddContact}
            validationSchema={contactSchema}
            inputs={inputs}
          >
            <Box className={styles.buttons}>
              <Button onClick={handleCloseAddModal} variant="contained">????????????</Button>
              <Button type='submit' variant="outlined">??????????????</Button>
            </Box>
          </FormComponent>
        </Box>
      </Modal>

      <Modal
        open={isOpenDeleteModal}
        onClose={handleCloseDeleteModal}
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">???????????????? ????????????????</Typography>
          <Typography>???? ?????????????????????????? ???????????? ?????????????? ???????????? ???????????????</Typography>

          <Box className={styles.buttons}>
            <Button onClick={handleCloseDeleteModal} variant="contained">????????????</Button>
            <Button onClick={handleDeleteContact} variant="outlined">??????????????</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
