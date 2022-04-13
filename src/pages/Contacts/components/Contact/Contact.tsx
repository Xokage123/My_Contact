import { FC, useMemo } from "react";
import cn from 'classnames'

import { Contact } from "api/type";

import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import styles from './contact.module.scss'

interface Props {
  contact: Contact
  handleDelete: (contact: Contact) => () => void
  handleUpdate: (contact: Contact) => () => void
}

export const ContactComponent: FC<Props> = (props) => {
  const { contact, handleDelete, handleUpdate } = props

  const { first_name, second_name, last_name, phone } = contact

  const actionButtons = useMemo(() => [
    {
      Icon: <BorderColorOutlinedIcon titleAccess="Изменение" className={cn(styles.icon, 'pointer')} />,
      cb: handleUpdate(contact)
    },
    {
      Icon: <DeleteOutlineOutlinedIcon titleAccess="Удаление" className={cn(styles.icon, 'pointer')} />,
      cb: handleDelete(contact)
    },
  ], [contact, handleDelete, handleUpdate])

  return (
    <li className={styles.item} >
      <span>{`${first_name} ${second_name} ${last_name || ''}`}</span>
      <a href={`tel:${phone}`}>{phone}</a>

      <div className={styles.icons}>
        {
          actionButtons.map((button) => {
            const { Icon, cb } = button

            return (
              <button onClick={cb}>
                {Icon}
              </button>
            )
          })
        }
      </div>
    </li>
  )
}