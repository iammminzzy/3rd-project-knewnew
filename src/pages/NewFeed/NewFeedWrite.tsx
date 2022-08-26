import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';

interface RouteState {
  state: {
    score: number;
    foodTag: string[];
    store: string;
  };
}

export default function NewFeedWirte() {
  const navigate = useNavigate();
  const { state } = useLocation() as RouteState;
  console.log(state);

  const [inputValue, setInputValue] = useState('');
  const [inputProduct, setInputProduct] = useState('');

  const handleInputTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 500) {
      alert('최대 500자까지 입력 가능합니다.');
      e.target.value = e.target.value.substring(0, 500);
    }
    setInputValue(e.target.value);
  };

  const handleInputProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputProduct(e.target.value);
    console.log(inputProduct);
  };

  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, []);

  return (
    <NewFeedWrap>
      <Header>
        <ToBack>
          <IoIosArrowBack />
        </ToBack>
        <div>글쓰기</div>
      </Header>
      <TitleWrap>
        <Title>오늘의 푸드로그 </Title>
        <CountLength>({inputValue.length}/500자)</CountLength>
      </TitleWrap>
      <InputText
        placeholder={`푸드로그를 자유롭게 작성하세요. (필수)\n\nTip. 내 평소 입맛, 나만의 특별한 조리법 등 다른 분들에게 도움이 되는 꿀팀을 함께 나눠주시면 더욱 좋아요!`}
        onChange={handleInputTextChange}
        value={inputValue}
      />
      <TitleWrap>
        <Title>상품명을 알고 있나요?</Title>
      </TitleWrap>
      <InputProduct
        placeholder={`상품명을 입력해주세요. 비워둬도 괜찮아요!`}
        onChange={handleInputProductChange}
        value={inputProduct}
      />
      <TitleWrap>
        <Title>사진이 있다면, 더 좋아요!</Title>
      </TitleWrap>
    </NewFeedWrap>
  );
}

const NewFeedWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto 80px auto;
  font-family: ${({ theme }) => theme.fonts.fontFamily};

  @media (min-width: 768px) {
    width: 748px;
  }

  @media (max-width: 767px) {
  }
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90px;
  padding: 20px 0;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  font-size: 20px;
  z-index: 10;

  svg {
    font-size: 30px;
  }

  @media (min-width: 768px) {
    width: 748px;
  }

  @media (max-width: 767px) {
    left: 10px;
    right: 10px;
    padding: 10px 0;
    height: 70px;
    font-size: 16px;

    svg {
      font-size: 20px;
    }
  }
`;

const ToBack = styled.div`
  position: absolute;
  left: 5px;
`;

const TitleWrap = styled.div`
  margin-top: 50px;
  margin-left: 20px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const CountLength = styled.span`
  color: #aaa;
  font-size: 16px;
  font-weight: 300;
`;

const Require = styled.span`
  font-size: 13px;
  color: red;
`;

const InputText = styled.textarea`
  width: 100%;
  height: 350px;
  resize: none;
  white-space: pre-line;
  word-break: break-all;
  border: none;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 20px;
  margin-top: 20px;
  font-size: 16px;

  &::placeholder {
    color: #aaa;
  }
`;

const InputProduct = styled.input`
  width: 100%;
  border: none;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 20px;
  margin-top: 20px;
  font-size: 16px;

  &::placeholder {
    color: #aaa;
  }
`;
