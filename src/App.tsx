import React, { useState } from 'react';
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

function App() {
  const [modalOpen, setModalOpen] = useState(true);
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

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {modalOpen && <Modal closeModal={closeModal} />}
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
