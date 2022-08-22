import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineSetting } from 'react-icons/ai';

const UserNav = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <Arrow onClick={() => navigate(-1)} />
        <Title>마이뉴뉴</Title>
        <Setting />
      </Content>
    </Container>
  );
};

export default UserNav;

const Container = styled.div`
  display: flex;
  align-items: center;

  position: fixed;
  max-width: 480px;

  width: 100%;
  min-height: 64px;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.white50};
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  position: relative;
`;

const Arrow = styled(IoIosArrowBack)`
  position: absolute;
  left: 5%;
  font-size: 20px;
`;

const Title = styled.p`
  font-weight: 400;
  text-align: center;
`;

const Setting = styled(AiOutlineSetting)`
  position: absolute;
  right: 5%;
  font-size: 20px;
`;
