import React from 'react';
import styled from 'styled-components';

export default function SignIn() {
  const kakaoAuthLink = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

  const naverAuthLink = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=STATE_STRING&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}`;

  const toSnsLogin = (sns: string) => {
    switch (sns) {
      case 'kakao':
        window.location.href = kakaoAuthLink;
        break;

      case 'naver':
        window.location.href = naverAuthLink;
        break;

      default:
        alert('준비중입니다');
    }
  };

  return (
    <Container>
      <Content>
        <Description>
          <Title>제대로 된 맛있는 발견</Title>
          <Logo alt="logo" src="images/logo.png" />
        </Description>
        <InputContainer>
          <InputForm>
            <Input type="email" placeholder="이메일" />
            <Input type="password" placeholder="비밀번호" />
            <SignInButton type="submit">로그인</SignInButton>
          </InputForm>
        </InputContainer>
        <Section>또는</Section>
        <ButtonWapper>
          {SNS_SIGNIN_DATA.map(item => (
            <SnsSignInButton
              key={item.name}
              alt="icon"
              src={item.image}
              onClick={() => toSnsLogin(item.name)}
            />
          ))}
        </ButtonWapper>
      </Content>
    </Container>
  );
}

const SNS_SIGNIN_DATA = [
  { id: 1, name: 'kakao', image: 'images/icon/kakao_icon.png' },
  { id: 2, name: 'naver', image: 'images/icon/naver_icon.png' },
  { id: 3, name: 'google', image: 'images/icon/google_icon.png' },
  { id: 4, name: 'apple', image: 'images/icon/apple_icon.jpeg' },
];

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 25px;
`;

const Description = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
`;

const Logo = styled.img`
  max-width: 200px;
`;

const InputContainer = styled.div``;

const InputForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 10px;
`;

const Input = styled.input`
  min-width: 260px;

  padding: 13px;
  border: 1px solid ${({ theme }) => theme.colors.white50};
  border-radius: 5px;

  font-size: 15px;
  opacity: 0.9;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.red};
  }
`;

const SignInButton = styled.button`
  min-width: 260px;

  padding: 13px;
  border: 1px solid ${({ theme }) => theme.colors.white50};
  border-radius: 5px;

  font-size: 16px;
  font-weight: 600;

  background-color: ${({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  opacity: 0.9;
`;

const ButtonWapper = styled.div`
  display: flex;
  gap: 20px;
`;

const SnsSignInButton = styled.img`
  width: 50px;
  cursor: pointer;
`;

const Section = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  color: ${({ theme }) => theme.colors.black50};
  font-size: 13px;

  &::before {
    content: '';
    margin-right: 10px;
    height: 0.1px;
    flex-grow: 1;
    background: ${({ theme }) => theme.colors.white50};
  }

  &::after {
    content: '';
    margin-left: 10px;
    height: 0.1px;
    flex-grow: 1;
    background: ${({ theme }) => theme.colors.white50};
  }
`;
