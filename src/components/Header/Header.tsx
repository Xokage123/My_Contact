import React, { FC } from 'react';

import { classMainConatiner } from 'const';

import styles from './header.module.scss';

export const HeaderComponent: FC= () =>  {
  return (
    <header className={styles.header}>
      <div className={classMainConatiner}>
        <h1>Тестовое задание</h1>
      </div>
    </header>
  );
}
