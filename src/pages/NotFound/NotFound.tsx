import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../store/store';

export default function NotFound() {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.tokenState.value);

  useEffect(() => {
    if (!accessToken) {
      alert('로그인 후 사용해 주세요!');
      navigate('/signin');
    }
  }, []);

  return (
    <Container>
      <Content>
        <Icon alt="logo" src="/images/character.png" />
        <Title>404</Title>
        <Description>해당 주소를 찾을수 없어요 !</Description>
        <Description>입력하신 주소를 다시한번 확인 해주세요.</Description>
        <Link to="/">
          <Btn>
            <PointTitle>홈으로</PointTitle>
          </Btn>
        </Link>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 10px;
  height: 100%;

  position: relative;

  background-color: ${({ theme }) => theme.colors.white80};
`;

const Icon = styled.img`
  max-width: 220px;
  max-height: 200px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.red80};
  font-size: 35px;
  font-weight: 600;
`;

const Description = styled.h2`
  font-size: 14px;
  font-weight: 600;
  opacity: 0.9;
`;

const Btn = styled.button`
  margin-top: 10px;
  padding: 10px 100px;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.red};
  border-radius: 5px;

  cursor: pointer;
`;
const PointTitle = styled(Title)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.red};
`;
