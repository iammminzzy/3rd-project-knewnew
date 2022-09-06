import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

import { HiTag } from '../../utils/common/icons';

interface Props {
  description?: string;
  images: [{ order: number; url: string }];
  foodTags: [string];
  modal: React.Dispatch<React.SetStateAction<boolean>>;
}

const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Product = ({ description, images, foodTags, modal }: Props) => {
  return (
    <MainTextWrap>
      <MainText>{description}</MainText>
      <SliderWrap {...settings}>
        {images.map(image => {
          return (
            <ImgWrap key={image.url} onClick={() => modal(true)}>
              <ContentImg src={image.url} />
            </ImgWrap>
          );
        })}
      </SliderWrap>
      <HashTagWrap>
        <HiTag />
        <HashTags>
          {foodTags.map(tag => (
            <div key={tag}>#{tag}</div>
          ))}
        </HashTags>
      </HashTagWrap>
    </MainTextWrap>
  );
};

export default Product;

const MainTextWrap = styled.div``;

const MainText = styled.p`
  margin: 20px 0;
  display: -webkit-box;
  max-height: 150px;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: 300;

  @media (max-width: 767px) {
    max-height: 120px;
    line-height: 24px;
  }

  @media (max-width: 480px) {
    max-height: 100px;
    line-height: 20px;
  }
`;

const SliderWrap = styled(Slider)`
  margin-bottom: 16px;
  .slick-track {
    display: flex;
    gap: 10px;
  }
  .slick-slide {
    outline: none;
  }
  .slick-dots {
    bottom: 13px;
  }
`;

const ImgWrap = styled.div`
  aspect-ratio: 1/1;
`;

const ContentImg = styled.img`
  width: 100%;
  border-radius: 25px;
  object-fit: cover;
`;

const HashTagWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  color: #aaa;
  font-size: 20px;

  @media (max-width: 767px) {
    font-size: 16px;
    gap: 5px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    gap: 3px;
  }
`;

const HashTags = styled(HashTagWrap)`
  font-size: 17px;

  @media (max-width: 767px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;
