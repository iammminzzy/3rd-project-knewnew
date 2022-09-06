import React from 'react';
import styled from 'styled-components';

interface Props {
  reaction?: string;
}

const Reaction = ({ reaction }: Props) => {
  const reAction = () => {
    switch (reaction) {
      case '최고예요':
        return <Best>♥ 최고예요</Best>;
      case '괜찮아요':
        return <Soso>● 괜찮아요</Soso>;
      default:
        <Bad>X 별로예요</Bad>;
    }
  };
  return <div>{reAction()}</div>;
};

export default Reaction;

const Best = styled.p`
  color: ${({ theme }) => theme.colors.red80};
  font-weight: 700;
`;

const Soso = styled.p`
  color: #ffc646;
  font-weight: 700;
`;

const Bad = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 700;
`;
