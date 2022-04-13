import React, { FC } from 'react';

import { classMainConatiner } from 'const';

import { Box } from '@mui/material';

import styles from './header.module.scss';

export const HeaderComponent: FC= () =>  {
  return (
    <header className={styles.header}>
      <Box className={classMainConatiner}>
        <h1>Тестовое задание</h1>
      </Box>
    </header>
  );
}
