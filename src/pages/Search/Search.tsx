import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Search() {
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('keywords') || '[]';
      setKeywords(JSON.parse(result));
    }
  }, []);

  return (
    <Container>
      <Content>
        <Keyword>최근 검색어</Keyword>
        {keywords.map(
          (item: string, index: number): JSX.Element => (
            <p key={item as React.Key}>{item}</p>
          )
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  max-width: 480px;

  width: 100%;
`;

const Content = styled.div`
  padding-top: 80px;
  margin: 0 20px;
`;

const Keyword = styled.p`
  font-size: 14px;
  font-weight: 400;

  color: ${({ theme }) => theme.colors.black50};
`;
