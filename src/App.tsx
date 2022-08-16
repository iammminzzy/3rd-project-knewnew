import React from 'react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ThemeProvider } from 'styled-components';
import { Router } from './Router';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';

function App() {
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
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
