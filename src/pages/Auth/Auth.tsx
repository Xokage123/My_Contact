import { AxiosResponse } from 'axios';
import { FC, useMemo } from 'react';
import { toast } from 'react-toastify'

import { Box } from '@mui/material';

import { FormComponent } from 'ui-kit/Form/Form';
import { InitialValues, Inputs } from 'ui-kit/Form/type';

import instanse from 'api';
import { PATHS_API } from 'api/const';
import { AUTH_FIELD, User } from 'api/type';

import { useAppDispatch } from 'store/hooks';
import { setIsAuth } from 'store/slices/authSlice';

import { initialValues } from './const';

import authSchema from './schema';

import styles from './auth.module.scss';

export const AuthPage: FC = () => {
  const dispatch = useAppDispatch()

  const inputs = useMemo<Inputs[]>(() => [
    {
      name: AUTH_FIELD.login,
      title: 'Логин',
      placeholder: 'Введите логин'
    },
    {
      name: AUTH_FIELD.password,
      title: 'Пароль',
      placeholder: 'Введите пароль'
    }
  ], [])

  const onSubmit = async (values: InitialValues) => {
    const { data: users }: AxiosResponse<User[]> = await instanse.get(PATHS_API.users, {
      params: {
        [AUTH_FIELD.login]: values[AUTH_FIELD.login],
      }
    })

    if (!users.length) {
      toast.error('Извините, вы ввели неверный логин! Попробуйте еще раз', {
        toastId: PATHS_API.users
      })

      return
    }

    const findUser = users.find(user => user.password === values[AUTH_FIELD.password])

    if (findUser) {
      toast.success('Вы успешно авторизировались!', {
        toastId: PATHS_API.users
      })

      dispatch(setIsAuth(true))
    } else {
      toast.error('Извините, вы ввели неверные пароль! Попробуйте еще раз', {
        toastId: PATHS_API.users
      })
    }
  }

  return (
    <Box className={styles.container}>
      <FormComponent
        title='Авторизация'
        titleButton='Авторизироваться'
        validationSchema={authSchema}
        initialValues={initialValues}
        inputs={inputs}
        onSubmit={onSubmit}
      />
    </Box >
  );
}
