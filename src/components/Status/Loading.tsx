import React from 'react';
import styled from 'styled-components';

export default function Loading() {
  return (
    <LoadingWrap>
      <LoadingImg src="/images/loading.gif" alt="Loading" />
    </LoadingWrap>
  );
}

const LoadingWrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingImg = styled.img`
  display: inline-block;
  width: 20%;
  height: auto;
`;
