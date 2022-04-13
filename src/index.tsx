import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import App from 'components/App';

import { store } from 'store';

import 'react-toastify/dist/ReactToastify.css'
import './styles/global.scss'

const container = document.getElementById('root')

render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
  container
);
