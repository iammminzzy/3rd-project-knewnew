import React from 'react';
import styled from 'styled-components';

interface IProps {
  closeModal: () => void;
}

const Modal = ({ closeModal }: IProps) => {
  return (
    <Container>
      <Overlay>
        <Content>
          <Description>
            <CenterBox>
              <Icon
                alt="icon"
                src="https://play-lh.googleusercontent.com/SeNXTDjf8SCdDqwCctgF3JxzHeTmlDi53Ccgekao7VQbGPQoNHH6G7rt4uoMFjxYVdEG=w480-h960-rw"
              />
            </CenterBox>
            <CenterBox>
              <Title>믿을 수 있는 </Title>
              <Title>
                <PointTitle>장보기</PointTitle>의 시작
              </Title>
              <SmailTitle>장보기 전 필수 앱, 뉴뉴</SmailTitle>
            </CenterBox>
          </Description>
          <BtnContainer>
            <Btn>
              <a href="https://www.naver.com">
                <Title>
                  <PointTitle>뉴뉴</PointTitle> 앱으로 보기
                </Title>
              </a>
            </Btn>
            <SmailBtn onClick={closeModal}>모바일 웹으로 볼래요</SmailBtn>
          </BtnContainer>
        </Content>
      </Overlay>
    </Container>
  );
};

export default Modal;

const Container = styled.div``;

const Overlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(1px);
  z-index: 999;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 25px;

  max-width: 768px;
  min-height: 330px;

  width: 100%;

  border-top-left-radius: 25px;
  border-top-right-radius: 25px;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);

  z-index: 1;
`;

const Description = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 20px;
`;

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 8px;

  height: 100%;
`;

const Icon = styled.img`
  max-width: 130px;
  border-radius: 10px;

  @media all and (min-width: 480px) and (max-width: 767px) {
    max-width: 120px;
  }
  @media all and (max-width: 479px) {
    max-width: 100px;
  }
`;

const Title = styled.span`
  font-size: 25px;
  font-weight: 600;

  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 22px;
  }
  @media all and (max-width: 479px) {
    font-size: 19px;
  }
`;

const SmailTitle = styled.span`
  font-size: 13px;
  opacity: 0.8;

  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 12px;
  }
  @media all and (max-width: 479px) {
    font-size: 11px;
  }
`;

const PointTitle = styled(Title)`
  color: ${({ theme }) => theme.colors.red80};
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 20px;

  width: 100%;
`;

const Btn = styled.button`
  width: 80%;

  padding: 15px;

  background-color: #ededed;
  border: none;
  border-radius: 10px;

  cursor: pointer;
`;

const SmailBtn = styled(Btn)`
  background-color: inherit;
  opacity: 0.6;
`;
