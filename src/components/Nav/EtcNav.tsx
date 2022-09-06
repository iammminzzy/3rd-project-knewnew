import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineSetting } from 'react-icons/ai';

interface Iprops {
  userLocation: string;
}

const EtcNav = ({ userLocation }: Iprops) => {
  const navigate = useNavigate();
  const title = () => {
    if (userLocation.includes('/newfeed')) {
      return '글쓰기';
    }
    if (userLocation.includes('/detail')) {
      return '게시글 상세';
    }
    if (userLocation.includes('/users')) {
      return '마이 뉴뉴';
    }
  };

  return (
    <Container>
      <Content>
        <Arrow onClick={() => navigate(-1)} />
        <Title>{title()}</Title>
        {userLocation.includes('/users') && <Setting />}
      </Content>
    </Container>
  );
};

export default EtcNav;

const Container = styled.div`
  display: flex;
  align-items: center;

  max-width: 768px;
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
  cursor: pointer;
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
