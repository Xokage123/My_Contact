import { MainLayout } from 'layouts/MainLayout';
import { FC } from 'react';

import AppRouter from 'router';

const App: FC = () => (
  <MainLayout>
    <AppRouter />
  </MainLayout>

)
export default App;
