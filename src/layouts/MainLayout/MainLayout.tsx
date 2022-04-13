import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'

import { FooterComponent } from 'components/Footer';
import { HeaderComponent } from 'components/Header';

import { useAppSelector } from 'store/hooks';

import { RoutePaths } from 'router/const';

import { classMainConatiner } from 'const';

import styles from './mainlayout.module.scss';

export const MainLayout: FC = (props) => {
  const { children } = props

  const { isAuth } = useAppSelector(state => state.auth)

  const navigate = useNavigate()

  useEffect(() => {
    navigate({
      pathname: isAuth ? RoutePaths.CONTACTS : RoutePaths.AUTH
    })
  }, [isAuth])

  return (
    <>
      <HeaderComponent />
      <main className={styles.main}>
        <div className={classMainConatiner}>
          {children}
        </div>
      </main>
      <FooterComponent />

      <ToastContainer
        position='top-right'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
