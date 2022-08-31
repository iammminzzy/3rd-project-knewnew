import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

import { IoIosArrowBack } from 'react-icons/io';

interface Props {
  close: () => void;
  img: [{ order: number; url: string }] | undefined;
}

function ImageDetail({ close, img }: Props) {
  const settings = {
    customPaging: function (i: number) {
      const imgSrc = img && img[i].url;
      return <img src={imgSrc} />;
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Wapper>
      <Arrow onClick={close}></Arrow>
      <Content>
        <SliderWrap {...settings}>
          {img?.map(item => (
            <ImgWrap key={item.url}>
              <ContentImg src={item.url} />
            </ImgWrap>
          ))}
        </SliderWrap>
      </Content>
    </Wapper>
  );
}

export default ImageDetail;

const Wapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.black};
  transition: all 1s ease-in-out;
  animation: fadeInUp 0.4s;
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
`;

const Arrow = styled(IoIosArrowBack)`
  margin-left: 18px;
  margin-top: 20px;
  border: none;
  background-color: inherit;
  color: ${({ theme }) => theme.colors.white};
  font-size: 25px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
`;

const SliderWrap = styled(Slider)`
  width: 85%;
  .slick-track {
    display: flex;
  }
  .slick-slide {
    outline: none;
  }
  .slick-dots {
    position: inherit;
    overflow: scroll;
    li {
      width: 20%;
      height: 70px;
      img {
        aspect-ratio: 1/1;
        border-radius: 10px;
      }
    }
  }
`;

const ImgWrap = styled.div`
  aspect-ratio: 1/1;
`;

const ContentImg = styled.img`
  width: 100%;
  border-radius: 15px;
  object-fit: cover;
`;
