import React, { useEffect, useState } from 'react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ThemeProvider } from 'styled-components';
import { Router } from './Router';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import Modal from '../src/components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { addToken } from './reducer/userSlice';
import { RootState } from './store/store';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const token = useSelector((state: RootState) => state.tokenState.value);
  const dispatch = useDispatch();
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

  useEffect(() => {
    // todo 화면들어올때마다 refreshToken 요청 api
    const refreshToken = 'tokensdfasdfafad';
    dispatch(addToken(refreshToken));
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
