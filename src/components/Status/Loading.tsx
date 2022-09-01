import React from 'react';
import styled from 'styled-components';

export default function Loading() {
  return <Status>Loading </Status>;
}

const Status = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
`;
