import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Router } from './Router';
import axios from 'axios';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { useDispatch } from 'react-redux';
import { addToken } from './reducer/userSlice';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import Modal from '../src/components/Modal/Modal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BASE_URL } from './api/utils';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const closeModal = (): void => {
    setModalOpen(false);
  };
  // * react query 글로벌 에러 핸들링 세팅
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: error => {
        console.log(error);
      },
    }),
    mutationCache: new MutationCache({
      onError: error => {
        console.log(error);
      },
    }),
  });

  const setTokenRefresh = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/user/refresh`, {
        refresh_token: `${localStorage.getItem('refresh_token')}`,
      });
      if (data) {
        dispatch(addToken(data.access));
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (JSON.stringify(error.response.data) === 'token invaild') {
          navigate('/signin');
        }
      }
    }
  };

  useEffect(() => {
    // todo 화면들어올때마다 refreshToken 요청 api
    setTokenRefresh();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {modalOpen && (
          <Modal setModalOpen={(isOpen: boolean) => setModalOpen(isOpen)} />
        )}
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
