import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaHeart,
  FaCircle,
  FaTimes,
  FaQuestion,
  FaShoppingCart,
} from 'react-icons/fa';

export default function NewFeed() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [foodTag, setFoodTag] = useState<string[]>([]);
  const [store, setStore] = useState('구매처를 선택하세요');
  const [showBox, setShowBox] = useState(false);

  const handleTagList = (item: string) => {
    const index = foodTag.indexOf(item);

    if (index > -1) {
      const copy = [...foodTag];
      copy.splice(index, 1);
      setFoodTag(copy);
    } else {
      const copy = [...foodTag];
      copy.push(item);
      setFoodTag(copy);
    }
    console.log(foodTag);
  };

  const handleNextPage = () => {
    const state = {
      score: score,
      foodTag: foodTag,
      store: store,
    };
    if (state.store == '구매처를 선택하세요') {
      state.store = '';
    }
    navigate('/newfeedwrite', {
      state: state,
    });
  };

  return (
    <NewFeedWrap>
      <TitleWrap>
        <SubTitle>오늘의 푸드로그는</SubTitle>
        <Title>한마디로, </Title>
        <Require>(필수)</Require>
      </TitleWrap>
      <ButtonBox>
        <label>
          <input
            type="checkbox"
            name=""
            onChange={() => {
              setScore(1);
            }}
            checked={score === 1}
          />
          <IconBox className="iconBox1">
            <FaHeart aria-hidden="true" />
            <span>최고예요</span>
          </IconBox>
        </label>
        <label>
          <input
            type="checkbox"
            name=""
            onChange={() => {
              setScore(2);
            }}
            checked={score === 2}
          />
          <IconBox className="iconBox2">
            <FaCircle aria-hidden="true" />
            <span>괜찮아요</span>
          </IconBox>
        </label>
        <label>
          <input
            type="checkbox"
            name=""
            onChange={() => {
              setScore(3);
            }}
            checked={score === 3}
          />
          <IconBox className="iconBox3">
            <FaTimes aria-hidden="true" />
            <span>별로예요</span>
          </IconBox>
        </label>
        <label>
          <input
            type="checkbox"
            name=""
            onChange={() => {
              setScore(4);
            }}
            checked={score === 4}
          />
          <IconBox className="iconBox4">
            <FaQuestion aria-hidden="true" />
            <span>궁금해요</span>
          </IconBox>
        </label>
      </ButtonBox>
      <TitleWrap>
        <Title>푸드 태그는, </Title>
        <Require>(필수)</Require>
      </TitleWrap>
      <TagWrap>
        <label>
          <input
            type="checkbox"
            name=""
            onChange={() => {
              handleTagList('빵식가');
            }}
          />
          <Tag className="tag">
            <span>빵식가</span>
          </Tag>
        </label>
        <label>
          <input
            type="checkbox"
            name=""
            onChange={() => {
              handleTagList('애주가');
            }}
          />
          <Tag className="tag">
            <span>애주가</span>
          </Tag>
        </label>
        <label>
          <input
            type="checkbox"
            name=""
            onChange={() => {
              handleTagList('디저트러버');
            }}
          />
          <Tag className="tag">
            <span>디저트러버</span>
          </Tag>
        </label>
        <label>
          <input
            type="checkbox"
            name=""
            onChange={() => {
              handleTagList('신상탐험대');
            }}
          />
          <Tag className="tag">
            <span>신상탐험대</span>
          </Tag>
        </label>
        <label>
          <input
            type="checkbox"
            name=""
            onChange={() => {
              handleTagList('오늘한끼');
            }}
          />
          <Tag className="tag">
            <span>오늘한끼</span>
          </Tag>
        </label>
        <label>
          <input
            type="checkbox"
            name=""
            onChange={() => {
              handleTagList('다이어터');
            }}
          />
          <Tag className="tag">
            <span>다이어터</span>
          </Tag>
        </label>
        <label>
          <input
            type="checkbox"
            name=""
            onChange={() => {
              handleTagList('비건');
            }}
          />
          <Tag className="tag">
            <span>비건</span>
          </Tag>
        </label>
        <label>
          <input
            type="checkbox"
            name=""
            onChange={() => {
              handleTagList('홈카페');
            }}
          />
          <Tag className="tag">
            <span>홈카페</span>
          </Tag>
        </label>
        <label>
          <input
            type="checkbox"
            name=""
            onChange={() => {
              handleTagList('캠퍼');
            }}
          />
          <Tag className="tag">
            <span>캠퍼</span>
          </Tag>
        </label>
      </TagWrap>
      <TitleWrap>
        <Title>구매한 곳은, </Title>
      </TitleWrap>
      <Dropdown
        store={store}
        onClick={() => {
          setShowBox(!showBox);
          {
            console.log(store);
          }
        }}
      >
        <p>
          <FaShoppingCart />
          {store}
        </p>
        {showBox && (
          <Overlay>
            <Content>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setStore('네이버 쇼핑');
                }}
              >
                네이버 쇼핑
              </a>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setStore('마켓컬리');
                }}
              >
                마켓컬리
              </a>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setStore('쿠팡');
                }}
              >
                쿠팡
              </a>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setStore('SSG');
                }}
              >
                SSG
              </a>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setStore('B마트');
                }}
              >
                B마트
              </a>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setStore('윙잇');
                }}
              >
                윙잇
              </a>
            </Content>
          </Overlay>
        )}
      </Dropdown>
      <NextBtn>
        <button
          onClick={() => {
            handleNextPage();
          }}
          disabled={score != 0 && foodTag.length != 0 ? false : true}
        >
          다음으로
        </button>
      </NextBtn>
    </NewFeedWrap>
  );
}

const NewFeedWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 60px auto 80px auto;
  font-family: ${({ theme }) => theme.fonts.fontFamily};

  @media (min-width: 768px) {
    width: 748px;
  }

  @media (max-width: 767px) {
  }
`;

const TitleWrap = styled.div`
  margin-top: 50px;
  margin-left: 20px;
`;

const SubTitle = styled.p`
  font-size: 16px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const Require = styled.span`
  font-size: 13px;
  color: red;
`;

const ButtonBox = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-around;

  label {
    cursor: pointer;

    input[type='checkbox'] {
      display: none;
    }

    input[type='checkbox']:checked ~ .iconBox1 {
      color: red;
      border: 1px solid red;
    }
    input[type='checkbox']:checked ~ .iconBox2 {
      color: #f5df4d;
      border: 1px solid #f5df4d;
    }
    input[type='checkbox']:checked ~ .iconBox3 {
      color: black;
      border: 1px solid black;
    }
    input[type='checkbox']:checked ~ .iconBox4 {
      color: black;
      border: 1px solid black;
    }
  }
`;

const IconBox = styled.div`
  position: relative;
  display: flex;
  min-width: 100px;
  padding: 30px 20px;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  color: #aaa;
  border: 1px solid #aaa;
  border-radius: 10px;
  font-size: 20px;
  transition: 0.2s;
  user-select: none;
  aspect-ratio: 1/1;

  svg {
    font-size: 24px;
    margin-bottom: 5px;
  }

  @media (max-width: 767px) {
    padding: 30px 10px;
    font-size: 16px;

    svg {
      font-size: 20px;
    }
  }

  @media (max-width: 480px) {
    min-width: 60px;
    padding: 15px 10px;
    font-size: 13px;

    svg {
      font-size: 15px;
    }
  }
`;

const TagWrap = styled.div`
  margin: 20px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  label {
    margin: 5px;
    cursor: pointer;

    input[type='checkbox'] {
      display: none;
    }

    input[type='checkbox']:checked ~ .tag {
      color: red;
      border: 1px solid red;
    }
  }
`;

const Tag = styled.div`
  position: relative;
  display: flex;
  padding: 8px 20px;
  background-color: #fff;
  color: #aaa;
  border: 1px solid #aaa;
  border-radius: 20px;
  font-size: 20px;
  transition: 0.2s;
  user-select: none;

  @media (max-width: 767px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const Dropdown = styled.div<{ store: string }>`
  margin: 20px;
  p {
    padding: 15px 10px;
    border-top: 1px solid #aaa;
    border-bottom: 1px solid #aaa;

    svg {
      margin-right: 10px;
    }
  }

  color: ${props => {
    return props.store == `구매처를 선택하세요` ? '#aaa' : 'black';
  }};
`;

const NextBtn = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 30px 20px;
  align-items: center;

  button {
    width: 100%;
    padding: 15px 0;
    background-color: white;
    border: 1px solid red;
    border-radius: 5px;
    color: red;
    font-size: 18px;
    cursor: pointer;

    @media (max-width: 480px) {
      padding: 10px 0;
      font-size: 13px;
    }

    :disabled {
      background-color: #f3f3f3;
      border: 1px solid #aaa;
      color: #aaa;
      cursor: default;
    }
  }
`;

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
